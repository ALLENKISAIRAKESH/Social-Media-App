import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.following.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, username, profilePic, about }) => {
                return { _id, username, profilePic, about };
            }
        );
        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (user.following.includes(friendId)) {
            user.following = user.following.filter((id) => id !== friendId);
            friend.followers = friend.followers.filter((id) => id !== id);
        } else {
            user.following.push(friendId);
            friend.followers.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.following.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, username, profilePic, about }) => {
                return { _id, username, profilePic, about };
            }
        );

        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
