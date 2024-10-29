import { useContext, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import CartScreen from './Screens/CartScreen';
import HomeScreen from './Screens/HomeScreen';
import OrderHistoryScreen from './Screens/OrderHistoryScreen';
import OrderScreen from './Screens/OrderScreen';
import PaymentMethodScreen from './Screens/PaymentMethodScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import ProductScreen from './Screens/ProductScreen';
import ProfileScreen from './Screens/ProfileScreen';
import ShippingAddressScreen from './Screens/ShippingAddressScreen';
import SignInScreen from './Screens/SignInScreen';
import SignUpScreen from './Screens/SignUpScreen';
import { Store } from './Store';

function App() {
  const {state,dispatch:ctxDispatch} = useContext(Store)
  const {cart,userInfo}= state;

  const [sideBarIsOpen, setSideBarOpen]=useState(false);

  const SignoutHandler=()=>{
    //alert("signout succesfull")
    ctxDispatch({
      type: 'USER_SIGNOUT'
    })
    localStorage.removeItem('userInfo')
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
  }
  console.log({"App":state})
  console.log(sideBarIsOpen)

  return (
    <BrowserRouter>
      <div
        className={
          sideBarIsOpen
            ? 'd-flex flex-column site-container active-cont'
            : 'd-flex flex-column site-container'
        }
      >
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
              <Button
                className="sidebar-button"
                variant="dark"
                onClick={() => {
                  setSideBarOpen(!sideBarIsOpen);
                }}
              >
                <i className="fas fa-bars"></i>
              </Button>

              <LinkContainer to="/">
                <Navbar.Brand>11th Street Atelier</Navbar.Brand>
              </LinkContainer>

              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto w-100 justify-content-end">
                  <Link to="/cart" className="nav-link">
                    Cart{' '}
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        to="#signout"
                        className="dropdown-item"
                        onClick={SignoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          {/* <a href="/">11th Street Atelier</a> */}
        </header>

        <div
          className={
            sideBarIsOpen
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : "side-navbar d-flex justify-content-between flex-wrap flex-column"
          }
        ></div>

        <main>
          <Container fluid>
            <Routes>
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SignInScreen />} />
              <Route path="/signup" element={<SignUpScreen />} />
              <Route path="/shipping" element={<ShippingAddressScreen />} />
              <Route path="/payment" element={<PaymentMethodScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/orderhistory" element={<OrderHistoryScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/order/:id" element={<OrderScreen />} />
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All Rights Reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
