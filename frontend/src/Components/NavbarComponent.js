// import Badge from 'react-bootstrap/Badge';
// import Container from 'react-bootstrap/Container';
// import Button from 'react-bootstrap/esm/Button';
// import Nav from 'react-bootstrap/Nav';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import { LinkContainer } from 'react-router-bootstrap';
// import 'react-toastify/dist/ReactToastify.css';
// import './App.css';
// import { InputGroup, Navbar } from 'react-bootstrap';
// import { Heart, Menu, ShoppingCart } from 'lucide-react';
// import { Form } from 'react-router-dom';
// import { Search } from 'react-bootstrap-icons';

// export default function NavbarComponent() {
//   return (
//     <div>
//       <div className="bg-dark text-white py-2 text-center">
//         <Container fluid>
//           <small>Free Shipping on Orders Over £50 | Shop Now 🎉</small>
//         </Container>
//       </div>

//       {/* Main Navbar */}
//       <Navbar
//         bg={scrolled ? 'white' : 'dark'}
//         expand="lg"
//         fixed="top"
//         className={`py-3 transition-all ${scrolled ? 'shadow-sm' : ''}`}
//         style={{ top: '40px' }}
//       >
//         <Container fluid className="px-4">
//           {/* Mobile Menu Toggle */}
//           <Button
//             variant="link"
//             className="d-lg-none p-0 me-3 text-dark"
//             onClick={() => setSideBarOpen(true)}
//           >
//             <Menu size={24} />
//           </Button>

//           {/* Brand Logo */}
//           <LinkContainer to="/">
//             <Navbar.Brand className="me-4 fw-bold fs-4">
//               11th Street Atelier
//             </Navbar.Brand>
//           </LinkContainer>

//           {/* Categories Dropdown - Desktop */}
//           {/* <Nav className="d-none d-lg-flex me-auto">
//                 <NavDropdown
//                   title={
//                     <span className="d-flex align-items-center">
//                       <LayoutGrid size={18} className="me-2" />
//                       Categories
//                       <ChevronDown size={16} className="ms-2" />
//                     </span>
//                   }
//                   id="categories-dropdown"
//                 >
//                   {categories.map((category) => (
//                     <LinkContainer
//                       key={category}
//                       to={{
//                         pathname: '/search',
//                         search: `category=${category}`,
//                       }}
//                     >
//                       <NavDropdown.Item>{category}</NavDropdown.Item>
//                     </LinkContainer>
//                   ))}
//                 </NavDropdown>
//               </Nav> */}

//           {/* Search Bar - Desktop */}
//           <Form className="d-none d-lg-flex mx-4" style={{ flex: '0 0 40%' }}>
//             <InputGroup>
//               <Form.Control
//                 type="text"
//                 placeholder="Search for products..."
//                 className="border-end-0"
//               />
//               <Button variant="outline-secondary" className="border-start-0">
//                 <Search size={18} />
//               </Button>
//             </InputGroup>
//           </Form>

//           {/* Right Navigation */}
//           <Nav className="ms-auto align-items-center">
//             {/* Search Toggle - Mobile */}
//             <Button
//               variant="link"
//               className="d-lg-none p-2 text-dark"
//               onClick={() => setShowSearch(!showSearch)}
//             >
//               <Search size={20} />
//             </Button>

//             {/* Wishlist */}
//             <Nav.Link className="d-none d-lg-flex p-2">
//               <Heart size={20} />
//             </Nav.Link>

//             {/* Cart */}
//             <LinkContainer to="/cart">
//               <Nav.Link className="p-2 position-relative">
//                 <ShoppingCart size={20} />
//                 {cart.cartItems.length > 0 && (
//                   <Badge
//                     bg="danger"
//                     className="position-absolute"
//                     style={{ top: '0', right: '0' }}
//                   >
//                     {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
//                   </Badge>
//                 )}
//               </Nav.Link>
//             </LinkContainer>

//             {/* User Menu */}
//             {userInfo ? (
//               <NavDropdown
//                 title={
//                   <span className="d-flex align-items-center">
//                     <User size={20} />
//                   </span>
//                 }
//                 id="user-dropdown"
//               >
//                 <div className="px-3 py-2 mb-2">
//                   <small className="text-muted">Welcome back</small>
//                   <p className="mb-0 fw-bold">{userInfo.name}</p>
//                 </div>
//                 <NavDropdown.Divider />
//                 <LinkContainer to="/profile">
//                   <NavDropdown.Item>
//                     <User size={16} className="me-2" />
//                     Profile
//                   </NavDropdown.Item>
//                 </LinkContainer>
//                 <LinkContainer to="/orderhistory">
//                   <NavDropdown.Item>
//                     <Package size={16} className="me-2" />
//                     Orders
//                   </NavDropdown.Item>
//                 </LinkContainer>
//                 {userInfo.isAdmin && (
//                   <>
//                     <NavDropdown.Divider />
//                     <NavDropdown.Header>Admin</NavDropdown.Header>
//                     <LinkContainer to="/admin/dashboard">
//                       <NavDropdown.Item>Dashboard</NavDropdown.Item>
//                     </LinkContainer>
//                     <LinkContainer to="/admin/products">
//                       <NavDropdown.Item>Products</NavDropdown.Item>
//                     </LinkContainer>
//                     <LinkContainer to="/admin/orders">
//                       <NavDropdown.Item>Orders</NavDropdown.Item>
//                     </LinkContainer>
//                     <LinkContainer to="/admin/users">
//                       <NavDropdown.Item>Users</NavDropdown.Item>
//                     </LinkContainer>
//                   </>
//                 )}
//                 <NavDropdown.Divider />
//                 <NavDropdown.Item onClick={SignoutHandler}>
//                   Sign Out
//                 </NavDropdown.Item>
//               </NavDropdown>
//             ) : (
//               <LinkContainer to="/signin">
//                 <Nav.Link className="p-2">
//                   <User size={20} />
//                 </Nav.Link>
//               </LinkContainer>
//             )}
//           </Nav>
//         </Container>
//       </Navbar>

//       {/* Mobile Search Bar */}
//       <Offcanvas
//         show={showSearch}
//         onHide={() => setShowSearch(false)}
//         placement="top"
//         style={{ height: 'auto' }}
//       >
//         <Offcanvas.Header closeButton>
//           <Offcanvas.Title>Search Products</Offcanvas.Title>
//         </Offcanvas.Header>
//         <Offcanvas.Body>
//           <Form className="mb-3">
//             <InputGroup>
//               <Form.Control
//                 type="text"
//                 placeholder="Search for products..."
//                 autoFocus
//               />
//               <Button variant="outline-secondary">
//                 <Search size={18} />
//               </Button>
//             </InputGroup>
//           </Form>
//         </Offcanvas.Body>
//       </Offcanvas>
//     </div>
//   );
// }
