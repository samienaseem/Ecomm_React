import { useContext } from "react"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/esm/Button'
import Col from "react-bootstrap/esm/Col"
import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"
import ListGroup from 'react-bootstrap/ListGroup'
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import MessageBox from "../Components/MessageBox"
import { Store } from "../Store"

export default function CartScreen() {
    const {state,dispatch}=useContext(Store)
    console.log({'cartScreen': state})
    const {cart:{ cartItems },
    }=state
    console.log(cartItems)

    const UpdateCartHandler=(item,quantity)=>{
        alert({'quantity': quantity})
    }
    const UpdateCartHandler1 = (item, quantity) => {
      alert("minus one ")
    };
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
                <ListGroup>
                  {cartItems.map((item) => (
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
                              <Button disabled={item.quantity === 1} onClick={UpdateCartHandler1(item,item.quantity-1)}>
                                <i className="fas fa-minus-circle"></i>
                              </Button>{' '}
                              <span>{item.quantity}</span>{' '}
                              <Button 
                                disabled={item.quantity === item.countInStock} onClick={()=>{
                                    UpdateCartHandler(item,item.quantity+1)
                                }}
                               >
                                <i className="fas fa-plus-circle"></i>
                              </Button>{' '}
                            </Col>
                            <Col md={5}>£{item.price}</Col>
                            <Col md={2}>
                              <Button variant="light">
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
                      <Button variant="success">Proceed to checkout</Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
}