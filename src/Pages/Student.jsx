import React, { useContext, useEffect, useState } from 'react'
import * as changecase from "change-case"
import { Store } from '../Components/Context/Store'
import Sidebar from '../Components/Sidebar'
import API from '../API/api'
import Loader from '../Components/Loader'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'




const Student = () => {

    const { id } = useParams()
    const [role, setRole] = useState(localStorage.getItem("role") || "student")
    const [student, setStudent] = useState(null)
    const { isLoading, setIsLoading } = useContext(Store)

    useEffect(() => {
        fetchStudentProfile()
    }, [])

    const fetchStudentProfile = async () => {
        try {
            setIsLoading(true)
            const response = await API.get(`/user/${id}`);
            setStudent(response.data.user)
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || error.message, {
                position: "top-center",
                autoClose: 2000
            })
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='flex'>
            <Sidebar />
            <div className='bg-[#1B262C] text-white min-h-screen font-[Poppins,sans-serif w-full md:ml-36 pt-20 md:pt-0 pl-3'>

                <div className='w-full'>
                    <div className='py-6 pl-0'>
                        <h1 className='text-sky-50 font-bold text-3xl text-center'>Student Profile</h1>
                    </div>
                    <div className="flex flex-wrap gap-3 text-[#BBE1FA] justify-evenly items-center font-[Poppins,sans-serif] pt-4 pr-3">
                        {student ? (
                            <div
                                className="bg-[#0f4c7546] border-2 border-[#3282B8] rounded-2xl p-6 w-40 text-start transition-transform duration-300 ease-in-out hover:-translate-y-1.5 hover:shadow-[0_0_14px_rgba(71,166,230,1)] flex-1"
                                key={student._id}
                            >
                                <h2 className="text-white font-semibold mb-4 text-xl">
                                    Name : {changecase.capitalCase(student.fullName)}
                                </h2>

                                <p className="text-white font-semibold mb-5 leading-relaxed">
                                    Email : {student.email}
                                </p>

                                <p className="text-white font-semibold mb-5 leading-relaxed">
                                    Department : {student.department}
                                </p>

                                <p className="text-white font-semibold mb-5 leading-relaxed">
                                    Role : {changecase.capitalCase(student.role)}
                                </p>

                                <p className="text-white font-semibold mb-5 leading-relaxed">
                                    Phone : {student.phoneNumber}
                                </p>

                                {/* {role !== "student" && (
                                    <button className="bg-[#3282B8] hover:bg-[#0f4c75] text-white font-bold py-2 px-4 rounded transition-transform duration-300 ease-in-out hover:-translate-y-1.5 hover:shadow-[0_0_14px_rgba(71,166,230,1)]"
                                        onClick={() => navigate(`/edit-task/${student._id}`)}
                                    >
                                        Edit
                                    </button>
                                )} */}

                            </div>
                        ) : (
                            <div>
                                {isLoading && (
                                    <Loader loadingMessage='Fetching Student Profile...' />
                                )}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div >
    )
}

export default Student