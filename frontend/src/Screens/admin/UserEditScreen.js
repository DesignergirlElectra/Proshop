import React from 'react'
import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Message from '../../Components/Message'
import Loader from '../../Components/Loader'
import { toast } from "react-toastify"
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../../Slices/usersApiSlice'
import FormContainer from '../../Components/FormContainer'

const UserEditScreen = () => {
    const { id: userId } = useParams();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const { data: user, isLoading, error, refetch } = useGetUserDetailsQuery(userId)
    const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation()

    const navigate = useNavigate()
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [user])

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            console.log({ userId , name , isAdmin , email})
            await updateUser({ userId ,name ,email, isAdmin : isAdmin || false})
            toast.success('user updated successfully')
            refetch();
            navigate('/admin/userlist')
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }

    return (
        <>
            <Link to="/admin/userList" className='btn btn-light my-3'>GoBack</Link>
            <FormContainer>
                <h5>Edit User</h5>
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
                        <Form.Label controlId='email'> email </Form.Label>
                        <Form.Control type='email'
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label controlId='isAdmin'>Is Admin </Form.Label>
                        <Form.Check type='checkbox'
                            label='Is Admin'
                            checked={isAdmin}
                            onChange={(e) => { setIsAdmin(e.target.checked) }}
                        ></Form.Check>
                    </Form.Group>

                    <Button type='submit' variant='primary' className='my-2'>Update</Button>
                </Form>)}


            </FormContainer>
        </>
    )
}

export default UserEditScreen
