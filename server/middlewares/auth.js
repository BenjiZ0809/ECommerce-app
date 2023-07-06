import { User } from "../models/user.js";
import ErrorHandler from "../utils/error.js";
import jwt from "jsonwebtoken";
import { asyncError } from "./error.js";

export const isAuthenticated = asyncError(async (req, res, next) => {
    //   const token = req.cookies.token;
    const { token } = req.cookies;

    if (!token) return next(new ErrorHandler("Not logged in", 401));

    const decodeData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodeData._id);

    next();
});

export const isAdmin = asyncError(async (req, res, next) => {
    if (req.user.role !== "admin")
        return next(new ErrorHandler("Only admin allowed", 401));
    next();
});
