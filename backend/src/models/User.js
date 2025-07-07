import mongoose from "mongoose";
import bcrypt from "bcryptjs"
const userSchema = mongoose.Schema({
   
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    profileAvatar:{
        type:String,
    },
    bio:{
        type:String
    },
    location:{
        type:String
    },
    isOnBoarded:{
        type:Boolean,
        default:false
    },

    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]

},{timestamps:true});

// hashing the password before saving details in the DB
userSchema.pre("save",async function(next){

    if(!this.isModified("password")) return next();

    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt);
        next();
    }catch(e){
        next(e);
    }

})


userSchema.methods.matchPassword = async function(enteredPassword){
    const isPasswordCorrect = await bcrypt.compare(enteredPassword, this.password);
    return isPasswordCorrect;
}

const User = mongoose.model("User",userSchema);


export default User;