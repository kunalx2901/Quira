import express from "express";
import { getRecommendedUser, getFriends, sendFriendRequest, 
       acceptFriendRequest, getFriendRequest, 
       getOutgoingRequest} from "../controllers/user.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js"

const router = express.Router();

router.use(protectRoute);

router.get("/getUsers", getRecommendedUser);
router.get("/getFriends", getFriends);
router.post("/friend-request/:id",sendFriendRequest);
router.put("/friend-request/:id/accept",acceptFriendRequest);

router.get("/friend-requests", getFriendRequest);
router.get("/outgoing-requests", getOutgoingRequest);

export default router;
