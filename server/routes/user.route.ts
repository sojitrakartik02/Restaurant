import express from "express";
import { checkAuth, forgotPassword, login, logout, resetPassword, signup, updateProfile, verifyEmail } from "../controller/user.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import upload from "../middlewares/multer";
const router = express.Router();
// http://localhost:8000/api/v1/user/signup
router.route("/check-auth").get(isAuthenticated, checkAuth);
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/verify-email").post(verifyEmail);
router.route("/forgot-password").post(forgotPassword);

router.route("/reset-password/:token").post(resetPassword);
router.route("/profile/update").put(isAuthenticated, upload.single('profilePicture'), updateProfile);

export default router;

