import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="flex items-center justify-between p-4 h-14 border-b border-gray-200 sticky top-0 bg-white z-50">
            <div className="flex items-center gap-8">
                <Link to="/" className="no-underline">
                    <span className="font-bold text-xl text-purple-700">lamasocial</span>
                </Link>
                <div className="flex items-center gap-2 border border-gray-300 rounded-md p-1">
                    <input type="text" placeholder="Search..." className="border-none w-80 focus:outline-none" />
                </div>
            </div>
            <div className="flex items-center gap-5 font-bold text-sm">
                <Link to="/chat" className="no-underline text-gray-600">
                    Chat
                </Link>
                <div className="flex items-center gap-2 cursor-pointer">
                    <img
                        src={currentUser.profilePic || "https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600"}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    <span>{currentUser.username}</span>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
