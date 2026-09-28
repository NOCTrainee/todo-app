import { Router } from "express";
import { addUser } from "../src/controllers/userController.js";

const router = Router();

router.post('/',addUser);

export default router;