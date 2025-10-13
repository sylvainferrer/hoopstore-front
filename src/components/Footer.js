import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-dark mt-auto w-full">
      <div className="text-light mx-auto max-w-7xl p-8 text-center">
        <nav className="mb-4 space-x-6">
          <Link href="/about" className="">
            À propos
          </Link>
          <Link href="/contact" className="">
            Contact
          </Link>
          <Link href="/mentions-legales" className="">
            Mentions légales
          </Link>
          <Link href="/cgv" className="">
            CGV/CGU
          </Link>
        </nav>
        <span className="text-xs">© {new Date().getFullYear()} HoopStore. Tous droits réservés.</span>
      </div>
    </footer>
  );
}

export default Footer;
