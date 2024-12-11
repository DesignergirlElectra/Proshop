import React from 'react'
import { Badge, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useLogoutMutation } from '../Slices/usersApiSlice'
import {logout} from '../Slices/authSlice'
import {useNavigate} from 'react-router-dom'

const Header = () => {
    const { cartItems = [] } = useSelector((state) => state.cart);
    const { userInfo } = useSelector(state=> state.auth)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

        //  console.log(cartItems);
        const logoutHandler = async () => {
            try {
                await logoutApiCall().unwrap();
                dispatch(logout());
                navigate('/login')
            } catch (error) {
               console.log(error)
            }
        }
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

                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='Profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (

                                <LinkContainer to='/login'>
                                    <Nav.Link ><FaUser /> SignIn </Nav.Link>
                                </LinkContainer>
                            )}
                            {
                                userInfo && userInfo.isAdmin && (
                                    <NavDropdown title = 'Admin' id ='adminMenu'>
                                       <LinkContainer to = '/admin/orderList'>
                                            <NavDropdown.Item>
                                                Orders
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to = '/admin/productList'>
                                            <NavDropdown.Item>
                                               Products
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to = '/admin/userList'>
                                            <NavDropdown.Item>
                                                UserList
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                    </NavDropdown>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
