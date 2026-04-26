import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing';
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import HomePage from './pages/HomePage';
import About from './pages/About';
import TodoList from './pages/TodoList';
import {Toaster} from 'react-hot-toast'
const App = () => {
  return (
    <>
    <Toaster/>
    <Routes>
      <Route path='/' element={<Landing/>}/>
       <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
         <Route path='/home' element={<HomePage/>}/>
          <Route path='/about' element={<About/>}/>
           <Route path='/todoList' element={<TodoList/>}/>
         
        
    </Routes>
    </>
  )
}

export default App