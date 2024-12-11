import React from 'react'
import { Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FaTimes } from 'react-icons/fa'
import Message from '../../Components/Message'
import Loader from '../../Components/Loader'
import { useGetMyOrdersQuery } from '../../Slices/orderApiSlice'

export default function OrderListScreen() {
  const { data: order, isLoading, error } = useGetMyOrdersQuery()

  return <>
    {isLoading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : (
      <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <td>ID</td>
            <td>USER</td>
            <td>DATE</td>
            <td>TOTAL</td>
            <td>PAID</td>
            <td>DELIVERED</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {
            order.map((order) => {
              // console.log(order.user.name)
              return <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>{order.isPaid ? (order.paidAt.substring(0, 10)) : <FaTimes style={{ color: 'red' }} />}</td>
                <td>{order.isDelivered ? (order.deliveredAt.substring(0, 10)) : <FaTimes style={{ color: 'red' }} />}</td>
                <td>
                  <LinkContainer to={`/orders/${order._id}`}>
                    <Button className='btn-sm' variant='dark'>
                      Details
                    </Button>
                  </LinkContainer>
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
