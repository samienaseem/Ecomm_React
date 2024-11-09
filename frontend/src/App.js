import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
// import Badge from 'react-bootstrap/Badge';
// import Container from 'react-bootstrap/Container';
// import Button from 'react-bootstrap/esm/Button';
// import Col from 'react-bootstrap/esm/Col';
// import Row from 'react-bootstrap/esm/Row';
// import Nav from 'react-bootstrap/Nav';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AdminRoute from './Components/AdminRoute';
import ProtectedRoute from './Components/ProtectedRoute';
import SearchBox from './Components/SearchBox';
import CartScreen from './Screens/CartScreen';
import DashboardScreen from './Screens/DashboardScreen';
import HomeScreen from './Screens/HomeScreen';
import OrderHistoryScreen from './Screens/OrderHistoryScreen';
import OrderScreen from './Screens/OrderScreen';
import PaymentMethodScreen from './Screens/PaymentMethodScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import ProductListScreen from './Screens/ProductListScreen';
import ProductScreen from './Screens/ProductScreen';
import ProfileScreen from './Screens/ProfileScreen';
import SearchScreen from './Screens/SearchScreen';
import ShippingAddressScreen from './Screens/ShippingAddressScreen';
import SignInScreen from './Screens/SignInScreen';
import SignUpScreen from './Screens/SignUpScreen';
import { Store } from './Store';

import {
  Heart,
  Menu,
  Package,
  Search,
  ShoppingCart,
  User
} from 'lucide-react';
import {
  Badge,
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
  Row
} from 'react-bootstrap';

