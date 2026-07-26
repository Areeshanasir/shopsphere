import { FiAlertTriangle } from "react-icons/fi";

function ErrorState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-[#C8A97E] bg-[#F8F5F0] px-8 py-20 text-center dark:border-[#C8A97E] dark:bg-[#1B1B1B]">

      <FiAlertTriangle className="mb-5 text-6xl text-[#C8A97E]" />

      <h2 className="text-3xl font-bold text-[#111111] dark:text-white">
        Failed to Load Products
      </h2>

      <p className="mt-4 max-w-md text-[#666666] dark:text-[#D1D1D1]">
        We couldn't connect to the product server.
        Please make sure JSON Server is running and try again.
      </p>

      <button
        onClick={() => window.location.reload()}
        className="mt-8 rounded-xl bg-[#111111] px-6 py-3 font-semibold text-white transition hover:bg-[#C8A97E] dark:bg-[#C8A97E] dark:text-[#111111] dark:hover:bg-[#B79265]"
      >
        Retry
      </button>

    </div>
  );
}

export default ErrorState;