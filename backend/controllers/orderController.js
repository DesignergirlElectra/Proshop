import asyncHandler from "../middleware/asyncHandler.js"
import Order from "../models/orderModel.js";

// @desc create new Order
// @route post api/orders
// @access privatre

const addOrderItems = asyncHandler(async(req,res) => {
    // res.send('add order items')
    const {
        orderItems,
        shippinAddress,
        paymentMethods,
        paymentResults,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body
    if(orderItems & orderItems.length === 0 ){
        res.status(400);
        throw new error('Item not found')
    }
    else{
        const order = new Order({
            orderItems: orderItems.map((x)=>(
                {
                    ...x,
                    product : x._id,
                    _id : undefined
                }
            )),
            user : req.user._id,
            shippinAddress,
            paymentMethods,
            paymentResults,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })
        const createdOrder = await order.save();
        res.status(201).json(createdOrder)
    }
})


// @desc get logged in user
// @route get api/orders/myorder
// @access privatre

const getMyOrders = asyncHandler(async(req,res) => {
    // res.send('get My order')
    const orders = await Order.find({user: req.user._id})
    req.status(200).json(orders)
})

// @desc get order by id
// @route get api/orders:id
// @access privatre

const getOrderById = asyncHandler(async(req,res) => {
    // res.send('get My order By ID')
    const order = await Order.findById(req.params.id).populate('user','name email')
    if(order){
        res.status(200).json(order)
    }else{
        res.status(404);
        throw new error('order not found')
    }
})

// @desc update order to paid
// @route get api/orders/:id/pay
// @access privatre

const updateOrderById = asyncHandler(async(req,res) => {
    res.send('Update order to paid')
})

// @desc update order to delivered
// @route get api/orders/:id/deliver
// @access privatre/admin

const updateOrderToBeDeliver= asyncHandler(async(req,res) => {
    res.send('update order delivered')
})

// @desc get all orders
// @route get api/orders
// @access privatre/admin

const getOrder = asyncHandler(async(req,res) => {
    res.send('Get All Order')
})


export { addOrderItems,getMyOrders,getOrderById,updateOrderById,updateOrderToBeDeliver,getOrder}