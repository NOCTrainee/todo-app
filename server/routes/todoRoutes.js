import { Router } from "express";
import { createTodo,deleteTodo,getTodos,updateTodo, getTodoById} from "../src/controllers/todoController.js";
import {auth} from "../src/middleware/auth.js";

const router = Router();

router.get('/',auth,getTodos);
router.post('/',auth,createTodo);
router.patch('/:id',auth,updateTodo);
router.delete('/:id',auth,deleteTodo);
router.get('/:id',auth,getTodoById);

export default router;