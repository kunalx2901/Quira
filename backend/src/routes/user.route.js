import express from "express";
import { getRecommendedUser, getFriends } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getRecommendedUser);
router.get("/", getFriends);

export default router;
