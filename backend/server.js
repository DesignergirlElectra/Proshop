import express from 'express';
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js'
import { notFound , errorHandler } from './middleware/error.Middleware.js';

dotenv.config();
connectDB(); // connect to database
const port = process.env.PORT || 5000;
const app = express();

app.get('/',(req,res)=>{
    res.send('App is running')
})
app.use('/api/products',productRoutes)

app.use(notFound)
app.use(errorHandler)


app.listen(port,()=> console.log(`server is running on port , ${port}`))