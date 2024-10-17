import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useGetOrderDetailsQuery, usePayOrderMutation, useGetPayPalClientIdQuery } from '../Slices/orderApiSlice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import React, { useEffect } from 'react';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

const OrderScreen = () => {
    const { id: orderId } = useParams();
    const { data: order, isLoading, error, refetch } = useGetOrderDetailsQuery(orderId);
    const { userInfo } = useSelector((state) => state.auth);

    const [payOrder,{ isLoading: loadingPay }] = usePayOrderMutation();
    const { data: paypal, isLoading: loadingPayPal, error: errorPayPal, } = useGetPayPalClientIdQuery();
    
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

    useEffect(() => {
        if (paypal && paypal.clientId && order && !order.isPaid) {
            const loadPayPalScript = async () => {
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        'client-id': paypal.clientId,
                        currency: 'USD',
                    },
                });
                paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
            };

            loadPayPalScript();
        }
    }, [order, paypal, paypalDispatch, errorPayPal, loadingPay]);
    console.log(order)
    function onApprove(data , actions) {
        return actions.order.capture().then(async function(details){
            try{
                await payOrder({orderId , details});
                console.log(refetch())
                toast.success('payment successfully done');
            }
            catch(err){
                toast.error(err?.data?.message || err.message);
            }
        })
    }

    async function onApproveTest() {
        await payOrder({orderId , details : {payer : {}}});
        refetch();
        toast.success('payment successfully done');
    }

    function onError(err) {
        toast.error(err.message);
    }

    function createOrder(data,actions) {
        return actions.order.create(
            {
                purchase_units : [
                    {
                        amount : {
                            value : order.totalPrice,
                        }
                    }
                ]
            }
        ).then((orderId)=>{
            return orderId;
        })
    }

    return (
        <>
        { isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger" />
            ) : (
                <>
                    <h3>Order: {orderId}</h3>
                    <hr />
                    <Row>
                        <Col md="8">
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h5>Shipping</h5>
                                    <br />
                                    <p>
                                        <strong>Name: </strong> {order.user.name}
                                    </p>
                                    <p>
                                        <strong>Email: </strong> {order.user.email}
                                    </p>
                                    <p>
                                        <strong>Address: </strong>
                                        {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                                        {order.shippingAddress.postal_code}, {order.shippingAddress.country}
                                    </p>
                                    <p>
                                        {order.isDelivered ? (
                                            <Message variant="success">Delivered on: {order.isDelivered}</Message>
                                        ) : (
                                            <Message variant="danger">Order is not Delivered</Message>
                                        )}
                                    </p>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h5>Payment Method</h5>
                                    <br />
                                    <p>
                                        <strong>Method: </strong> {order.paymentMethod}
                                    </p>
                                    <p>
                                        {order.isPaid ? (
                                            <Message variant="success">Paid on: {order.paidAt}</Message>
                                        ) : (
                                            <Message variant="danger">Not Paid</Message>
                                        )}
                                    </p>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h5>Order Items</h5>
                                    <br />
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} * ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md="4">
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h5>Order Summary</h5>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Items:</Col>
                                            <Col>${order.itemsPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Shipping Price:</Col>
                                            <Col>${order.shippingPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Tax Price:</Col>
                                            <Col>${order.taxPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Total Price:</Col>
                                            <Col>${order.totalPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {!order.isPaid && (
                                        <ListGroup.Item>
                                            {loadingPay && <Loader />}
                                            {isPending ? (
                                                <Loader />
                                            ) : (
                                                <div>
                                                    {/* <Button onClick={onApproveTest} style={{ marginBottom: '10px' }}>
                                                        Test Pay order
                                                    </Button> */}
                                                    <div>
                                                        <PayPalButtons
                                                            createOrder={createOrder}
                                                            onApprove={onApprove}
                                                            onError={onError}
                                                        ></PayPalButtons>
                                                    </div>
                                                </div>
                                            )}
                                        </ListGroup.Item>
                                    )}
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}</>
        )
};

export default OrderScreen;
