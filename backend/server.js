import path from 'path'
import express from 'express';
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { notFound , errorHandler } from './middleware/error.Middleware.js';
import cookieParser from 'cookie-parser';
import {protect, admin} from "./middleware/authMiddleware.js"
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'



dotenv.config();
connectDB(); // connect to database
const port = process.env.PORT || 5000;
// const cors = require('cors');
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
app.use('/api/orders',orderRoutes)
app.use('/api/upload',uploadRoutes)

app.get('/api/config/paypal', (req, res) => {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    if (!clientId) {
      console.error("PAYPAL_CLIENT_ID is not defined.");
      return res.status(500).json({ message: 'PAYPAL_CLIENT_ID is not defined' });
    }
    console.log("Client ID: ", clientId); // This should log your client ID
    res.send({ clientId });
  });

const __dirname = path.resolve() //set __dirname to current directory
app.use('/uploads', express.static(path.join(__dirname,'/uploads')))  


app.use(notFound)
app.use(errorHandler)


app.listen(port,()=> console.log(`server is running on port , ${port}`))