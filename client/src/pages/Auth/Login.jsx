import React, { useState } from 'react'

import {  Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../../utils/ErrorMessage';


const Login = () => {
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
       const res =await axios.post("http://localhost:8080/api/v1/user/login",{email,password})
       
       navigate('/home')
       toast.success('Login Successfully')
       console.log(res.data,"login successfully")
        localStorage.setItem("auth", JSON.stringify(res.data));
      
    } catch (err) {
       toast.error(getErrorMessage(err));
      console.log(err);
     
      
    }
  
  }

    
  return (
    <div className="main">
      <div className="login-card">
        <h3>Login</h3>
        <form action="" onSubmit={handleSubmit} >
          

          <label htmlFor="">Email</label>
          <input
           type="email"
            placeholder="John Doe" required
            value={email} 
            onChange={(e)=>setEmail(e.target.value)} 
            />

          <label htmlFor="">Password</label>
          <input 
          type="password" 
          placeholder="John Doe" required
          value={password}
          onChange={(e)=>setPassword(e.target.value)} 
          />

          <p className="user">
            Not a user!{" "}
            <Link to="/register" className="login-link">
              Register
            </Link>
          </p>

          <button className='lr-btn' type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login