// import { Link, useParams } from 'react-router-dom';
import { Table, Row, Col, Button ,Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch , useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import React, { useState ,useEffect } from 'react';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import { useProfileMutation } from '../Slices/usersApiSlice';
import { setCredentials } from '../Slices/authSlice';
import { useGetMyOrdersQuery } from '../Slices/orderApiSlice';
import { FaTimes } from 'react-icons/fa';


const ProfileScreen = () => {
    const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [confirmPassword , setConfirmPassword] = useState('')

    const dispatch = useDispatch()
    const {userInfo} = useSelector((state) => state.auth);

    const [updateProfile , {isLoading : loadingUpdateProfile} ] = useProfileMutation()
    const { data: orders, isLoading, error } = useGetMyOrdersQuery()

    useEffect(()=>{
        if(userInfo){
            setName(userInfo.name);
            setEmail(userInfo.email)
        }
    },[userInfo.name,userInfo.email, userInfo])

    const submitHandler = async(e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            toast.error('password not match')
        }else{
            try{
                
                const res = await updateProfile({_id:userInfo.id , name , email , password})
                // console.log('res',res)
                dispatch(setCredentials(res))
                toast.success('profile update successfully')
            }
            catch(err){
                toast.error(err?.data?.message || err.err)
            }
        }
    }
    console.log(orders)

  return (
    <Row>
        <Col md = {3} > 
            <h2>User Profile</h2>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name' className = "my-2">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type = 'name'
                        placeholder = 'Enter Name'
                        value = {name}
                        onChange={(e)=>setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='email' className = "my-2">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type = 'email'
                        placeholder = 'Enter email'
                        value = {email}
                        onChange={(e)=>setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password' className = "my-2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type = 'password'
                        placeholder = 'Enter password'
                        value = {password}
                        onChange={(e)=>setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword' className = "my-2">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type = 'password'
                        placeholder = 'Enter password'
                        value = {confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button type ='submit' variant = 'primary' className = 'my-2' >Update</Button>
                {loadingUpdateProfile && <Loader/>}
            </Form>
        </Col>
        <Col md = {9} >
            <h5>Orders</h5>
            { isLoading ? <Loader/> : error ? <Message variant='danger'>
                {error?.data.message || error.error}
            </Message>:(
                <Table striped hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order)=>{
                            return <tr key = {order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0,10)}</td>
                                <td>${order.totalPrice}</td>
                                <td>{order.isPaid ? (
                                        order.paidAt.substring(0,10)
                                    ) : (
                                        <FaTimes style={{color:'red'}}/>
                                    )}
                                </td>
                                <td>{order.isDelivered ? (
                                        order.deliveredAt.substring(0,10)
                                    ) : (
                                        <FaTimes style={{color:'red'}}/>
                                    )}
                                </td>
                                <td>
                                    <LinkContainer to = {`/order/${order._id}`}>
                                        <Button className='btn-sm' variant = 'dark'>
                                            Details
                                        </Button>
                                    </LinkContainer>
                                </td>
                                <td></td>
                            </tr>
                        })

                        }
                    </tbody>
                </Table>
            )}
        </Col>
    </Row>
  )
}

export default ProfileScreen
