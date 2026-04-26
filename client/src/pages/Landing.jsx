import React from 'react'
import { Link } from 'react-router-dom'


const Landing = () => {
  return (
     <div>
      
    <div className="hero">
      <div className='intro-text'>
        <h1>
          <span className='tagline1'> Boost your productivity</span> <br/>
          <span className='tagline2'>One task at a time</span> <br/>
        </h1>
        <p>
          “Turn your daily tasks into meaningful progress with a simple, smart to-do list that helps you stay focused, organized, and motivated every single day today.”
        </p>
         <Link className='landing-btn red ' to= "/register" >Register Now!</Link>
           <Link className='landing-btn blue' to= "/login">Login</Link>
        
      </div>
      
      
    </div>
    </div>
  )
}

export default Landing