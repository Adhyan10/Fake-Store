import { FiSearch } from "react-icons/fi";

function SearchBar({ value, onChange }) {
  return (
    <label className="search-bar" htmlFor="search-products">
      <FiSearch size={18} />
      <input
        id="search-products"
        type="text"
        placeholder="Search products..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

export default SearchBar;
