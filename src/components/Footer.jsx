import { FaFacebook, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="mt-20 bg-stone-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-10 md:grid-cols-4">

          <div>
            <h2 className="text-3xl font-bold">
              Shop<span className="text-amber-500">Sphere</span>
            </h2>
            <p className="mt-4 text-stone-400">
              Premium shopping experience built with React & Tailwind CSS.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Shop</h3>
            <ul className="space-y-2 text-stone-400">
              <li>Electronics</li>
              <li>Fashion</li>
              <li>Beauty</li>
              <li>Home</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Support</h3>
            <ul className="space-y-2 text-stone-400">
              <li>Help Centre</li>
              <li>Contact</li>
              <li>Privacy</li>
              <li>Terms</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Follow</h3>

            <div className="flex gap-4 text-2xl">
              <FaFacebook />
              <FaInstagram />
              <FaGithub />
              <FaLinkedin />
            </div>

          </div>

        </div>

        <hr className="my-10 border-stone-700"/>

        <p className="text-center text-stone-400">
          © 2026 ShopSphere. All rights reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;