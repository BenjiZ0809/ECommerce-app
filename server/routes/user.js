import express from "express";
import { login, signup, getMyProfile } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", login); // http://localhost:5000/user/login

router.post("/new", signup); // http://localhost:5000/user/new

router.get("/me", isAuthenticated, getMyProfile);

export default router;
