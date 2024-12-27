import express from 'express';
// import products from '../data/products.js'

import { createProduct, deleteProduct, getProducts, getProductsByID,
    getTopProducts, updateProduct,createProductReview } from '../controllers/productController.js';
import {protect , admin}from '../middleware/authMiddleware.js';


const router = express.Router()

router.route('/').get(getProducts).post(protect,admin,createProduct);
router.get('/top',getTopProducts);  //topproduct route
router.route('/:id').get(getProductsByID).put(protect,admin,updateProduct).delete(protect , admin , deleteProduct);
router.route('/:id/reviews').post(protect,createProductReview);


export default router
