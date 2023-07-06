import mongoose from "mongoose";

const schema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: [true, "Please enter address"],
        },
        city: {
            type: String,
            required: [true, "Please enter city"],
        },
        country: {
            type: String,
            required: [true, "Please enter country"],
        },
        zipCode: {
            type: Number,
            required: [true, "Please enter zip code"],
        },
    },
    orderItems: [
        {
            name: {
                type: String,
                required: [true, "Please enter name"],
            },
            price: {
                type: Number,
                required: [true, "Please enter price"],
            },
            quantity: {
                type: Number,
                required: [true, "Please enter quantity"],
            },
            image: {
                type: String,
                required: [true, "Please enter image"],
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
        },
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ["COD", "ONLINE"],
        default: "COD",
    },
    paidAt: Date,
    paymentInfo: {
        id: String,
        status: String,
    },
    itemsPrice: {
        type: Number,
        required: true,
    },
    taxPrice: {
        type: Number,
        required: true,
    },
    shippingCharges: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    orderStatus: {
        type: String,
        enum: ["preparing", "shipped", "delivered"],
        default: "preparing",
    },
    deliveredAt: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Order = mongoose.model("Order", schema);
