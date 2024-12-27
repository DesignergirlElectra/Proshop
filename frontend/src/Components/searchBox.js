import React, { useState } from 'react'
import { useParams , useNavigate } from 'react-router-dom'
import { Form , Button } from 'react-bootstrap'

const SearchBox = () => {   
    const navigate = useNavigate()
    const {keyword : urlkeyword} = useParams()
    const [keyword,setKeyword] = useState(urlkeyword || '')
    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()){
          setKeyword('')
            navigate(`/search/${keyword}`)
        }else{
            navigate('/')
        }
    }
  return (
    <form onSubmit={submitHandler} className='d-flex'>
      <Form.Control
        type='text'
        value={keyword}
        name='q'
        onChange={(e)=>setKeyword(e.target.value)}
        placeholder='search ......'
      
      >
      </Form.Control>
      <Button type='submit' variant='success'  className='p-2 mx-2'>Search</Button>
    </form>
  )
}

export default SearchBox
