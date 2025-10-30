import React, { useState } from "react";

import axios from "axios";
import { useTheme } from "../Context/ThemeContext";

function AddProducts() {
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    old_price: "",
    new_price: "",
    status: "active",
    image: "",
    descreption: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post("http://localhost:5001/products", {
        ...formData,
        id: Date.now().toString(),
      });

      console.log("✅ Product added:", res.data);
      alert("Product added successfully!");

  
      setFormData({
        name: "",
        category: "",
        old_price: "",
        new_price: "",
        status: "active",
        image: "",
       descreption: "",
      });
    } catch (err) {
      console.error("❌ Error adding product:", err);
      alert("Failed to add product!");
    }
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div
        className={`p-8 rounded-2xl shadow-lg w-full max-w-md ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Add Product</h2>

        {formData.image && (
          <div className="flex justify-center mb-4">
            <img
              src={formData.image}
              alt="preview"
              className="w-24 h-24 object-cover rounded-lg shadow-md"
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg border focus:outline-none ${
              darkMode
                ? "bg-gray-700 border-gray-600 placeholder-gray-400"
                : "bg-gray-50 border-gray-300"
            }`}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg border focus:outline-none ${
              darkMode
                ? "bg-gray-700 border-gray-600 placeholder-gray-400"
                : "bg-gray-50 border-gray-300"
            }`}
          />
          <input
            type="number"
            name="old_price"
            placeholder="Old Price"
            value={formData.old_price}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg border focus:outline-none ${
              darkMode
                ? "bg-gray-700 border-gray-600 placeholder-gray-400"
                : "bg-gray-50 border-gray-300"
            }`}
          />
          <input
            type="number"
            name="new_price"
            placeholder="New Price"
            value={formData.new_price}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg border focus:outline-none ${
              darkMode
                ? "bg-gray-700 border-gray-600 placeholder-gray-400"
                : "bg-gray-50 border-gray-300"
            }`}
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg border focus:outline-none ${
              darkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-gray-50 border-gray-300"
            }`}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg border focus:outline-none ${
              darkMode
                ? "bg-gray-700 border-gray-600 placeholder-gray-400"
                : "bg-gray-50 border-gray-300"
            }`}
          />
          <textarea
            name="descreption"
            placeholder="Product Description"
            value={formData.descreption}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg border focus:outline-none ${
              darkMode
                ? "bg-gray-700 border-gray-600 placeholder-gray-400"
                : "bg-gray-50 border-gray-300"
            }`}
          />
          <button
            type="submit"
            className={`w-full p-3 rounded-lg font-semibold transition ${
              darkMode
                ? "bg-gray-600 hover:bg-gray-500 text-white"
                : "bg-black hover:bg-gray-800 text-white"
            }`}
          >
            Save Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProducts;
