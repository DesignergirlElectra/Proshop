import React, { useEffect, useState } from 'react'
import { Row,Col } from 'react-bootstrap'
import Product from '../Components/Product'
import axios from 'axios'

const HomeScreen = () => {
  const [products , setProducts] = useState([])
  useEffect(()=>{
    const fetchProducts = async() => {
        const {data} = await axios.get('/api/products');
        setProducts(data)
    }
    fetchProducts()
  },[])
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
