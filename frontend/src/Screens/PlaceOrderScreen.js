import React, { useEffect } from 'react'
import { Button, Col, Row, ListGroup, Image } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CheckoutStep } from '../Components/CheckoutStep'
import Message from '../Components/Message'
// import { useOrderCreateMutation } from '../Slices/orderApiSlice'
// import Loader from '../Components/Loader' // Uncomment if using Loader
import {toast} from "react-toastify"
import { Link } from 'react-router-dom'
import { useCreateOrderMutation } from '../Slices/orderApiSlice'
import { clearCartItems } from '../Slices/cartSlice'

const PlaceOrderScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)
    const [createOrder, { isLoading, error }] = useCreateOrderMutation()
    // console.log(cart.shippingAddress)
    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate('/shipping')
        } else if (!cart.paymentMethod) {
            navigate('/payment')
        }
    }, [cart.shippingAddress.address, cart.paymentMethod, navigate])

    const placeOrderHandler = async () => {
        
        try {
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice
            }).unwrap()
            dispatch(clearCartItems())
            // Optional: Redirect to order confirmation
            navigate(`/order/${res._id}`)
        } catch (error) {
            // Display error
            toast.error(error?.data?.message || error.error); // Uncomment if using toast
        }
    }

    return (
        <>
            <CheckoutStep step1 step2 step3 step4 />
            <Row>
                <Col md='8'>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>Method: {cart.paymentMethod}</p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? (
                                <Message>Cart is empty, place your order now</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md='4'>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items:</Col>
                                <Col>${cart.itemsPrice || 0}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping:</Col>
                                <Col>${cart.shippingPrice || 0}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax:</Col>
                                <Col>${cart.taxPrice || 0}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total Price:</Col>
                                <Col>${cart.totalPrice || 0}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' disabled={cart.cartItems.length === 0 || isLoading} onClick={placeOrderHandler}>
                                Place Order
                            </Button>
                        </ListGroup.Item>
                        {error && <Message variant="danger">{error?.data?.message || error.error}</Message>}
                    </ListGroup>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen
