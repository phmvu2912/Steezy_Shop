import mongoose, { Schema } from 'mongoose';

const authSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: String,
        default: "customer"
    }
})

export default mongoose.model('Auth', authSchema);