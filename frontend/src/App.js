import './App.css';
import Header from './components/Header/Header';
import Product from './components/Product/Product';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import ProductList from './components/Product/ProductList';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import Shipping from './components/Shipping/Shipping';
import Payment from './components/Payment/Payment';
import Order from './components/Order/Order';
import OrderDetail from './components/Order/OrderDetail';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<ProductList />} />
      </Routes>
      <Routes>
        <Route path="/products/:slug" element={<Product />} />
      </Routes>
      <Routes>
        <Route path="/products" element={<ProductList />} />
      </Routes>

      <Routes>
        <Route path="/shipping" element={<Shipping />} />
      </Routes>

      <Routes>
        <Route path="/payment" element={<Payment />} />
      </Routes>

      <Routes>
        <Route path="/place_order" element={<Order />} />
      </Routes>

      <Routes>
        <Route path="/order" element={<OrderDetail />} />
      </Routes>

      <Routes>
        <Route path="/signin" element={<Signin />} />
      </Routes>

      <Routes>
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>

  );
}

export default App;
