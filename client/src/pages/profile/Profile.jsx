import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";

const Profile = () => {
    return (
        <div className="bg-gray-100 min-h-[calc(100vh-56px)]">
            <div className="w-full h-72 relative">
                <img
                    src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt=""
                    className="w-full h-full object-cover"
                />
                <img
                    src="https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
                    alt=""
                    className="w-52 h-52 rounded-full object-cover absolute left-0 right-0 m-auto top-48 border-4 border-white"
                />
            </div>
            <div className="px-5 pb-5 md:px-12 md:pb-12 lg:px-24 lg:pb-24">
                <div className="h-44 shadow-md rounded-2xl bg-white text-gray-600 p-12 flex items-center justify-between mb-5 mt-12">
                    <div className="flex-1 flex gap-2 text-gray-500 text-xl">
                        <a href="http://facebook.com">
                            <FacebookTwoToneIcon fontSize="large" />
                        </a>
                        <a href="http://instagram.com">
                            <InstagramIcon fontSize="large" />
                        </a>
                        <a href="http://twitter.com">
                            <TwitterIcon fontSize="large" />
                        </a>
                        <a href="http://linkedin.com">
                            <LinkedInIcon fontSize="large" />
                        </a>
                        <a href="http://pinterest.com">
                            <PinterestIcon fontSize="large" />
                        </a>
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-2">
                        <span className="text-3xl font-medium">Jane Doe</span>
                        <div className="flex items-center justify-around w-full">
                            <div className="flex items-center gap-1 text-gray-500 text-sm">
                                <PlaceIcon />
                                <span>USA</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-500 text-sm">
                                <LanguageIcon />
                                <span>lama.dev</span>
                            </div>
                        </div>
                        <button className="bg-purple-500 text-white p-2 rounded-md font-bold cursor-pointer hover:bg-purple-700">follow</button>
                    </div>
                    <div className="flex-1 flex items-center justify-end gap-2">
                        <EmailOutlinedIcon />
                        <MoreVertIcon />
                    </div>
                </div>
                <Posts />
            </div>
        </div>
    );
};

export default Profile;
