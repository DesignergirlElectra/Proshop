import express from 'express';
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { notFound , errorHandler } from './middleware/error.Middleware.js';
import cookieParser from 'cookie-parser';
import {protect, admin} from "./middleware/authMiddleware.js"

dotenv.config();
connectDB(); // connect to database
const port = process.env.PORT || 5000;
const app = express();


// pharse error remove 
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//cookie parse middleware
app.use(cookieParser())


app.get('/',(req,res)=>{
    res.send('App is running')
})
app.get('/test', protect, admin, (req, res) => {
    res.send('This is a protected admin route');
});

app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)

app.use(notFound)
app.use(errorHandler)


app.listen(port,()=> console.log(`server is running on port , ${port}`))