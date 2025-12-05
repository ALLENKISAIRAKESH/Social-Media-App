import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

const Share = () => {
    const [file, setFile] = useState(null);
    const [desc, setDesc] = useState("");
    const { currentUser } = useContext(AuthContext);

    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("picture", file);
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/upload`, formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const handleClick = async (e) => {
        e.preventDefault();
        let imgUrl = "";
        if (file) imgUrl = await upload();

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/posts`, {
                desc,
                img: imgUrl,
                userId: currentUser._id
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setDesc("");
            setFile(null);
            window.location.reload(); // Simple reload to show new post
        } catch (err) {
            console.log(err);
        }
    };

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
                    <input
                        type="text"
                        placeholder={`What's on your mind ${currentUser.name}?`}
                        onChange={(e) => setDesc(e.target.value)}
                        value={desc}
                        className="border-none w-full focus:outline-none"
                    />
                </div>
                <div className="flex-[1] flex justify-end">
                    <input
                        type="file"
                        id="file"
                        style={{ display: "none" }}
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <label htmlFor="file" className="cursor-pointer text-gray-500 text-xs mr-2 self-center">
                        {file ? file.name : "Add Image"}
                    </label>
                    <button onClick={handleClick} className="border-none p-1 px-2 text-white cursor-pointer bg-purple-500 rounded-sm text-xs">Share</button>
                </div>
            </div>
            {file && (
                <div className="relative mt-5">
                    <img className="w-full object-cover rounded-md" alt="" src={URL.createObjectURL(file)} />
                    <button className="absolute top-0 right-0 bg-red-500 text-white p-1 cursor-pointer" onClick={() => setFile(null)}>X</button>
                </div>
            )}
        </div>
    );
};

export default Share;
