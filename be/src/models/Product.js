import mongoose, { Schema } from "mongoose";

const productSchema = Schema({
    title: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    images: Array,
    price: {
        type: Number,
        required: true,
        default: 0
    },
    discount: Number,

    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    stock: {
        type: number,
        required: true
    },
    rating: Number,

    description: String
},
    { timestamps: true, versionKey: false }
);

export default mongoose.model('Product', productSchema);