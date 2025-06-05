import express from "express";
import { getRecommendedUser, getFriends, sendFriendRequest } from "../controllers/user.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js"

const router = express.Router();

router.use(protectRoute);

router.get("/", getRecommendedUser);
router.get("/", getFriends);
router.post("/friend-request/:id",sendFriendRequest);
router.put("/friend-request/:id/accept",acceptFriendRequest);

router.get("/friend-requests", getFriendRequest);

export default router;
