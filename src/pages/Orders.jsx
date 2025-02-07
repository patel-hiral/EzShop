import React from "react";
import { useSelector } from "react-redux";

function Orders() {
  const { orders } = useSelector((state) => state.order);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders available.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="border p-4 rounded-lg shadow-md">
              <p className="text-gray-700 font-semibold">
                Order ID: <span className="text-blue-600">{order.id}</span>
              </p>
              <p className="text-sm text-gray-500">Date: {new Date(order.date).toLocaleString()}</p>
              <div className="mt-2">
                <h2 className="text-lg font-semibold">Items:</h2>
                <ul className="list-disc pl-5">
                  {order.items.map((item) => (
                    <li key={item.id} className="text-gray-600">
                      {item.title} - <span className="font-bold">{item.quantity}x</span> @ ${item.price.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-right font-bold mt-2">
                Total: <span className="text-green-600">${order.totalPrice.toFixed(2)}</span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Orders;
