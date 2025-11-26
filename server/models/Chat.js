import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
    {
        participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        messages: [
            {
                senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                text: { type: String, default: "" },
                mediaUrl: { type: String, default: "" },
                createdAt: { type: Date, default: Date.now },
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.model("Chat", ChatSchema);
