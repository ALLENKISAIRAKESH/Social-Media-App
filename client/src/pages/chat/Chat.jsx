import { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Conversation from "../../components/chat/Conversation";
import ChatBox from "../../components/chat/ChatBox";
import { io } from "socket.io-client";
import axios from "axios";

const Chat = () => {
    const { currentUser } = useContext(AuthContext);
    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);
    const socket = useRef();

    useEffect(() => {
        socket.current = io(import.meta.env.VITE_API_URL);
        socket.current.emit("new-user-add", currentUser._id);
        socket.current.on("get-users", (users) => {
            setOnlineUsers(users);
        });
    }, [currentUser]);

    // Send Message to socket server
    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit("send-message", sendMessage);
        }
    }, [sendMessage]);

    // Receive Message from socket server
    useEffect(() => {
        socket.current.on("receive-message", (data) => {
            setReceivedMessage(data);
        });
    }, []);

    useEffect(() => {
        const getChats = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/chat/${currentUser._id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                });
                setChats(data);
            } catch (error) {
                console.log(error);
            }
        };
        getChats();
    }, [currentUser]);

    return (
        <div className="Chat relative grid grid-cols-[22%_auto] gap-4 h-[calc(100vh-56px)] p-4 bg-gray-100">
            {/* Left Side */}
            <div className="Left-side-chat flex flex-col gap-4">
                <div className="Chat-container flex flex-col gap-4 bg-white rounded-2xl p-4 h-auto min-h-[80vh] overflow-scroll">
                    <h2 className="font-bold text-xl">Chats</h2>
                    <div className="Chat-list flex flex-col gap-4">
                        {chats.map((chat) => (
                            <div onClick={() => setCurrentChat(chat)} key={chat._id}>
                                <Conversation
                                    data={chat}
                                    currentUserId={currentUser._id}
                                    online={false} // Todo: check online status
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className="Right-side-chat flex flex-col gap-4">
                <ChatBox
                    chat={currentChat}
                    currentUser={currentUser._id}
                    setSendMessage={setSendMessage}
                    receivedMessage={receivedMessage}
                />
            </div>
        </div>
    );
};

export default Chat;
