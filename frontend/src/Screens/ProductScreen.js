// import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
// import products from '../products'
import {Form, Col, ListGroup, Row, Image, Card, Button } from 'react-bootstrap'
import Rating from '../Components/Rating'
// import axios from 'axios'
import { useGetProductDetailsQuery } from '../Slices/productsApiSlice'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { useState } from 'react'
import { addToCart } from '../Slices/cartSlice'
import { useDispatch } from 'react-redux'

const ProductScreen = () => {
    const { id : productId } = useParams();
    const [qty , setQty] = useState(1)
    const { data: product, isLoading, isError } = useGetProductDetailsQuery(productId)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const addToCartHandler = () =>{
        dispatch(addToCart({...product,qty}))
        navigate('/cart')
    }
    // console.log(addToCartHandler)
    // const [product , setProduct] = useState('')
    // const product = products.find((p)=>p._id === productId)

    // useEffect(()=> {
    //     const fetchProducts = async ()=>{
    //         const {data} = await axios.get(`/api/products/${productId}`)
    //             setProduct(data)
    //     }
    //     fetchProducts()
    // },[productId])
    // // console.log( [...Array(7).keys()])
    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Goback
            </Link>
            {/* <Message variant='success'>Hello</Message> */}
            {
                isLoading ? (<div><Loader/></div>) : isError ? (
                    <Message variant='danger'>{isError?.data?.message || isError.error}</Message>
                ) : (
                    <Row>
                        <Col md={5}>
                            <Image src={product.image} alt={product.name} fluid />
                        </Col>
                        <Col md={4}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                                </ListGroup.Item>
                                <ListGroup.Item> Price: ${product.price} </ListGroup.Item>
                                <ListGroup.Item> Description: ${product.description} </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price : </Col>
                                            <Col><strong>${product.price}</strong></Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Stock : </Col>
                                            <Col>{product.countInStock > 0 ? 'InStock' : 'Out of Stock'}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {
                                        product.countInStock > 0 && <ListGroup.Item>
                                            <Row>
                                                <Col>quantity</Col>
                                                <Col>
                                                    <Form.Control as = 'select' value ={qty}
                                                        onChange = {(e)=>setQty(Number(e.target.value))}
                                                    >
                                                        {
                                                            [...Array(product.countInStock).keys()].map((x)=>(
                                                            <option key = {x+1} value = {x+1}>{x+1}</option>))
                                                        }
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item> 
                                    }
                                    <ListGroup.Item>
                                        <Button className='btn-block' type='button' onClick ={addToCartHandler} disabled={product.countInStock === 0}>Add to Cart</Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                )
            }

        </>
    )
}

export default ProductScreen
