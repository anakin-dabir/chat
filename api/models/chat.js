import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema(
    {
        user1: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        user2: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        lastMessage: String,
    },
    {
        timestamps: true,
        collection: 'Chat'
    }
);
export default mongoose.model('Chat', chatSchema);
