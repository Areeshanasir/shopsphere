import { WebSocketServer } from "ws";

const PORT = 8080;

const wss = new WebSocketServer({
  port: PORT,
});

// Server is the single source of truth
let inventory = {
  1: 15,
  2: 15,
  3: 8,
  4: 20,
  5: 12,
};

console.log(
  `🟢 WebSocket server running on ws://localhost:${PORT}`
);

wss.on("connection", (socket) => {
  console.log("🔵 Client connected");

  // Send the CURRENT server inventory to the new client
  socket.send(
    JSON.stringify({
      type: "INVENTORY_SYNC",
      inventory,
    })
  );

  socket.on("message", (message) => {
    try {
      const data = JSON.parse(message.toString());

      // ================================
      // DECREASE INVENTORY
      // ================================

      if (data.type === "DECREASE_INVENTORY") {
        const productId = String(data.productId);

        const currentQuantity = inventory[productId] ?? 0;

        // Prevent negative inventory
        if (currentQuantity <= 0) {
          socket.send(
            JSON.stringify({
              type: "INVENTORY_ERROR",
              productId,
              message: "Product is out of stock.",
            })
          );

          return;
        }

        // Server performs the actual update
        const newQuantity = currentQuantity - 1;

        inventory[productId] = newQuantity;

        console.log(
          `📦 Product ${productId}: ${currentQuantity} → ${newQuantity}`
        );

        // Broadcast the SAME value to every connected tab
        wss.clients.forEach((client) => {
          if (client.readyState === 1) {
            client.send(
              JSON.stringify({
                type: "INVENTORY_UPDATE",
                productId,
                quantity: newQuantity,
              })
            );
          }
        });
      }
    } catch (error) {
      console.error(
        "❌ Invalid WebSocket message:",
        error
      );
    }
  });

  socket.on("close", () => {
    console.log("🔴 Client disconnected");
  });
});