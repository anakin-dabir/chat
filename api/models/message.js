import mongoose from "mongoose"



const messageSchema = new mongoose.Schema(
    {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        message: String,
        image: String,
    },
    {
        timestamps: true,
        collection: 'Messages'
    }
);
export default mongoose.model('Message', messageSchema);