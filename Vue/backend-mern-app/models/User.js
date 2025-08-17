import { model, Schema } from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: { unique: true },
    },
    password: {
        type: String,
        required: true,
    }
});

userSchema.pre('save', async function(next) {

    if (!this.isModified('password')) return next();

    try {
        const salt = await bcryptjs.genSalt()
        this.password = await bcryptjs.hash(this.password, salt)
        next()
    } catch (error) {
        console.log(error);
        throw new Error('Error while hashing the password')
    }
})

userSchema.methods.comparePassword = async function(password) {
    return await bcryptjs.compare(password, this.password)
}

export default model('User', userSchema);
