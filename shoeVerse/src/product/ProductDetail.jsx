import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Nav } from "../navbar/Nav";
import Footer from "../HOME/Footer";
import { CartContext } from "../Context/CartContext";
import { AuthContext } from "../Context/AuthContext";


function ProductDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/products/${id}`);
        setData(res.data);
      } catch (err) {
        console.error("Error fetching product:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center py-20">Loading...</p>;

  if (!data || data.status !== "active") {
    return (
      <>
        <Nav />
        <div className="w-full min-h-screen flex items-center justify-center text-gray-600">
          <h2 className="text-xl font-semibold">
            ❌ Product not available right now.
          </h2>
        </div>
        <Footer />
      </>
    );
  }

  const handleAddToBag = () => {
    if (user) {
      addToCart(data);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <Nav />
      <div className="w-full min-h-screen bg-white text-black px-12 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Info */}
          <div className="space-y-6">
            <p className="text-sm font-medium text-gray-500">{data.category}</p>
            <h1 className="text-4xl font-bold">{data.name}</h1>
            <div className="flex items-center space-x-4">
              <p className="text-2xl font-semibold text-red-600">
                ₹{data.new_price}
              </p>
              <p className="line-through text-gray-400">₹{data.old_price}</p>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-yellow-500">★★★★☆</span>
              <p className="text-gray-600">{data.reviews || 120} reviews</p>
            </div>

            <p className="text-gray-700 leading-relaxed">{data.descreption}</p>
            <p className="text-green-600 font-medium">✔ {data.stock || "In Stock"}</p>

            <button
              className="w-full py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-black"
              onClick={handleAddToBag}
            >
              Add to bag
            </button>
          </div>

          {/* Right: Image */}
          <div className="flex justify-center">
            <img
              src={data.image}
              alt={data.name}
              className="rounded-xl shadow-lg w-full max-w-md object-cover"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductDetail;
