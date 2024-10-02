import axios from 'axios';
import { useEffect, useReducer } from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Product from '../Components/Product';

const reducer =(state,action)=>{
  switch(action.type){
    case 'FETCH_REQUESTS':
      return {...state,loading:true};
    case 'FETCH_SUCCESS':
      return{...state,loading:false,products: action.payload};
    case 'FETCH_FAIL':
      return{...state,loading:false, error: action.payload};
    default:
      return state;
  }
}

function HomeScreen(){
  const [{loading,error,products},dispatch]=useReducer(reducer,{
    products:[],
    loading:true,
    error: ''
  })
  // const[products, setProducts]=useState([]);
  useEffect(()=>{
    const fetchData=async()=>{
      dispatch({type: 'FETCH_REQUESTS' });
      try{
        const result = await axios.get('/api/product');
        console.log(result)
        console.log(result.status)
        dispatch({type:'FETCH_SUCCESS', payload:result.data});
        
      }catch(err){
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
      //setProducts(result.data)
    }
    fetchData()
  },[])

    return (
      <div>
        <h1>Featured products</h1>
        <div className="products">
          {loading ? (
            <h3>Loading...</h3>
          ) : error ? (
            <h3>{error}</h3>
          ) : (
            <Row>
              {products.map((product) => (
                <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                  <Product product={product}></Product>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </div>
    );
}
export default HomeScreen