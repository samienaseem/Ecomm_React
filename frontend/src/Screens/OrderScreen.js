import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';
import { Store } from '../Store';


const reducer=(state,action)=>{
    switch (action.type) {
      case 'FETCH_REQUEST': {
        return {
          ...state,
          loading: true,
          error: '',
        };
      }
      case 'FETCH_SUCCESS': {
        return {
          ...state,
          loading: false,
          order: action.payload,
          error: '',
        };
      }
      case 'FETCH_FAIL': {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case 'PAY_REQUEST': {
        return { ...state, loadingPay: true };
      }
      case 'PAY_SUCCESS': {
        return { ...state, loadingPay: false, successPay: true, order: action.payload };
      }
      case 'PAY_FAIL': {
        return { ...state, loadingPay: false };
      }
      case 'PAY_RESET': {
        return { ...state, loadingPay: false, successPay: false };
      }
      default: {
        return state;
      }
    }
}

export default function OrderScreen() {
    const navigate=useNavigate();
    const {id: orderId}=useParams();

    const {state,dispatch: ctxDispatch}=useContext(Store);

    const {userInfo}=state;
    //const {xys}=params

    const [{loading,error,order, successPay,loadingPay},dispatch]=useReducer(reducer,{
        loading:true,
        error:"",
        order:{},
        successPay: false,
        loadingPay: false
    })

    console.log(orderId)
    console.log({"OrderScreen":order})

    const [{isPending},paypalDispatch]=usePayPalScriptReducer();

    function createOrder(data,actions){
        return actions.order.create({
            purchase_units:[
                {
                    amount:{value: order.totalPrice},
                }
            ]
        }).then((orderId)=>{
            return orderId
        })
    }
    function onApprove(data,actions){

        return actions.order.capture().then(async function(details) {
            try{
                dispatch({type: "PAY_REQUEST"});
                const {data}=await axios.put(`/api/orders/${order._id}/pay`, details, {
                    headers:{
                        authorization: `Bearer ${userInfo.token}`
                    }
                })
                dispatch({
                    type: "PAY_SUCCESS",
                    payload: data
                })

                toast.success("Order is paid")

            }catch(err){
                dispatch({type: "PAY_FAIL" , payload: err})
                toast.error(err.message)
            }
        })

    }
    function onError(err){
        toast.error(err.message)
    }

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
        if(!order._id || successPay || (order._id && order._id!==orderId)){
            fetchOrder()
            if(successPay){
                dispatch({type: "PAY_RESET"});
            }
        }else{
            const loadPaypalScript = async()=>{
                const {data : client_id} = await axios.get('/api/keys/paypal',{
                    headers:{
                        authorization:`Bearer ${userInfo.token}`,
                    }
                });     
                paypalDispatch({
                    type: "resetOptions",
                    value:{
                        'client-id':client_id,
                        currency:'GBP'
                    }
                })
                paypalDispatch({type:'setLoadingStatus', value: 'pending'});
            }
            loadPaypalScript()
        }
    },[navigate, userInfo,orderId, order, paypalDispatch, successPay])
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
            <h1 className='my-3'>Order {orderId}</h1>
            <Row>
              <Col md={8}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>Shipping</Card.Title>
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
                    {order.isDelivered ? (
                      <MessageBox variant="success">
                        Delivered at {order.deliveredAt}
                      </MessageBox>
                    ) : (
                      <MessageBox variant="danger">Not Delivered</MessageBox>
                    )}
                  </Card.Body>
                </Card>

                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>Payment</Card.Title>
                    <Card.Text>
                      <strong>Method: </strong> {order.paymentMethod}
                    </Card.Text>
                    {order.isPaid ? (
                      <MessageBox variant="success">
                        Paid at {order.paidAt}
                      </MessageBox>
                    ) : (
                      <MessageBox variant="danger">Not Paid</MessageBox>
                    )}
                  </Card.Body>
                </Card>

                <Card className="mb-3" variant='flush'>
                  <Card.Body>
                    <Card.Title>Items</Card.Title>
                    <ListGroup variant="flush">
                      {order.orderItems
                        .slice() // Creates a shallow copy of the array to avoid mutating the original cartItems
                        .reverse() // Reverse the copy of the array so new items appear on top
                        .map((item) => (
                          <ListGroup.Item key={item._id}>
                            <Row className="align-items-center">
                              <Col md={3}>
                                <img
                                  className="img-fluid rounded img-thumbnail"
                                  src={item.image}
                                  alt={item.name}
                                />{' '}
                                {/* <Link to={`/product/${item.slug}`}>{item.name}</Link> */}
                              </Col>
                              {/* -------MyVersion---------- */}
                              <Col md={9}>
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
                        //<ProductTemplate item={item}></ProductTemplate>
                        ))}
                    </ListGroup>
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
                          <Col>£{order.shippingPrice}</Col>
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

                      {
                        !order.isPaid && (
                            <ListGroup.Item>
                                {
                                    isPending? (
                                        <LoadingBox/>
                                    ): (
                                        <div>
                                            <PayPalButtons 
                                            createOrder={createOrder} 
                                            onApprove={onApprove} 
                                            onError={onError}>

                                            </PayPalButtons>
                                        </div>
                                    )
                                }
                                {loadingPay && <LoadingBox></LoadingBox>}
                            </ListGroup.Item>
                        )
                      }
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
