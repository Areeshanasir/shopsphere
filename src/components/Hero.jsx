import { FiArrowRight } from "react-icons/fi";

function Hero() {
  return (
    <section className="mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-center px-6 text-center">

      <p className="mb-4 rounded-full bg-[#F2E7D8] px-5 py-2 text-sm font-medium text-[#8B6A45] dark:bg-[#2A241F] dark:text-[#E2C8A6]">
        ✨ New Collection 2026
      </p>

      <h1 className="max-w-4xl text-5xl font-extrabold leading-tight text-[#111111] md:text-7xl dark:text-white">
        Premium Shopping
        <span className="block text-[#C8A97E]">
          Made Simple
        </span>
      </h1>

      <p className="mt-8 max-w-2xl text-lg leading-8 text-[#555555] dark:text-[#D1D1D1]">
        Discover premium electronics, fashion, beauty and home essentials
        curated for a modern lifestyle.
      </p>

      <div className="mt-10 flex gap-5">

        <button className="flex items-center gap-2 rounded-xl bg-[#111111] px-7 py-4 font-semibold text-white transition hover:bg-[#C8A97E] dark:bg-[#C8A97E] dark:text-[#111111] dark:hover:bg-[#B79265]">
          Shop Now
          <FiArrowRight />
        </button>

        <button className="rounded-xl border border-[#E8E2D8] bg-white px-7 py-4 font-semibold text-[#111111] transition hover:bg-[#F2E7D8] dark:border-[#3A3A3A] dark:bg-[#1B1B1B] dark:text-white dark:hover:bg-[#2A2A2A]">
          Explore
        </button>

      </div>

      <div className="mt-20 grid grid-cols-3 gap-10">

        <div>
          <h2 className="text-4xl font-bold text-[#C8A97E]">60+</h2>
          <p className="text-[#666666] dark:text-[#D1D1D1]">
            Products
          </p>
        </div>

        <div>
          <h2 className="text-4xl font-bold text-[#C8A97E]">15k+</h2>
          <p className="text-[#666666] dark:text-[#D1D1D1]">
            Customers
          </p>
        </div>

        <div>
          <h2 className="text-4xl font-bold text-[#C8A97E]">4.9★</h2>
          <p className="text-[#666666] dark:text-[#D1D1D1]">
            Rating
          </p>
        </div>

      </div>

    </section>
  );
}

export default Hero;