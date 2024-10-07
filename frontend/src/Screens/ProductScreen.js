import axios from "axios";
import { useEffect, useReducer } from "react";
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/esm/Container";
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { useParams } from "react-router-dom";
import Rating from "../Components/Rating";

const reducer=(state,action)=>{
    switch(action.type){
        case "FETCH_REQUESTS":
            return {...state,loading: true}
        case "FETCH_SUCCESS":
            return {...state, loading:false, product: action.payload}
        case "FETCH_FAIL":
            return {...state,loading:false, error: action.payload}
        default:
            return state
    }
}

function ProductScreen(){
    const params = useParams()
    const {slug} =params
    console.log(slug) 
    const [{loading,error,product},dispatch]=useReducer(reducer,{
        product: [],
        loading: true,
        error: ''
    })
    useEffect(()=>{
        const fetchProduct= async()=>{
            dispatch({type: 'FETCH_REQUESTS'})
            try{
                const result = await axios.get(`/api/product/slug/${slug}`);
                console.log({'result':result,'message': "this is result log"});
                dispatch({type:'FETCH_SUCCESS', payload: result.data})
            }catch(err){
                dispatch({type:'FETCH_FAIL', payload: err.message})
            }
        };
        fetchProduct();
    },[slug])
    return (
      <Container>
        <div>
          {loading ? (
            <h5>Loading...</h5>
          ) : error ? (
            <h5>{error}</h5>
          ) : (
            <Row>
              <Col md={6}>
                <div>
                  <img
                    className="img-large"
                    src={product.image}
                    alt={product.name}
                  ></img>
                </div>
              </Col>
              <Col sm={3}>
                <ListGroup>
                  <ListGroup.Item>
                    <h1>{product.name}</h1>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      rating={product.rating}
                      reviews={[product.numReviews]}
                    ></Rating>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Price: £{product.price}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Description:
                    <p>{product.description}</p>
                  </ListGroup.Item>
                </ListGroup>
              </Col>

              <Col sm={3}></Col>
            </Row>
          )}
        </div>
      </Container>
    );
}
export default ProductScreen