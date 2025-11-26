import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Stories = () => {
    const { currentUser } = useContext(AuthContext);

    // TEMPORARY DUMMY DATA
    const stories = [
        {
            id: 1,
            name: "John Doe",
            img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
        {
            id: 2,
            name: "John Doe",
            img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
        {
            id: 3,
            name: "John Doe",
            img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
        {
            id: 4,
            name: "John Doe",
            img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
    ];

    return (
        <div className="flex gap-2 h-60 mb-8 overflow-scroll">
            <div className="flex-none w-36 h-full rounded-lg overflow-hidden relative">
                <img src={currentUser.profilePic} alt="" className="w-full h-full object-cover" />
                <span className="absolute bottom-2 left-2 text-white font-bold text-xs">{currentUser.name}</span>
                <button className="absolute bottom-10 left-2 text-white bg-purple-500 rounded-full w-8 h-8 flex items-center justify-center text-xl cursor-pointer">+</button>
            </div>
            {stories.map(story => (
                <div className="flex-none w-36 h-full rounded-lg overflow-hidden relative" key={story.id}>
                    <img src={story.img} alt="" className="w-full h-full object-cover" />
                    <span className="absolute bottom-2 left-2 text-white font-bold text-xs">{story.name}</span>
                </div>
            ))}
        </div>
    );
};

export default Stories;
