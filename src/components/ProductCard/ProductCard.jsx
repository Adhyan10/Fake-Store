import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { formatCurrency } from "../../utils/helpers";
import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  return (
    <motion.article
      className="product-card"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        type="button"
        className="wishlist-btn"
        onClick={() => toggleWishlist(product.id)}
        aria-label="Toggle wishlist"
      >
        {isInWishlist(product.id) ? <FaHeart /> : <FaRegHeart />}
      </button>

      <Link to={`/products/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />
      </Link>

      <div className="product-body">
        <p className="product-category">{product.category}</p>
        <Link to={`/products/${product.id}`} className="product-title">
          {product.title}
        </Link>

        <div className="product-meta">
          <span className="price">{formatCurrency(product.price)}</span>
          <span className="rating">
            <FaStar /> {product.rating?.rate || 0}
          </span>
        </div>

        <button
          type="button"
          className="primary-btn"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </motion.article>
  );
}

export default ProductCard;
