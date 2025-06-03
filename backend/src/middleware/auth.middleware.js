import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

export const protectRoute = async (req,res,next)=>{

    try {        
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).send("Unauthoried Token");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(!decoded){
            return res.status(401).send("Unauthoried: Ivalid Token");
        }

        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(401).send("Unauthoried: User not found");
        }

        req.user = user;
        next();

    } catch (error) {
        console.error("Error in Protect Route ",error);
        res.status(500).send("Error in Protect Route"); 
    }
}