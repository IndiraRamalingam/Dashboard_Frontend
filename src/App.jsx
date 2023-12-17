import React from 'react'
import '../src/App.css'
import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom'
import Home from './components/Pages/Home'
import SignUp from './components/user/SignUp';
import SignIn from './components/user/SignIn';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import AddTask from './components/Task/AddTask';
import EditTask from './components/Task/EditTask';
import ViewTask from './components/Task/ViewTask';
import NavBar from './components/Pages/NavBar';


function App() {
  return (
    <>
      <div id="page-container">
        <div id="content-wrap">
         
          <BrowserRouter>
          <NavBar/>
            <Routes>
              <Route path='/home/:id' element={<Home />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/signin' element={<SignIn />} />
              <Route path='/forgot_password' element={<ForgotPassword />} />
              <Route path='/reset_password/:token' element={<ResetPassword />} />
              <Route path='/addTask/:id' element={<AddTask/>}/>
              <Route path='/editTask/:id' element={<EditTask/>}/>
              <Route path='/viewTask/:id' element={<ViewTask/>}/>
              <Route path="/" element={<Navigate to="/signin" replace />} />
              </Routes>
          </BrowserRouter>
        </div>
        
      </div>
    </>
  )
}

export default App