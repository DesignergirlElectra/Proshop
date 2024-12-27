import React from 'react'
import { Row,Col } from 'react-bootstrap'
import Product from '../Components/Product'
import { useGetProductsQuery } from '../Slices/productsApiSlice'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { useParams } from 'react-router-dom'
import { Paginate } from '../Components/paginate'
import { Link } from 'react-router-dom'
import { Carousal } from '../Components/Carousal'

const HomeScreen = () => {
  const {pageNumber ,keyword} = useParams()
  const {data, isLoading, isError} = useGetProductsQuery({keyword , pageNumber})
  console.log(data,keyword)
  return (
 <>
    { !keyword ? <Carousal/> : <Link to = '/' className = 'btn btn-light mb-4'>Go back</Link>}
    { isLoading ? (<div><Loader/></div>) 
      : isError ? (<Message variant = "danger">{isError?.data?.message || isError.error}</Message> ) :
     (
      <div>
        <h1>Products</h1>    
        <Row>
          {
              data.products.map((product)=>{
                  return <Col lg={3} xl={3} md={6} sm={12} key={product._id}>
                      <Product products={product}/>
                  </Col>
              })
          }
        </Row>   
        <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ''}/> 
      </div>
    ) 
  }
     
  
 </>
  )
}

export default HomeScreen
