import Chat from "../models/Chat.js";

export const createChat = async (req, res) => {
    const { senderId, receiverId } = req.body;
    try {
        const chat = await Chat.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (chat) return res.status(200).json(chat);

        const newChat = new Chat({
            participants: [senderId, receiverId],
        });
        const result = await newChat.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const userChats = async (req, res) => {
    try {
        const chat = await Chat.find({
            participants: { $in: [req.params.userId] },
        });
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const findChat = async (req, res) => {
    try {
        const chat = await Chat.findOne({
            participants: { $all: [req.params.firstId, req.params.secondId] },
        });
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const addMessage = async (req, res) => {
    const { chatId, senderId, text, mediaUrl } = req.body;
    try {
        const chat = await Chat.findById(chatId);
        if (!chat) return res.status(404).json({ message: "Chat not found" });

        const newMessage = {
            senderId,
            text,
            mediaUrl,
            createdAt: new Date(),
        };

        chat.messages.push(newMessage);
        await chat.save();
        res.status(200).json(newMessage);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getMessages = async (req, res) => {
    const { chatId } = req.params;
    try {
        const chat = await Chat.findById(chatId);
        if (!chat) return res.status(404).json({ message: "Chat not found" });
        res.status(200).json(chat.messages);
    } catch (error) {
        res.status(500).json(error);
    }
};
