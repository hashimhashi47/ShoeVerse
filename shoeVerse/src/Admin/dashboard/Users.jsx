import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../Context/ThemeContext";

const API = "http://localhost:5001/users";

function Users() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);
  const [stats, setStats] = useState([]);
  const [showDeleted, setShowDeleted] = useState(false); 
  const [loading, setLoading] = useState(false);
  const cardBg = darkMode ? "bg-gray-800" : "bg-white";
  const headingText = darkMode ? "text-gray-400" : "text-gray-500";
  const valueText = darkMode ? "text-white" : "text-gray-900";
  const panelBg = darkMode ? "bg-gray-800 text-white" : "bg-white text-black";

  const normalize = (u) => ({
    role: "user",
    status: "active",
    deleted: false,
    ...u,
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API);
      const users = res.data.map(normalize);
      setAllUsers(users);

      const notDeleted = users.filter((u) => !u.deleted);
      const activeCount = notDeleted.filter((u) => u.status === "active").length;
      const suspendedCount = notDeleted.filter((u) => u.status === "suspended").length;
      const deletedCount = users.filter((u) => u.deleted).length;

      setStats([
        { label: "Total Users", value: notDeleted.length, change: "+6.5%", color: "text-green-500" },
        { label: "Active", value: activeCount, change: "+2.1%", color: "text-blue-500" },
        { label: "Suspended", value: suspendedCount, change: "-0.5%", color: "text-red-500" },
        { label: "Deleted", value: deletedCount, change: "", color: "text-gray-500" },
      ]);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleSuspend = async (user) => {
    try {
      await axios.patch(`${API}/${user.id}`, {
        status: user.status === "active" ? "suspended" : "active",
      });
      await fetchData();
    } catch (err) {
      console.error("Error toggling suspend:", err);
    }
  };

  const softDelete = async (user) => {
    try {
      await axios.patch(`${API}/${user.id}`, { deleted: true });
      await fetchData();
    } catch (err) {
      console.error("Error soft-deleting user:", err);
    }
  };

  const restoreUser = async (user) => {
    try {
      await axios.patch(`${API}/${user.id}`, { deleted: false });
      await fetchData();
    } catch (err) {
      console.error("Error restoring user:", err);
    }
  };

  const visibleUsers = allUsers.filter((u) => (showDeleted ? u.deleted : !u.deleted));

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowDeleted(false)}
            className={`px-3 py-1 rounded-md border ${
              !showDeleted
                ? "bg-green-600 text-white border-green-600"
                : panelBg + " border-gray-300"
            }`}
          >
            Active Users
          </button>
          <button
            onClick={() => setShowDeleted(true)}
            className={`px-3 py-1 rounded-md border ${
              showDeleted
                ? "bg-red-600 text-white border-red-600"
                : panelBg + " border-gray-300"
            }`}
          >
            Deleted Users
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, i) => (
          <div key={i} className={`${cardBg} shadow rounded-xl p-4`}>
            <h3 className={`text-sm ${headingText}`}>{stat.label}</h3>
            <p className={`text-2xl font-semibold ${valueText}`}>{stat.value}</p>
          </div>
        ))}
      </div>
      <div className={`shadow rounded-xl p-6 ${panelBg}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">
            {showDeleted ? "Deleted Users" : "Users List"}
          </h3>
          {loading && <span className="text-xs opacity-70">Loading…</span>}
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="opacity-70">
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Email</th>
              <th className="text-left p-2">Role</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleUsers.map((user) => (
              <tr key={user.id} className="border-t border-gray-300 dark:border-gray-600">
                <td className="p-2">{user.fullname}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.role}</td>
                <td className="p-2">
                  {showDeleted ? (
                    <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-600">
                      deleted
                    </span>
                  ) : (
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.status === "active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {user.status}
                    </span>
                  )}
                </td>
                <td className="p-2 flex flex-wrap gap-2">
                  {!showDeleted ? (
                    <>
                      <button
                        onClick={() => toggleSuspend(user)}
                        className="px-2 py-1 text-xs rounded-md border border-blue-400 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      >
                        {user.status === "active" ? "Suspend" : "Unsuspend"}
                      </button>
                      <button
                        onClick={() => softDelete(user)}
                        className="px-2 py-1 text-xs rounded-md border border-red-400 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => restoreUser(user)}
                      className="px-2 py-1 text-xs rounded-md border border-green-400 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                    >
                      Restore
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {visibleUsers.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 opacity-70">
                  {showDeleted ? "No deleted users." : "No users found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Users;
