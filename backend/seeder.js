import mongoose from "mongoose";
import colors from "colors";
import dotenv from 'dotenv';
import products from "./data/products.js";
import users from "./data/user.js";
import User from "./models/userModel.js";
import Order from "./models/orderModel.js";
import Product from "./models/productModel.js";
import connectDB from "./config/db.js";



dotenv.config();
connectDB()

const importData = async () => {
    try {
        await Order.deleteMany()
        await User.deleteMany()
        await Product.deleteMany()

        const createdUsers =await User.insertMany(users)
        const adminUser = createdUsers[0]._id
        const sampleData = products.map((product)=>{
            return{...product , user : adminUser}
        })

        await Product.insertMany(sampleData)
        console.log('Data Imported Successfully' .green.inverse)

    } catch (error) {
        console.error(`${error}` .red.inverse)
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany()
        await User.deleteMany()
        await Product.deleteMany()
        console.log("Data Deleted".red.inverse)
        process.exit()
    } catch (error) {
            console.error(`${error}`.red.inverse)
            process.exit(1);
    }
}

if(process.argv[2] === '-d'){
    destroyData()
}else{
    importData()
}