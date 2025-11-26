import { useState, useEffect } from "react";
import axios from "axios";

const Conversation = ({ data, currentUserId, online }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const userId = data.participants.find((id) => id !== currentUserId);
        const getUser = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                });
                setUserData(data);
            } catch (error) {
                console.log(error);
            }
        };
        getUser();
    }, [data, currentUserId]);

    return (
        <>
            <div className="follower conversation flex items-center gap-4 hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
                <div className="relative">
                    <div className={`absolute w-3 h-3 rounded-full bg-green-500 top-0 right-0 ${online ? "block" : "hidden"}`}></div>
                    <img
                        src={userData?.profilePic || "https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600"}
                        alt=""
                        className="followerImage w-12 h-12 rounded-full object-cover"
                    />
                </div>
                <div className="name text-sm flex flex-col">
                    <span className="font-bold">{userData?.username}</span>
                    <span className="text-gray-500">{online ? "Online" : "Offline"}</span>
                </div>
            </div>
            <hr className="w-[85%] border border-gray-200 mx-auto" />
        </>
    );
};

export default Conversation;
