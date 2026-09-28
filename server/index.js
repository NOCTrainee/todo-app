import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import userRoutes from './routes/userRoutes.js';

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

app.use('/user',userRoutes);


const PORT = process.env.PORT;
app.listen(PORT,()=> {
    console.log(`Serving on ${PORT}`);
});
