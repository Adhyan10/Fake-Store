import ProductCard from "../ProductCard/ProductCard";

function ProductGrid({ products }) {
  if (!products.length) {
    return (
      <p className="empty-state">No products found for current filters.</p>
    );
  }

  return (
    <section className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}

export default ProductGrid;
