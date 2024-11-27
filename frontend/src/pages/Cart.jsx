import React, { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai'; // Importing delete icon from react-icons
import { Link } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Fetch cart items on component load
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://localhost:4000/api/v1/get-user-cart", { headers });
      setData(res.data.cart);
      calculateTotalPrice(res.data.cart);
    };
    fetch();
  }, []);

  // Function to handle delete action
  const handleDelete = async (bookId) => {
    try {
      await axios.put("http://localhost:4000/api/v1/remove-from-cart", { bookId }, { headers });
      // Remove deleted item from UI
      const updatedCart = data.filter(item => item._id !== bookId);
      setData(updatedCart);
      calculateTotalPrice(updatedCart);
      alert("Book removed from cart.");
    } catch (error) {
      console.error("Failed to remove book from cart:", error);
    }
  };

  // Calculate total price of all books in the cart
  const calculateTotalPrice = (cartItems) => {
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    setTotalPrice(total);
  };

  // Function to handle placing an order
  const handlePlaceOrder = async () => {
    try {
      const res = await axios.post("http://localhost:4000/api/v1/place-order", { orderItems: data }, { headers });
      // alert("Order placed successfully!");
      console.log(res);
      
      setData([]); // Clear cart after order is placed
      setTotalPrice(0); // Reset total price
    } catch (error) {
      console.error("Failed to place order:", error);
    }
  };

  return (
    <div className='p-4 bg-zinc-900 h-screen'>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>
        {data.length > 0 ? data.map((item, i) => (
          <div key={i} className='bg-zinc-800 flex flex-col items-center justify-center p-4 m-4 rounded-lg shadow-lg hover:bg-zinc-700 transition duration-300 ease-in-out'>
            <Link to={`/view-details/${item._id}`} className="w-full">
              <div className='bg-zinc-900 rounded flex items-center justify-center p-4'>
                <img src={item.url} alt='cardImg' className='h-[30vh] w-[20vh] object-cover' />
              </div>
              <div className='mt-4'>
                <h2 className='text-xl text-zinc-200 font-semibold'>{item.title}</h2>
                <p className='text-zinc-200'>{item.subtitle}</p>
                <p className='text-zinc-200'>Price: ₹ {item.price}</p>
              </div>
            </Link>

            {/* Delete Button */}
            <button
              className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full flex items-center mt-4'
              onClick={() => handleDelete(item._id)}
            >
              <AiFillDelete className='mr-2' /> Delete
            </button>
          </div>
        )) : (
          <div className='text-2xl text-white'>Your cart is empty</div>
        )}
      </div>

      {/* Total Price and Place Order Section */}
      {data.length > 0 && (
        <div className='mt-8 p-4 bg-gray-800 text-white rounded-lg'>
          <h2 className='text-2xl font-bold'>Total Price: ₹ {totalPrice}</h2>
          <button
            className='mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg'
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
