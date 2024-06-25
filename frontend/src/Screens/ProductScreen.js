import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
// import products from '../products'
import { Col, ListGroup, Row ,Image, Card , Button} from 'react-bootstrap'
import Rating from '../Components/Rating'
import axios from 'axios'

const ProductScreen = () => {
    const { id : productId} = useParams()
    const [product , setProduct] = useState('')
    // const product = products.find((p)=>p._id === productId)

    useEffect(()=> {
        const fetchProducts = async ()=>{
            const {data} = await axios.get(`/api/products/${productId}`)
                setProduct(data)
        }
        fetchProducts()
    },[productId])

  return (
    <>
        <Link className='btn btn-light my-3' to='/'>
            Goback
        </Link>
        <Row>
            <Col md={5}>
                <Image src = {product.image} alt ={product.name} fluid />
            </Col>
            <Col md={4}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating value = {product.rating} text = {`${product.numReviews} reviews`}/>
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
                        <ListGroup.Item>
                            <Button className='btn-block'type='button' disabled={product.countInStock===0}>Add to Cart</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default ProductScreen
