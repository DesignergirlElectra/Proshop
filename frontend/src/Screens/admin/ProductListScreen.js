import React from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FaEdit, FaTrash } from 'react-icons/fa'
import Message from '../../Components/Message'
import Loader from '../../Components/Loader'
import {toast} from "react-toastify"
import { useGetProductsQuery , useCreateProductMutation, useDeleteProductMutation } from '../../Slices/productsApiSlice'
import { useParams } from 'react-router-dom'
import { Paginate } from '../../Components/paginate'


const ProductListScreen = () => {
    const {pageNumber} = useParams()
    const { data, isLoading, error , refetch} = useGetProductsQuery({pageNumber})
    const [createProduct , {isloading : createLoading}] = useCreateProductMutation()
    const [deleteProduct , {isloading : loadingDelete}] = useDeleteProductMutation()
    // console.log(products)
    const deleteHandler = async (id) => {
        // console.log('deleted' , id)
        if(window.confirm('Are you sure to delete ?')){
            try {
                await deleteProduct(id)
                toast.success('product deleted')
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
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
            {
                loadingDelete && <Loader/>
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
                            data.products.map((product) =>
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
                    <Paginate pages={data.pages} page={data.page} isAdmin={true}/> 
                </Table>
            }
        </>
    )
}

export default ProductListScreen
