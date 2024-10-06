import axios from "axios";
import { useEffect, useReducer } from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useParams } from "react-router-dom";
import Product from '../Components/Product';

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
      <div>
        {loading ? (
          <h5>Loading...</h5>
        ) : error ? (
          <h5>{error}</h5>
        ) : (
          <Row>
            <Col sm="6" md="4" className="mb-3">
              <Product product={product}></Product>
            </Col>

            <Col sm="6" md="4" lg="3" className="mb-3">
              <Product product={product}></Product>
            </Col>
          </Row>
        )}
      </div>
    );
}
export default ProductScreen