import React, { useContext, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/esm/Button'
import Col from 'react-bootstrap/esm/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import CheckoutSteps from '../Components/CheckoutSteps'
import { Store } from '../Store'

export default function PlaceOrderScreen() {
    const navigate=useNavigate();
    const {state,dispatch: ctxDispatch}=useContext(Store);
    const {cart, userInfo}=state

    const round2=(num)=>Math.round(num*100+Number.EPSILON)/100;

    cart.itemsPrice=round2(cart.cartItems.reduce((a,c)=>a + c.quantity * c.price, 0));
    cart.shippingPrice=cart.itemsPrice > 100 ? round2(0): round2(10);
    cart.taxPrice = round2(0.15 * cart.itemsPrice);
    cart.totalPrice=cart.itemsPrice+cart.shippingPrice+ cart.taxPrice;

    useEffect(()=>{
        if(!cart.paymentMethod){
            navigate('/payment')
        }
    },[cart,navigate])

    const placeOrderHandler=()=>{
        alert("Place Order")
    }

  return (
    <div>
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="container">
        <h1 className="my-3">Preview Order</h1>
        <Row>
          <Col md={8}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Shipping Address</Card.Title>
                <Card.Text>
                  <strong>Name: </strong>
                  {cart.shippingAddress.fullName}
                  <br />
                  <strong>Address: </strong>
                  {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
                  {cart.shippingAddress.postalCode},{' '}
                  {cart.shippingAddress.country}
                </Card.Text>
                <Link to="/shipping">Edit</Link>
              </Card.Body>
            </Card>

            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Payment</Card.Title>
                <Card.Text>
                  <strong>Method: </strong> {cart.paymentMethod}
                </Card.Text>
                <Link to="/payment">Edit</Link>
              </Card.Body>
            </Card>

            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Items</Card.Title>
                <ListGroup variant="flush">
                  {cart.cartItems
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
                      <Col>{cart.itemsPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping:</Col>
                      <Col>{cart.shippingPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Tax:</Col>
                      <Col>£{cart.taxPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong>Order Total:</strong>
                      </Col>
                      <Col>
                        <strong>£{cart.totalPrice.toFixed(2)}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button
                        type="button"
                        disabled={cart.cartItems.length === 0}
                        onClick={placeOrderHandler}
                      >
                        Place Order
                      </Button>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
