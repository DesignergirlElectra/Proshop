import React from 'react'
import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
// import { LinkContainer } from 'react-router-bootstrap'
// import { FaTimes, FaEdit, FaTrash } from 'react-icons/fa'
import Message from '../../Components/Message'
import Loader from '../../Components/Loader'
import { toast } from "react-toastify"
import { useUpdateProductMutation, useGetProductDetailsQuery, useUploadProductImageMutation } from '../../Slices/productsApiSlice'
import FormContainer from '../../Components/FormContainer'

const ProductEditScreen = () => {
    const { id: productId } = useParams();
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState(0)
    const [brand, setBrand] = useState('')
    const [description, setDescription] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [category, setCategory] = useState('')

    const { data: product, isLoading, error} = useGetProductDetailsQuery(productId)
    const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation()
    const [uploadProductImage] = useUploadProductImageMutation()
    const navigate = useNavigate()
    useEffect(() => {
        if (product) {
            setName(product.name);
            setBrand(product.brand);
            setDescription(product.description);
            setImage(product.image);
            setPrice(product.price);
            setCategory(product.category)
            setCountInStock(product.countInStock);
        }
    }, [product, setName, setBrand, setCategory, setPrice, setDescription, setCountInStock, setImage])

    const submitHandler = async (e) => {
        e.preventDefault()
        const updatedProduct = {
            productId,
            name,
            price,
            brand,
            image,
            description,
            category,
            countInStock,
        }
        console.log(updatedProduct, updatedProduct.productId)
        const result = await updateProduct(updatedProduct);
        if (result.error) {
            toast.error(result.error);
        }
        else {
            toast.success('product data updated');
            // refetch()
            navigate('/admin/productList')
        }
    }

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append('image',e.target.files[0]);
        try {
            const res = await uploadProductImage(formData).unwrap();
            console.log(res)
            toast.success(res.message);
            setImage(res.image);
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        } 
    }
    return (
        <>
            <Link to="/admin/productList" className='btn btn-light my-3'>GoBack</Link>
            <FormContainer>
                <h5>Edit Product</h5>
                {loadingUpdate && <Loader />}
                {isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (<Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label controlId='name'> Name</Form.Label>
                        <Form.Control type='text'
                            placeholder='Enter Name'
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label controlId='price'> Price </Form.Label>
                        <Form.Control type='number'
                            placeholder='price'
                            value={price}
                            onChange={(e) => { setPrice(e.target.value) }}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label controlId='image'> Image </Form.Label>
                        <Form.Control type='text'
                            placeholder='enter image url'
                            value={image}
                            onChange={(e) => setImage }
                        ></Form.Control>
                        <Form.Control type='file'
                            label='choose file'
                            onChange={uploadFileHandler}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label controlId='brand'> Brand </Form.Label>
                        <Form.Control type='text'
                            placeholder='Enter brand'
                            value={brand}
                            onChange={(e) => { setBrand(e.target.value) }}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label controlId='countInStock'> Count In Stock </Form.Label>
                        <Form.Control type='number'
                            placeholder='countInStock'
                            value={countInStock}
                            onChange={(e) => { setCountInStock(e.target.value) }}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label controlId='category'> Category </Form.Label>
                        <Form.Control type='text'
                            placeholder='category'
                            value={category}
                            onChange={(e) => { setCategory(e.target.value) }}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label controlId='description'> Description</Form.Label>
                        <Form.Control type='text'
                            placeholder='description'
                            value={description}
                            onChange={(e) => { setDescription(e.target.value) }}
                        ></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary' className='my-2'>Update</Button>
                </Form>)}


            </FormContainer>
        </>
    )
}

export default ProductEditScreen
