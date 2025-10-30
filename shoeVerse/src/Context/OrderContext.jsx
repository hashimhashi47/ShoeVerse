import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [OrderUser, setUser] = useState(null);
const { user } = useContext(AuthContext); 

  useEffect(() => {
    if (user?.id) {
      fetchOrders(user.id);
    } else {
      setOrders([]);
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.id) {
      setUser(storedUser);
    } else {
      setOrders([]);
      setLoading(false);
    }
  }, []);

  const fetchOrders = async (userId) => {
    if (!userId) return;
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5001/orders?userId=${userId}`
      );
      setOrders(res.data || []);
    } catch (err) {
      console.error("❌ Failed to fetch orders:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Place a new order (linked to user)
  const placeOrder = async (cartItems, total) => {
    if (!user?.id) {
      alert("⚠️ Please login to place an order!");
      return;
    }

    const newOrder = {
      id: Date.now(),
      userId: user.id,
      date: new Date().toISOString(),
      cartItems,
      total,
      Status: "Pending",
    };

    try {
      const res = await axios.post("http://localhost:5001/orders", newOrder);
      setOrders((prev) => [...prev, res.data]); 
      alert("✅ Order placed successfully!");
    } catch (err) {
      console.error("❌ Failed to place order:", err.message);
      alert("⚠️ Something went wrong while placing order.");
    }
  };

  // ✅ Remove order
  const removeOrder = async (orderId) => {
    if (!window.confirm("⚠️ Are you sure you want to delete this order?"))
      return;
    try {
      await axios.delete(`http://localhost:5001/orders/${orderId}`);
      setOrders((prev) => prev.filter((order) => order.id !== orderId));
      alert("🗑️ Order removed successfully!");
    } catch (err) {
      console.error("❌ Failed to delete order:", err.message);
      alert("⚠️ Something went wrong while removing order.");
    }
  };

  // ✅ Download invoice (mock)
  const downloadInvoice = (orderId) => {
    alert(`📄 Invoice for order ${orderId} downloaded!`);
  };

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setOrders([]); 
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        OrderUser,
        setUser,
        fetchOrders,
        placeOrder,
        removeOrder,
        downloadInvoice,
        logout,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
