import zod from "zod";
import User from "../models/User.js";
import jwt from "jsonwebtoken"
import { createStreamUser } from "../models/Stream.js";
import { StreamChat } from "stream-chat";


export const signupSchema = zod.object({
    fullName:zod.string().min(1,"Full Name is Required !"),
    email:zod.string().email("Invalid Email !"),
    password:zod.string().min(6,"Password must be at least 6 characters !"),
});

export const signup = async (req,res)=>{    

   try{
     // checking the details that user has sent in the input
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
    return res.status(400).json({
      message: "Validation error",
      errors: parsed.error.flatten().fieldErrors,
    });
  }

    const {email,fullName,password} = parsed.data;
    // check if user already exists
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({msg:"User Already Exists"});
    }

    const idx = Math.floor(Math.random()*100);
    const profileAvatar = `https://avatar.iran.liara.run/public/${idx}`;

    // creating new user
    const newUser = await User.create({
        email,
        fullName,
        password,
        profileAvatar
    })

    try{
        await createStreamUser({
            id:newUser._id,
            name:newUser.fullName,
            image:newUser.profileAvatar
        })
        console.log(`Stream user created ${newUser.fullName}`)
    }catch(e){
        console.error("error while creating stream user",e);
    }

    const token = jwt.sign({userId:newUser._id},process.env.JWT_SECRET_KEY,{
        expiresIn:"7d"
    });

    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_ENV === "production",
    })

    res.status(201).json({success:true, user:newUser});

   }catch(e){
    console.log("Error in Signup ",e);
    res.status(500).json({
        msg:"Error while Signing up !"
    })
   }

}

export const login = async(req,res)=>{
   
    try{
        const {email,password} = req.body;
        if(!email || !password){
            res.status(404).send("All the fields are required ");
        }

        const user = await User.findOne({email});
        if(!user){
            res.status(401).send("Invalid email or password");
        }
        
        const isPasswordCorrect = await user.matchPassword(password);
        
        if(!isPasswordCorrect){
            res.status(401).send("Invalid email or password");
        }

        const token = await jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{
            expiresIn:"7d"
        });

        res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_ENV === "production",
        })

        res.status(200).send({success:true,user});

    }catch(e){
        console.log("Error in Login ",e);
        res.status(500).json({
            msg:"Error in login"
        });
    }
}

export const logout = (req,res)=>{ 
    res.clearCookie("jwt");
    res.status(200).send({success:true,message:"Logged out successfully"});
}

export const onboard = async(req,res)=>{
    try {
        
        const userId = req.user._id;
        const {fullName, bio, location} = req.body;
        if(!fullName || !bio || !location){
            return res.status(400).send("All Fields are required !");
        }

        const updatedUser = await User.findByIdAndUpdate(userId,{
            ...req.body,
            isOnBoarded:true
        },{new:true});

        if(!updatedUser){
            return res.status(404).send("User not found");
        }

        try {
            await createStreamUser({
                id:updatedUser._id.toString(),
                name:updatedUser.fullName,
                image:updatedUser.profileAvatar
            })
            console.log(`Stream user updated to ${updatedUser.fullName}`);
        } catch (error) {
            console.log("error in updating the Stream user ", error);
        }

        res.status(200).send({sucess:true,user:updatedUser});

    } catch (error) {
        console.log("Error while Onboarding!",error);
        res.status(500).send("Error while Onboarding !");
    }
}