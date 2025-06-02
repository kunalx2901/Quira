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

export const generateStreamToken = async()=>{

}