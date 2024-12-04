import './App.css';
import Home from './pages/Home.jsx';
import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/footer/Footer.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import AllBooks from './pages/AllBooks.jsx'
import About from './pages/About.jsx';
import User from './pages/User.jsx'
import Cart from './pages/Cart.jsx'
import {Routes,Route} from 'react-router-dom'
import BookDetails from './components/Bookdetails/BookDetails.jsx';
import { useDispatch ,useSelector} from 'react-redux';
import { authActions} from './Store/auth.js';
import { useEffect } from 'react';
import Favourite from './components/Sidebar/Favourite.jsx'
import OrderHistory from './components/Sidebar/OrderHistory.jsx'
import Settings from './components/Sidebar/Settings.jsx'
import AddBook from './components/AddBook/AddBook.jsx';
import Logout from './pages/Logout.jsx';

function App() {

  const dispatch=useDispatch();
  const role = useSelector((state)=>state.auth.role)

  useEffect(()=>{
    if(
      localStorage.getItem("id")&&
      localStorage.getItem("token")&&
      localStorage.getItem("role")
    ){

      dispatch(authActions.login())
      dispatch(authActions.changeRole(localStorage.getItem("role")))

    }
  },[dispatch,role])
  return (
    <div>
      <Navbar/>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/sign-up' element={<Signup/>}/>
      <Route path='/sign-in' element={<Login/>}/>
      <Route path='/all-books' element={<AllBooks/>}/>
      <Route path='/about-us' element={<About/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/profile' element={<User/>}>
      <Route index element={<Favourite/>}/>
      <Route path='/profile/orderHistory' element={<OrderHistory/>}/>
      <Route path='/profile/settings' element={<Settings/>}/>
      </Route>
      <Route path='/view-book-details/:id' element={<BookDetails/>}/>
      <Route path='/add-book' element={<AddBook/>}/>
      <Route path='logout' element={<Logout/>}/>

      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
