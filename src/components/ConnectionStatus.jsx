import useInventorySocket from "../hooks/useInventorySocket";

function ConnectionStatus() {
  const { connectionStatus } = useInventorySocket();

  const status = {
    connecting: {
      text: "Connecting...",
      className: "bg-yellow-100 text-yellow-800",
    },
    connected: {
      text: "Live Inventory",
      className: "bg-green-100 text-green-800",
    },
    reconnecting: {
      text: "Reconnecting...",
      className: "bg-orange-100 text-orange-800",
    },
  };

  const current = status[connectionStatus] || {
    text: "Disconnected",
    className: "bg-red-100 text-red-800",
  };

  return (
    <div
      className={`rounded-full px-3 py-1 text-xs font-semibold ${current.className}`}
      aria-live="polite"
    >
      {current.text}
    </div>
  );
}

export default ConnectionStatus;