import express from 'express';
// import products from '../data/products.js'

import { createProduct, getProducts, getProductsByID, updateProduct } from '../controllers/productController.js';
import {protect , admin}from '../middleware/authMiddleware.js';


const router = express.Router()

router.route('/').get(getProducts).post(protect,admin,createProduct);
router.route('/:id').get(getProductsByID).put(protect,admin,updateProduct);



export default router
