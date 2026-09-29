import { addUser as addUserModel, chkMail} from "../models/userModel.js";

const addUser = async(req,res)=> {
    try{
        const {name,email,password} = req.body;  
        const existingUser = await chkMail(email);

        if(existingUser.length>0)
        {
            console.error("Mail ID already in use, either login or use different mail to create a new account");
            return res.status(400).json("Mail ID already in use, either login or use different mail to create a new account");
        }
        const newUser = await addUserModel({name,email,password});
        res.status(200).json("New User registered : " + newUser);
    }catch(err){
        console.error("Cant add the user : ",err);
    }
}

export {addUser}