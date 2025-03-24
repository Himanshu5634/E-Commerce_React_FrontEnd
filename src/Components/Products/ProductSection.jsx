import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useGetProductsQuery } from "../../Features/ProductApi";
import "./productCard.scss";


/**
 * @component ProductSection
 * @description Displays a list of products with a "Load More" functionality.
 * Fetches product data using the `useGetProductsQuery` hook and manages pagination.
 */
const ProductSection = () => {
  // const [products,setProducts] = useState([])
  const [visibleData, setVisibleData] = useState([]);
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetProductsQuery();
  // console.log(data,"get");


 /**
   * @function loadMoreData
   * @description Loads more products by increasing the page number and updating the visible data.
   */
  const loadMoreData = () => {
    console.log("loadmoredata");
    const newPage = page + 1;
    const newVisibleData = data.products.slice(0, newPage * 6);
    console.log(newVisibleData, "newData");
    setVisibleData(newVisibleData);
    setPage(newPage);
  };

   /**
   * @hook useEffect
   * @description Initializes the visible data with the first 6 products when the data is fetched.
   * @dependency [data] - Runs whenever the `data` changes.
   */
  useEffect(() => {
    if (data && data.products) {
      setVisibleData(data.products.slice(0, 6)); // Show first 6 products
    }
  }, [data]);
  // const handleProducts = async() => {
  //   try {
  //     const res = await fetch("https://dummyjson.com/products?limit=200")
  //     const response = await res.json();
  //     // console.log(response.products);
  //     setProducts(response.products);
  //     setVisibleData(response.products.slice(0,6))
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  if (isLoading) return <div className="product-section-skeleton"></div>;

  // useEffect(() => {
  //   handleProducts()
  // },[])

  // useEffect(() => {
  //   console.log(products,"visible");
  // },[products])

  return (
    <>
      <div className="product-container">
        {visibleData.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            loadMoreData={
              index === visibleData.length - 1 ? loadMoreData : () => {}
            }
          />
        ))}
      </div>
     
    </>
  );
};

export default ProductSection;
