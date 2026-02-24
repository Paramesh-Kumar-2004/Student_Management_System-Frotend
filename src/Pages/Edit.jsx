import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Components/Loader";
import { Store } from "../Components/Context/Store";
import API from "../API/api";
import { toast } from "react-toastify";
import Sidebar from "../Components/Sidebar";




const Edit = () => {

    const navigate = useNavigate();

    const { isLoading, setIsLoading } = useContext(Store)

    const [userData, setUserData] = useState({
        fullName: "",
        phoneNumber: "",
    });

    useEffect(() => {
        fetchById()
    }, [])

    const fetchById = async () => {
        setIsLoading(true)
        try {
            const response = await API.get(`/user/me`)
            setUserData(response.data.user)
        } catch (error) {
            toast.error(error.response?.data?.message || error.message, {
                position: "top-center",
                autoClose: 2000
            })
        } finally {
            setIsLoading(false)
        }
    }

    function HandleChange(e) {
        const { name, value } = e.target
        setUserData({
            ...userData,
            [name]: value
        })
    }

    async function HandleSubmit(e) {
        e.preventDefault();
        setIsLoading(true)
        try {
            const response = await API.patch(`/user/me`, userData)
            toast(response.data.message, {
                position: "top-center",
                autoClose: 2000
            })
            navigate(-1)

        } catch (error) {
            toast.error(error.response?.data?.message || error.message, {
                position: "top-center",
                autoClose: 2000
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex justify-center items-center min-h-screen bg-[#1B262C] text-white font-[Poppins,sans-serif w-full md:ml-36 pt-20 md:pt-0">

                <form
                    onSubmit={HandleSubmit}
                    className="bg-[#c517d402] border-2 border-gray-700 shadow-sm shadow-sky-400 rounded-xl px-8 py-4 w-full max-w-md space-y-6"
                >
                    <h2 className="text-2xl font-semibold text-center text-white mb-4">
                        Edit : <span className="text-green-400">{userData.fullName}</span>
                    </h2>

                    {/* Category - ["work", "personal", "prjects"] */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-white font-medium text-xl mb-2"
                        >
                            Name
                        </label>
                        <input
                            name="fullName"
                            value={userData.fullName}
                            onChange={(e) => HandleChange(e)}
                            className="w-full p-3 rounded-md border-2 border-sky-500 text-white text-lg outline-none cursor-pointer"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="phone"
                            className="block text-white font-medium text-xl mb-2"
                        >
                            Phone
                        </label>
                        <input
                            name="phoneNumber"
                            value={userData.phoneNumber}
                            onChange={(e) => HandleChange(e)}
                            className="w-full p-3 rounded-md border-2 border-sky-500 text-white text-lg outline-none cursor-pointer"
                        />
                    </div>

                    <div className="flex gap-6">
                        <button
                            disabled={isLoading}
                            type="submit"
                            className={`w-full text-white font-semibold py-2 rounded-md hover:bg-green-700 transition-all duration-300 ${isLoading ? "opacity-50 cursor-not-allowed bg-gray-500" : "bg-green-600 cursor-pointer"}`}
                        >
                            {isLoading ? "Loading..." : "Update Task"}
                        </button>

                        <button
                            type="button"
                            className="w-full bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700 transition-all duration-300 cursor-pointer"
                            onClick={() => navigate(-1)}
                        >
                            Cancel
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Edit;