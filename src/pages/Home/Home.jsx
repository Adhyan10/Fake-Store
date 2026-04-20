import { Link } from "react-router-dom";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import { useProducts } from "../../hooks/useProducts";

function Home() {
  const { products, loading, error } = useProducts();
  const featured = products.slice(0, 4);

  return (
    <main className="page-wrap">
      <section className="hero-banner">
        <p className="hero-kicker">Simple React Store</p>
        <h1>Explore products, save favorites, and manage your cart.</h1>
        <p>
          A beginner-friendly e-commerce frontend built with React, router,
          context, custom hooks, and Fake Store API.
        </p>
        <Link to="/products" className="primary-btn">
          Browse Products
        </Link>
      </section>

      <section>
        <div className="section-head">
          <h2>Featured Products</h2>
          <Link to="/products">See all</Link>
        </div>

        {loading && <p className="loading">Loading products...</p>}
        {error && <p className="error-text">{error}</p>}
        {!loading && !error && <ProductGrid products={featured} />}
      </section>
    </main>
  );
}

export default Home;
