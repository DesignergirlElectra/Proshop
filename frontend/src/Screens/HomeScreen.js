import React from 'react'
import { Row,Col } from 'react-bootstrap'
import Product from '../Components/Product'
import { useGetProductsQuery } from '../Slices/productsApiSlice'
import Loader from '../Components/Loader'
import Message from '../Components/Message'

const HomeScreen = () => {
  const {data, isLoading, isError} = useGetProductsQuery()
  return (
 <>
    { isLoading ? (<div><Loader/></div>) 
      : isError ? (<Message variant = "danger">{isError?.data?.message || isError.error}</Message> ) :
     (
      <div>
        <h1>Products</h1>    
        <Row>
          {
              data.map((product)=>{
                  return <Col lg={3} xl={3} md={6} sm={12} key={product._id}>
                      <Product products={product}/>
                  </Col>
              })
          }
        </Row>    
      </div>
    ) 
  }
     
  
 </>
  )
}

export default HomeScreen
