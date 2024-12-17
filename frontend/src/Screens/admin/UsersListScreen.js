import React from 'react'
import { Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa'
import Message from '../../Components/Message'
import Loader from '../../Components/Loader'
import { toast } from 'react-toastify'
import { useGetUsersQuery, useDeleteUserMutation } from '../../Slices/usersApiSlice'

export default function UsersListScreen() {
    const { data: users, refetch, isLoading, error } = useGetUsersQuery()
    const [ deleteUser, {isLoading: loadingDelete}] = useDeleteUserMutation()
    const deleteHandler = async (id) => {
        // console.log('deleted' , id)
        if (window.confirm('Are you sure to delete ?')) {
            try {
                await deleteUser(id)
                toast.success('user deleted successfully')
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }
    return <>
        <h5>User</h5>
        {
            loadingDelete && <Loader />
        }
        {isLoading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : (
            <Table striped bordered hover responsive className='table-sm text-center'>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>NAME</td>
                        <td>EMAIL</td>
                        <td>ADMIN</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user) => {
                            // console.log(order.user.name)
                            return <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td><a href={`mailto : ${user.email}`}>{user.email}</a></td>
                                <td>{user.isAdmin ? <FaCheck style={{ color: 'green' }} /> : <FaTimes style={{ color: 'red' }} />}</td>
                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <Button className='btn-sm' variant='dark'>
                                            <FaEdit />
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant='danger'
                                        className='btn-sm mx-2'
                                        onClick={() => deleteHandler(user._id)}
                                    ><FaTrash style={{ color: 'white' }} /></Button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>
        )
        }
    </>
}
