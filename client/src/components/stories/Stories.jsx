import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

const Stories = () => {
    const { currentUser } = useContext(AuthContext);

    const [stories, setStories] = useState([]);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/stories`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                });
                setStories(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchStories();
    }, []);


    const [file, setFile] = useState(null);

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

    const handleAddStory = async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            // Immediately upload and create story
            try {
                const formData = new FormData();
                formData.append("picture", selectedFile);
                const uploadRes = await axios.post(`${import.meta.env.VITE_API_URL}/upload`, formData, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                });

                await axios.post(`${import.meta.env.VITE_API_URL}/stories`, {
                    img: uploadRes.data,
                    userId: currentUser._id
                }, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                });
                window.location.reload();
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div className="flex gap-2 h-60 mb-8 overflow-scroll">
            <div className="flex-none w-36 h-full rounded-lg overflow-hidden relative">
                <img src={currentUser.profilePic} alt="" className="w-full h-full object-cover" />
                <span className="absolute bottom-2 left-2 text-white font-bold text-xs">{currentUser.name}</span>
                <input
                    type="file"
                    id="storyInput"
                    style={{ display: "none" }}
                    onChange={handleAddStory}
                />
                <label htmlFor="storyInput" className="absolute bottom-10 left-2 text-white bg-purple-500 rounded-full w-8 h-8 flex items-center justify-center text-xl cursor-pointer">+</label>
            </div>
            {stories.map(story => (
                <div className="flex-none w-36 h-full rounded-lg overflow-hidden relative" key={story._id}>
                    <img src={story.img.startsWith("http") ? story.img : `${import.meta.env.VITE_API_URL}/assets/${story.img}`} alt="" className="w-full h-full object-cover" />
                    <span className="absolute bottom-2 left-2 text-white font-bold text-xs">{story.userId.username}</span>
                </div>
            ))}
        </div>
    );
};

export default Stories;
