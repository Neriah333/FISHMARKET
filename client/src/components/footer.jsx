import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footerbar() {
  return (
    <footer className="bg-gray-300 text-white py-6 w-full">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo or Site Name */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-semibold">FishCoop</h2>
          <p className="text-sm text-gray-400">Empowering fish cooperatives</p>
        </div>

        {/* Links */}
        <div className="flex space-x-6 text-sm mb-4 md:mb-0">
          <a href="/about" className="hover:text-blue-400 transition">About</a>
          <a href="/contact" className="hover:text-blue-400 transition">Contact</a>
          <a href="/privacy" className="hover:text-blue-400 transition">Privacy</a>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
            <FaInstagram />
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-gray-500 text-sm mt-4">
        &copy; {new Date().getFullYear()} FishCoop. All rights reserved.
      </div>
    </footer>
  );
}
