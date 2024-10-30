import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';
import Rating from '../Components/Rating';

const reducer =(state, action)=>{
    switch(action.type){
        case "FETCH_REQUEST":{
            return {...state, loading: false}
        }
        case "FETCH_FAIL":{
            return {...state, loading:false, error:action.payload};
        }
        default:{
            return state;
        }
    }
}

export default function SearchScreen() {
    const navigate=useNavigate()
    const {search}=useLocation();
    const sp=new URLSearchParams(search); // /search/?cateegory=Shirt

    const category = sp.get('category') || 'all';
    const query=sp.get('query')|| "all";
    const price = sp.get('price')|| 'all';
    const rating = sp.get('rating')|| 'all';
    const order = sp.get("order")|| 'newest';
    const page = sp.get("page") || 1;

    const prices = [
      {
        name: '£1-£25',
        value: '1-25',
      },
      {
        name: '£25-£50',
        value: '25-50',
      },
      {
        name: '£50-£75',
        value: '50-75',
      },
      {
        name: '£75-£100',
        value: '75-100',
      },
    ];

    const ratings = [
      {
        name: '4 stars & up',
        value: 4,
      },
      {
        name: '3 stars & up',
        value: 3,
      },
      {
        name: '2 stars & up',
        value: 2,
      },
      {
        name: '1 stars & up',
        value: 1,
      },
    ];

    console.log({ seaechScreen: sp });

    const [{error,loading, pages, products, countProducts},dispatch]=useReducer(reducer,{
        loading:true,
        error:'',
        countProducts: 0
    })

    useEffect(()=>{
        const fetchData=async()=>{
            dispatch({ type: 'FETCH_REQUEST' });
            try {
              //const { data } = await axios.get(`/api/product/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`);
              //dispatch({type:"FETCH_SUCCESS", payload: data});
            } catch (err) {
              dispatch({ type: 'FETCH_FAIL' });
              toast.error(err.message);
            }
        }
        fetchData();
    },[category, order, page, price, query, rating])

    const [categories, setCategories]=useState([]);

    useEffect(()=>{
        console.log("running this category use Effect")
        const fetchCategories=async()=>{
            try{
                const {data}=await axios.get("/api/product/categories");
                setCategories(data);
            }catch(err){
                toast.error(err.message);
            }
        }
        fetchCategories();
    },[dispatch])

    const getFilterUrl=(filter)=>{
        const filterPage= filter.page || page;
        const filterCategory=filter.category || category;
        const filterQuery = filter.query || query;
        const filterPrice = filter.price || price;
        const filterRating = filter.rating || rating;
        const filterOrder = filter.order || order;

        return `/search?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${filterOrder}&page=${filterPage}`

    }

  return (
    <div>
      <Helmet>
        <title>Search Products</title>
      </Helmet>
      <Row>
        <Col md={2}>
          <h4>Departments</h4>
          <div>
            <ul>
              <li>
                <Link
                  className={category === 'all' ? 'text-bold' : ''}
                  to={getFilterUrl({ category: 'all' })}
                >
                  Any
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c}>
                  <Link
                    className={c === category ? 'text-bold' : ''}
                    to={getFilterUrl({ category: c })}
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Price</h4>
            <ul>
              <li>
                <Link
                  className={price === 'all' ? 'text-bold' : ''}
                  to={getFilterUrl({ price: 'all' })}
                >
                  Any
                </Link>
              </li>
              {prices.map((priceItem) => (
                <li>
                  <Link
                    className={price === priceItem.value ? 'text-bold' : ''}
                    to={getFilterUrl({ price: priceItem.value })}
                  >
                    {priceItem.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Customer Reviews</h4>
            <ul>
              {ratings.map((ratingList) => (
                <li key={ratingList.name}>
                  <Link
                    className={
                      `${rating}` === `${ratingList.value}` ? 'text-bold' : ''
                    }
                    to={getFilterUrl({
                      rating: ratingList.value,
                    })}
                  >
                    <Rating
                      caption={' & up'}
                      rating={ratingList.value}
                    ></Rating>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  className={rating === 'all' ? 'text-bold' : ''}
                  to={getFilterUrl({ rating: 'all' })}
                >
                  <Rating caption={' & up'} rating={0}></Rating>
                </Link>
              </li>
            </ul>
          </div>
        </Col>
        <Col md={10}>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <Row className="justify-content-between my-3">
                <Col>
                  <div>
                    {countProducts === 0 ? 'No' : countProducts} Results
                    {query !== 'all' && ' : ' + query}
                    {category !== 'all' && ' : ' + category}
                    {price !== 'all' && ' : Price ' + price}
                    {rating !== 'all' && ' : Rating ' + rating + ' & up'}
                    {query !== 'all' ||
                    category !== 'all' ||
                    rating !== 'all' ||
                    price !== 'all' ? (
                      <Button
                        variant="light"
                        onClick={() => navigate('/search')}
                      >
                        <i className="fas fa-times-circle"></i>
                      </Button>
                    ) : null}
                  </div>
                </Col>
                <Col className="text-end">
                  <div>
                    Sort By :{' '}
                    <select value={order} onChange={(e)=>{navigate(getFilterUrl({order : e.target.value}))}}>
                      <option value="newest">Newest Arrival</option>
                      <option value="highest">Price: Low to High</option>
                      <option value="lowest">Price: High to Low</option>
                      <option value="toprated">Customer Reviews</option>
                    </select>
                  </div>
                </Col>
              </Row>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}
