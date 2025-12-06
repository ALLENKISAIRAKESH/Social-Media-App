import { useEffect, useState } from "react";
import axios from "axios";

const RightBar = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                });
                setUsers(res.data.slice(0, 5)); // Limit to 5 suggestions
            } catch (err) {
                console.log(err);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="flex-[3] sticky top-14 h-[calc(100vh-56px)] overflow-scroll bg-gray-50">
            <div className="p-5">
                <div className="shadow-md p-5 mb-5 bg-white rounded-lg">
                    <span className="text-gray-500 text-xs">Suggestions For You</span>
                    {users.map(user => (
                        <div className="flex items-center justify-between my-5" key={user._id}>
                            <div className="flex items-center gap-2">
                                <img
                                    src={user.profilePic || "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600"}
                                    alt=""
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <span className="font-bold text-sm text-gray-600">{user.username}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="bg-purple-500 text-white p-1 px-2 rounded-sm text-xs cursor-pointer">follow</button>
                                <button className="bg-red-500 text-white p-1 px-2 rounded-sm text-xs cursor-pointer">dismiss</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RightBar;
