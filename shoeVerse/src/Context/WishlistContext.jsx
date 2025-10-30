import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [userId, setUserId] = useState(null);
  const { user } = useContext(AuthContext); 


  useEffect(() => {
    if (user?.id) {
      setUserId(user.id);
      const storedWishlist =
        JSON.parse(localStorage.getItem(`wishlist_${user.id}`)) || [];
      setWishlist(storedWishlist);
    } else {
      setUserId(null);
      setWishlist([]);
    }
  }, [user]);

  useEffect(() => {
    if (userId) {
      localStorage.setItem(`wishlist_${userId}`, JSON.stringify(wishlist));
    }
  }, [wishlist, userId]);


  const isInWishlist = (id) => {
    return wishlist.some((item) => item.id === id);
  };


  const addToWishlist = (product) => {
    if (!userId) {
      alert("⚠️ You must be logged in to add items to wishlist!");
      return;
    }

    setWishlist((prev) => {
      if (prev.find((item) => item.id === product.id)) {
        alert("⚠️ Already in wishlist!");
        return prev;
      }
      return [...prev, product];
    });
  };


  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
