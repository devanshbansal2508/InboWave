import React from "react";
import Link from "next/link";
import FooterLogo from "./footer.logo"; // Make sure this exists

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-gray-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo + Newsletter */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/">
              <FooterLogo />
            </Link>
            <p className="mt-4 text-gray-300 max-w-sm">
              Get the latest updates, news, and insights from InboWave.
            </p>
            <form className="flex mt-4 max-w-md">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 rounded-l-md bg-zinc-800 border border-zinc-700 text-white placeholder:text-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs mt-2 text-gray-500">
              We respect your privacy. No spam ever.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Product</h3>
            <ul className="space-y-2">
              {["Create", "Write", "Grow", "Analyze"].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-white transition">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Company</h3>
            <ul className="space-y-2">
              {["About", "Careers", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-white transition">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-zinc-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© 2024 InboWave, Inc. All rights reserved.</p>
          <div className="flex space-x-4 mt-3 md:mt-0">
            <Link href="#" className="hover:text-white">Privacy</Link>
            <Link href="#" className="hover:text-white">Terms</Link>
            <Link href="#" className="hover:text-white">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
