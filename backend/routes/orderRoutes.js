import express from 'express'
import {
    addOrderItems,getMyOrders,getOrderById,updateOrderById,updateOrderToBeDeliver,getOrder
} from '../controllers/orderController.js'
import {protect , admin}from '../middleware/authMiddleware.js';
import { getUsers } from '../controllers/userController.js';

const router = express.Router() 
router.route('/').post(protect , addOrderItems).get(protect, admin,getUsers)
router.route('/mine').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById )
router.route('/:id/pay').put(protect,  updateOrderById)
router.route('/:id/deliver').get(protect,admin, updateOrderToBeDeliver)
// router.route('/mine').get(protect, getMyOrders)

export default router


