import z, { xid } from "zod";

export const signupSchema = z.object({
    name : z
    .string()
    .trim()
    .min(2,{message:"Name must be atleast 2 characters long"})
    .max(150,{message:"Name can not be longer than 150 characters"}),

    email: z
    .string()
    .trim()
    .email()
    .max(255,{message:"Email can not be longer than 255 characters"}),
    
    password: z
    .string()
    .min(3,{message:"Password must be atleast 3 characters long"})
    .max(180,{message:"Password can not be longer than 180 characters"})
});

export const loginSchema = z.object({
    email : z
    .email()
    .trim()
    .max(255,{message:"Email can not be longer than 255 characters"}),
    password: z
    .string()
    .max(180,{message:"Password can not be longer than 180 characters"})
})