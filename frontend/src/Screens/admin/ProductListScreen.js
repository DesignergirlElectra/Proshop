import React from 'react'
import { Table, Button, Row, Col, Toast } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FaTimes, FaEdit, FaTrash } from 'react-icons/fa'
import Message from '../../Components/Message'
import Loader from '../../Components/Loader'
import {toast} from "react-toastify"
import { useGetProductsQuery , useCreateProductMutation } from '../../Slices/productsApiSlice'

const ProductListScreen = () => {
    const { data: products, isLoading, error , refetch} = useGetProductsQuery()
    const [createProduct , {isloading : createLoading}] = useCreateProductMutation()
    // console.log(products)
    const deleteHandler = (id) => {
        console.log('deleted' , id)
    }
    const createProductHandler = async() => {
        if(window.confirm('Are you sure to add new Product')){
            try {
               await createProduct();
               refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }
    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h5>Products</h5>
                </Col>
                <Col className='text-end'>
                    <Button className='btn-sm m-3'onClick = {createProductHandler}>
                        <FaEdit /> Create Edit
                    </Button>
                </Col>
            </Row>
            {
                createLoading && <Loader/>
            }
            {isLoading ? <Loader /> : error ? (<Message variant='danger'>{error}</Message>):
                 <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product) =>
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer to={`/admin/productList/${product._id}/edit`}>
                                            <Button variant='dark' className='btn-sm mx-3'>
                                                <FaEdit />
                                            </Button>

                                        </LinkContainer>
                                        <Button variant='danger' className='btn-sm mx-3' onClick={()=> deleteHandler(product._id)}>
                                            <FaTrash />
                                        </Button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            }
        </>
    )
}

export default ProductListScreen
