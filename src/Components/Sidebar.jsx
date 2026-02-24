import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'



const Sidebar = () => {

    const navigate = useNavigate()
    const [role, setRole] = useState(localStorage.getItem("role") || "student")

    const HandleLogout = async () => {
        try {
            localStorage.clear()
            navigate("/login")
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return (
        <nav
            className="bg-[#06344d] text-white fixed w-full min-h-16 h-fit flex flex-wrap flex-row justify-around items-center 
            md:h-screen md:w-fit md:min-w-36 md:flex-col md:justify-evenly md:py-4 z-10"
        >
            <div>
                {/* <img src={testIMG} alt="img" width={50} /> */}
                <h1
                    className='text-center cursor-pointer text-xl font-extrabold hover:scale-110 duration-300 transition-all'
                    onClick={() => navigate("/")}
                >
                    VP
                </h1>
            </div>

            <div
                onClick={() => navigate("/")}
                className='font-semibold text-lg p-2 cursor-pointer hover:scale-110 duration-300 transition-all'>Students
            </div>
            <div
                onClick={() => navigate(["admin", "superadmin", "manager"].includes(role) ? "/all-users" : role == "teacher" ? "/my-students" : "/my-teachers")}
                className='font-semibold text-lg p-2 cursor-pointer hover:scale-110 duration-300 transition-all'>
                {["admin", "superadmin", "manager"].includes(role) ? "All Users" : role == "teacher" ? "My Students" : "My Teachers"}
            </div>
            <div
                onClick={() => navigate("/profile")}
                className='font-semibold text-lg p-2 cursor-pointer hover:scale-110 duration-300 transition-all'>My Profile
            </div>
            {/* <div
                onClick={() => navigate("/settings")}
                className='font-semibold text-lg p-2 cursor-pointer hover:scale-110 duration-300 transition-all'>Settings</div> */}
            <div
                onClick={HandleLogout}
                className='font-semibold text-lg p-2 cursor-pointer hover:scale-110 duration-300 transition-all'>Logout</div>
        </nav>
    )
}

export default Sidebar