import React from 'react'
import products from '../products'
import { Row,Col } from 'react-bootstrap'
import Product from '../Components/Product'

const HomeScreen = () => {
  return (
    <div>
      <h1>Products</h1>    
      <Row>
         {
            products.map((product)=>{
                return <Col lg={3} xl={3} md={6} sm={12} key={product._id}>
                    <Product products={product}/>
                </Col>
            })
         }
      </Row>    
    </div>
  )
}

export default HomeScreen
