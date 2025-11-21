import mongoose from "mongoose"
const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400, // TTL: Token will be removed automatically after 24 hour in seconds
    },
});

export const BlacklistTokenModel = mongoose.model('BlacklistToken', blacklistTokenSchema);
