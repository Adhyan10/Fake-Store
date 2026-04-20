import { priceRanges } from "../../utils/helpers";

function Filters({
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedPriceRange,
  setSelectedPriceRange,
  sortBy,
  setSortBy,
  activeTab,
  setActiveTab,
}) {
  return (
    <div className="filters-wrap">
      <div className="tabs">
        <button
          type="button"
          className={activeTab === "all" ? "active" : ""}
          onClick={() => {
            setActiveTab("all");
            setSelectedCategory("all");
          }}
        >
          All Products
        </button>

        {categories.map((category) => (
          <button
            type="button"
            key={category}
            className={activeTab === category ? "active" : ""}
            onClick={() => {
              setActiveTab(category);
              setSelectedCategory(category);
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="filters-grid">
        <div>
          <p className="filter-label">Category</p>
          <select
            value={selectedCategory}
            onChange={(event) => {
              const value = event.target.value;
              setSelectedCategory(value);
              setActiveTab(value);
            }}
          >
            <option value="all">All</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="filter-label">Price</p>
          <select
            value={selectedPriceRange}
            onChange={(event) => setSelectedPriceRange(event.target.value)}
          >
            {priceRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="filter-label">Sort By</p>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Filters;
