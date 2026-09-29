import { addUser as addUserModel, chkMail} from "../models/userModel.js";

const addUser = async(req,res)=> {
    try{
        const {name,email,password} = req.body;  
        const existingUser = await chkMail(email);

        if(existingUser.length>0)
        {
            console.error("Mail ID already in use, either login or use different mail to create a new account");
            return res.status(400).json({message:"Mail ID already in use, either login or use different mail to create a new account"});
        }
        const newUser = await addUserModel({name,email,password});
        res.status(200).json({message:"Account registered Successfully"});
    }catch(err){
        console.error("Cant add the user : ",err);
        return res.status(500).json({
            message: "Something went wrong while registering the user."
        });
    }
}

export {addUser}