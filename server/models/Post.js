import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        caption: { type: String, default: "" },
        mediaUrl: { type: String, default: "" },
        mediaType: { type: String, enum: ["image", "video"], default: "image" },
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        comments: [
            {
                userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                text: { type: String, required: true },
                createdAt: { type: Date, default: Date.now },
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
