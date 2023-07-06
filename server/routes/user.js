import express from "express";
import {
  login,
  signup,
  getMyProfile,
  logOut,
  updateProfile,
  changePassword,
  updatePic,
  forgetpassword,
  resetpassword,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/login", login);

router.post("/new", singleUpload, signup);

router.get("/me", isAuthenticated, getMyProfile);

router.get("/logout", isAuthenticated, logOut);

// update routes
router.put("/updateprofile", isAuthenticated, updateProfile);

router.put("/changePassword", isAuthenticated, changePassword);

router.put("/updatepic", isAuthenticated, singleUpload, updatePic);

// forgot password & reset password
router.route("/forgetpassword").post(forgetpassword).put(resetpassword);

export default router;
