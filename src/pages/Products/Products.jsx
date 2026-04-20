import { useMemo, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import Filters from "../../components/Filters/Filters";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import { useProducts } from "../../hooks/useProducts";
import { useDebounce } from "../../hooks/useDebounce";
import { matchPriceRange, sortProducts } from "../../utils/helpers";

function Products() {
  const { products, categories, loading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [activeTab, setActiveTab] = useState("all");

  const debouncedSearch = useDebounce(searchTerm, 450);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = debouncedSearch.trim().toLowerCase();

    const filtered = products.filter((product) => {
      const matchSearch = product.title
        .toLowerCase()
        .includes(normalizedSearch);
      const matchCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchPrice = matchPriceRange(product.price, selectedPriceRange);
      return matchSearch && matchCategory && matchPrice;
    });

    return sortProducts(filtered, sortBy);
  }, [products, debouncedSearch, selectedCategory, selectedPriceRange, sortBy]);

  return (
    <main className="page-wrap">
      <div className="section-head">
        <h1>Products</h1>
        <p>{filteredProducts.length} items</p>
      </div>

      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <Filters
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedPriceRange={selectedPriceRange}
        setSelectedPriceRange={setSelectedPriceRange}
        sortBy={sortBy}
        setSortBy={setSortBy}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {loading && <p className="loading">Loading products...</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && !error && <ProductGrid products={filteredProducts} />}
    </main>
  );
}

export default Products;
