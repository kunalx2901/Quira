import { generateStreamToken } from "../models/Stream.js";

export const getStreamToken = async(req,res)=>{
    try{
        const token = await generateStreamToken(req.user._id);
        res.status(200).json({token});
    }catch(e){
        console.log("error in getStreamToken Controller: ", e);
        res.status(500).json({error: "error in getStreamToken Controller"});
    }
}