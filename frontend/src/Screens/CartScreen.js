import { useSelector, useDispatch } from "react-redux"
import { useNavigate, Link } from 'react-router-dom'
import Message from "../Components/Message";
import { Row, Col, ListGroup, Form, Button, Card, ListGroupItem } from 'react-bootstrap'
import { Image } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { addToCart ,removeToCart } from "../Slices/cartSlice";



const CartScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    const addToCartHander = async (product, qty) => {
        dispatch(addToCart({ ...product, qty }))
    }

    const removeToCartHandler = async (id) => {
        dispatch(removeToCart(id))
    }
    
    const checkOutHandler = () =>{
        navigate('/login/?redirect=/shipping')
    }
    return <Row>
        <h3 style={{ marginBottom: '20px' }}>Shopping Cart</h3>
        <Col md={9}>

            {cartItems.length === 0 ? (
                <Message>Your Cart is empty <Link to='/'>Go to Back</Link></Message>
            ) : (
                <ListGroup variant="flush">
                    {
                        cartItems.map((items) => {
                            return <ListGroup.Item key={items._id}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={items.image} alt={items.name} rounded fluid />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${items._id}`} >{items.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        {items.price}
                                    </Col>
                                    <Col md={1}>
                                        <Form.Control as='select' value={items.qty} onChange={(e) => { addToCartHander(items, Number(e.target.value)) }}>
                                            {
                                                [...Array(items.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>{x + 1}</option>))
                                            }
                                        </Form.Control>
                                    </Col>
                                    <Col md={1}>
                                        <Button type="button" variant="light" onClick={()=>removeToCartHandler(items._id)}>Remove <FaTrash /></Button>
                                    </Col>

                                </Row>

                            </ListGroup.Item>
                        })

                    }

                </ListGroup>
            )
            }
        </Col>
        <Col md={3}>
            <Card>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h6>
                            SubTotal ({cartItems.reduce((acc, items) => acc + items.qty, 0)}) items
                        </h6>
                        ${cartItems.reduce((acc, items) => acc + items.qty * items.price, 0).toFixed(2)}
                    </ListGroup.Item>
                    <ListGroupItem>
                        <Button type="button" onClick= {checkOutHandler} class="btn-block" variant="light" disabled={cartItems.lenth === 0}>Proceed to Checkout</Button>
                    </ListGroupItem>
                </ListGroup>
            </Card>
        </Col>
    </Row>


}
export default CartScreen