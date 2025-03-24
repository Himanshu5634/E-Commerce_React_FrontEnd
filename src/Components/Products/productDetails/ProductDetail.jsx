import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useGetProductQuery } from "../../../Features/ProductApi";
import "./ProductDetail.scss";

const ProductDetail = () => {
  const { productId } = useParams();
  const [load, setLoad] = useState(true);
  // const imgRef = useRef(null)
  const { data, error,isLoading } = useGetProductQuery(productId);
  console.log(data);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading product details.</p>;
  if (!data) return <p>Product not found.</p>;

  // useEffect(() => {
  //   const observer = new IntersectionObserver((entries) => {
  //     const entry = entries[0];
  //     if(entry.isIntersecting){

  //     }
  //   })

  //   if(imgRef.current){
  //     observer.observe(imgRef.current)
  //   }

  //   return () => observer.disconnect()
  // },[imgRef])

  return (
    <div className="product-detail">
      <div className="product-image">
        {load && <div className="product-image-skelaton" />}
        {data.images.map((image) => (
          <img
            src={image}
            alt={data.title}
            loading="lazy"
            onLoad={() => setLoad(false)}
            onError={() => setLoad(false)}
          />
        ))}
      </div>

      <div className="product-info">
        <h2>{data.title}</h2>
        <p className="description">{data.description}</p>

        <div className="pricing">
          <span className="price">${data.price.toFixed(2)}</span>
          <span className="discount">-{data.discountPercentage}%</span>
        </div>

        {/* <p className={`availability ${data.stock < 10 ? "low-stock" : ""}`}>
          {data.availabilityStatus} ({data.stock} left)
        </p> */}

        <div className="additional-info">
          <p>
            <strong>Brand:</strong> {data.brand}
          </p>
          <p>
            <strong>Category:</strong> {data.category}
          </p>
        </div>

        <div className="rating">
          <p>⭐ {data.rating} / 5</p>
        </div>

        <button className="add-to-cart">Add to Cart</button>

        <div className="reviews">
          <h3>Customer Reviews</h3>
          {data.reviews.length > 0 ? (
            data.reviews.map((review, index) => (
              <div key={index} className="review">
                <p>
                  <strong>{review.reviewerName}:</strong> {review.comment}
                </p>
                <p>⭐ {review.rating}/5</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>

        {/* Return Policy & Warranty */}
        <div className="policy">
          <p>
            <strong>Return Policy:</strong> {data.returnPolicy}
          </p>
          <p>
            <strong>Warranty:</strong> {data.warrantyInformation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
