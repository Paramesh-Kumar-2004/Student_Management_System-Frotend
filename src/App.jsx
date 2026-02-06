import React from 'react'
import { HashRouter, BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import ContextProvider from './Components/Context/ContextProvider'
import Register from './Pages/Auth/Register'
import Login from './Pages/Auth/Login'
import ForgetPassword from './Pages/Auth/ForgetPassword'
import ResetPassword from './Pages/Auth/ResetPassword'
import NotFound from './Pages/NotFound'
import Users from './Pages/Users'
import MyStudents from './Pages/Students'
import MyProfile from './Pages/MyProfile'
import MyClass from './Pages/MyClass'
import Student from './Pages/Student'
import Edit from './Pages/Edit'
import MyTeacher from './Pages/MyTeacher'



const App = () => {

  return (
    <>
      <ContextProvider >

        <HashRouter>
          <ToastContainer
            autoClose={1000}
            position='top-center'
            draggable
          />
          <Routes>

            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/forgetpassword' element={<ForgetPassword />} />
            <Route path='/resetpassword/:id/:token' element={<ResetPassword />} />
            <Route path='/' element={<Users />} />
            <Route path='/students' element={<MyStudents />} />
            <Route path='/profile' element={<MyProfile />} />
            <Route path='/my-students' element={<MyClass />} />
            <Route path='/my-teachers' element={<MyTeacher />} />
            <Route path='/student/:id' element={<Student />} />
            <Route path='/edit' element={<Edit />} />

            <Route path='*' element={<NotFound />} />

          </Routes>
        </HashRouter>

      </ContextProvider>
    </>
  )
}

export default App