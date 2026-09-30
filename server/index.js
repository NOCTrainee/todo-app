import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';

const app = express();

//middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(cookieParser());

app.use('/user',userRoutes);


const PORT = process.env.PORT;
app.listen(PORT,()=> {
    console.log(`Serving on ${PORT}`);
});
