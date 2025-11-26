import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const LeftBar = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="flex-[2] sticky top-14 h-[calc(100vh-56px)] overflow-scroll bg-white text-gray-600">
            <div className="p-5">
                <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-2">
                        <img
                            src={currentUser.profilePic || "https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600"}
                            alt=""
                            className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="font-bold text-sm">{currentUser.username}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src="https://raw.githubusercontent.com/safak/youtube2022/social-app/client/src/assets/1.png" alt="" className="w-8" />
                        <span className="text-sm">Friends</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src="https://raw.githubusercontent.com/safak/youtube2022/social-app/client/src/assets/2.png" alt="" className="w-8" />
                        <span className="text-sm">Groups</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src="https://raw.githubusercontent.com/safak/youtube2022/social-app/client/src/assets/3.png" alt="" className="w-8" />
                        <span className="text-sm">Marketplace</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src="https://raw.githubusercontent.com/safak/youtube2022/social-app/client/src/assets/4.png" alt="" className="w-8" />
                        <span className="text-sm">Watch</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src="https://raw.githubusercontent.com/safak/youtube2022/social-app/client/src/assets/5.png" alt="" className="w-8" />
                        <span className="text-sm">Memories</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftBar;
