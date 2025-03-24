import React, { useEffect, useState } from "react";
import "./Cart.scss";
import CartItem from "../../Components/Cart/CartItem";
import { useSelector, useDispatch } from "react-redux";
import { addOrder } from "../../Features/orderSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cartSlice.cartItems);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const [totalPrice, setTotalPrice] = useState(0); // State for total price

  useEffect(() => {
    // Calculate total price whenever cartItems change
    const total = cartItems.reduce(
      (sum, cartItem) => sum + parseFloat(cartItem.price) * cartItem.quantity,
      0
    );
    setTotalPrice(total);
  }, [cartItems]);

  /**
   * Handles the checkout process.
   * Validates user login and cart items, then dispatches each cart item as an order.
   */
  const handleCheckout = () => {
    if (!token) {
      alert("User not logged in!");
      return;
    }

    if (cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }

    // Dispatch each cart item as a separate order
    cartItems.forEach((item) => {
      const order = {
        userId: token,
        item,
        totalPrice: parseFloat(item.price) * item.quantity, // Store total price for each item
        date: new Date().toISOString(),
      };
      dispatch(addOrder(order)); // Dispatch each order
    });

    alert("All items have been added to orders!");
  };

  return (
    <>
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        {!token ? (
          <>{}</>
        ) : (
          <>
            {cartItems?.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </>
        )}
      </div>
      <div className="check-out-section">
        <div className="left">
          <p>Add Coupon here</p>
          <form action="">
            <input type="text" placeholder="Add coupon code here" />
            <button>Apply</button>
          </form>
        </div>
        <div className="righte">
          <div className="total-price">
            Total Amount: ${totalPrice.toFixed(2)}
          </div>
          <hr />
          <div className="check-out-btn">
            <button onClick={handleCheckout}>Check Out</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
