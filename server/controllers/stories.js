import Story from "../models/Story.js";
import User from "../models/User.js";

export const createStory = async (req, res) => {
    try {
        const { userId, mediaUrl, mediaType } = req.body;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Expires in 24 hours
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

        const newStory = new Story({
            userId,
            mediaUrl,
            mediaType,
            expiresAt,
        });

        await newStory.save();
        res.status(201).json(newStory);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

export const getStories = async (req, res) => {
    try {
        // Get all valid stories (not expired)
        // Mongoose TTL index handles deletion, but we can also filter query
        const stories = await Story.find({ expiresAt: { $gt: new Date() } }).populate("userId", "username profilePic");
        res.status(200).json(stories);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
