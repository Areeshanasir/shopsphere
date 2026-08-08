import { useEffect, useRef, useState } from "react";

const SOCKET_URL = "ws://localhost:8080";

function useInventorySocket() {
  const socketRef = useRef(null);
  const reconnectTimerRef = useRef(null);
  const reconnectAttemptsRef = useRef(0);

  const [inventory, setInventory] = useState({});
  const [connectionStatus, setConnectionStatus] =
    useState("connecting");

  useEffect(() => {
    let isMounted = true;

    function connect() {
      if (!isMounted) return;

      setConnectionStatus("connecting");

      const socket = new WebSocket(SOCKET_URL);

      socketRef.current = socket;

      // ================================
      // CONNECTED
      // ================================

      socket.onopen = () => {
        if (!isMounted) return;

        console.log("🟢 WebSocket connected");

        setConnectionStatus("connected");

        // Reset exponential backoff
        reconnectAttemptsRef.current = 0;
      };

      // ================================
      // MESSAGE RECEIVED
      // ================================

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          // Initial inventory sent when a tab connects
          if (data.type === "INVENTORY_SYNC") {
            setInventory(data.inventory);
          }

          // Inventory changed somewhere
          if (data.type === "INVENTORY_UPDATE") {
            setInventory((current) => ({
              ...current,
              [data.productId]: data.quantity,
            }));
          }

          // Inventory error
          if (data.type === "INVENTORY_ERROR") {
            console.warn(data.message);
          }
        } catch (error) {
          console.error(
            "Invalid WebSocket message:",
            error
          );
        }
      };

      // ================================
      // DISCONNECTED
      // ================================

      socket.onclose = () => {
        if (!isMounted) return;

        console.log("🔴 WebSocket disconnected");

        setConnectionStatus("reconnecting");

        // 1s → 2s → 4s → 8s → 16s → 30s
        const delay = Math.min(
          1000 *
            2 ** reconnectAttemptsRef.current,
          30000
        );

        reconnectAttemptsRef.current += 1;

        console.log(
          `🔄 Reconnecting in ${delay / 1000}s...`
        );

        reconnectTimerRef.current = setTimeout(
          connect,
          delay
        );
      };

      // ================================
      // ERROR
      // ================================

      socket.onerror = (error) => {
        console.error(
          "WebSocket error:",
          error
        );
      };
    }

    connect();

    return () => {
      isMounted = false;

      if (reconnectTimerRef.current) {
        clearTimeout(
          reconnectTimerRef.current
        );
      }

      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  // ================================
  // DECREASE INVENTORY
  // ================================

  function decreaseInventory(productId) {
    const socket = socketRef.current;

    if (
      !socket ||
      socket.readyState !== WebSocket.OPEN
    ) {
      console.warn(
        "WebSocket is not connected"
      );

      return false;
    }

    socket.send(
      JSON.stringify({
        type: "DECREASE_INVENTORY",
        productId: String(productId),
      })
    );

    return true;
  }

  return {
    inventory,
    connectionStatus,
    decreaseInventory,
  };
}

export default useInventorySocket;