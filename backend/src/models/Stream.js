import {StreamChat }from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STREAM_KEY;
const apiSecretKey = process.env.STREAM_SECRET;

const streamClient = new StreamChat(apiKey, apiSecretKey);

export const createStreamUser = async(userData)=>{
    try{
        await streamClient.upsertUsers([userData]);
        return userData;
    }catch(e){
        console.error("Error while creating Stream user");
    }
}

export const generateStreamToken = async(userId)=>{
    try{
        // ensure that the id is always a string
        const userIdStr = userId.toString();
        return streamClient.createToken(userIdStr);
    }catch(e){
        console.error("Error while generating Stream token");
    }
}