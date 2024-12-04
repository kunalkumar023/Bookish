import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGripLines, FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth); 
  const role = localStorage.getItem("role"); // Retrieve role from localStorage

  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const links = [
    { title: 'Home', link: '/' },
    { title: 'About Us', link: '/about-us' },
    { title: 'All Books', link: '/all-books' },
  ];

  // Add user-specific links if the role is not 'admin'
  if (isLoggedIn && role !== 'admin') {
    links.push(
      { title: 'Cart', link: '/cart' },
      { title: 'Profile', link: '/profile' }
    );
  }

  // Add admin-specific options if the role is 'admin'
  if (role === 'admin') {
    links.push({ title: 'Add Book', link: '/add-book' },{title:"Logout",link:"/logout"});
  }

  return (
    <div className="flex bg-zinc-800 text-white px-6 py-4 items-center justify-between">
      <div>
        <Link to="/" className="text-2xl font-semibold">
          Bookish
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-4">
        {links.map((item, i) => (
          <Link
            className="hover:text-blue-500 transition-all duration-300"
            to={item.link}
            key={i}
          >
            {item.title}
          </Link>
        ))}
      </div>

      {!isLoggedIn && (
        <div className="hidden md:flex gap-4">
          <Link
            to={'/sign-in'}
            className="px-2 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
          >
            LogIn
          </Link>
          <Link
            to={'/sign-up'}
            className="px-2 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
          >
            SignUp
          </Link>
        </div>
      )}

      <div className="md:hidden flex items-center text-white text-2xl">
        <button onClick={handleToggle}>
          {isMenuOpen ? <FaTimes /> : <FaGripLines />}
        </button>
      </div>

      <div
        className={`absolute top-16 left-0 w-full bg-zinc-800 text-white py-4 flex flex-col items-center transition-all duration-300 ${
          isMenuOpen ? 'block' : 'hidden'
        }`}
      >
        {links.map((item, i) => (
          <Link
            className="py-2 text-lg hover:text-blue-500 transition-all duration-300"
            to={item.link}
            key={i}
            onClick={() => setIsMenuOpen(false)}
          >
            {item.title}
          </Link>
        ))}
        {!isLoggedIn && (
          <>
            <Link
              to={'/sign-in'}
              className="py-2 text-lg hover:text-blue-500 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              LogIn
            </Link>
            <Link
              to={'/sign-up'}
              className="py-2 text-lg hover:text-blue-500 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              SignUp
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
