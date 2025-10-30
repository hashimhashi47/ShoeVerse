import React, { useContext, useState } from "react";
import { CartContext } from "../Context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";


function Payment() {
  const { cartItems } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postal, setPostal] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [upiId, setUpiId] = useState("");
  const [netBanking, setNetBanking] = useState("");

  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.new_price) * item.quantity,
    0
  );
  const shipping = 25;
  const taxes = subtotal * 0.08;
  const total = subtotal + shipping + taxes;

  const handlePayment = async () => {
    if (!user) {
      toast.error("Please login to place an order.");
      return;
    }

    const orderData = {
      name,
      email,
      address,
      city,
      state,
      postal,
      paymentMethod,
      paymentDetails:
        paymentMethod === "card"
          ? { cardNumber }
          : paymentMethod === "upi"
          ? { upiId }
          : paymentMethod === "netbanking"
          ? { bank: netBanking }
          : { method: "Cash on Delivery" },
      cartItems,
      total,
      date: new Date().toISOString(),
      Status: "Pending",
      userId: user.id, // ✅ attach user id here
    };

    try {
      await axios.post("http://localhost:5001/orders", orderData);
      toast.success(" Payment Successful! Order placed.");
      navigate("/orders");
    } catch (err) {
      console.error("Payment Error:", err);
      toast.error(" Payment Failed. Try again.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h2>
          {/* --- form fields stay the same --- */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
              placeholder="Your name"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
              placeholder="you@example.com"
            />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Payment Method
          </h3>
          <div className="space-y-3 mb-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
              Card
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="upi"
                checked={paymentMethod === "upi"}
                onChange={() => setPaymentMethod("upi")}
              />
              UPI
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="netbanking"
                checked={paymentMethod === "netbanking"}
                onChange={() => setPaymentMethod("netbanking")}
              />
              Net Banking
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              Cash on Delivery
            </label>
          </div>

          {/* Payment fields */}
          {paymentMethod === "card" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Card number
              </label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="mt-2 block w-full border border-gray-300 rounded-lg px-4 py-2"
                placeholder="1234 5678 9012 3456"
              />
            </div>
          )}

          {paymentMethod === "upi" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                UPI ID
              </label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="mt-2 block w-full border border-gray-300 rounded-lg px-4 py-2"
                placeholder="yourupi@bank"
              />
            </div>
          )}

          {paymentMethod === "netbanking" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Select Bank
              </label>
              <select
                value={netBanking}
                onChange={(e) => setNetBanking(e.target.value)}
                className="mt-2 block w-full border border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="">-- Choose Bank --</option>
                <option value="HDFC">HDFC Bank</option>
                <option value="SBI">State Bank of India</option>
                <option value="ICICI">ICICI Bank</option>
                <option value="AXIS">Axis Bank</option>
              </select>
            </div>
          )}

          {/* Address */}
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Shipping address
          </h3>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-2 mb-2 block w-full border border-gray-300 rounded-lg px-4 py-2"
            placeholder="123 Main St"
          />
          <div className="grid grid-cols-3 gap-4 mb-6">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="col-span-1 border border-gray-300 rounded-lg px-4 py-2"
            />
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="State"
              className="col-span-1 border border-gray-300 rounded-lg px-4 py-2"
            />
            <input
              type="text"
              value={postal}
              onChange={(e) => setPostal(e.target.value)}
              placeholder="Postal code"
              className="col-span-1 border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <button
            onClick={handlePayment}
            className="w-full bg-black text-white font-semibold py-3 rounded-lg shadow hover:bg-gray-900 transition"
          >
            {paymentMethod === "cod" ? "Place Order (COD)" : "Pay Now"}
          </button>
        </div>

        {/* Order Summary */}
        <div className="bg-black text-white p-8">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>
          <div className="space-y-6 max-h-80 overflow-y-auto pr-2">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-300 text-sm">Qty: {item.quantity}</p>
                  </div>
                  <span>₹{(item.new_price * item.quantity).toFixed(2)}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-400">Your cart is empty 🛒</p>
            )}
          </div>
          <div className="mt-8 border-t border-gray-700 pt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-300">Subtotal</span>
              <span>₹ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Shipping</span>
              <span>₹ {shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Taxes</span>
              <span>₹ {taxes.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-4 border-t border-gray-700">
              <span>Total</span>
              <span>₹ {total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
