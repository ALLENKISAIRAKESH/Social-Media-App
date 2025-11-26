import Stories from "../../components/stories/Stories";
import Posts from "../../components/posts/Posts";
import Share from "../../components/share/Share";

const Home = () => {
    return (
        <div className="p-5 bg-gray-100 min-h-[calc(100vh-56px)]">
            <Stories />
            <Share />
            <Posts />
        </div>
    );
};

export default Home;
