import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { formatCurrency } from "../../utils/helpers";

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <article className="cart-item">
      <img src={item.image} alt={item.title} />

      <div className="cart-item-info">
        <h4>{item.title}</h4>
        <p>{formatCurrency(item.price)}</p>
      </div>

      <div className="qty-controls">
        <button
          type="button"
          onClick={onDecrease}
          aria-label="Decrease quantity"
        >
          <FiMinus />
        </button>
        <span>{item.quantity}</span>
        <button
          type="button"
          onClick={onIncrease}
          aria-label="Increase quantity"
        >
          <FiPlus />
        </button>
      </div>

      <p className="cart-item-total">
        {formatCurrency(item.price * item.quantity)}
      </p>

      <button
        type="button"
        className="danger-icon"
        onClick={onRemove}
        aria-label="Remove item"
      >
        <FiTrash2 />
      </button>
    </article>
  );
}

export default CartItem;
