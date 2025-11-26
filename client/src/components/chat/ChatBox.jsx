import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";

const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage }) => {
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const scroll = useRef();

    // Fetching data for header
    useEffect(() => {
        const userId = chat?.participants?.find((id) => id !== currentUser);
        const getUser = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                });
                setUserData(data);
            } catch (error) {
                console.log(error);
            }
        };
        if (chat !== null) getUser();
    }, [chat, currentUser]);

    // Fetching messages
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/chat/message/${chat._id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                });
                setMessages(data);
            } catch (error) {
                console.log(error);
            }
        };
        if (chat !== null) fetchMessages();
    }, [chat]);

    // Receive Message
    useEffect(() => {
        if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
            setMessages([...messages, receivedMessage]);
        }
    }, [receivedMessage]);

    const handleSend = async (e) => {
        e.preventDefault();
        const message = {
            senderId: currentUser,
            text: newMessage,
            chatId: chat._id,
        };

        // Send to socket server
        const receiverId = chat.participants.find((id) => id !== currentUser);
        setSendMessage({ ...message, receiverId });

        // Send to database
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/chat/message`, message, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setMessages([...messages, data]);
            setNewMessage("");
        } catch (error) {
            console.log(error);
        }
    };

    // Scroll to last message
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="ChatBox-container bg-white rounded-2xl grid grid-rows-[14vh_60vh_13vh] h-full">
            {chat ? (
                <>
                    {/* Chat Header */}
                    <div className="chat-header p-4 flex flex-col">
                        <div className="follower flex items-center gap-4">
                            <img
                                src={userData?.profilePic || "https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600"}
                                alt=""
                                className="followerImage w-12 h-12 rounded-full object-cover"
                            />
                            <div className="name text-sm flex flex-col">
                                <span className="font-bold">{userData?.username}</span>
                            </div>
                        </div>
                        <hr className="w-[95%] border border-gray-200 mt-4 mx-auto" />
                    </div>

                    {/* Chat Body */}
                    <div className="chat-body flex flex-col gap-2 p-4 overflow-scroll">
                        {messages.map((message) => (
                            <div
                                ref={scroll}
                                className={
                                    message.senderId === currentUser
                                        ? "message own flex justify-end"
                                        : "message flex justify-start"
                                }
                                key={message._id || Math.random()}
                            >
                                <div className={`p-3 rounded-lg max-w-[28rem] w-fit flex flex-col gap-2 text-white ${message.senderId === currentUser ? "bg-purple-500 rounded-br-none" : "bg-gray-400 rounded-bl-none"}`}>
                                    <span>{message.text}</span>
                                    <span className="text-xs text-gray-200 self-end">{format(message.createdAt)}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Chat Sender */}
                    <div className="chat-sender flex justify-between items-center gap-4 h-14 p-4 bg-white self-end rounded-2xl">
                        <div className="bg-gray-200 rounded-full flex items-center justify-center font-bold cursor-pointer p-2">+</div>
                        <InputEmoji
                            value={newMessage}
                            onChange={setNewMessage}
                            cleanOnEnter
                            placeholder="Type a message"
                        />
                        <div className="send-button button bg-purple-500 text-white p-2 px-4 rounded-lg cursor-pointer" onClick={handleSend}>
                            Send
                        </div>
                    </div>
                </>
            ) : (
                <span className="chatbox-empty-message flex self-center justify-center text-xl text-gray-400">
                    Tap on a chat to start conversation...
                </span>
            )}
        </div>
    );
};

export default ChatBox;
