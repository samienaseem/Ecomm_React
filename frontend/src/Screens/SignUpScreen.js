import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Store } from '../Store';

export default function SignUpScreen() {
    // get the navigate object to redirect programatically
    const navigate = useNavigate();

    // create the state for forms inouts
    const [name,setName ]=useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // getting redirect from query paramters
    const {search} = useLocation();
    const redirectUrl=new URLSearchParams(search).get('redirect')
    const redirect = redirectUrl? redirectUrl : '/';

    // getting the state and dispatch from context
    const {state,dispatch:ctxDispatch}=useContext(Store);
    const {userInfo}=state

    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    },[navigate,redirect,userInfo])

    const onSubmitHandler=async(e)=>{
        e.preventDefault();
        if(password !== confirmPassword){
            toast.error("Passwords Does'nt match")
            return
        }
        try{
            const {data}=await axios.post('/api/users/signup',{
                name,
                email,
                password
            })
            console.log({"SignUpScreenSubmitHandler": data})
            ctxDispatch({
                type: 'USER_SIGNIN',
                payload: data

            })
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(redirect || '/');
        }catch(err){
            if(err.response && err.response.status===409){
                console.log({"signupResponseFromServer":err.response.data.message})
                toast.error(err.response.data.message);
            }
            else{
                console.log({ signupError: err.message });
                toast.error(err.message);
            }
            
        }
    }


  return (
    <div>
      <Helmet>
        <title>SignUp</title>
      </Helmet>
      <div className="container small-container">
        <h1 className="my-3">Sign Up</h1>
        <Form onSubmit={onSubmitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <div className="my-3">
            <Button type="submit" variant="primary">
              Create Account
            </Button>
          </div>

          <div className="mb-3">
            Already have an account?{'  '}
            <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
