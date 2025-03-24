import React, { useState } from "react";
import "./CartItem.scss";
import { assets } from "../../assets/assets";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart, removeItem } from "../../Features/CartSlice";


const CartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity); // State for item quantity
  const dispatch = useDispatch();

  /**
   * Handles the quantity change for the cart item.
   * Dispatches actions to add or remove the item from the cart.
   * @param {string} type - The type of quantity change ("plus" or "minus").
   */
  const handleQuantity = (type) => {
    if (type === "plus") {
      dispatch(addToCart(item)); // Add one more of the item to the cart
    } else {
      dispatch(removeFromCart(item.id)); // Remove one of the item from the cart
    }
  };

  return (
    <div className="cart-item">
      {/* Item thumbnail */}
      <img src={item.thumbnail} alt={item.title} className="cart-item-image" />

      {/* Item details */}
      <div className="cart-item-details">
        <h3>{item.title}</h3>
        <div className="item-quantity-price">
          <p>{item.price}</p>
          <p>x</p>
          <p>{item.quantity} QTY</p>
        </div>
      </div>

      {/* Total price for the item */}
      <div className="item-total">Total {item.price * item.quantity}</div>

      {/* Quantity controls */}
      <div className="set-quantity">
        <img
          src={assets.remove}
          alt="Decrease quantity"
          onClick={() => handleQuantity("minus")}
        />
        <div className="quantity-input">{item.quantity}</div>
        <img
          src={assets.add}
          alt="Increase quantity"
          onClick={() => handleQuantity("plus")}
        />
      </div>

      {/* Remove item button */}
      <button
        className="remove-button"
        onClick={() => dispatch(removeItem(item.id))}
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;