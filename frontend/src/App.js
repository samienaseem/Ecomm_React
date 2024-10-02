import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';

function App() {
  return (
    <BrowserRouter>
      <div className='d-flex flex-column site-container'>
        <header>
          <Navbar bg="dark" variant="dark">
            <Container fluid>
              <LinkContainer to="/">
                <Navbar.Brand>11th Street Atelier</Navbar.Brand>
              </LinkContainer>
            </Container>
          </Navbar>
          {/* <a href="/">11th Street Atelier</a> */}
        </header>

        <main>
          <Container fluid>
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className='text-center'>All Rights Reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
