import { model, Schema } from "mongoose";

const linkSchema = Schema({
    full: {
        type: String,
        required: true,
        trim: true,
    },
    nano: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})

export default model('Link', linkSchema);
