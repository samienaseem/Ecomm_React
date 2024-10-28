
import axios from 'axios';
import React, { useContext, useReducer, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { Store } from '../Store';

const reducer = (state,action)=>{
    switch (action.type) {
      case 'UPDATE_REQUEST': {
        return {
          ...state,
          loadingUpdate: true,
        };
      }
      case 'UPDATE_SUCCESS': {
        return {
          ...state,
          loadingUpdate: false,
        };
      }
      case 'UPDATE_FAIL': {
        return {
          ...state,
          loadingUpdate: false,
        };
      }
      default: {
        return state;
      }
    }
}

export default function ProfileScreen() {
    const {state, dispatch: ctxDispatch}=useContext(Store)
    const {userInfo} = state;

    const [name, setName] = useState(userInfo.name || '');
    const [email, setEmail] = useState(userInfo.email || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [{loadingUpdate},dispatch]=useReducer(reducer,{
        loadingUpdate:false
    });

const onSubmitHandler=async(e)=>{
    e.preventDefault();
    try{
        dispatch({type: "UPDATE_REQUEST"})
        const{ data } = await axios.put("/api/users/profile", {
            name,
            email,
            password
        },{
            headers:{
                authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({type: "UPDATE_SUCCESS"});
        console.log({"ProfileScreen":data})

    }catch(err){
        dispatch({type: "UPDATE_FAIL"})
        toast.error(err.message)
    }
}
  return (
    <div className='container small-container'>
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      <div>
        <h1 className="my-3"> User Profile</h1>
      </div>
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
            Update
          </Button>
        </div>

      </Form>
    </div>
  );
}
