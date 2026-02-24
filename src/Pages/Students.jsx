import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'
import Loader from '../Components/Loader'
import Sidebar from '../Components/Sidebar'
import { Store } from '../Components/Context/Store'
import API from '../API/api'




const Students = () => {

    const navigate = useNavigate()
    const { user, setUser, search, paginate, isLoading, setIsLoading } = useContext(Store)

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            setIsLoading(true)
            const response = await API.get("/user/all", {
                params: {
                    role: "student",
                    ...(search && { search }),
                    page: paginate,
                    limit: 5
                }
            });
            setUser(response.data.users)
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
        <>
            <div className='flex'>
                <Sidebar />
                <div className='bg-[#1B262C] text-white min-h-screen font-[Poppins,sans-serif w-full md:ml-36 pt-20 md:pt-0 px-3 overflow-x-scroll [scrollbar-width:none]'>

                    <div className='py-6 pl-0'>
                        <h1 className='text-sky-400 font-bold text-3xl text-center'>Students</h1>
                    </div>
                    <table className="w-full min-w-xs">
                        <thead className="bg-[#0f4c7546] border-2 border-[#3282B8] rounded-2xl w-full p-6 text-start transition-transform text-emerald-300 text-lg">
                            <tr>
                                <th className="p-4">Name</th>
                                <th className="p-4">Department</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">View</th>
                            </tr>
                        </thead>
                        <tbody className="text-white text-base">
                            {user.length > 0 ? (
                                user.map((item) => {
                                    return (
                                        <tr key={item._id}
                                            className="bg-[#0f4c7546] border-2 border-sky-600 text-center transition-transform duration-300 ease-in-out hover:shadow-[inset_0_0_14px_rgba(71,166,230,1)]">

                                            <td className="p-3">
                                                {item.fullName}
                                            </td>
                                            <td className="p-3">
                                                {item?.department}
                                            </td>
                                            <td className="p-3">
                                                {item.email}
                                            </td>
                                            <td className="p-3">
                                                <button
                                                    className="px-4 py-1.5 font-semibold rounded-md transition-colors duration-300 cursor-pointer text-amber-500 hover:bg-yellow-500 hover:text-white"
                                                    onClick={() => navigate(`/task/${item._id}`)}
                                                >
                                                    View More
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })

                            ) : (
                                <tr>
                                    {isLoading ?
                                        <td colSpan={7}>
                                            <Loader />
                                        </td>
                                        : (
                                            <td
                                                colSpan={7}
                                                className="py-4 font-extrabold text-sky-500 bg-[#0f4c7546] border-2 border-red-900 text-center transition-transform duration-300 ease-in-out"
                                            >Students Not Found</td>
                                        )}
                                </tr>
                            )}
                        </tbody>

                    </table>

                </div>
            </div>
        </>
    );
};


export default Students