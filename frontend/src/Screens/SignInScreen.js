import axios from 'axios';
import { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import Container from "react-bootstrap/esm/Container";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Store } from '../Store';

export default function SignInScreen(){
    const [email, setEmail]=useState(" ");
    const [password, setPassword]=useState(" ");
    const location=useLocation()
    const navigate=useNavigate();
    // const redirect = new URLSearchParams(location.search).get('redirect') || '/';
    const redirectUrl=new URLSearchParams(location.search).get('redirect');
    const redirect = redirectUrl? redirectUrl : '/'

    const {state,dispatch:ctxDispatch}=useContext(Store);

const onSubmitHandler=async(e)=>{
    e.preventDefault();
    try{
        const {data}=await axios.post('/api/users/signin',{
            email,
            password
        });
        console.log({"usersData":data})
        ctxDispatch({
            type: 'USER_SIGNIN',
            payload: data
        })
        localStorage.setItem('userInfo',JSON.stringify(data));
        navigate(redirect || '/')
    }
    catch(err){
        console.log(err.message)
    }
    
    console.log(e)
}
    console.log({ SigninScreen: state });

    return (
      <Container className="small-container">
        <Helmet>
          <title>Sign In</title>
        </Helmet>
        <h1 className="my-3">Sign In</h1>
        <Form onSubmit={onSubmitHandler}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className="mb-3">
            <Button type="submit">Sign In</Button>
          </div>

          <div className="mb-3">
            New Customer?{'  '}
            <Link to={`/signup?redirect=${redirect}`}>Create Your Account</Link>
          </div>
        </Form>
      </Container>
    );
}