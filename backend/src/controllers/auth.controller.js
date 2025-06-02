import zod from "zod";
import User from "../models/User.js";
import jwt from "jsonwebtoken"


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