import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
    const liked = false;

    return (
        <div className="shadow-md rounded-lg bg-white p-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <img
                        src={post.profilePic}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                        <Link
                            to={`/profile/${post.userId}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <span className="font-bold">{post.name}</span>
                        </Link>
                        <span className="text-xs text-gray-500">1 min ago</span>
                    </div>
                </div>
                <MoreHorizIcon />
            </div>
            <div className="my-5">
                <p>{post.desc}</p>
                <img src={post.img} alt="" className="w-full max-h-[500px] object-cover mt-5" />
            </div>
            <div className="flex items-center gap-5 text-sm">
                <div className="flex items-center gap-2 cursor-pointer">
                    {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
                    12 Likes
                </div>
                <div className="flex items-center gap-2 cursor-pointer">
                    <TextsmsOutlinedIcon />
                    12 Comments
                </div>
                <div className="flex items-center gap-2 cursor-pointer">
                    <ShareOutlinedIcon />
                    Share
                </div>
            </div>
        </div>
    );
};

export default Post;
