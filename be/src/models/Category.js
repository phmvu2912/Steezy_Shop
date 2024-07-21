import mongoose, { Schema } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
},
    { timestamps: true, versionKey: false }
);

categorySchema.plugin(mongoosePaginate);

export default mongoose.model('Category', categorySchema);