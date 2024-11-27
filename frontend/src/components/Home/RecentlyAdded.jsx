import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Bookcard from '../BookCard/Bookcard.jsx'

const RecentlyAdded = () => {

    const [data,setData] = useState()

    useEffect(()=>{
        const fetch= async()=>{
            const response= await axios.get(" http://localhost:4000/api/v1/get-recent-books")
            setData(response.data.data)
            // console.log(response.data.data)
        };
        fetch()
    },[])

  return (
    <div className='mt-8 px-8'>
        <h4 className='text-3xl text-yellow-100'>Recently Added Books</h4>
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

export default RecentlyAdded