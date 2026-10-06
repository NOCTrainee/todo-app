import z from "zod";

export const createTodoSchema = z.object({
    title: z
    .string()
    .trim()
    .min(3,{message:"Title must be atleast 3 characters long"})
    .max(255,{message:"Title can not be longer than 255 characters"})
});

export const updateTodoSchema = z.object({
    title: z
    .string()
    .trim()
    .min(3,{message:"Title must be atleast 3 characters long"})
    .max(255,{message:"Title can not be longer than 255 characters"})
    .optional(),
    completed: z
    .boolean()
    .optional()
})
