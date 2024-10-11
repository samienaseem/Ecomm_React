import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import LoadingBox from "../Components/LoadingBox";
import MessageBox from "../Components/MessageBox";
import Rating from "../Components/Rating";
import { Store } from "../Store";


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
    const {count, setCount}=useContext(Store)
    console.log({'state':count});
    const params = useParams()
    const {slug} =params
    console.log({'slug': slug, 'Params': params}) 

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
                console.log({message: 'this is log from catch exception', 'error':err.message });
                dispatch({type:'FETCH_FAIL', payload: err.message})
            }
        };
        fetchProduct();
    },[slug])
    return (
      
        <Container className="ProductScreen">
          <div>
            {loading ? (
              <LoadingBox />
            ) : // <h3>Loading...</h3>
            error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              // <h3>{error}</h3>
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
                <Col sm={6} md={3}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Helmet>
                        <title>{product.name}</title>
                      </Helmet>
                      <h1>{product.name}</h1>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Rating
                        rating={product.rating}
                        reviews={[product.numReviews]}
                      ></Rating>
                    </ListGroup.Item>
                    <ListGroup.Item>Price: £{product.price}</ListGroup.Item>
                    <ListGroup.Item>
                      Description:
                      <p>{product.description}</p>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>

                <Col sm={6} md={3}>
                  <Card>
                    <Card.Body>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <Row>
                            <Col>Price:</Col>
                            <Col>£{product.price}</Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col>Status:</Col>
                            <Col>
                              {product.countInStock > 0 ? (
                                <Badge bg="success">In Stock</Badge>
                              ) : (
                                <Badge bg="danger">Unavailable</Badge>
                              )}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        {product.countInStock > 0 && (
                          <ListGroup.Item>
                            <div className="d-grid">
                              <Button variant="primary" onClick={()=>setCount(count+1)}>Add to Cart</Button>
                            </div>
                          </ListGroup.Item>
                        )}
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            )}
          </div>
        </Container>
    );
}
export default ProductScreen