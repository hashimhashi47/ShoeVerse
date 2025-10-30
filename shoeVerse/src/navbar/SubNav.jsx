import React from "react";
import { Link } from "react-router";

export default function SubNav() {
  return (
    <nav className="w-full sticky top-13 z-40">   {/* ⬅️ lowered z-index */}
      <div className="h-15 flex justify-center p-4 ">
        <ul className="hidden md:flex gap-6 font-medium text-gray-600 ">
          <Link to="/men">
            <li className="hover:text-black cursor-pointer">MEN</li>
          </Link>
          <Link to="/women">
            <li className="hover:text-black cursor-pointer">WOMEN</li>
          </Link>
          <Link to="/collection">
            <li className="hover:text-black cursor-pointer">COLLECTIONS</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
}
