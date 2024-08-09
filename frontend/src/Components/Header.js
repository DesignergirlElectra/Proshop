import React from 'react'
import { Badge, Container, Nav, Navbar } from 'react-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector } from 'react-redux'

const Header = () => {
     const { cartItems = [] } = useSelector((state) => state.cart);
     console.log(cartItems);

    return (
        <header>
            <Navbar bg="dark" expand='lg' variant='dark' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand >ProShop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className="ms-auto">
                            <LinkContainer to='/cart'>
                                <Nav.Link> <FaShoppingCart /> Cart
                                {
                                    Array.isArray(cartItems) && cartItems.length > 0 && (
                                        <Badge bg='danger' pill style={{ marginLeft: '5px' }}>
                                            {cartItems.reduce((total, item) => total + (item.qty || 0), 0)}
                                        </Badge>
                                    )
                                }
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/login'>
                                <Nav.Link ><FaUser /> SignIn </Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
