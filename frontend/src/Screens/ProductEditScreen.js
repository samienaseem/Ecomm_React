
import React, { useContext, useReducer, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { Store } from '../Store';

const reducer = (state,action)=>{
    switch(action.type){
        case 'FETCH_REQUEST':{
            return {
              ...state,
              loading: true,
            };
        }
        default:{
            return state
        }
    }
}

export default function ProductEditScreen() {

    const params=useParams(); //"/product/:id"
    console.log({"Params":params})
    const {id: productId} = params;

    const {state} = useContext(Store)
    const {userInfo} = state;

    const[{loading,error},dispatch] = useReducer(reducer,{
        loading:false,
        error:''
    })

    const [name,setName]= useState('');
    const [slug, setSlug] = useState('');
    const [image, setImage] = useState('');
    const [images, setImages] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [countInStock, setcountInStock] = useState(0);
    const [rating, setRating] = useState(0);
     const [numReviews, setNumReviews] = useState(0);


    //  name: 'sample-name' + Date.now(),
    // slug: 'sample-slug' + Date.now(),
    // image: '/images/p1.jpg',
    // brand: 'sample-brand',
    // category: 'sample-category',
    // description: 'sample-description',
    // price: 0,
    // countInStock: 0,
    // rating: 0,
    // numReviews: 0


  return (
    <div>
      <Helmet>
        <title>Edit Product</title>
      </Helmet>
      <div className="container small-container">
        <h1>Edit Product</h1>
        <Form>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="slug">
            <Form.Label>Slug</Form.Label>
            <Form.Control
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}
