import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

const Share = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="shadow-md rounded-lg bg-white p-5 mb-5">
            <div className="flex items-center gap-5">
                <div className="flex-[1]">
                    <img
                        src={currentUser.profilePic}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover"
                    />
                </div>
                <div className="flex-[5]">
                    <input type="text" placeholder={`What's on your mind ${currentUser.name}?`} className="border-none w-full focus:outline-none" />
                </div>
                <div className="flex-[1] flex justify-end">
                    <button className="border-none p-1 px-2 text-white cursor-pointer bg-purple-500 rounded-sm text-xs">Share</button>
                </div>
            </div>
        </div>
    );
};

export default Share;
