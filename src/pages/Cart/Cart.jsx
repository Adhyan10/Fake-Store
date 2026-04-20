import { Link } from "react-router-dom";
import CartItem from "../../components/CartItem/CartItem";
import { useCart } from "../../hooks/useCart";
import { formatCurrency } from "../../utils/helpers";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, subtotal } = useCart();

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <main className="page-wrap">
      <div className="section-head">
        <h1>Shopping Cart</h1>
        <p>{cartItems.length} unique items</p>
      </div>

      {!cartItems.length && <p className="empty-state">Your cart is empty.</p>}

      {cartItems.map((item) => (
        <CartItem
          key={item.productId}
          item={item}
          onIncrease={() => updateQuantity(item.productId, item.quantity + 1)}
          onDecrease={() => updateQuantity(item.productId, item.quantity - 1)}
          onRemove={() => removeFromCart(item.productId)}
        />
      ))}

      {cartItems.length > 0 && (
        <section className="summary-card">
          <p>
            <span>Subtotal</span>
            <strong>{formatCurrency(subtotal)}</strong>
          </p>
          <p>
            <span>Tax</span>
            <strong>{formatCurrency(tax)}</strong>
          </p>
          <p className="summary-total">
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </p>
          <Link to="/checkout" className="primary-btn full-width">
            Go to Checkout
          </Link>
        </section>
      )}
    </main>
  );
}

export default Cart;
