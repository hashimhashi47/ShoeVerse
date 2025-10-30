import React, { useEffect, useState, useContext } from "react";
import { Nav } from "./Nav";
import axios from "axios";
import { Link } from "react-router-dom";
import SubNav from "./SubNav";
import { FaHeart } from "react-icons/fa";
import { WishlistContext } from "../Context/WishlistContext";

function Men() {
  const [datas, AddData] = useState([]);
  const { addToWishlist, isInWishlist } = useContext(WishlistContext);

  useEffect(() => {
    axios.get("http://localhost:5001/products").then((response) => {
      AddData(response.data);
    });
  }, []);

  return (
    <div>
      <Nav />
      <SubNav />
      <div className="absolute left-1/2 transform -translate-x-1/2 text-center font-bold text-black text-3xl">
                   M E N
                </div>
                <br />
                
      <div className="bg-white">
        
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {datas
              .filter((item) => item.category === "mens")
              .map((item) => (
                <div key={item.id} className="relative group">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToWishlist(item);
                    }}
                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-pink-100 z-10"
                  >
                    <FaHeart
                      className={`${
                        isInWishlist(item.id) ? "text-red-500" : "text-gray-400"
                      } transition-colors`}
                    />
                  </button>
                  <Link to={`/products/${item.id}`} className="group block">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                    />
                    <h3 className="mt-4 text-sm text-gray-700">{item.name}</h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      ₹{item.new_price}
                    </p>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Men;
