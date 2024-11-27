import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { FaShoppingCart } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";
import { useSelector } from 'react-redux';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const BookDetails = () => {
    const {id} = useParams()
    const [data,setData] = useState()
    const isLoggedIn= useSelector((state)=>state.auth.isLoggedIn)
    const role = useSelector((state)=>state.auth.role)

    const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
      bookid:id
    };

    const handlefav=async()=>{
      try {
        const res = await axios.put("http://localhost:4000/api/v1//add-to-fav",{},{headers})
        alert(res.data.message)
        
      } catch (error) {
        alert(error)
      }
    }

    const handleCart=async()=>{
      try {
        const res = await axios.put("http://localhost:4000/api/v1//add-to-cart",{},{headers})
        alert(res.data.message)
        
      } catch (error) {
        alert(error)
      }
    }

    useEffect(()=>{
        const fetch= async()=>{
            const response= await axios.get(`http://localhost:4000/api/v1/get-book/${id}`)
            setData(response.data.data)
        };
        fetch()
    },[])
    
  return (<>
    {data &&(
    <div className='px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8'>
        <div className='bg-zinc-800 rounded p-4 h-[60vh] lg:h-[88vh] w-full lg:w-3/6 flex items-center justify-around'>
        <img src={data.url} className='h-[50vh] md:h-[60vh]'/>
        {isLoggedIn ===true && role==='user' && <div className='flex flex-col text-3xl  h-[88vh] items-center justify-center'>
          <button className='bg-white m-1 px-3 py-3 text-red-500 rounded hover:bg-red-500 hover:text-white transition-all' 
          onClick={handlefav}><IoIosHeart /></button>
          <button className='bg-white m-1 px-3 py-3 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition-all'
          onClick={handleCart}
          ><FaShoppingCart /></button>
        </div>}

        {isLoggedIn ===true && role==='admin' && <div className='flex flex-col text-3xl  h-[88vh] items-center justify-center'>
          <button className='bg-white m-1 px-3 py-3 text-red-500 rounded hover:bg-red-500 hover:text-white transition-all' ><FaEdit /></button>
          <button className='bg-white m-1 px-3 py-3 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition-all'><MdDelete />
          </button>
        </div>}
        </div>
        
        <div className='p-4 w-full lg:w-3/6'>
        <h2 className='text-4xl text-zinc-300 font-semibold' >{data.title}</h2>
        <p className='text-zinc-500 mt-1' >{data.author}</p>
        <p className='text-zinc-500 mt-4 text-xl' >{data.desc}</p>
        <p className='text-zinc-500 mt-4 text-xl' >{data.lang}</p>
        <p className='text-zinc-100 mt-4 text-2xl font-semibold' >₹ {data.price}</p>

        </div>
        
    </div>)}
    </>
  )
}

export default BookDetails