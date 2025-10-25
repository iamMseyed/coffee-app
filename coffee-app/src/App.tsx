import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import {
  addOrderAsync,
  completeOrderAsync,
  removeOrderAsync,
  type Order,
} from "./features/orders/orderSlice";

const App: React.FC = () => {
  const [coffee, setCoffee] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.orders.orders);

  const handleAddOrder = () => {
    if (!coffee.trim()) return;
    dispatch(addOrderAsync(coffee));
    setCoffee("");
  };

  const pendingOrders = orders.filter(
    (o) => o.status === "pending" || o.status === "processing"
  );
  const completedOrders = orders.filter((o) => o.status === "completed");

  return (
    <div className="max-w-5xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold text-center mb-6">
        Coffee Shop Dashboard
      </h1>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Enter coffee order details"
          value={coffee}
          onChange={(e) => setCoffee(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-64 mr-4 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleAddOrder}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Add Order
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Pending Orders */}
        <div className="flex-1 bg-yellow-100 p-6 rounded-lg min-h-[300px]">
          <h2 className="text-xl font-semibold mb-4"> Pending Orders</h2>
          {pendingOrders.length === 0 && <p>No pending orders.</p>}

          <div className="flex flex-col gap-3">
            {pendingOrders.map((order: Order) => (
              <div
                key={order.id}
                className={`w-full ${
                  order.status === "processing"
                    ? "bg-yellow-300"
                    : "bg-yellow-200"
                } p-4 rounded shadow flex flex-col sm:flex-row justify-between items-center`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                  <span className="font-bold text-lg">{order.name}</span>
                  <span className="text-sm text-gray-700">
                    {order.status === "processing"
                      ? " Processing..."
                      : " Pending"}
                  </span>
                </div>

                <div className="flex gap-2 mt-2 sm:mt-0">
                  {order.status === "pending" && (
                    <button
                      onClick={() => dispatch(completeOrderAsync(order.id))}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                    >
                       Complete
                    </button>
                  )}
                  <button
                    onClick={() => dispatch(removeOrderAsync(order.id))}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                  >
                     Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completed Orders */}
        <div className="flex-1 bg-green-100 p-6 rounded-lg min-h-[300px]">
          <h2 className="text-xl font-semibold mb-4"> Completed Orders</h2>
          {completedOrders.length === 0 && <p>No completed orders yet.</p>}

          <div className="flex flex-col gap-3">
            {completedOrders.map((order: Order) => (
              <div
                key={order.id}
                className="w-full bg-green-200 p-4 rounded shadow flex justify-between items-center"
              >
                <span className="font-semibold text-lg">{order.name}</span>
                <button
                  onClick={() => dispatch(removeOrderAsync(order.id))}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
