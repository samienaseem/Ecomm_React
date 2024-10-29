import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

export default function SearchBox() {
  return (
    <div>
      <Form className="d-flex me-auto">
        <InputGroup>
            <FormControl type='text' name='q' id='q' placeholder='Search Products...' aria-label='Search Products' aria-describedby='button-search'></FormControl>
            <Button variant="outline-primary" type="submit" id="button-search">
          <i className="fas fa-search"></i>
          </Button>
        </InputGroup>
      </Form>
    </div>
  )
}
