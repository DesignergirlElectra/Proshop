import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Product = ({ products }) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <Link to ={`/product/${products._id}`}>
                <Card.Img src={products.image} variant='top' />
            </Link>
            <Card.Body>
                <Link to={`/product/${products._id}`}>
                    <Card.Title as='div'>
                        <strong>{products.name}</strong>
                    </Card.Title>
                </Link>
            </Card.Body>
            <Card.Text as = 'h3'>
                ${products.price}
            </Card.Text>
        </Card>
    )
}

export default Product
