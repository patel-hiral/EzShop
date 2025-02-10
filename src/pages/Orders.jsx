import React from "react";
import { useSelector } from "react-redux";

function Orders() {
  const { orders } = useSelector((state) => state.order);

  return (
    <div className="max-w-5xl mx-auto p-4 min-h-fit grid grid-cols-1 md:grid-cols-2 gap-4">
      {orders.length === 0 ? (
        <p className="text-gray-500 text-center text-lg col-span-1 md:col-span-2">
          No orders available.
        </p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-lg shadow-md p-4 bg-white"
          >
            <div className="flex justify-between items-center mb-3 border-b pb-2">
              <div>
                <p className="text-gray-700 font-semibold text-md">
                  Order ID: <span className="text-blue-600">{order.id}</span>
                </p>
                <p className="text-xs text-gray-500">
                  Date: {new Date(order.date).toLocaleString()}
                </p>
              </div>
              <p className="text-right font-bold text-green-600 text-lg">
                ${order.totalPrice.toFixed(2)}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg shadow-sm">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg border"
                  />
                  <div className="flex-1 text-sm">
                    <p className="text-gray-800 font-semibold">{item.title}</p>
                    <p className="text-gray-600">
                      {item.quantity}x @ ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
