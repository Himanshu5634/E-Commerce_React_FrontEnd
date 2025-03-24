import React, { useEffect, useState } from "react";
import "./Category.scss";
import "../../Components/Products/productCard.scss";
import { categories } from "../../utils/categories.js";
import ProductCard from "../../Components/Products/ProductCard.jsx";
import { useGetProductsQuery } from "../../Features/ProductApi.js";
import Card from "../../Components/ProductCard/card.jsx";

/**
 * @component Category
 * @description Displays a list of products filtered by selected categories.
 * Fetches product data using the `useGetProductsQuery` hook and allows users to filter products by categories.
 */
const Category = () => {
  const { data, isLoading, error } = useGetProductsQuery(); // Fetch products using RTK Query
  const [products, setProducts] = useState([]); // State for all products
  const [selectedCategories, setSelectedCategories] = useState([]); // State for selected categories
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products

  /**
   * @function handleProducts
   * @description Handles the selection and deselection of categories.
   * Updates the `selectedCategories` state based on user input.
   * @param {Object} e - Event object from the checkbox input.
   */
  const handleProducts = (e) => {
    const { checked, value } = e.target;
    setSelectedCategories((prev) =>
      checked ? [...prev, value] : prev.filter((category) => category !== value)
    );
  };

  /**
   * @hook useEffect
   * @description Filters the products based on the selected categories whenever `selectedCategories` or `data` changes.
   * @dependency [selectedCategories, data] - Runs whenever the selected categories or product data changes.
   */
  useEffect(() => {
    if (data?.products) {
      setFilteredProducts(
        selectedCategories.length > 0
          ? data.products.filter((product) =>
              selectedCategories.includes(product.category)
            )
          : data.products
      );
    }
  }, [selectedCategories, data]);

  if (isLoading) return <div>Loading...</div>; // Show loading message while fetching data
  if (error) return <div>Error loading products.</div>; // Show error message if fetching fails

  return (
    <div className="container">
      {/* Sidebar for category selection */}
      <div className="category-container">
        <aside className="sidebar sticky-sidebar">
          <h3>Categories</h3>
          <ul>
            {categories.map((category, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  id={category}
                  value={category}
                  onClick={handleProducts}
                />
                <label htmlFor={category}>{category}</label>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {/* Product section */}
      <div className="product-section-wrapper">
        {filteredProducts.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Category;