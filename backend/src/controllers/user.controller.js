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