import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addToCart } from "../../Features/CartSlice";

/**
 * ProductCard component for displaying product details.
 * Includes lazy loading for images, infinite scrolling, and add-to-cart functionality.
 * @param {Object} props - Component props.
 * @param {Object} props.product - The product object to display.
 * @param {string} props.product.id - The unique ID of the product.
 * @param {string} props.product.title - The title of the product.
 * @param {string} props.product.thumbnail - The thumbnail image URL of the product.
 * @param {string} props.product.description - The description of the product.
 * @param {number} props.product.price - The price of the product.
 * @param {number} props.product.discountPercentage - The discount percentage of the product.
 * @param {Function} props.loadMoreData - Function to load more data when the component is in view.
 */
const ProductCard = ({ product, loadMoreData }) => {
  const [loading, setLoading] = useState(true); // State for image loading
  const token = localStorage.getItem("token"); // User authentication token
  const imgRef = useRef(null); // Reference for the product image
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**
   * Sets up an IntersectionObserver to trigger `loadMoreData` when the component is in view.
   */
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        console.log("Component is in view, loading more data...");
        loadMoreData();
      }
    });

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [imgRef, loadMoreData]);

  /**
   * Navigates to the product details page.
   * @param {string} id - The unique ID of the product.
   */
  const showProductDetails = (id) => {
    navigate(`product/${id}`);
  };

  /**
   * Handles adding the product to the cart.
   * Dispatches the `addToCart` action with the product details and user ID.
   * @param {Object} e - Event object from the button click.
   */
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevents triggering the parent click event
    console.log("Adding product to cart...");
    dispatch(addToCart({ ...product, userId: token }));
  };

  return (
    <div
      className="product-card"
      onClick={() => showProductDetails(product.id)}
    >
      {/* Product Image */}
      <div className="product-img">
        {loading && <div className="skeleton"></div>}
        <img
          src={product.thumbnail}
          ref={imgRef}
          alt={product.title}
          className="product-image"
          loading="lazy"
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
        />
      </div>

      {/* Product Information */}
      <div className="product-info">
        <h2 className="product-title">{product.title}</h2>
        <p className="product-description">
          {product.description.substring(0, 100)}...
        </p>
        <p className="product-price">
          ${product.price}{" "}
          <span className="discount">-{product.discountPercentage}%</span>
        </p>
        <button className="add-to-cart" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;