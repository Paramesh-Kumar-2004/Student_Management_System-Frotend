import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../API/api'
import { Store } from '../Components/Context/Store'
import Sidebar from '../Components/Sidebar'
import Loader from '../Components/Loader'



const MyTeacher = () => {

    const navigate = useNavigate()
    const { search, paginate, isLoading, setIsLoading, refetch, setRefetch } = useContext(Store)

    const [data, setData] = useState([])

    useEffect(() => {
        fetchMyTeacher()
    }, [refetch])

    const fetchMyTeacher = async () => {
        try {
            setIsLoading(true)
            const response = await API.get("/class/my-teacher", {
                params: {
                    ...(search && { search }),
                    page: paginate,
                }
            });
            setData(response.data.teachers)
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
                        <h1 className='text-sky-400 font-bold text-3xl text-center'>Teachers</h1>
                    </div>
                    <table className="w-full min-w-xs">
                        <thead className="bg-[#0f4c7546] border-2 border-[#3282B8] rounded-2xl w-full p-6 text-start transition-transform text-emerald-300 text-lg">
                            <tr>
                                <th className="p-4">Name</th>
                                <th className="p-4">Department</th>
                                <th className="p-4">Email</th>
                            </tr>
                        </thead>
                        <tbody className="text-white text-base">
                            {data.length > 0 ? (
                                data.map((item) => {
                                    return (
                                        <tr key={item._id}
                                            className="bg-[#0f4c7546] border-2 border-sky-600 text-center transition-transform duration-300 ease-in-out hover:shadow-[inset_0_0_14px_rgba(71,166,230,1)]">

                                            <td className="p-3">
                                                {item?.teacher?.fullName}
                                            </td>
                                            <td className="p-3">
                                                {item?.teacher?.department}
                                            </td>
                                            <td className="p-3">
                                                {item?.teacher?.email}
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
                                            >Teacher Not Found For You</td>
                                        )}
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
            </div>
        </>
    );
}

export default MyTeacher