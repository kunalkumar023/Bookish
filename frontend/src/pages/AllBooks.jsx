import React,{useState,useEffect} from 'react'
import Bookcard from '../components/BookCard/Bookcard.jsx'
import axios from 'axios'

const AllBooks = () => {
  const [data,setData] = useState()

    useEffect(()=>{
        const fetch= async()=>{
            const response= await axios.get(" http://localhost:4000/api/v1/get-all-books")
            setData(response.data.data)
            // console.log(response.data.data)
        };
        fetch()
    },[])
  return (
    
    <div className=' px-8 bg-zinc-900 px-12 py-8 h-auto'>
        <h4 className='text-3xl text-yellow-100'>All Books</h4>
        <div className='my-4 grid grid-col-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
        {data &&
        data.map((item,i)=>(
            <div key={i}>
                <Bookcard data={item}/>
            </div>
        ))
        }
        </div>
    </div>
  )
}

export default AllBooks