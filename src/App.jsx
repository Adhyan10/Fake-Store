import { Link, NavLink, Route, Routes } from "react-router-dom";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Wishlist from "./pages/Wishlist/Wishlist";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import { useCart } from "./hooks/useCart";

function App() {
  const { cartCount, wishlistItems } = useCart();

  return (
    <div className="app-shell">
      <header className="main-header">
        <div className="container nav-wrap">
          <Link to="/" className="brand">
            CartCraft
          </Link>

          <nav className="main-nav">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/wishlist">
              <FiHeart /> Wishlist ({wishlistItems.length})
            </NavLink>
            <NavLink to="/cart">
              <FiShoppingCart /> Cart ({cartCount})
            </NavLink>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>

      <ToastContainer position="bottom-right" autoClose={1700} />
    </div>
  );
}

export default App;
