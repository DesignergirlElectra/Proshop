import asyncHandler from "../middleware/asyncHandler.js"
import Order from "../models/orderModel.js";

// @desc create new Order
// @route post api/orders
// @access privatre

const addOrderItems = asyncHandler(async(req,res) => {
    // res.send('add order items')
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
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
            user : req.user,
            shippingAddress,
            paymentMethod,
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
    res.status(200).json(orders)
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
// @route POST api/orders/:id/pay
// @access privatre

const updateOrderById = asyncHandler(async(req,res) => {
    // res.send('Update order to paid')
    const order = await Order.findById(req.params.id)
    if(order){
        order.isPaid = true;
        order.paidAt = Date.now()
        order.paymentResults = {
            id : req.body.id,
            status : req.body.status,
            update_time : req.body.update_time,
            email_address : req.body.email_address
        };
        const updatedOrder =  await order.save()
        res.status(200).json(updatedOrder)
    }else{
        res.status(404);
        throw new Error('order not updated') 
    }
})

// @desc update order to delivered
// @route get api/orders/:id/deliver
// @access privatre/admin

const updateOrderToDelivered= asyncHandler(async(req,res) => {
    const order = await Order.findById(req.params.id)
    console.log(Date.now())
    if(order){
        order.isDelivered = true;
        order.deliveredAt = Date.now()
        const updatedOrder =  await order.save()
        res.status(200).json(updatedOrder)
    }else{
        res.status(404);
        throw new error('order not FOUND') 
    }
})

// @desc get all orders
// @route get api/orders
// @access private/admin

const getOrder = asyncHandler(async(req,res) => {
    res.send('Get All Order')
})


export { addOrderItems,getMyOrders,getOrderById,updateOrderById,updateOrderToDelivered ,getOrder}