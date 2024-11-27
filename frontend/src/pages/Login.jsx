import { useState } from "react";
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {authActions} from '../Store/auth'
import {useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate= useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:4000/api/v1/sign-in",formData)
        dispatch(authActions.login())
        dispatch(authActions.changeRole(response.data.user.role))

        localStorage.setItem("id",response.data.user._id)
        localStorage.setItem("token",response.data.token)
        localStorage.setItem("role",response.data.user.role)

        alert(response.data.message)
        navigate("/")
    } catch (error) {
      alert(error.response.data.message)
    }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900">
      <div className="w-full max-w-md bg-zinc-800 shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Sign In
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-zinc-900 text-white py-2 rounded-md hover:bg-zinc-600 focus:outline-none focus:bg-blue-600 transition-colors"
          >
            Sign In
          </button>
        </form>
     
      </div>
    </div>
  );
}

export default Login;
