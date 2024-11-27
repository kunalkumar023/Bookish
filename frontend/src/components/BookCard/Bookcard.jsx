import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

const Bookcard = ({ data, fav, onRemoveFav }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const removeFav = async () => {
    try {
      const res = await axios.put("http://localhost:4000/api/v1/del-to-fav", {}, { headers });
      alert(res.data.message);
      
      // Trigger re-render in the parent component by calling onRemoveFav
      onRemoveFav(data._id);
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return (
    <div className='bg-zinc-800 flex flex-col items-center justify-center py-2'>
      <Link to={`/view-book-details/${data._id}`}>
        <div className='bg-zinc-800 rounded p-4 flex flex-col'>
          <div className='bg-zinc-900 rounded flex items-center justify-center'>
            <img src={data.url} alt='bookImg' className='h-[30vh] w-[20vh]' />
          </div>
          <h2 className='mt-4 text-xl text-zinc-200 font-semibold'>{data.title}</h2>
          <p className='text-zinc-200'>{data.author}</p>
          <p className='text-zinc-200'>₹ {data.price}</p>
        </div>
      </Link>

      {fav && (
        <button className='bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4'
          onClick={removeFav}>
          Remove from favourite
        </button>
      )}
    </div>
  );
};

export default Bookcard;
