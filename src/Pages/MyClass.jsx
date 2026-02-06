import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../Components/Context/Store'
import Loader from '../Components/Loader';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import { toast } from 'react-toastify';
import API from '../API/api';
import NewStudent from './NewStudent';



const MyClass = () => {

  const navigate = useNavigate()
  const { search, paginate, isLoading, setIsLoading, refetch, setRefetch } = useContext(Store)
  const [data, setData] = useState([])
  const [openStudentModal, setOpenStudentModal] = useState(false)
  const [oldStudent, setOldStudent] = useState([])

  useEffect(() => {
    fetchClasses()
    fetchOldStudent()
  }, [openStudentModal, refetch])

  const fetchOldStudent = async () => {
    try {
      setIsLoading(true)

      const response = await API.get(`/class`)

      const studentIds = response.data.students.map(
        (std) => std.student._id
      )
      setOldStudent(studentIds)

    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || error.message, {
        position: "top-center",
        autoClose: 2000
      })
    } finally {
      setIsLoading(false)
    }
  }


  const fetchClasses = async () => {
    try {
      setIsLoading(true)
      const response = await API.get("/class", {
        params: {
          ...(search && { search }),
          page: paginate
        }
      });
      setData(response.data.students)
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

  const RemoveStudent = async (student) => {
    try {
      setIsLoading(true)
      const response = await API.delete(`/class/${student}`);
      toast(response.data.message, {
        position: "top-center",
        autoClose: 2000
      })
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || error.message, {
        position: "top-center",
        autoClose: 2000
      })
    }
    finally {
      setIsLoading(false)
      setRefetch(!refetch)
    }
  }




  return (
    <>
      <div className='flex'>
        <Sidebar />
        <div className='bg-[#1B262C] text-white min-h-screen font-[Poppins,sans-serif w-full md:ml-36 pt-20 md:pt-0 px-3 overflow-x-scroll [scrollbar-width:none]'>

          <div className='py-6 pl-0'>
            <h1 className='text-sky-400 font-bold text-3xl text-center'>Students</h1>
            <div className='text-sky-400 font-bold text-end mr-4'>
              <button className="bg-[#3282B8] text-white font-bold py-2 px-4 rounded transition-transform duration-300 ease-in-out hover:-translate-y-1.5 hover:shadow-[0_0_14px_rgba(71,166,230,1)] cursor-pointer"
                onClick={() => setOpenStudentModal(true)}
              >
                Add Student
              </button>
            </div>
          </div>
          <table className="w-full min-w-xs">
            <thead className="bg-[#0f4c7546] border-2 border-[#3282B8] rounded-2xl w-full p-6 text-start transition-transform text-emerald-300 text-lg">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Department</th>
                <th className="p-4">Details</th>
                <th className="p-4">Remove Student</th>
              </tr>
            </thead>
            <tbody className="text-white text-base">
              {data.length > 0 ? (
                data.map((item) => {
                  return (
                    <tr key={item._id}
                      className="bg-[#0f4c7546] border-2 border-sky-600 text-center transition-transform duration-300 ease-in-out hover:shadow-[inset_0_0_14px_rgba(71,166,230,1)]">

                      <td className="p-3">
                        {item?.student?.fullName}
                      </td>
                      <td className="p-3">
                        {item?.student?.department}
                      </td>
                      <td className="p-3">
                        {item?.student?.email}
                      </td>
                      <td className="p-3">
                        <button
                          className="px-4 py-1.5 font-semibold rounded-md transition-colors duration-300 cursor-pointer text-amber-500 hover:bg-yellow-500 hover:text-white"
                          onClick={() => navigate(`/student/${item?.student?._id}`)}
                        >
                          View
                        </button>
                      </td>
                      <td className="p-3">
                        <button
                          className="px-4 py-1.5 font-semibold rounded-md transition-colors duration-300 cursor-pointer text-red-600 hover:bg-red-700 hover:text-white"
                          onClick={() => RemoveStudent(item?.student?._id)}
                        >
                          Remove
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
                      >Classes Not Found</td>
                    )}
                </tr>
              )}
            </tbody>

          </table>

          {openStudentModal && (
            < NewStudent
              oldStudents={oldStudent}
              onClose={() => setOpenStudentModal(false)}
            />
          )}

        </div>
      </div>
    </>
  );
};


export default MyClass