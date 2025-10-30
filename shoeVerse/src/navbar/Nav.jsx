import React, { useState, useContext } from "react";
import {
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaBox,
  FaHome,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { WishlistContext } from "../Context/WishlistContext";
import SearchBar from "./SearchBar";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";

export const Nav = () => {
  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const { user, logout ,fetchOrders} = useContext(AuthContext);
  const { resetCart, cartItems } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const navigate = useNavigate();
  

  const handleLogout = () => {
    logout();
    resetCart();
    setOpen(false);
    toast.error("Logged out!");
    navigate("/");
  };

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="bg-black text-white text-center text-sm py-1">
        Get EXTRA 15% OFF On Orders Above ₹1999* Code: HEYBRO10
      </div>

      <div className="relative flex justify-between items-center px-4 md:px-6 py-3">
        {/* ✅ Mobile Menu Button */}
        <button
          className="md:hidden text-xl text-gray-700"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <FaTimes /> : <FaBars />}
        </button>
        {/* ✅ Desktop Search */}
        <div className="hidden md:flex flex-1 max-w-xs ml-6">
          <SearchBar />
        </div>
        {/* ✅ Logo */}
        <div className="text-center font-bold text-black text-2xl md:text-3xl mx-auto md:mx-0">
          <Link to="/"> ShoeVerse</Link>
        </div>

        {/* ✅ Nav Icons */}
        <div className="flex gap-4 md:gap-6 items-center text-gray-600 text-lg relative">
          <Link
            to="/"
            className="hidden md:flex flex-col items-center cursor-pointer hover:text-black"
          >
            <FaHome />
            <span className="text-xs">Home</span>
          </Link>

          <Link
            to="/orders"
            className="hidden md:flex flex-col items-center cursor-pointer hover:text-black"
          >
            <FaBox />
            <span className="text-xs">Orders</span>
          </Link>

          <Link to="/wishlist" className="relative">
            <div className="flex flex-col items-center cursor-pointer hover:text-black">
              <FaHeart />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
              <span className="text-xs hidden md:block">Wishlist</span>
            </div>
          </Link>

          <Link to="/cart" className="relative">
            <div className="flex flex-col items-center cursor-pointer hover:text-black">
              <FaShoppingCart />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
              <span className="text-xs hidden md:block">Cart</span>
            </div>
          </Link>

          {/* Account Dropdown */}
          <div className="relative">
            <div
              className="flex flex-col items-center cursor-pointer hover:text-black"
              onClick={() => setOpen(!open)}
            >
              <FaUser />
              <span className="text-xs hidden md:block">Account</span>
            </div>

            {open && (
  <div
    className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 
               rounded-lg shadow-lg text-sm z-[9999]"  // ✅ pushed z-index higher
  >
    {user ? (
      <button
        onClick={handleLogout}
        className="w-full text-left px-4 py-2 hover:bg-gray-100 block"
      >
        Logout
      </button>
    ) : (
      <>
        <Link
          to="/login"
          className="block w-full px-4 py-2 hover:bg-gray-100"
          onClick={() => setOpen(false)}
        >
          Login
        </Link>
        <Link
          to="/register"
          className="block w-full px-4 py-2 hover:bg-gray-100"
          onClick={() => setOpen(false)}
        >
          Register
        </Link>
      </>
    )}
  </div>
)}

          </div>
        </div>
      </div>

      {/* ✅ Mobile Dropdown Menu */}
      {mobileMenu && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md p-4 space-y-4">
          <SearchBar />
          <Link to="/" className="block" onClick={() => setMobileMenu(false)}>
            🏠 Home
          </Link>
          <Link
            to="/orders"
            className="block"
            onClick={() => setMobileMenu(false)}
          >
            📦 Orders
          </Link>
          <Link
            to="/wishlist"
            className="block"
            onClick={() => setMobileMenu(false)}
          >
            ❤️ Wishlist
          </Link>
          <Link
            to="/cart"
            className="block"
            onClick={() => setMobileMenu(false)}
          >
            🛒 Cart
          </Link>
        </div>
      )}
    </nav>
  );
};
