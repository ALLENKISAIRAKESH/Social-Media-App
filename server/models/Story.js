import mongoose from "mongoose";

const StorySchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        mediaUrl: { type: String, required: true },
        mediaType: { type: String, enum: ["image", "video"], default: "image" },
        expiresAt: { type: Date, required: true },
    },
    { timestamps: true }
);

// Index to automatically delete documents after they expire
StorySchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("Story", StorySchema);
