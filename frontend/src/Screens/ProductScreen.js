// import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
// import products from '../products'
import { Form, Col, ListGroup, Row, Image, Card, Button, ListGroupItem } from 'react-bootstrap'
import Rating from '../Components/Rating'
// import axios from 'axios'
import { useCreateReviewsMutation, useGetProductDetailsQuery} from '../Slices/productsApiSlice'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { useState } from 'react'
import { addToCart } from '../Slices/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import  {Meta}  from '../Components/Meta'

const ProductScreen = () => {
    const { id: productId } = useParams();

    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('')

    const { data: product, isLoading, refetch, isError } = useGetProductDetailsQuery(productId)
    const [ createReviews,{ isLoading: loadingProductReview }] = useCreateReviewsMutation()
    const { userInfo } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }))
        navigate('/cart')
    }
    const submitHandler =  async (e) => {
        e.preventDefault()
        console.log(createReviews)
        try {
            await createReviews({
                productId,
                rating,
                comment
            }).unwrap();
            refetch();
            toast.success('Review Submitted Succesfully')
            setRating(0)
            setComment('')
        } catch (err) {
          toast.error(err?.data?.message || err.error)  
        }
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
                isLoading ? (<div><Loader /></div>) : isError ? (
                    <Message variant='danger'>{isError?.data?.message || isError.error}</Message>
                ) : (

                    <>
                        <Meta title = {product.name}/>
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
                                                        <Form.Control as='select' value={qty}
                                                            onChange={(e) => setQty(Number(e.target.value))}
                                                        >
                                                            {
                                                                [...Array(product.countInStock).keys()].map((x) => (
                                                                    <option key={x + 1} value={x + 1}>{x + 1}</option>))
                                                            }
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        }
                                        <ListGroup.Item>
                                            <Button className='btn-block' type='button' onClick={addToCartHandler} disabled={product.countInStock === 0}>Add to Cart</Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                        <Row class="review">
                            <Col md={6}>
                                <h5>Reviews</h5>
                                {
                                    product.reviews.length === 0 && <Message>no review found</Message>
                                }
                                <ListGroup variant='flush'>
                                    {
                                        product.reviews.map((review) => {
                                            return <ListGroupItem key={review._id}>
                                                <strong>{review.name}</strong>
                                                <Rating value={review.rating} />
                                                <p>{review.createdAt.substring(0, 10)}</p>
                                                <p>{review.comment}</p>
                                            </ListGroupItem>
                                        })
                                    }
                                    <ListGroupItem>
                                        <h2>Write a Review</h2>
                                        {
                                            loadingProductReview && <Loader />
                                        }
                                        {
                                            userInfo ? (
                                                <Form onSubmit={submitHandler}> 
                                                    <Form.Group controlId='rating' className='my-3'>
                                                        <Form.Label>Rating</Form.Label>
                                                        <Form.Control as='select'
                                                            value={rating}
                                                            onChange={(e) => setRating(Number(e.target.value))}>
                                                            <option value=''>Select</option>
                                                            <option value='1'>1 -- Poor</option>
                                                            <option value='2'>2 -- Fair</option>
                                                            <option value='3'>3 -- Good</option>
                                                            <option value='4'>4 -- Very Good</option>
                                                            <option value='5'>5 -- Execellent</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                    <Form.Group controlId='comment' className='my-3'>
                                                        <Form.Label>Comment</Form.Label>
                                                        <Form.Control as='textarea'
                                                            row='3'
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                        >
                                                        </Form.Control>
                                                    </Form.Group>
                                                    <Button disabled={loadingProductReview}
                                                        type='submit'
                                                        variant='primary'
                                                    >
                                                        Submit
                                                    </Button>
                                                </Form>
                                            )

                                                : (<Message>
                                                    Please <Link to='/login'>Sign In</Link> to do review
                                                </Message>)
                                        }
                                    </ListGroupItem>
                                </ListGroup>

                            </Col>
                        </Row>
                    </>
                )
            }

        </>
    )
}

export default ProductScreen
