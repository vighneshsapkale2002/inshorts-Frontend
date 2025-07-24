import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="text-white body-font border-b border-blue-50 bg-black">
      <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center navbar">
        <Link to="/" className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <img
            className="h-14 animate-pulse rounded-xl"
            src="https://startuparticle.com/wp-content/uploads/2024/04/674bfe169655425.Y3JvcCwyODU4LDIyMzUsMCwxMjA.png"
            alt="Logo"
          />
          <span className="ml-3 text-xl text-red-300">inshorts</span>
        </Link>

        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center space-x-6">
          <Link to="/" className="text-white font-serif hover:text-cyan-300">All News</Link>
          <Link to="/trending" className="text-white font-serif hover:text-cyan-300">Trending</Link>
          <Link to="/bookmarks" className="text-white font-serif hover:text-cyan-300">Bookmarks</Link>
        </nav>

        <div className="mt-4 md:mt-0">
          <img
            src="https://png.pngtree.com/png-vector/20230831/ourmid/pngtree-man-avatar-image-for-profile-png-image_9197908.png"
            alt="User Avatar"
            className="w-10 h-10 rounded-full border-2 border-white hover:border-cyan-400 cursor-pointer"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
