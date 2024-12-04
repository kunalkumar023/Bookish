import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/v1/get-user-orders', { headers });
        console.log(res)
        setOrders(res.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);  // Empty dependency array means it will only run once on component mount

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-zinc-100">Order History</h1>
      {orders.length === 0 ? (
        <div className="text-zinc-300 text-xl">You have no previous orders.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order, index) => (
            <div key={index} className="bg-zinc-800 rounded-lg shadow-lg p-4">
              <Link to={`/view-book-details/${order.book._id}`}>
                <div className="bg-zinc-900 rounded-lg overflow-hidden flex items-center justify-center p-4">
                  <img
                    src={order.book.url}
                    alt={order.book.title}
                    className="h-[20vh] w-[15vh] object-cover"
                  />
                </div>
              </Link>
              <div className="mt-4">
                <h2 className="text-xl font-semibold text-zinc-100">{order.book.title}</h2>
                <p className="text-zinc-300">Status: {order.status}</p>
                <p className="text-zinc-300">Ordered on: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p className="text-zinc-300">Payment Mode: COD</p>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
