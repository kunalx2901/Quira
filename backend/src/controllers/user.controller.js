import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";

export async function getRecommendedUser(){
    try {
        
        const currentUserId = req.user.id;
        const currentUser = req.user;

        const recommendedUser = await User.findOne({
            $and:[
                {_id :{$ne:currentUserId}}, //exclude me from the list
                {friends:{$nin:currentUser.friends}} ,//exclude my friends from the list
                {isOnBoarded:true}
            ]
        });

        res.status(200).json(recommendedUser);

    } catch (error) {
        console.error("error in showing recommended user",error);
        res.status(500).json({message: "Error in showing recommended user"});
    }
}

export async function getFriends(){
    try{
        const users = await User.findById(req.user.id).select("friends")
        .populate("friends","fullName profileAvatar location bio") //this helps to get all the friends with all the given features like full name , avatar , bio , location
    
        res.status(200).json(users.friends);
    }catch(e){
        console.log("error while loading friends list",e);
        res.status(500).send('error while loading friend list');
    }
}

export async function sendFriendRequest(){
    try {
        const senderId = req.user.id;
        const { id: recipientId} = req.params.id;

        // you can't send request to yourself 
        if(senderId == recipientId){
            return res.status(401).json({msg:"Cannot Send Request To Yourself"});
        }

        // if recipient is not found 
        const recipient = await User.findById(recipientId);
        if(!recipient){
            return res.status(401).json({msg:"Recipient Not Found"});
        }

        if(recipient.friends.includes(senderId)){
            return res.status(401).json({msg:"Already Friend with the User"})
        }

        const existingRequest = await FriendRequest.findOne({
            $or:[
                {sender:senderId,recipient:recipientId},
                {sender:recipientId , recipient:senderId}
            ]
        });

        // friendRequest id already pending 
        if(existingRequest){
            return res.status(401).json({msg:"Friend request exists between you and the user !"});
        }

        const friendRequest = await FriendRequest.create({
            sender:senderId,
            recipient:recipientId
        })

        res.status(200).json(friendRequest);

    } catch (error) {
        console.log("Error in Sending Request: ",error);
        res.status(500).json({msg:"Error in Sending Request"});        
    }
}