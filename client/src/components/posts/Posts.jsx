import { useEffect, useState } from "react";
import Post from "../post/Post";
import axios from "axios";

const [posts, setPosts] = useState([]);
const [err, setErr] = useState(null);
const [isLoading, setIsLoading] = useState(false);

useEffect(() => {
    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setPosts(res.data);
        } catch (err) {
            setErr(err);
        }
        setIsLoading(false);
    };
    fetchPosts();
}, []);

return <div className="posts flex flex-col gap-12">
    {err ? "Something went wrong!" : (isLoading ? "Loading..." : posts.map(post => (
        <Post post={post} key={post._id} />
    )))}
</div>;

export default Posts;
