import express from 'express';
// import products from '../data/products.js'

import { getProducts, getProductsByID } from '../controllers/productController.js';


const router = express.Router()

router.get('/', getProducts)
router.get('/:id', getProductsByID)



export default router
