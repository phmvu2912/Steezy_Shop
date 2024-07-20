import mongoose, { Schema } from "mongoose";

const categorySchema = Schema({
    name: {
        type: String,
        required: true
    }
},
    { timestamps: true, versionKey: false }
);

export default mongoose.model('Category', categorySchema);