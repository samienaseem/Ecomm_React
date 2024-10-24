import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';
import { Store } from '../Store';


const reducer=(state,action)=>{
    switch(action.type){
        case "FETCH_REQUEST":{
            return {
                ...state,
                loading:true,
                error:""
            }
        }
        case "FETCH_SUCCESS":{
            return{
                ...state,
                loading:false,
                order:action.payload,
                error:""
            }
        }
        case "FETCH_FAIL":{
            return {
                ...state,
                loading:false,
                error: action.payload
            }
        }
        default:{
            return state;
        }
    }
}

export default function OrderScreen() {
    const navigate=useNavigate();
    const {id: orderId}=useParams();

    const {state,dispatch:ctxDispatch}=useContext(Store);

    const {userInfo}=state;
    //const {xys}=params

    const [{loading,error,order},dispatch]=useReducer(reducer,{
        loading:true,
        error:"",
        order:{},
    })

    console.log(orderId)
    console.log({"OrderScreen":order})

    useEffect(()=>{
        const fetchOrder=async()=>{
            dispatch({type:"FETCH_REQUEST"});
            try{
            const{data}=await axios.get(`/api/orders/${orderId}`,{
                headers:{
                    authorization:`Bearer ${userInfo.token}`
                }
            })
            dispatch({type:"FETCH_SUCCESS", payload:data})
            }catch(err){
                dispatch({type:"FETCH_FAIL", payload:err.message});
            }
        }
        if(!userInfo){
            return navigate('/signin')
        }
        // if order does not exist or not equal to current orderID we fetch the current order 
        if(!order._id || order._id && order._id!==orderId){
            fetchOrder()
        }
    },[])
  return (
    <div>
      <Helmet>
        <title>Order Preview</title>
      </Helmet>
      <div className="container">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>
            <h1>Order {orderId}</h1>
            <Row>
              <Col md={8}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>Shipping Address</Card.Title>
                    <Card.Text>
                      <strong>Name: </strong>
                      {order.shippingAddress.fullName}
                      <br />
                      <strong>Address: </strong>
                      {order.shippingAddress.address},{' '}
                      {order.shippingAddress.city},{' '}
                      {order.shippingAddress.postalCode},{' '}
                      {order.shippingAddress.country}
                    </Card.Text>
                    <Link to="/shipping">Edit</Link>
                  </Card.Body>
                </Card>

                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>Payment</Card.Title>
                    <Card.Text>
                      <strong>Method: </strong> {order.paymentMethod}
                    </Card.Text>
                    <Link to="/payment">Edit</Link>
                  </Card.Body>
                </Card>

                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>Items</Card.Title>
                    <ListGroup variant="flush">
                      {order.orderItems
                        .slice() // Creates a shallow copy of the array to avoid mutating the original cartItems
                        .reverse() // Reverse the copy of the array so new items appear on top
                        .map((item) => (
                          <ListGroup.Item key={item._id}>
                            <Row className="align-items-center">
                              <Col md={4}>
                                <img
                                  className="img-fluid rounded img-thumbnail"
                                  src={item.image}
                                  alt={item.name}
                                />{' '}
                                {/* <Link to={`/product/${item.slug}`}>{item.name}</Link> */}
                              </Col>
                              {/* -------MyVersion---------- */}
                              <Col md={8}>
                                <Row>
                                  <Col md={12} className="cartItemTitle">
                                    <Link to={`/product/${item.slug}`}>
                                      {item.name}
                                    </Link>
                                  </Col>
                                </Row>
                                <Row className="align-items-center">
                                  <Col md={6}>
                                    <span className="cartItemQuantity">
                                      QTY: {item.quantity}
                                    </span>{' '}
                                  </Col>
                                  <Col md={6}>
                                    <span>£{item.price}</span>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <Link to="/cart">Edit</Link>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>Order Summary</Card.Title>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col>Items: </Col>
                          <Col>£{order.itemPrice}</Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Row>
                          <Col>Shipping:</Col>
                          <Col>{order.shippingPrice}</Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Row>
                          <Col>Tax:</Col>
                          <Col>£{order.taxPrice}</Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Row>
                          <Col>
                            <strong>Order Total:</strong>
                          </Col>
                          <Col>
                            <strong>£{order.totalPrice}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <div className="d-grid">
                          {/* <Button
                            type="button"
                            disabled={order.order.length === 0}
                            //onClick={placeOrderHandler}
                          >
                            {loading ? <LoadingBox /> : 'Place Order'}
                          </Button> */}
                        </div>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </div>
    </div>
  );
}
