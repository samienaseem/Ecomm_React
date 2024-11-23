
import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';
import { Store } from '../Store';

const reducer = (state,action)=>{
    switch (action.type) {
      case 'FETCH_REQUEST': {
        return {
          ...state,
          loading: true,
        };
      }
      case 'FETCH_SUCCESS': {
        return {
          ...state,
          loading: false,
        };
      }
      case 'FETCH_FAIL': {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
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

export default function ProductEditScreen() {

    const params=useParams(); //"/product/:id"
    console.log({"Params":params})
    const {id: productId} = params;

    const {state} = useContext(Store)
    const {userInfo} = state;

    const[{loading,error,loadingUpdate},dispatch] = useReducer(reducer,{
        loading:false,
        loadingUpdate:false,
        error:''
    })

    const [name,setName]= useState('');
    const [slug, setSlug] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [countInStock, setcountInStock] = useState(0);
    // const [rating, setRating] = useState(0);
    //  const [numReviews, setNumReviews] = useState(0);
    //const [images, setImages] = useState('');

    useEffect(()=>{
      const fetchData=async()=>{
          dispatch({ type: 'FETCH_REQUEST' });
          try {
            const {data}= await axios.get(`/api/product/${productId}`)
            console.log({"productEditScreen": data})

            dispatch({type:"FETCH_SUCCESS"})

            setName(data.name)
            setSlug(data.slug)
            setPrice(data.price)
            setImage(data.image)
            setBrand(data.brand)
            setCategory(data.category)
            setcountInStock(data.countInStock)
            setDescription(data.description)
          } catch (err) {
            dispatch({ type: 'FETCH_FAIL', payload:err });
            toast.error(err.message);
          }
      }
      fetchData()
      
    },[productId])

    const ProductEditSubmitHandker=async(e)=>{
      e.preventDefault();
      dispatch({type:"UPDATE_REQUEST"})
      try{
        axios.put(`/api/product/${productId}`,{
          name,
          slug,
          price,
          image,
          category,
          brand,
          countInStock,
          description
        },{
          headers:{
            authorization : `Bearer ${userInfo.token}`
          }
        })
      }catch(err){
        dispatch({type:"UPDATE_FAIL"})
      }
    }


  return (
    <div>
      <Helmet>
        <title>Edit Product</title>
      </Helmet>
      <div className="container small-container">
        <h1>Edit Product {productId}</h1>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox>{error}</MessageBox>
        ) : (
          <Form onSubmit={ProductEditSubmitHandker}>
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

            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Image File</Form.Label>
              <Form.Control
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="imageFile">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control type="file" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="countInStock">
              <Form.Label>Stock Count</Form.Label>
              <Form.Control
                value={countInStock}
                onChange={(e) => setcountInStock(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <div className="mb-3">
              <Button type="submit">{loadingUpdate? <LoadingBox></LoadingBox>: "Update"}</Button>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
}
