import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

const Login = () => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });
    const [err, setErr] = useState(null);

    const navigate = useNavigate();
    const { login, setCurrentUser } = useContext(AuthContext);

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, inputs);
            setCurrentUser(res.data.user);
            // Store token in localStorage or cookie (simplified for now)
            localStorage.setItem("token", res.data.token);
            navigate("/");
        } catch (err) {
            setErr(err.response.data.msg || "Something went wrong");
        }
    };

    return (
        <div className="h-screen bg-purple-200 flex items-center justify-center">
            <div className="w-1/2 flex bg-white rounded-lg overflow-hidden min-h-[600px] shadow-2xl">
                <div className="flex-1 bg-purple-400 p-12 flex flex-col gap-8 text-white bg-[url('https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center">
                    <h1 className="text-8xl font-bold">Hello World.</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
                        alias totam numquam ipsa exercitationem dignissimos, error nam,
                        consequatur.
                    </p>
                    <span className="text-sm">Don't you have an account?</span>
                    <Link to="/register">
                        <button className="w-1/2 p-2 bg-white text-purple-600 font-bold cursor-pointer">
                            Register
                        </button>
                    </Link>
                </div>
                <div className="flex-1 p-12 flex flex-col gap-12 justify-center">
                    <h1 className="text-4xl text-gray-600 font-bold">Login</h1>
                    <form className="flex flex-col gap-8">
                        <input
                            type="text"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            className="border-b border-gray-300 p-4"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            className="border-b border-gray-300 p-4"
                        />
                        {err && <div className="text-red-500">{err}</div>}
                        <button
                            onClick={handleLogin}
                            className="w-1/2 p-2 bg-purple-500 text-white font-bold cursor-pointer"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
