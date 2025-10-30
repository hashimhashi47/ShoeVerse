import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const { user } = useContext(AuthContext); 


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.id) {
      setUserId(storedUser.id);
    }
  }, []);


  const fetchCart = async (uid) => {
    if (!uid) return;
    try {
      const res = await axios.get(`http://localhost:5001/cart?userId=${uid}`);
      setCartItems(res.data || []);
    } catch (err) {
      console.error("Error fetching cart:", err.message);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchCart(user.id);
    } else {
      setCartItems([]); 
    }
  }, [user]);


  const addToCart = async (product) => {
    if (!userId) {
      alert("⚠️ Please log in to add items to cart!");
      return;
    }

    const existingItem = cartItems.find(
      (item) => item.productId === product.id && item.userId === userId
    );

    if (existingItem) {
      alert("⚠️ This product is already in your cart!");
      return; 
    }

    const newItem = {
      ...product,
      productId: product.id, 
      quantity: 1,
      userId,
    };

    try {
      const res = await axios.post("http://localhost:5001/cart", newItem);
      setCartItems((prev) => [...prev, res.data]); 
    } catch (err) {
      console.error("Error adding to cart:", err.message);
    }
  };


  const removeFromCart = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error removing item:", err.message);
    }
  };


  const updateQuantity = async (id, action) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item) return;

    const updatedItem = {
      ...item,
      quantity:
        action === "increment"
          ? item.quantity + 1
          : Math.max(item.quantity - 1, 1),
    };

    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? updatedItem : i))
    );

    try {
      await axios.put(`http://localhost:5001/cart/${id}`, updatedItem);
    } catch (err) {
      console.error("Error updating quantity:", err.message);
      fetchCart(userId); 
    }
  };

  
  const clearCart = async () => {
    try {
      for (const item of cartItems) {
        await axios.delete(`http://localhost:5001/cart/${item.id}`);
      }
      setCartItems([]);
    } catch (err) {
      console.error("Error clearing cart:", err.message);
    }
  };


  const resetCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        resetCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
