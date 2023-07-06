import { asyncError } from "../middlewares/error.js";
import { User } from "../models/user.js";
import ErrorHandler from "../utils/error.js";
import {
    cookieOptions,
    getDataUri,
    sendEmail,
    sendToken,
} from "../utils/features.js";
import cloudinary from "cloudinary";

export const login = asyncError(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    // Handle user not found
    if (!user) {
        return next(new ErrorHandler("User not found", 400));
    }

    if (!password) return next(new ErrorHandler("Please enter password", 400));

    const isMatched = await user.comparePassword(password);

    if (!isMatched) {
        return next(new ErrorHandler("Invalid credentials", 400));
    }

    sendToken(user, res, `Welcome back, ${user.name}`, 200);
});

export const signup = asyncError(async (req, res, next) => {
    const { name, email, password, address, city, country, zipCode } = req.body;

    let user = await User.findOne({ email });

    if (user) {
        return next(new ErrorHandler("User already exists", 400));
    }

    let avatar = undefined;

    if (req.file) {
        const file = getDataUri(req.file);
        // Add cloudinary here
        const myCloud = await cloudinary.v2.uploader.upload(file.content);
        avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
    }

    user = await User.create({
        name,
        email,
        password,
        address,
        avatar,
        city,
        country,
        zipCode,
    });

    sendToken(user, res, "Account Registered Successfully", 201);

    // res.status(201).json({
    //   success: true,
    //   message: "Account Registered Successfully",
    // });
});

export const getMyProfile = asyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    res.status(200).json({
        success: true,
        user,
    });
});

export const updateProfile = asyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    const { name, email, address, city, country, zipCode } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;
    if (address) user.address = address;
    if (city) user.city = city;
    if (country) user.country = country;
    if (zipCode) user.zipCode = zipCode;

    await user.save();

    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
    });
});

export const changePassword = asyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id).select("+password");
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword)
        return next(
            new ErrorHandler("Please enter both old and new password", 400)
        );

    const isMatched = await user.comparePassword(oldPassword);

    if (!isMatched) return next(new ErrorHandler("Old password is incorrect"));

    user.password = newPassword;
    await user.save();

    res.status(200).json({
        success: true,
        message: "Password updated successfully",
    });
});

export const updatePic = asyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    const file = getDataUri(req.file);
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    const myCloud = await cloudinary.v2.uploader.upload(file.content);
    user.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
    };

    await user.save();

    res.status(200).json({
        success: true,
        message: "Profile picture updated successfully",
    });
});

export const logOut = asyncError(async (req, res, next) => {
    res.status(200)
        .cookie("token", "", {
            ...cookieOptions,
            expires: new Date(Date.now()),
        })
        .json({
            success: true,
            message: "Logged out successfully",
        });
});

export const forgetpassword = asyncError(async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return next(new ErrorHandler("User not found", 400));
    // max,min 2000,10000
    const randomNumber = Math.random() * (999999 - 100000) + 100000;
    const otp = Math.floor(randomNumber);
    const otp_expire = 15 * 60 * 1000;

    user.otp = otp;
    user.otp_expire = Date.now() + otp_expire;
    console.log(otp);
    const message = `Your OTP is ${otp} and it is valid for 15 minutes`;
    await user.save();

    try {
        await sendEmail("OTP for password reset", user.email, message);
    } catch (error) {
        user.opt = null;
        user.otp_expire = null;
        await user.save();
        return next(error);
    }

    res.status(200).json({
        success: true,
        message: `Email sent to ${user.email}`,
    });
});

export const resetpassword = asyncError(async (req, res, next) => {
    const { otp, password } = req.body;

    const user = await User.findOne({
        otp,
        otp_expire: { $gt: Date.now() },
    });

    if (!user) return next(new ErrorHandler("Invalid OTP or expired", 400));
    if (!password) return next(new ErrorHandler("Please enter password", 400));

    user.password = password;
    user.otp = undefined;
    user.otp_expire = undefined;

    await user.save();

    res.status(200).json({
        success: true,
        message: "Password reset successfully",
    });
});
