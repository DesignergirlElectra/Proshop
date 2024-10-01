import React, { useEffect, useState } from 'react'
import FormContainer from '../Components/FormContainer'
import { Form, Col,FormCheck , Button} from 'react-bootstrap'
import { CheckoutStep } from '../Components/CheckoutStep'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../Slices/cartSlice'


const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cart = useSelector((state)=>state.cart)
    const shippingAddress = {cart}
    useEffect(()=>{
        if(!shippingAddress){
            navigate('/shipping')
        }
    },[shippingAddress,navigate])

    const submitHandler = (e) =>{
        e.preventDefault()
        savePaymentMethod(paymentMethod)
        navigate('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutStep step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend">Select Method</Form.Label>
                    <Col>
                        <FormCheck type="radio"
                            className='my-3 '
                            label="PayPal or Credit Card"
                            id='PayPal'
                            value='PayPal'
                            name="Payment Method"
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></FormCheck>
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen