import React from "react";

function Footer() {
  return (
    <footer className="w-full border-t border-gray-300 bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-gray-600">
        <nav className="mb-4 space-x-6">
          <a href="/about" className="transition hover:text-gray-800">
            À propos
          </a>
          <a href="/contact" className="transition hover:text-gray-800">
            Contact
          </a>
          <a href="/mentions-legales" className="transition hover:text-gray-800">
            Mentions légales
          </a>
          <a href="/cgv" className="transition hover:text-gray-800">
            CGV/CGU
          </a>
        </nav>
        © {new Date().getFullYear()} HoopStore. Tous droits réservés.
      </div>
    </footer>
  );
}

export default Footer;
