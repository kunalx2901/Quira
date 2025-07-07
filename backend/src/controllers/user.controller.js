import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";

export async function getRecommendedUser(req,res){
    try {
    const currentUserId = req.user.id;
    const currentUser = await User.findById(currentUserId).select("friends");

    // Build an exclusion list
    const excludeIds = [currentUserId, ...currentUser.friends];

    const recommendedUsers = await User.find({
        _id: { $nin: excludeIds },
        isOnBoarded: true
    }).select("fullName profileAvatar location bio"); // only select required fields

    // console.log("Recommended users:", recommendedUsers);

    res.status(200).json(recommendedUsers);

    } catch (error) {
        console.error("Error in showing recommended users", error);
        res.status(500).json({ message: "Error in showing recommended users" });
    }

}

export async function getFriends(req, res) {
  try {
    const user = await User.findById(req.user.id)
      .select("friends")
      .populate({
        path: "friends",
        select: "fullName profileAvatar location bio",
      });

    res.status(200).json(user.friends);
  } catch (e) {
    console.error("❌ Error while loading friends list:", e);
    res.status(500).send("Error while loading friend list");
  }
}


export async function sendFriendRequest(req,res){
    try {
        const senderId = req.user.id;
        const { id: recipientId} = req.params;

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

export async function acceptFriendRequest(req,res){
    try{
        const {id:requestId} = req.params;

        const friendRequest = await FriendRequest.findById(requestId);
        if(!friendRequest){
            return res.status(401).json({msg:"Error in fecthing details of the reuest"});
        }

        //sender can not accept the request sent
        if(friendRequest.recipient.toString() !== req.user.id){
            return res.status(401).json({msg:"You are not the recipient of this request"});
        }

        friendRequest.status = "accepted";
        await friendRequest.save();

        // adding the user's in each other's friends list 
        await User.findByIdAndUpdate(friendRequest.sender,{
            $addToSet:{
                friends:friendRequest.recipient
            }
        });

        await User.findByIdAndUpdate(friendRequest.recipient,{
            $addToSet:{
                friends:friendRequest.sender
            }
        });

        res.status(200).json({msg:"Friend Request Accepted !"});
    }catch(error){
        console.log("Error in Accepting Request: ", error);
        res.status(500).json({msg:"Error in Accepting Request"});
    }
}

export async function getFriendRequest(req,res){
    try{
        // request that i haven't accepted 
        const incomingRequest = await FriendRequest.find({
            recipient:req.user.id,
            status:"pending"
        }).populate("sender","fullName profileAvatar location");

        // request that i have accepted 
        const acceptedRequest = await FriendRequest.find({
            sender:req.user.id,
            status:"accepted"
        }).populate("recipient","fullName profileAvatar bio location");

        res.status(200).json({incomingRequest , acceptedRequest})
    }catch(e){
        console.log("error in fetching the incoming request ", e);
        res.status(500).json({msg:"error in fetching the incoming request"});
    }
}

export async function getOutgoingRequest(req,res){
    try{
        const outgoingRequest = await FriendRequest.find({
            sender:req.user.id,
            status:"pending"
        }).populate("recipient","_id fullName profileAvatar location");

        if(!outgoingRequest){
            return res.status(401).json({msg:"Unable to find outgoing request"});
        }

        res.status(200).json(outgoingRequest);
    }catch(e){
        console.log("error in fetching the Outgoing Request: ", e);
        res.status(500).json("error in fetching the Outgoing Request ");
    }
}