function App() {

  // all addition to be removed later
  const [showSearch, setShowSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // -----------------------------------
  const {state,dispatch:ctxDispatch} = useContext(Store)
  const {cart,userInfo}= state;


  const [sideBarIsOpen, setSideBarOpen]=useState(false);
  const [categories, setCategories]=useState([]);

  const SignoutHandler=()=>{
    //alert("signout succesfull")
    ctxDispatch({
      type: 'USER_SIGNOUT'
    })
    localStorage.removeItem('userInfo')
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href='/signin'
  }
  console.log({"App":state})
  console.log(sideBarIsOpen)

  useEffect(()=>{
    const fetchCategories=async()=>{
      try {
        const {data}=await axios.get('/api/product/categories');
        setCategories(data);

      } catch (err) {
        toast.error(err.message);
      }

    }
    fetchCategories();

    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    
  },[])

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
          {/* <Navbar bg="dark" variant="dark" expand="lg">
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

              <SearchBox />

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
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Admin" id="admin-nav-dropdown">
                      <LinkContainer to="/admin/dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to="/admin/productlist">
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to="/admin/orderlist">
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to="/admin/userlist">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar> */}

          {/* second version */}
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
              <Row>
                <Col xxl={1} xl={1} lg={1} md={1} sm={1} xs={1}>
                  <Button
                    className="sidebar-button"
                    variant="dark"
                    onClick={() => {
                      setSideBarOpen(!sideBarIsOpen);
                    }}
                  >
                    <i className="fas fa-bars"></i>
                  </Button>
                </Col>
                <Col xxl={8} xl={8} lg={8} md={9} sm={9} xs={9}>
                  <Row>
                    <Col xl={3} lg={4} md={4} sm={5}>
                      <LinkContainer to="/">
                        <Navbar.Brand>11th Street Atelier</Navbar.Brand>
                      </LinkContainer>
                    </Col>
                    <Col xl={9} lg={8} md={8} sm={7}>
                      <SearchBox />
                    </Col>
                  </Row>
                </Col>
                <Col
                  xxl={3}
                  xl={3}
                  lg={3}
                  md={2}
                  sm={2}
                  xs={2}
                  className="right-nav-menu-button"
                >
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
                        <NavDropdown
                          title={userInfo.name}
                          id="basic-nav-dropdown"
                        >
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
                      {userInfo && userInfo.isAdmin && (
                        <NavDropdown title="Admin" id="admin-nav-dropdown">
                          <LinkContainer to="/admin/dashboard">
                            <NavDropdown.Item>Dashboard</NavDropdown.Item>
                          </LinkContainer>

                          <LinkContainer to="/admin/productlist">
                            <NavDropdown.Item>Products</NavDropdown.Item>
                          </LinkContainer>

                          <LinkContainer to="/admin/orderlist">
                            <NavDropdown.Item>Orders</NavDropdown.Item>
                          </LinkContainer>

                          <LinkContainer to="/admin/userlist">
                            <NavDropdown.Item>Users</NavDropdown.Item>
                          </LinkContainer>
                        </NavDropdown>
                      )}
                    </Nav>
                  </Navbar.Collapse>

                  <Nav className="ms-auto align-items-center">
                    {/* Search Toggle - Mobile */}
                    <Button
                      variant="link"
                      className="d-lg-none p-2 text-dark"
                      onClick={() => setShowSearch(!showSearch)}
                    >
                      <Search size={20} />
                    </Button>

                    {/* Wishlist */}
                    <Nav.Link className="d-none d-lg-flex p-2">
                      <Heart size={20} />
                    </Nav.Link>

                    {/* Cart */}
                    <LinkContainer to="/cart">
                      <Nav.Link className="p-2 position-relative">
                        <ShoppingCart size={20} />
                        {cart.cartItems.length > 0 && (
                          <Badge
                            bg="danger"
                            className="position-absolute"
                            style={{ top: '0', right: '0' }}
                          >
                            {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                          </Badge>
                        )}
                      </Nav.Link>
                    </LinkContainer>

                    {/* User Menu */}
                    {userInfo ? (
                      <NavDropdown
                        title={
                          <span className="d-flex align-items-center">
                            <User size={20} />
                          </span>
                        }
                        id="user-dropdown"
                      >
                        <div className="px-3 py-2 mb-2">
                          <small className="text-muted">Welcome back</small>
                          <p className="mb-0 fw-bold">{userInfo.name}</p>
                        </div>
                        <NavDropdown.Divider />
                        <LinkContainer to="/profile">
                          <NavDropdown.Item>
                            <User size={16} className="me-2" />
                            Profile
                          </NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/orderhistory">
                          <NavDropdown.Item>
                            <Package size={16} className="me-2" />
                            Orders
                          </NavDropdown.Item>
                        </LinkContainer>
                        {userInfo.isAdmin && (
                          <>
                            <NavDropdown.Divider />
                            <NavDropdown.Header>Admin</NavDropdown.Header>
                            <LinkContainer to="/admin/dashboard">
                              <NavDropdown.Item>Dashboard</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/admin/products">
                              <NavDropdown.Item>Products</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/admin/orders">
                              <NavDropdown.Item>Orders</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/admin/users">
                              <NavDropdown.Item>Users</NavDropdown.Item>
                            </LinkContainer>
                          </>
                        )}
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={SignoutHandler}>
                          Sign Out
                        </NavDropdown.Item>
                      </NavDropdown>
                    ) : (
                      <LinkContainer to="/signin">
                        <Nav.Link className="p-2">
                          <User size={20} />
                        </Nav.Link>
                      </LinkContainer>
                    )}
                  </Nav>
                </Col>
              </Row>
            </Container>
          </Navbar>

          {/* ------------------------------------------------------------------ThirdVersion------------------------------------------------------------------ */}

          <div className="bg-dark text-white py-2 text-center">
            <Container fluid>
              <small>Free Shipping on Orders Over £50 | Shop Now 🎉</small>
            </Container>
          </div>

          {/* Main Navbar */}
          <Navbar
            bg={scrolled ? 'white' : 'dark'}
            expand="lg"
            fixed="top"
            className={`py-3 transition-all ${scrolled ? 'shadow-sm' : ''}`}
            style={{ top: '40px' }}
          >
            <Container fluid className="px-4">
              {/* Mobile Menu Toggle */}
              <Button
                variant="link"
                className="d-lg-none p-0 me-3 text-dark"
                onClick={() => setSideBarOpen(true)}
              >
                <Menu size={24} />
              </Button>

              {/* Brand Logo */}
              <LinkContainer to="/">
                <Navbar.Brand className="me-4 fw-bold fs-4">
                  11th Street Atelier
                </Navbar.Brand>
              </LinkContainer>

              {/* Categories Dropdown - Desktop */}
              {/* <Nav className="d-none d-lg-flex me-auto">
                <NavDropdown
                  title={
                    <span className="d-flex align-items-center">
                      <LayoutGrid size={18} className="me-2" />
                      Categories
                      <ChevronDown size={16} className="ms-2" />
                    </span>
                  }
                  id="categories-dropdown"
                >
                  {categories.map((category) => (
                    <LinkContainer
                      key={category}
                      to={{
                        pathname: '/search',
                        search: `category=${category}`,
                      }}
                    >
                      <NavDropdown.Item>{category}</NavDropdown.Item>
                    </LinkContainer>
                  ))}
                </NavDropdown>
              </Nav> */}

              {/* Search Bar - Desktop */}
              <Form
                className="d-none d-lg-flex mx-4"
                style={{ flex: '0 0 40%' }}
              >
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Search for products..."
                    className="border-end-0"
                  />
                  <Button
                    variant="outline-secondary"
                    className="border-start-0"
                  >
                    <Search size={18} />
                  </Button>
                </InputGroup>
              </Form>

              {/* Right Navigation */}
              <Nav className="ms-auto align-items-center">
                {/* Search Toggle - Mobile */}
                <Button
                  variant="link"
                  className="d-lg-none p-2 text-dark"
                  onClick={() => setShowSearch(!showSearch)}
                >
                  <Search size={20} />
                </Button>

                {/* Wishlist */}
                <Nav.Link className="d-none d-lg-flex p-2">
                  <Heart size={20} />
                </Nav.Link>

                {/* Cart */}
                <LinkContainer to="/cart">
                  <Nav.Link className="p-2 position-relative">
                    <ShoppingCart size={20} />
                    {cart.cartItems.length > 0 && (
                      <Badge
                        bg="danger"
                        className="position-absolute"
                        style={{ top: '0', right: '0' }}
                      >
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Nav.Link>
                </LinkContainer>

                {/* User Menu */}
                {userInfo ? (
                  <NavDropdown
                    title={
                      <span className="d-flex align-items-center">
                        <User size={20} />
                      </span>
                    }
                    id="user-dropdown"
                  >
                    <div className="px-3 py-2 mb-2">
                      <small className="text-muted">Welcome back</small>
                      <p className="mb-0 fw-bold">{userInfo.name}</p>
                    </div>
                    <NavDropdown.Divider />
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>
                        <User size={16} className="me-2" />
                        Profile
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>
                        <Package size={16} className="me-2" />
                        Orders
                      </NavDropdown.Item>
                    </LinkContainer>
                    {userInfo.isAdmin && (
                      <>
                        <NavDropdown.Divider />
                        <NavDropdown.Header>Admin</NavDropdown.Header>
                        <LinkContainer to="/admin/dashboard">
                          <NavDropdown.Item>Dashboard</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/admin/products">
                          <NavDropdown.Item>Products</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/admin/orders">
                          <NavDropdown.Item>Orders</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/admin/users">
                          <NavDropdown.Item>Users</NavDropdown.Item>
                        </LinkContainer>
                      </>
                    )}
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={SignoutHandler}>
                      Sign Out
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to="/signin">
                    <Nav.Link className="p-2">
                      <User size={20} />
                    </Nav.Link>
                  </LinkContainer>
                )}
              </Nav>
            </Container>
          </Navbar>

          {/* Mobile Search Bar */}
          <Offcanvas
            show={showSearch}
            onHide={() => setShowSearch(false)}
            placement="top"
            style={{ height: 'auto' }}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Search Products</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Form className="mb-3">
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Search for products..."
                    autoFocus
                  />
                  <Button variant="outline-secondary">
                    <Search size={18} />
                  </Button>
                </InputGroup>
              </Form>
            </Offcanvas.Body>
          </Offcanvas>

          {/* Add your sidebar component here */}

          {/* <a href="/">11th Street Atelier</a> */}
        </header>

        <div
          className={
            sideBarIsOpen
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
          }
        >
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item className="category-header">
              <strong>Categories</strong>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer
                  to={{ pathname: '/search', search: `category=${category}` }}
                  onClick={() => setSideBarOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div>

        <main>
          <Container fluid>
            <Routes>
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SignInScreen />} />
              <Route path="/signup" element={<SignUpScreen />} />
              <Route path="/shipping" element={<ShippingAddressScreen />} />
              <Route path="/payment" element={<PaymentMethodScreen />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileScreen />
                  </ProtectedRoute>
                }
              />
              <Route path="/search" element={<SearchScreen />} />
              <Route
                path="/orderhistory"
                element={
                  <ProtectedRoute>
                    <OrderHistoryScreen />
                  </ProtectedRoute>
                }
              />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderScreen />
                  </ProtectedRoute>
                }
              />
              <Route path="/product/:slug" element={<ProductScreen />} />

              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <DashboardScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/productlist"
                element={
                  <AdminRoute>
                    <ProductListScreen />
                  </AdminRoute>
                }
              ></Route>

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
