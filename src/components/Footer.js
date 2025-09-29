import React from "react";

function Footer() {
  return (
    <footer className="w-full bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-white">
        <nav className="mb-4 space-x-6">
          <a href="/about" className="">
            À propos
          </a>
          <a href="/contact" className="">
            Contact
          </a>
          <a href="/mentions-legales" className="">
            Mentions légales
          </a>
          <a href="/cgv" className="">
            CGV/CGU
          </a>
        </nav>
        <span className="text-xs">© {new Date().getFullYear()} HoopStore. Tous droits réservés.</span>
      </div>
    </footer>
  );
}

export default Footer;
