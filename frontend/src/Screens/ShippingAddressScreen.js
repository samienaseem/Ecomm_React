import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../Components/CheckoutSteps';
import { Store } from '../Store';

export default function ShippingAddressScreen() {
    const navigate=useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);

    const {
        userInfo,
        cart:{shippingAddress}
    }=state;

    useEffect(() => {
      if (!userInfo) {
        navigate('/signin?redirect=/shipping');
      }
    }, [userInfo, navigate]);

    const[fullName,setFullName]=useState(shippingAddress.fullName || " ");
    const [address, setAddress] = useState(shippingAddress.address || ' ');
    const [city, setCity] = useState(shippingAddress.city || ' ');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || ' ');
    const [country, setCountry] = useState(shippingAddress.country || ' ');


    const onSubmitHandler=(e)=>{
        e.preventDefault();
        ctxDispatch({
            type:"SAVE_SHIPPING_ADDRESS",
            payload: {
                fullName,
                address,
                city,
                postalCode,
                country
            }
        });
        localStorage.setItem("shippingAddress",JSON.stringify({
            fullName,
            address,
            city,
            postalCode,
            country
        }))
        navigate('/payment')      
    }


    console.log({"ShippingAddressScreen": state})
  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <Container className="small-container">
        <div>
          <h1 className="my-3">Shipping Address</h1>
          <Form onSubmit={onSubmitHandler}>
            <Form.Group className="mb-3" controlId="fullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="postalCode">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                required
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </Form.Group>
            <div className='my-3'>
                <Button variant='primary' type='submit'>Continue</Button>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
}
