import React, { useState } from 'react'
import FormContainer from '../Components/FormContainer'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveShippingAddress } from '../Slices/cartSlice'
import {CheckoutStep} from '../Components/CheckoutStep'


const ShippingScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cart = useSelector((state)=> state.cart)

    const {shippingAddress}= cart;

    const [address, setAddress] = useState(shippingAddress?.address || '')
    const [city, setCity] = useState(shippingAddress?.city  || '')
    const [postal_code, setPostal_code] = useState(shippingAddress?.postal_code || '')
    const [country, setCountry] = useState(shippingAddress?.country || '')

    
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address,city,postal_code,country}))
        navigate('/payment')
    }
    return (
        <FormContainer >
       
                <CheckoutStep step1 step2/>
            
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="my-3" controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='text'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder='Enter Address'
                    ></Form.Control>
                </Form.Group>
                <Form.Group className="my-3" controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type='text'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder='Enter city'
                    ></Form.Control>
                </Form.Group><Form.Group className="my-3" controlId='postal_code'>
                    <Form.Label>Postal code</Form.Label>
                    <Form.Control
                        type='text'
                        value={postal_code}
                        onChange={(e) => setPostal_code(e.target.value)}
                        placeholder='Enter postal code'
                    ></Form.Control>
                </Form.Group>
                <Form.Group className="my-3" controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type='text'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder='Enter Country'
                    ></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' className='my-3'>Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen