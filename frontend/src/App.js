import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';

function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <a href="/">11th Street Atelier</a>
        </header>

        <main>
          <Routes>
            <Route path='/product/:slug' element={<ProductScreen />}/>
            <Route path='/' element={<HomeScreen />}/>
          </Routes>
          
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
