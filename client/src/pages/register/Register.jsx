import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
        name: "",
    });
    const [err, setErr] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, inputs);
            navigate("/login");
        } catch (err) {
            setErr(err.response.data.error || "Something went wrong");
        }
    };

    return (
        <div className="h-screen bg-purple-200 flex items-center justify-center">
            <div className="w-1/2 flex bg-white rounded-lg overflow-hidden min-h-[600px] shadow-2xl flex-row-reverse">
                <div className="flex-1 bg-purple-400 p-12 flex flex-col gap-8 text-white bg-[url('https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center">
                    <h1 className="text-8xl font-bold">Lama Social.</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
                        alias totam numquam ipsa exercitationem dignissimos, error nam,
                        consequatur.
                    </p>
                    <span className="text-sm">Do you have an account?</span>
                    <Link to="/login">
                        <button className="w-1/2 p-2 bg-white text-purple-600 font-bold cursor-pointer">
                            Login
                        </button>
                    </Link>
                </div>
                <div className="flex-1 p-12 flex flex-col gap-12 justify-center">
                    <h1 className="text-4xl text-gray-600 font-bold">Register</h1>
                    <form className="flex flex-col gap-8">
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            onChange={handleChange}
                            className="border-b border-gray-300 p-4"
                        />
                        <input
                            type="email"
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
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            onChange={handleChange}
                            className="border-b border-gray-300 p-4"
                        />
                        {err && <div className="text-red-500">{err}</div>}
                        <button
                            onClick={handleClick}
                            className="w-1/2 p-2 bg-purple-500 text-white font-bold cursor-pointer"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
