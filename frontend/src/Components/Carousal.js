import React from 'react'
import { Carousel, Image } from 'react-bootstrap'
import { useGetTopProductsQuery } from '../Slices/productsApiSlice'
import { Link } from 'react-router-dom'
import Loader from './Loader'
import Message from './Message'

export const Carousal = () => {
    const { data: products, isLoading, error } = useGetTopProductsQuery()
    return (
        <>
            {
                isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                    (
                        <Carousel pause = 'hover' className = 'bg-primary'>
                            {
                                products.map((product) => {
                                    return <Carousel.Item key={product._id}>
                                        <Link to = {`product/${product._id}`}>
                                            <Image src={product.image} alt={product.image} fluid></Image>
                                            <Carousel.Caption className='carousel-caption'>
                                                <h2>
                                                    {product.name} (${product.price})
                                                </h2>
                                            </Carousel.Caption>
                                        </Link>
                                    </Carousel.Item>
                                })
                            }
                        </Carousel>
                    )
            }
        </>
    )
}