import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { Nav } from "./Nav";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.new_price) * item.quantity,
    0
  );

  return (
    <>
      <Nav />
      <div className="bg-gray-50 min-h-screen py-12 px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-8">
          <h1 className="text-2xl font-bold text-center mb-8">Shopping Cart</h1>

          <div className="divide-y">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-6"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-md object-cover"
                    />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.category}</p>
                      <p className="text-green-600 text-sm">✔ {item.stock}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-medium">
                      ₹{item.new_price} × {item.quantity} ={" "}
                      <span className="text-indigo-600">
                        ₹{(item.new_price * item.quantity).toFixed(2)}
                      </span>
                    </p>

                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, "decrement")}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, "increment")}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md text-sm mt-2 hover:bg-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-10">Your cart is empty 🛒</p>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t pt-6 mt-6">
              <div className="flex justify-between text-lg font-medium">
                <p>Subtotal</p>
                <p>₹{subtotal.toFixed(2)}</p>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Shipping and taxes will be calculated at checkout.
              </p>

              <Link to="/payment">
                <button className="w-full mt-6 bg-gray-600 text-white py-3 rounded-lg font-medium hover:bg-black transition">
                  Checkout
                </button>
              </Link>

              <Link to="/">
                <p className="text-center mt-4 text-sm">
                  <button className="text-black font-medium hover:underline">
                    Continue Shopping →
                  </button>
                </p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;
