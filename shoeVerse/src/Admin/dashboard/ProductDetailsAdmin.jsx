import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaUndo, FaSave, FaTimes } from "react-icons/fa";
import { useTheme } from "../../Context/ThemeContext";
import { useNavigate } from "react-router";

function ProductDetailsAdmin() {
  const { darkMode } = useTheme();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  const navigate = useNavigate();
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5001/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };
  const handleDelete = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    await axios.patch(`http://localhost:5001/products/${id}`, {
      status: newStatus,
    });
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );
  };

  const handleEdit = (product) => {
    setEditId(product.id);
    setEditForm({
      name: product.name,
      category: product.category,
      description: product.description || product.descreption || "",
      new_price: product.new_price,
      old_price: product.old_price,
      image: product.image,
    });
  };


  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const saveEdit = async (id) => {
    await axios.patch(`http://localhost:5001/products/${id}`, editForm);
    setEditId(null);
    setEditForm({});
    fetchProducts();
  };

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / productsPerPage);


  const activeCount = products.filter((p) => p.status === "active").length;
  const inactiveCount = products.filter((p) => p.status === "inactive").length;

  return (
    <div
      className={`p-6 min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Product Details</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div
          className={`p-4 rounded-2xl shadow-md ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <p className="text-sm text-gray-500">Active</p>
          <p className="text-2xl font-bold text-blue-500">{activeCount}</p>
        </div>
        <div
          className={`p-4 rounded-2xl shadow-md ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <p className="text-sm text-gray-500">Inactive</p>
          <p className="text-2xl font-bold text-red-500">{inactiveCount}</p>
        </div>

        <button
          onClick={() => {
            navigate("/dashboard/addproduct");
          }}
          className={`p-4 rounded-2xl shadow-md text-center transition-all duration-300 
    ${
      darkMode
        ? "bg-gray-800 hover:bg-gray-700 hover:scale-105"
        : "bg-white hover:bg-gray-100 hover:scale-105"
    }`}
        >
          <p className="text-2xl text-gray-500 group-hover:text-indigo-600">
            ADD PRODUCTS
          </p>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table
          className={`w-full border rounded-lg overflow-hidden ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <thead>
            <tr
              className={`text-sm ${
                darkMode
                  ? "bg-gray-700 text-gray-200"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              <th className="p-2">Image</th>
              <th className="p-2">Name</th>
              <th className="p-2">Category</th>
              <th className="p-2">New Price</th>
              <th className="p-2">Old Price</th>
              <th className="p-2">Description</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((p) => (
              <tr
                key={p.id}
                className={`text-center border-b ${
                  darkMode
                    ? p.status === "inactive"
                      ? "bg-red-900 border-gray-600"
                      : "bg-gray-800 border-gray-600"
                    : p.status === "inactive"
                    ? "bg-red-100 border-gray-300"
                    : "bg-white border-gray-300"
                }`}
              >
                <td className="p-2">
                  {editId === p.id ? (
                    <input
                      type="text"
                      name="image"
                      value={editForm.image}
                      onChange={handleChange}
                      className="border p-1 rounded w-28"
                    />
                  ) : (
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}
                </td>
                <td className="p-2">
                  {editId === p.id ? (
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleChange}
                      className="border p-1 rounded"
                    />
                  ) : (
                    p.name
                  )}
                </td>
                <td className="p-2">
                  {editId === p.id ? (
                    <input
                      type="text"
                      name="category"
                      value={editForm.category}
                      onChange={handleChange}
                      className="border p-1 rounded"
                    />
                  ) : (
                    p.category
                  )}
                </td>
                <td className="p-2">
                  {editId === p.id ? (
                    <input
                      type="number"
                      name="new_price"
                      value={editForm.new_price}
                      onChange={handleChange}
                      className="border p-1 rounded w-20 text-center"
                    />
                  ) : (
                    <>₹{p.new_price}</>
                  )}
                </td>
                <td className="p-2 line-through">
                  {editId === p.id ? (
                    <input
                      type="number"
                      name="old_price"
                      value={editForm.old_price}
                      onChange={handleChange}
                      className="border p-1 rounded w-20 text-center"
                    />
                  ) : (
                    <>₹{p.old_price}</>
                  )}
                </td>
                <td className="p-2 text-sm">
                  {editId === p.id ? (
                    <input
                      type="text"
                      name="description"
                      value={editForm.description}
                      onChange={handleChange}
                      className="border p-1 rounded w-40"
                    />
                  ) : (
                    <>{p.description || p.descreption}</>
                  )}
                </td>
                <td className="p-2">
                  {p.status === "active" ? (
                    <span className="px-3 py-1 text-xs font-semibold text-white bg-green-500 rounded-full shadow-sm">
                      Active
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded-full shadow-sm">
                      Inactive
                    </span>
                  )}
                </td>
                <td className="p-2 flex items-center justify-center gap-3">
                  {editId === p.id ? (
                    <>
                      <button
                        onClick={() => saveEdit(p.id)}
                        className="text-green-500"
                      >
                        <FaSave />
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="text-gray-500"
                      >
                        <FaTimes />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(p)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.status)}
                        className={`hover:text-red-700 ${
                          p.status === "active"
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {p.status === "active" ? <FaTrash /> : <FaUndo />}
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300 dark:bg-gray-600 dark:text-gray-200 text-black"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductDetailsAdmin;
