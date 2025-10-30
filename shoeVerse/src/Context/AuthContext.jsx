import { createContext, useState, useEffect } from "react";
import { useOrders } from "./OrderContext";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      const userData = JSON.parse(
        localStorage.getItem(`data_${parsedUser.id}`)
      );
      if (userData) {
        setCart(userData.cart || []);
        setWishlist(userData.wishlist || []);
        setOrders(userData.orders || []);
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        `data_${user.id}`,
        JSON.stringify({ cart, wishlist, orders })
      );
    }
  }, [cart, wishlist, orders, user]);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    const userDataStored = JSON.parse(
      localStorage.getItem(`data_${userData.id}`)
    );
    if (userDataStored) {
      setCart(userDataStored.cart || []);
      setWishlist(userDataStored.wishlist || []);
      setOrders(userDataStored.orders || []);
    } else {
      setCart([]);
      setWishlist([]);
      setOrders([]);
    }
  };

  const register = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem(
      `data_${userData.id}`,
      JSON.stringify({ cart: [], wishlist: [], orders: [] })
    );
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    setWishlist([]);
    setOrders([]);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        cart,
        wishlist,
        orders,
        setCart,
        setUser,
        setWishlist,
        setOrders,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
