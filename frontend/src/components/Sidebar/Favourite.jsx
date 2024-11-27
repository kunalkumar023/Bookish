import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Bookcard from '../BookCard/Bookcard.jsx';

const Favourite = () => {
  const [FavouriteBooks, setFavouriteBooks] = useState([]);

  useEffect(() => {
    const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/get-all-fav", { headers });
        setFavouriteBooks(res.data.favBooks);
      } catch (error) {
        console.error("Error fetching favorite books:", error);
      }
    };

    fetchData();

  }, []);

  // Function to remove the book from favorites and update the state
  const handleRemoveFav = (bookid) => {
    setFavouriteBooks(FavouriteBooks.filter(book => book._id !== bookid));
  };

  return (
    <div className='grid grid-cols-3 gap-5'>
      {FavouriteBooks.length > 0 ? (
        FavouriteBooks.map((item, i) => (
          <div key={i}>
            <Bookcard data={item} fav={true} onRemoveFav={handleRemoveFav} />
          </div>
        ))
      ) : (
        <div className='text-2xl font-semibold text-white flex items-center justify-center'>
          No Favourite Books
        </div>
      )}
    </div>
  );
};

export default Favourite;
