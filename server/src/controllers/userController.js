import { addUser as addUserModel, chkMail} from "../models/userModel.js";
import { signupSchema } from "../validators/authValidator.js";
import bcrypt from 'bcryptjs';

const addUser = async(req,res)=> {
    try{
        const {name,email,password} = req.body;

        const registerValidation = signupSchema.safeParse(req.body);
        console.log(registerValidation);
        
        if(!registerValidation.success){
            console.log("Zod errors:", registerValidation.error.issues);
            return res.status(400).json({message:"Invalid Input!",errors:registerValidation.error.issues});
        }
        const existingUser = await chkMail(email);
        
        if(existingUser.length>0)
        {
            console.error("Mail ID already in use, either login or use different mail to create a new account");
            return res.status(400).json({message:"Mail ID already in use, either login or use different mail to create a new account"});
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltRounds);
        
        const newUser = await addUserModel({name,email,password:hashedPassword});
        res.status(200).json({message:"Account registered Successfully"});
    }catch(err){
        console.error("Cant add the user : ",err);
        return res.status(500).json({
            message: "Something went wrong while registering the user."
        });
    }
}

export {addUser}