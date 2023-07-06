import { app } from "./app.js";
import cloudinary from "cloudinary";
import { connectDB } from "./data/database.js";
import Stripe from "stripe";

connectDB();

export const stripe = new Stripe(process.env.STRIPE_API_SECRET);

cloudinary.v2.config({
    cloud_name: process.env.COUDINARY_NAME,
    api_key: process.env.COUDINARY_API_KEY,
    api_secret: process.env.COUDINARY_API_SECRET,
});

app.listen(process.env.PORT, () => {
    console.log(
        `Server listening on port ${process.env.PORT}, in ${process.env.NODE_ENV} mode.`
    );
});
