import { asyncError } from "../middlewares/error.js";
import { User } from "../models/user.js";
import ErrorHandler from "../utils/error.js";
import { sendToken } from "../utils/features.js";

export const login = asyncError(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  // Handle user not found
  if (!user) {
    return next(new ErrorHandler("User not found", 400));
  }

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
  // Add cloudinary here

  user = await User.create({
    name,
    email,
    password,
    address,
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
  res.send("Hello");
});
