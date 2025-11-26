import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import storyRoutes from "./routes/stories.js";
import chatRoutes from "./routes/chat.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
}));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/users", userRoutes);
app.use("/stories", storyRoutes);
app.use("/chat", chatRoutes);

const PORT = process.env.PORT || 5000;

console.log("Connecting to MongoDB...", process.env.MONGO_URI);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("new-user-add", (newUserId) => {
        if (!activeUsers.some((user) => user.userId === newUserId)) {
            activeUsers.push({ userId: newUserId, socketId: socket.id });
        }
        console.log("Connected Users", activeUsers);
        io.emit("get-users", activeUsers);
    });

    socket.on("send-message", (data) => {
        const { receiverId } = data;
        const user = activeUsers.find((user) => user.userId === receiverId);
        console.log("Sending from socket to :", receiverId);
        console.log("Data: ", data);
        if (user) {
            io.to(user.socketId).emit("receive-message", data);
        }
    });

    socket.on("disconnect", () => {
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
        console.log("User disconnected:", socket.id);
        io.emit("get-users", activeUsers);
    });
});

let activeUsers = [];

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
