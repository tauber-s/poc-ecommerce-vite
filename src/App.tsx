import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Header from './components/header/Header';
import Products from './components/products/Products';
import './App.css';
import ProductView from './components/products/view/ProductView';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product/:id" element={<ProductView />} />
        </Routes>
      </Router>
    </div>
  )
}
export default App