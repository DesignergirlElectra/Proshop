import React, { useState, useEffect} from 'react'
import FormContainer from '../Components/FormContainer'
import {Form , Col , Row , Button} from 'react-bootstrap'
import { Link, useNavigate , useLocation} from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import {useRegisterMutation} from '../Slices/usersApiSlice'
import { setCredentials } from '../Slices/authSlice'
import Loader from '../Components/Loader'
import { toast } from 'react-toastify'

const LoginScreen = () => {
    const [name , setName ] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [confirmPassword , setConformPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [register , {isLoading}] = useRegisterMutation()
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
        if(password !== confirmPassword){
            toast.error("Password do not match")
            return;
        }else{
            try {
                const res =await register({name , email, password}).unwrap()
                dispatch(setCredentials({...res,}))
            } catch (err) {
                toast.error(err?.data?.message || err.error)   
            }
        }
    }
  return (
    <FormContainer>
        <h1>Register</h1>
        <Form onSubmit = {submitHandler}>
            <Form.Group className = "my-3" controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    type = 'text'
                    value = {name}
                    onChange={(e)=> setName(e.target.value)}
                    placeholder='Enter your name....'
                ></Form.Control>
            </Form.Group>
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
                    onChange={(e)=> {setPassword(e.target.value);console.log(password)}}
                ></Form.Control>
            </Form.Group>
            <Form.Group className = "my-3" controlId='confirmPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type = 'password'
                    value = {confirmPassword}
                    onChange={(e)=> {setConformPassword(e.target.value);console.log(confirmPassword)}}
                ></Form.Control>
            </Form.Group>
            <Button className='mt-3' variant='primary' type='submit' disabled={isLoading} >Register</Button>

            { isLoading && <Loader/>}
        </Form>
            <Row className='my-3'>
                <Col>
                        Already have an Account ? <Link to ={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
                </Col>
            </Row>
    </FormContainer>
  )
}

export default LoginScreen
