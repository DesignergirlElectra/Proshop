import React, { useState, useEffect} from 'react'
import FormContainer from '../Components/FormContainer'
import {Form , Col , Row , Button} from 'react-bootstrap'
import { Link, useNavigate , useLocation} from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import {useLoginMutation} from '../Slices/usersApiSlice'
import { setCredentials } from '../Slices/authSlice'
import Loader from '../Components/Loader'
import { toast } from 'react-toastify'

const LoginScreen = () => {
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [login , {isLoading}] = useLoginMutation()
    const { userInfo } = useSelector(state=> state.auth)

    const { search } = useLocation();
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/';
    // console.log(userInfo)
    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    },[userInfo,navigate,redirect])


    const submitHandler = async(e) => {
        e.preventDefault()
        // console.log('submmit')

        try {
            const res =await login({email, password}).unwrap()
            dispatch(setCredentials({...res,}))
        } catch (err) {
            toast.error(err?.data?.message || err.error)   
        }
    }
  return (
    <FormContainer>
        <h1>Signin</h1>
        <Form onSubmit = {submitHandler}>
            <Form.Group className = "my-3" controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control 
                    type = 'email'
                    value = {email}
                    onChange={(e)=> setEmail(e.target.value)}
                    placeholder='Enter email'
                ></Form.Control>
            </Form.Group>
            <Form.Group className = "my-3" controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type = 'password'
                    value = {password}
                    onChange={(e)=> setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Button className='mt-3' variant='primary' type='submit' disabled={isLoading} >Sign In</Button>

            { isLoading && <Loader/>}
        </Form>
            <Row className='my-3'>
                <Col>
                        New Customer ? <Link to ={redirect ? `/register?redirect=${redirect}` : '/register'}>Register Now</Link>
                </Col>
            </Row>
    </FormContainer>
  )
}

export default LoginScreen
