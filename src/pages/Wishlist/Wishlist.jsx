import ProductGrid from "../../components/ProductGrid/ProductGrid";
import { useProducts } from "../../hooks/useProducts";
import { useWishlist } from "../../hooks/useWishlist";

function Wishlist() {
  const { products, loading, error } = useProducts();
  const { wishlistItems } = useWishlist();

  const wishlistProducts = products.filter((product) =>
    wishlistItems.includes(product.id),
  );

  return (
    <main className="page-wrap">
      <div className="section-head">
        <h1>Wishlist</h1>
        <p>{wishlistProducts.length} saved items</p>
      </div>

      {loading && <p className="loading">Loading wishlist...</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && !error && <ProductGrid products={wishlistProducts} />}
    </main>
  );
}

export default Wishlist;
