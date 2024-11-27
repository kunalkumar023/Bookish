import React, { useEffect,useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import axios from 'axios';

const User = () => {  // Ensure it's 'User' with an uppercase 'U'
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const [profile,setProfile] = useState()
  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/get-user-information", { headers });
        setProfile(res.data);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserInformation();
  }, [headers]);

  return (
    <div className='bg-zinc-900  px-2 md:px-12 flex flex-col md:flex-row h-auto py-8 gap-4 text-white'>
     {profile && (
      <>
       <div className='w-full md:w-2/6 h-screen'>
        <Sidebar data={profile}/>
      </div>
      <div className='w-4/6 '>
        <Outlet />
      </div>
      </>
     )}
    </div>
  );
};

export default User;  // Ensure it's 'User' here too
