import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter name"],
    },
    description: {
        type: String,
        required: [true, "Please enter description"],
    },
    price: {
        type: Number,
        required: [true, "Please enter price"],
    },
    stock: {
        type: Number,
        required: [true, "Please enter stock"],
    },
    images: [{ public_id: String, url: String }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Product = mongoose.model("Product", schema);
