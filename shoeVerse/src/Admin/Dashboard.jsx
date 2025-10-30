import React, { useContext, useEffect, useState } from "react";
import {
  Home,
  Users,
  Bell,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  Menu,
  ShoppingCart,
  Package,
} from "lucide-react";

import { useNavigate, Outlet, useLocation } from "react-router-dom";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { useTheme } from "../Context/ThemeContext";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

const COLORS = ["#04D9FF", "#facc15", "#4ade85"];

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const { darkMode, setDarkMode } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [orders, setOrders] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [stats, setStats] = useState([]);
  const [invoiceData, setInvoiceData] = useState([]);
  const [salesData, setSalesData] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const isDashboardPage = location.pathname === "/dashboard";

  const menuItems = [
    { icon: <Home />, label: "Dashboard", path: "/dashboard" },
    { icon: <Users />, label: "Users", path: "/dashboard/users" },
    { icon: <ShoppingCart />, label: "Orders", path: "/dashboard/ordersAdmin" },
    {
      icon: <Package />,
      label: "Products",
      path: "/dashboard/productDetailsAdmin",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const fetchData = async () => {
    try {
      const usersRes = await axios.get("http://localhost:5001/users");
      const ordersRes = await axios.get("http://localhost:5001/orders");

      setUsersData(usersRes.data);
      setOrders(ordersRes.data);

      const customersCount = usersRes.data.length;
      const invoicesCount = ordersRes.data.length;
      const revenue = ordersRes.data.reduce(
        (sum, order) => sum + (order.total || 0),
        0
      );
      const profit = revenue * 0.4;

      setStats([
        {
          label: "Customers",
          value: customersCount,
          change: "+6.5%",
          color: "text-green-500",
        },
        {
          label: "Revenue",
          value: `₹${revenue.toFixed(2)}`,
          change: "+2.1%",
          color: "text-blue-500",
        },
        {
          label: "Profit",
          value: `₹${profit.toFixed(2)}`,
          change: "-0.5%",
          color: "text-red-500",
        },
        {
          label: "Invoices",
          value: invoicesCount,
        },
      ]);

      const paid = ordersRes.data.filter(
        (o) => o.paymentMethod !== "cod"
      ).length;

      const pending = ordersRes.data.filter(
        (o) => o.paymentMethod === "cod"
      ).length;

      const failed = ordersRes.data.length - paid - pending;

      setInvoiceData([
        { name: "Success", value: paid },
        { name: "Pending", value: pending },
        { name: "Failed", value: failed },
      ]);

      const salesByMonth = {};
      ordersRes.data.forEach((o) => {
        const month = new Date(o.date).toLocaleString("default", {
          month: "short",
        });
        salesByMonth[month] = (salesByMonth[month] || 0) + (o.total || 0);
      });

      setSalesData(
        Object.entries(salesByMonth).map(([month, revenue]) => ({
          month,
          revenue,
        }))
      );
    } catch (err) {
      console.error("❌ Failed to fetch dashboard data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      } min-h-screen flex`}
    >
      <div
        className={`${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black "
        } 
  ${collapsed ? "w-16" : "w-64"} 
  h-screen shadow-lg transition-all duration-300 flex flex-col
  sticky left-0 top-0 z-50
  ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className=" flex items-center justify-between p-6">
          {!collapsed && <h1 className="font-semibold">ShoeVerse</h1>}
          <button onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-3 overflow-y-auto pt-7">
          {!collapsed && <p className="uppercase text-xs mb-2">Menu</p>}
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => navigate(item.path)}
              className={`flex items-center px-2 py-2 mb-1 rounded-lg cursor-pointer
                ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
            >
              {item.icon}
              {!collapsed && <span className="ml-2">{item.label}</span>}
            </div>
          ))}
        </nav>
      </div>
      <div className="flex-1 flex flex-col min-h-screen md:ml-0">
        <header
          className={`flex items-center justify-between px-4 py-3 shadow-sm sticky top-0 z-40 ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
        >
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <Menu size={20} />
            </button>
            <h1 className="font-semibold text-lg">
              Welcome {user ? user.fullname : "Guest"} 👋
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Bell size={20} className="cursor-pointer hover:text-blue-500" />
            {user ? (
              <>
                <h3 className="text-sm font-medium hidden sm:block">
                  {user.email}
                </h3>
                <img
                  src={
                    user.avatar ||
                    "https://cdn3.iconfinder.com/data/icons/essential-rounded/64/Rounded-31-512.png"
                  }
                  alt="profile"
                  className="w-9 h-9 rounded-full border"
                />
                <button
                  onClick={handleLogout}
                  className="text-xs bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <h3 className="text-sm text-gray-500">Not logged in</h3>
            )}
          </div>
        </header>

        <main className="flex-1 p-6 space-y-6">
          {isDashboardPage && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className={`shadow rounded-xl p-4 ${
                      darkMode
                        ? "bg-gray-800 text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    <h3 className="text-sm opacity-70">{stat.label}</h3>
                    <p className="text-2xl font-semibold">{stat.value}</p>
                    <span className={`${stat.color} text-xs`}>
                      {stat.change} Since last week
                    </span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div
                  className={`shadow rounded-xl p-6 ${
                    darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
                  }`}
                >
                  <h3 className="font-medium mb-4">Invoice Statistics</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={invoiceData}
                        dataKey="value"
                        outerRadius={90}
                        innerRadius={50}
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {invoiceData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: darkMode ? "#333" : "#fff",
                          color: darkMode ? "#fff" : "#000",
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div
                  className={`shadow rounded-xl p-6 ${
                    darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
                  }`}
                >
                  <h3 className="font-medium mb-4">Sales Analytics</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="month"
                        stroke={darkMode ? "#fff" : "#000"}
                      />
                      <YAxis stroke={darkMode ? "#fff" : "#000"} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: darkMode ? "#333" : "#fff",
                          color: darkMode ? "#fff" : "#000",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#6366f1"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
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
                              ? order.cartItems
                                  .map((item) => item.name)
                                  .join(", ")
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
                              {order.paymentDetails?.method ||
                                order.paymentMethod}
                            </span>
                          </td>
                          <td className="p-2">₹{order.total}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="6"
                          className="text-center py-4 text-gray-500"
                        >
                          No orders found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
