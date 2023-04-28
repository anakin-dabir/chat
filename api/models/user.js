import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: { type: String, unique: true },
        isOrg: Boolean,
        img: String,
    },
    {
        timestamps: true,
        collection: 'Users',
    }
)
export default mongoose.model('User', userSchema);