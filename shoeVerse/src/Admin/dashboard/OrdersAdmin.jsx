import React, { useEffect, useState } from "react";
import { useTheme } from "../../Context/ThemeContext";
import axios from "axios";

function OrdersAdmin() {
  const { darkMode } = useTheme();
  const [orders, setOrders] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5001/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch orders:", err);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(`http://localhost:5001/orders/${orderId}`, {
        Status: newStatus,
      });

      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, Status: newStatus } : o))
      );
    } catch (err) {
      console.error("❌ Failed to update status:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className={`shadow rounded-xl p-6 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h3 className="font-medium mb-4">Recent Invoices</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="opacity-70">
            <th className="text-left p-2">Order Id</th>
            <th className="text-left p-2">Customer</th>
            <th className="text-left p-2">Product</th>
            <th className="text-left p-2">Date</th>
            <th className="text-left p-2">Payment</th>
            <th className="text-left p-2">Total</th>
            <th className="text-left p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order, i) => (
              <tr
                key={i}
                className="border-t border-gray-300 dark:border-gray-600"
              >
                <td className="p-2">{order.id}</td>
                <td className="p-2">{order.name}</td>
                <td className="p-2">
                  {order.cartItems && order.cartItems.length > 0
                    ? order.cartItems.map((item) => item.name).join(", ")
                    : "No items"}
                </td>
                <td className="p-2">
                  {new Date(order.date).toLocaleDateString()}
                </td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      order.paymentMethod === "cod"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {order.paymentDetails?.method || order.paymentMethod}
                  </span>
                </td>
                <td className="p-2">₹{order.total}</td>
                <td className="p-2">
                  <select
                    value={order.Status || "Pending"}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="border rounded-md px-2 py-1 text-sm dark:bg-gray-700 dark:text-white"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4 text-gray-500">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersAdmin;
