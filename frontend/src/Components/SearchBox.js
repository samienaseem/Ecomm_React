import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from 'react-router-dom';

export default function SearchBox() {
    const navigate=useNavigate();
    const [query,setQuery]=useState("")

    const submitHandler=(e)=>{
        e.preventDefault();
        navigate(query? `/search/?query=${query}`: '/search' )
    } 

  return (
    <div>
      <Form className="d-flex me-auto" onSubmit={submitHandler}>
        <InputGroup>
            <FormControl type='text' name='q' id='q' placeholder='Search Products...' aria-label='Search Products' aria-describedby='button-search' onChange={(e)=>{setQuery(e.target.value)}}></FormControl>
            <Button variant="outline-primary" type="submit" id="button-search"  >
          <i className="fas fa-search"></i>
          </Button>
        </InputGroup>
      </Form>
    </div>
  )
}
