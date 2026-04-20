import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { productApi } from "../../services/api";
import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";
import { formatCurrency } from "../../utils/helpers";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await productApi.getProductById(id);
        setProduct(data);
      } catch {
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <main className="page-wrap">
        <p className="loading">Loading product...</p>
      </main>
    );
  if (error)
    return (
      <main className="page-wrap">
        <p className="error-text">{error}</p>
      </main>
    );
  if (!product) return null;

  const slides = [product.image, product.image, product.image];

  return (
    <main className="page-wrap details-layout">
      <section>
        <Swiper spaceBetween={16} slidesPerView={1}>
          {slides.map((image, index) => (
            <SwiperSlide key={`${product.id}-${index}`}>
              <img src={image} alt={product.title} className="details-image" />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section>
        <p className="product-category">{product.category}</p>
        <h1>{product.title}</h1>
        <p className="details-price">{formatCurrency(product.price)}</p>
        <p className="details-rating">
          <FaStar /> {product.rating?.rate || 0} ({product.rating?.count || 0}{" "}
          reviews)
        </p>
        <p className="details-description">{product.description}</p>

        <div className="details-actions">
          <button
            type="button"
            className="primary-btn"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
          <button
            type="button"
            className="secondary-btn"
            onClick={() => toggleWishlist(product.id)}
          >
            {isInWishlist(product.id) ? <FaHeart /> : <FaRegHeart />} Wishlist
          </button>
        </div>
      </section>
    </main>
  );
}

export default ProductDetails;
