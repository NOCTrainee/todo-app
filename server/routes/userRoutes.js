import { Router } from "express";
import { addUser } from "../src/controllers/userController.js";

const router = Router();

router.post('/register',addUser);

export default router;