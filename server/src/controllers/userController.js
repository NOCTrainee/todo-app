import { addUser as addUserModel, chkMail} from "../models/userModel.js";
import { signupSchema,loginSchema } from "../validators/authValidator.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const addUser = async(req,res)=> {
    try{
        const {name,email,password} = req.body;

        const registerValidation = signupSchema.safeParse(req.body);
        // console.log(registerValidation);
        
        if(!registerValidation.success){
            console.log("Zod errors:", registerValidation.error.issues);
            return res.status(400).json({message:"Invalid Input!",errors:registerValidation.error.issues});
        }
        const existingUser = await chkMail(email);
        console.log("register user : ",existingUser);
        
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

const loginUser = async(req,res)=>{
    try{
        const {email,password} = req.body;

        const loginValidation = loginSchema.safeParse(req.body);

        if(!loginValidation.success){
            console.log("Zod errors:", loginValidation.error.issues);
            return res.status(400).json({message:"Invalid Input!",errors:loginValidation.error.issues});
        }

        const existingUser = await chkMail(email);
        if(!existingUser || existingUser.length===0){
            return res.status(400).json({message:"Account not found, Register now"});
        }
        const user = existingUser[0];
        // console.log("loginn: ",user);
        const verifyUser = await bcrypt.compare(
            password,user.password
        );
        if(!verifyUser){
            return res.status(400).json({message:"Invalid email or password"});
        }

        const token = jwt.sign({id:user.id,email:user.email},
            process.env.JWT_SECRET,{ expiresIn: '1h'}
        );

        res.cookie("token",token,{
            httpOnly: true,
            secure: false,
            maxAge: 60*60*100
        });

        return res.status(200).json({message:"Login Successful"});
        alert("Login Successful");
    }catch(err){
        console.error("Cant fetch the user : ",err);
        return res.status(500).json({
            message: "Something went wrong while fetching user details."
        });
    }
}

export {addUser, loginUser}