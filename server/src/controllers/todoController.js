import { addTodo, getTodoByUserId, getTodoById, updateTodo as updatetodo, deleteTodo as delTodo } from '../models/todoModel.js';
import { createTodoSchema, updateTodoSchema } from '../validators/todoValidator.js';

const createTodo = async (req, res) => {
    try {
        const { title } = req.body;
        const todoValidation = createTodoSchema.safeParse(req.body);

        if (!todoValidation.success) {
            console.log("Zod errors : ", todoValidation.error.issues);
            return res.status(400).json({ message: "Invalid Input!", errors: todoValidation.error.issues });
        }

        const userId = req.userDetails.id;
        const newTodo = await addTodo({ title, user_id: userId });
        return res.status(200).json({ message: "Todo created successfully", todo: newTodo[0] });
    } catch (err) {
        console.error("Cant create todo : ", err);
        return res.status(500).json({message: "Something went wrong while creating the todo"});
    }
}

const getTodos = async (req, res) => {
    try{
        const userId = req.userDetails.id;
        const todos = await getTodoByUserId(userId);
        return res.status(200).json({todos});
    }catch(err){
        console.error("Cant fetch todo : ", err);
        return res.status(500).json({message: "Something went wrong while fetching the todo"});
    }
}

const updateTodo = async(req,res) => {
    try{
        const updateValidation = updateTodoSchema.safeParse(req.body);
        if(!updateValidation.success){
            console.log("Zod errors : ", updateValidation.error.issues);
            return res.status(400).json({message:"Invalid Input!",errors:updateValidation.error.issues});
        }

        const userId = req.userDetails.id;
        const {id} = req.params;
        const updatedTodo = await updatetodo(id,userId,req.body);
        return res.status(200).json({message: "Todo updated successfully", todo: updatedTodo[0]});
    }catch(err){
        console.error("Cant update todo : ",err);
        return res.status(500).json({message: "Something went wrong while updating the todo"})
    }
}

const deleteTodo = async(req,res) => {
    try{
        const userId = req.userDetails.id;
        const {id} = req.params;
        const deletedTodo = await delTodo(id,userId);
        if(deletedTodo === 0){
            return res.status(404).json({message: "Todo not found"});
        }
        return res.status(200).json({message: "Todo deleted successfully"});
    }catch(err){
        console.error("Cant delete todo : ",err);
        return res.status(500).json({message: "Something went wrong while deleting the todo"})
    }
}

export { createTodo, getTodos, updateTodo, deleteTodo };