import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Store } from "../Components/Context/Store";
import API from "../API/api";



const NewStudent = ({ oldStudents, onClose }) => {

    const [users, setUsers] = useState(null)
    const [student, setStudent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { isLoading, setIsLoading } = useContext(Store)

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            setIsLoading(true)
            const response = await API.get("/user/all", {
                params: { role: "student" }
            });
            setUsers(response.data.users)
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            const response = await API.post(`/class/${student}`);

            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 2000
            });
            onClose();
        } catch (error) {
            console.log(error)
            toast.error(
                error.response?.data?.message || "Failed to add collaboration"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-[#06344d] w-[420px] rounded-xl border-2 border-sky-500 p-6">

                <h2 className="text-white text-xl font-semibold text-center mb-5">
                    Share Task
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <select
                        value={student}
                        required
                        onChange={(e) => setStudent(e.target.value)}
                        className="w-full p-3 rounded-md border-2 border-sky-500 bg-[#06344d] outline-none cursor-pointer"
                    >
                        <option value="" disabled>
                            Select Student
                        </option>
                        {users?.map((user) => (
                            <option key={user._id} value={user._id}
                                disabled={oldStudents.includes(user._id)}
                            >
                                {user.fullName} - {user.email}
                            </option>
                        ))}
                    </select>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-600 text-white rounded-md cursor-pointer"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 bg-sky-600 text-white rounded-md disabled:opacity-60 cursor-pointer"
                        >
                            {isSubmitting ? "Adding..." : "Add"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default NewStudent;