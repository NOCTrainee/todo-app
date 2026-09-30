import { Router } from "express";
import { addUser,loginUser } from "../src/controllers/userController.js";

const router = Router();

router.post('/register',addUser);
router.post('/login',loginUser);

export default router;