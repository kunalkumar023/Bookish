import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Settings = () => {
  const [userDetails, setUserDetails] = useState({});
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateMessage, setUpdateMessage] = useState('');

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
    useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/get-user-information',{headers}); // Adjust API endpoint accordingly
        setUserDetails(response.data);
        setAddress(response.data.address); 
        setLoading(false);
      } catch (err) {
        setError('Error fetching user details');
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleUpdate = async () => {
    try {
      const response = await axios.put('http://localhost:4000/api/v1/update-address',{address}, { headers }); // Adjust API endpoint accordingly
      alert(response.data.message)
    } catch (err) {
      alert(err)
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md bg-zinc-800 rounded-lg p-6 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-white">User Settings</h2>
        
        <div className="mb-6">
          <p className="text-lg text-"><strong>Name:</strong> {userDetails.username}</p>
          <p className="text-lg text-"><strong>Email:</strong> {userDetails.email}</p>
          <p className="text-lg text-"><strong>Current Address:</strong> {userDetails.address}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-300">Update Address</h3>
          <textarea
            className="w-full text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows="4"
          />
        </div>

        <button
          onClick={handleUpdate}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Update Address
        </button>

        {updateMessage && <p className="mt-4 text-green-500">{updateMessage}</p>}
      </div>
    </div>
  );
};

export default Settings;
