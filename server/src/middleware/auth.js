import jwt from "jsonwebtoken";
import 'dotenv/config';
import { chkMail } from "../models/userModel.js";

export const auth = async(req,res,next)=>{
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message:"Not authorized, no token"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const userDetails = await chkMail(decoded.email);
        if(userDetails.length === 0){
            return res.status(401).json({message:"Not authorized, user not found"});
        }
        req.userDetails = userDetails[0];       
        next();
    }catch(err){
        console.error("Error in auth middleware: ",err);
        return res.status(500).json({message:"Not authorized, token failed"});
    }
}