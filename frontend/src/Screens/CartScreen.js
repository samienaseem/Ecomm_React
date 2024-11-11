import axios from "axios"
import { useContext } from "react"
// import Card from 'react-bootstrap/Card'
// import Button from 'react-bootstrap/esm/Button'
// import Col from "react-bootstrap/esm/Col"
// import Container from "react-bootstrap/Container"
// import Row from "react-bootstrap/esm/Row"
import ListGroup from 'react-bootstrap/ListGroup'
import { Helmet } from "react-helmet-async"
import { Link, useNavigate } from "react-router-dom"
import MessageBox from "../Components/MessageBox"
import { Store } from "../Store"

import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  InputGroup,
  Row,
} from 'react-bootstrap'
import { Dash, Plus, Trash } from 'react-bootstrap-icons'

export default function CartScreen() {
    const navigate=useNavigate()
    const {state,dispatch:ctxDispatch}=useContext(Store)
    console.log({'cartScreen': state})
    const {cart:{ cartItems },
    }=state
    console.log({'cartItems':cartItems})

    const UpdateCartHandler=async(item,quantity)=>{
        console.log({"UpdateCartHandler" : quantity, "Itemsquantity":{...item,quantity}})
        const {data} = await axios.get(`/api/product/${item._id}`)

        if(data.countInStock < quantity){
            window.alert("Sorry, Not Enough in Stock");
            return
        }

        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload : {...item,quantity}
        })

    }
    const removeItemHandler=(item)=>{
        ctxDispatch({
            type: 'CART_REMOVE_ITEM',
            payload:item
        })
    }
    const CheckoutCartHandler=()=>{
      navigate('/signin?redirect=/shipping')

    }
    return (
      <div>
        <Container>
          <Helmet>
            <title>Shopping Cart</title>
          </Helmet>
          <h1>Shopping Cart</h1>

          <Row>
            <Col md={9}>
              {cartItems.length === 0 ? (
                <MessageBox>
                  Cart is Empty.
                  <Link to="/"> Go Shopping</Link>
                </MessageBox>
              ) : (
                <ListGroup variant="flush">
                  {cartItems
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
                              <Col md={5}>
                                <Button
                                  variant="light"
                                  disabled={item.quantity === 1}
                                  onClick={() =>
                                    UpdateCartHandler(item, item.quantity - 1)
                                  }
                                >
                                  <i className="fas fa-minus-circle"></i>
                                </Button>{' '}
                                <span className="cartItemQuantity">
                                  {item.quantity}
                                </span>{' '}
                                <Button
                                  variant="light"
                                  disabled={item.quantity === item.countInStock}
                                  onClick={() => {
                                    UpdateCartHandler(item, item.quantity + 1);
                                  }}
                                >
                                  <i className="fas fa-plus-circle"></i>
                                </Button>{' '}
                              </Col>
                              <Col md={5}>£{item.price}</Col>
                              <Col md={2}>
                                <Button
                                  variant="light"
                                  onClick={() => {
                                    removeItemHandler(item);
                                  }}
                                >
                                  <i className="fas fa-trash"></i>
                                </Button>
                              </Col>
                            </Row>
                          </Col>
                          {/* ----------End---------- */}
                          {/* <Col md={3}>
                          <Button disabled={item.quantity === 1}>
                            <i className="fas fa-minus-circle"></i>
                          </Button>{' '}
                          <span>{item.quantity}</span>{' '}
                          <Button
                            disabled={item.quantity === item.countInStock}
                          >
                            <i className="fas fa-plus-circle"></i>
                          </Button>{' '}
                        </Col>
                        <Col md={3}>£{item.price}</Col>
                        <Col md={2}>
                          <Button variant="light">
                            <i className="fas fa-trash"></i>
                          </Button>
                        </Col> */}
                        </Row>
                      </ListGroup.Item>
                    ))}
                </ListGroup>
              )}
            </Col>
            <Col md={3}>
              <Card>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h5>
                        Subtotal (
                        {cartItems.reduce((a, c) => a + c.quantity, 0)} items) :
                        £{' '}
                        {cartItems.reduce(
                          (a, c) => a + c.price * c.quantity,
                          0
                        )}
                      </h5>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div className="d-grid">
                        <Button
                          onClick={CheckoutCartHandler}
                          variant="primary"
                          type="button"
                          disabled={cartItems.length === 0}
                        >
                          Proceed to Checkout
                        </Button>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            {/* Cart Items */}
            <Col lg={8} md={7}>
              <Card className="mb-4">
                <Card.Body>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="d-flex align-items-start mb-4 pb-4 border-bottom"
                    >
                      {/* Product Image */}
                      <div
                        className="me-4"
                        style={{ width: '120px', height: '150x' }}
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fluid
                          className="w-100 h-100 object-fit-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h5 className="mb-0">
                            <a
                              href="#"
                              className="text-dark text-decoration-none hover-primary"
                            >
                              {item.name}
                            </a>
                          </h5>
                          <Button
                            variant="link"
                            className="text-danger p-0"
                            title="Remove item"
                            onClick={() => {
                              removeItemHandler(item);
                            }}
                          >
                            <Trash size={18} />
                          </Button>
                        </div>

                        {/* Price & Quantity Controls */}
                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <div style={{ maxWidth: '120px' }}>
                            <InputGroup size="sm">
                              <Button
                                variant="outline-secondary"
                                disabled={item.quantity === 1}
                                onClick={() =>
                                  UpdateCartHandler(item, item.quantity - 1)
                                }
                              >
                                <Dash />
                              </Button>
                              <Form.Control
                                type="text"
                                min="1"
                                value={item.quantity}
                                className="text-center"
                                style={{ maxWidth: '60px' }}
                              />
                              <Button
                                variant="outline-secondary"
                                disabled={item.quantity === item.countInStock}
                                onClick={() => {
                                  UpdateCartHandler(item, item.quantity + 1);
                                }}
                              >
                                <Plus />
                              </Button>
                            </InputGroup>
                          </div>
                          <h5 className="mb-0">£{item.price.toFixed(2)}</h5>
                        </div>
                      </div>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>
            {/* Order Summary */}
            <Col lg={4} md={5}>
              <Card>
                <Card.Body>
                  <h5 className="mb-4">Order Summary</h5>

                  <div className="d-flex justify-content-between mb-3">
                    <span>
                      Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                      items)
                    </span>
                    <span>
                      £{cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                    </span>
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between mb-4">
                    <strong>Total</strong>
                    <strong>
                      £{cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                    </strong>
                  </div>

                  <Button
                    variant="warning"
                    size="lg"
                    className="w-100"
                    onClick={CheckoutCartHandler}
                    
                    disabled={cartItems.length === 0}
                  >
                    Proceed to Checkout
                  </Button>
                </Card.Body>
              </Card>

              {/* Continue Shopping */}
              <Button
                variant="outline-secondary"
                className="w-100 mt-3"
                href="/"
              >
                Continue Shopping
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
}