import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutStep = ({step1 , step2 , step3 , step4 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
        <Nav.Item>
            {
                step1 ? (
                <LinkContainer to = '/login'>
                    <Nav.Link>SignIn</Nav.Link>
                </LinkContainer>
                ) : (
                    <Nav.Item disabled>SignIn</Nav.Item>
                )
            }
        </Nav.Item>
        <Nav.Item>
            {
                step2 ? (
                <LinkContainer to = '/shipping'>
                    <Nav.Link>Shipping</Nav.Link>
                </LinkContainer>
                ) : (
                    <Nav.Item disabled>Shipping</Nav.Item>
                )
            }
        </Nav.Item>
        <Nav.Item>
            {
                step1 ? (
                <LinkContainer to = '/payment'>
                    <Nav.Link>Payment</Nav.Link>
                </LinkContainer>
                ) : (
                    <Nav.Item disabled>Payment</Nav.Item>
                )
            }
        </Nav.Item>
        <Nav.Item>
            {
                step1 ? (
                <LinkContainer to = '/placeorder'>
                    <Nav.Link>Place Order</Nav.Link>
                </LinkContainer>
                ) : (
                    <Nav.Item disabled>Place Order</Nav.Item>
                )
            }
        </Nav.Item>
    </Nav>
  )
}

export {CheckoutStep};