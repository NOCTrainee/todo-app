import { Router } from "express";
import { createTodo,deleteTodo,getTodos,updateTodo} from "../src/controllers/todoController.js";
import {auth} from "../src/middleware/auth.js";

const router = Router();

router.get('/',auth,getTodos);
router.post('/',auth,createTodo);
router.put('/:id',auth,updateTodo);
router.delete('/:id',auth,deleteTodo);

export default router;