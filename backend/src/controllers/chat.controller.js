
export const getStreamToken = (req,res)=>{
    try{
        const token = generateStreamToken(req.user.id);
        res.status(200).json({token});
    }catch(e){
        console.log("error in getStreamToken Controller: ", e);
        res.status(500).json({error: "error in getStreamToken Controller"});
    }
}