import { Router } from "express";
import { addUser,loginUser,logout } from "../src/controllers/userController.js";
import {auth} from "../src/middleware/auth.js";
import { loginLimiter } from "../src/middleware/loginLimter";

const router = Router();

router.post('/register',addUser);
router.post('/login',loginLimiter,loginUser);

router.get('/getCurrentUser',auth ,(req,res) => {
    res.json(req.userDetails);
});

router.get('/logout',logout);

export default router;