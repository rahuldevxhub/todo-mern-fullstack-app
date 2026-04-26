import React, { useState } from 'react'

import { Link } from 'react-router-dom';
import axios from 'axios';
import{useNavigate} from 'react-router-dom'
import { getErrorMessage } from '../../utils/ErrorMessage';
import toast from 'react-hot-toast';


const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()
    const handleSubmit = async(e) =>{
      e.preventDefault();
      try {
     const res = await axios.post('http://localhost:8080/api/v1/user/register',{username,email,password})
      console.log(name, email, password);
      navigate('/login');
      console.log(res.data)

        
      } catch (err) {
        toast.error(getErrorMessage(err))
        console.log(err)
        
      }
   
      
    }
  return (
    <div className="main">
      <div className="login-card">
        <h3>Register</h3>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="">Name</label>
          <input 
          type="text" 
          placeholder="John Doe" 
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          required />

          <label htmlFor="">Email</label>
          <input
           type="email" 
           placeholder="John Doe"
           value={email}
           onChange={(e)=>setEmail(e.target.value)}
            required />

          <label htmlFor="">Password</label>
          <input 
          type="password" 
          placeholder="John Doe" 
          value={password}
           onChange={(e)=>setPassword(e.target.value)}
          required />

          <p className="user">
            Already a user?{" "}
            <Link to="/login" className="login-link">
              Log In
            </Link>
          </p>

          <button className='lr-btn' type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register