import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const adminRes = await axios.get(
        `http://localhost:5001/admin?email=${email}`
      );
      const adminUser = adminRes.data[0];
      if (adminUser) {
        if (adminUser.password === password && adminUser.role === "admin") {
          login(adminUser);
          toast.success(`👑 Welcome back Admin, ${adminUser.fullname}!`, {
            style: {
              border: "1px solid #713200",
              padding: "16px",
              color: "#713200",
            },
            iconTheme: {
              primary: "#713200",
              secondary: "#FFFAEE",
            },
          });
          navigate("/admin");
          return;
        } else {
          toast.error(" Wrong admin password!");
          return;
        }
      }

      const userRes = await axios.get(
        `http://localhost:5001/users?email=${email}`
      );
      const user = userRes.data[0];

      if (user) {
        if (user.deleted === true || user.status === "suspended") {
          toast(
            "🚫 Your account is suspended or deleted. Please contact support.",
            {
              duration: 6000,
            }
          );
          return;
        }

        if (user.password === password) {
          const userWithRole = { ...user, role: "user" };
          login(userWithRole);
          toast.success(` Welcome back, ${user.fullname}!`);
          navigate("/");
        } else {
          toast.error(" Wrong password, try again!");
        }
      } else {
        toast.error("⚠️ User not found!");
      }
    } catch (err) {
      console.error(err);
      toast.error(" Server error! Make sure JSON Server is running.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-md space-y-6">
        <form
          onSubmit={handleLogin}
          className="mt-6 space-y-4 bg-black p-6 rounded-lg shadow-lg"
        >
          <div className="text-center h-40">
            <img src="shoeVerse.png" alt="Logo" className="h-50 mx-auto" />
          </div>
          <h2 className="text-center text-2xl font-bold text-white">
            Sign in to your account
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-gray-100 placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-gray-100 placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 py-2 font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Log in
          </button>

          <p className="text-center text-sm text-gray-400">
            Not a member?
            <a
              href="/register"
              className="text-indigo-400 hover:text-indigo-300"
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
