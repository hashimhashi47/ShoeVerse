import React, { useContext } from "react";

import { Nav } from "./Nav";
import { Link } from "react-router-dom";
import { WishlistContext } from "../Context/WishlistContext";
import SubNav from "./SubNav";

function WishList() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);

  return (
    <div>
      <Nav />
      <SubNav/>
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-6">My Wishlist 💖</h2>

        {wishlist.length === 0 ? (
          <p className="text-gray-600">No items yet! Add some from the Collection ✨</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div key={item.id} className="border rounded-xl p-4 shadow hover:shadow-lg relative">
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-2 right-2 bg-red-100 px-2 py-1 rounded-md text-xs text-red-600"
                >
                  Remove
                </button>

                <Link to={`/products/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <h3 className="mt-2 font-medium text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">{item.new_price}</p>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default WishList;
