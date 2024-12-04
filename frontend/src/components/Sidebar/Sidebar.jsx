import React from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import axios from 'axios'


const Sidebar = ({data}) => {

    const navigate= useNavigate()

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      const logoutUser = async () => {
        try {
          const response = await axios.post('http://localhost:4000/api/v1/logout', {}, {
            headers
          });
      
          if (response.status === 200) {
            localStorage.removeItem('id');
            localStorage.removeItem('token');
            localStorage.removeItem('role');
      
            window.location.href = '/sign-in';
          } else {
            console.error('Failed to logout:', response.data.message);
          }
      
        } catch (error) {
          console.error('Error logging out:', error);
        }
      };
      
  return (
    <div className='bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-full'>
        <div className='flex items-center flex-col justify-center'>
            <img src={data.avatar} alt="avatar" className='h-[12vh]' />
            <p className='mt-3 text-xl text-zinc-100 font-semibold'>
                {data.username}
            </p>
            <p className='mt-1 text-normal text-zinc-300'>{data.email}</p>
            <div className='w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block'></div>
        </div>
        <div className='w-full flex-col items-center justify-center hiddent lg:flex flex-col'>
            <Link to='/profile'
            className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all'
            >Favourites</Link>
            <Link to='/profile/orderHistory'
            className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all'
            >Order History</Link>
            <Link to='/profile/settings'
            className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all'
            >Settings</Link>
        </div>
        <button className='bg-zinc-900 w-3/6 lg:w-full  lg:mt-0 text-white font-semibold flex items-center justify-center hover:text-zinc-900 hover:bg-white' onClick={logoutUser}>
            Logout
        </button>
    </div>
  )
}

export default Sidebar