import React, { useEffect } from "react";
import { Nav } from "./Nav";
import { useOrders } from "../Context/OrderContext";


function Orders() {
  const { orders, loading, OrderUser, removeOrder, downloadInvoice,fetchOrders } = useOrders();

  console.log()
    useEffect(() => {
    if (OrderUser?.id) {
      fetchOrders(OrderUser.id);
    }
  }, [OrderUser])

  return (
    <>
      <Nav />
      <div className="bg-gray-50 min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-2xl font-bold text-gray-900">Order history</h1>
          <p className="text-gray-600 mt-1">
            Check the status of recent orders, manage returns, and download invoices.
          </p>

          {loading ? (
            <p className="mt-6 text-gray-600">⏳ Loading orders...</p>
          ) : !OrderUser ? (
            <p className="mt-6 text-gray-600">⚠️ Please login to see orders.</p>
          ) : orders.length === 0 ? (
            <p className="mt-6 text-gray-600">No orders yet 😢</p>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="bg-white shadow-sm rounded-lg mt-8 overflow-hidden">
                <div className="px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between border-b">
                  <div>
                    <p className="text-sm text-gray-500">
                      Order number:{" "}
                      <span className="font-medium text-gray-900">{order.id}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Date placed:{" "}
                      <span className="font-medium text-gray-900">
                        {order.date ? new Date(order.date).toDateString() : "N/A"}
                      </span>
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <p className="text-sm text-gray-500">
                      Total amount:{" "}
                      <span className="font-medium text-gray-900">
                        ₹{order.total ? order.total.toFixed(2) : "0.00"}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  {order.cartItems &&
                    order.cartItems.map((item, idx) => (
                      <div key={idx} className="p-6 flex items-start gap-6">
                        <div className="h-24 w-24 rounded-md bg-gray-200 flex items-center justify-center">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="h-full w-full object-cover rounded-md" />
                          ) : (
                            <span className="text-gray-400 text-xs">No image</span>
                          )}
                        </div>
                        <div className="flex-1">
                
                          <h2 className="text-base font-medium text-gray-900">{item.name}</h2>
                          <p className="text-sm text-gray-600 mt-1">Qty: {item.quantity}</p>
                          <p className="text-sm text-gray-500 mt-2">Status: {order.Status || "Pending"}</p>
                          <div className="mt-3 flex gap-4 text-sm">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">View product</a>
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Buy again</a>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="px-6 py-4 flex justify-end gap-4 border-t">
                  <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    View Order
                  </button>
                  <button onClick={() => downloadInvoice(order.id)} className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Download Invoice
                  </button>
                  <button onClick={() => removeOrder(order.id)} className="text-sm font-medium text-red-600 hover:text-red-500">
                    Remove Order
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Orders;
