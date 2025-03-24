import { createSlice, nanoid } from "@reduxjs/toolkit";

/**
 * @constant initialState
 * @description The initial state of the cart slice, containing cart items loaded from localStorage or an empty array.
 */
const initialState = {
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
};

/**
 * @slice cartSlice
 * @description A Redux slice for managing cart-related actions and state.
 */
export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        /**
         * @function addToCart
         * @description Adds a product to the cart. If the product already exists, it increments the quantity.
         * @param {Object} state - The current state of the cart.
         * @param {Object} action - The dispatched action containing the product to add.
         * @param {Object} action.payload - The product object to add to the cart.
         */
        addToCart: (state, action) => {
            const cartItem = state.cartItems.find(
                (cartItem) => cartItem.id == action.payload.id
            );

            if (cartItem) {
                // If the product already exists in the cart, increment its quantity
                state.cartItems = state.cartItems.map((cartItem) =>
                    cartItem.id === action.payload.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                // If the product does not exist, add it to the cart with a quantity of 1
                state.cartItems.push({
                    ...action.payload,
                    cartItemId: nanoid(),
                    quantity: 1,
                });
            }

            // Save the updated cart items to localStorage
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        /**
         * @function removeFromCart
         * @description Decreases the quantity of a product in the cart. If the quantity becomes 0, it removes the product.
         * @param {Object} state - The current state of the cart.
         * @param {Object} action - The dispatched action containing the product ID to remove.
         * @param {string} action.payload - The ID of the product to decrease or remove from the cart.
         */
        removeFromCart: (state, action) => {
            const cartItem = state.cartItems.find(
                (cartItem) => cartItem.id == action.payload
            );

            if (cartItem.quantity > 1) {
                // Decrease the quantity if it's greater than 1
                state.cartItems = state.cartItems.map((cartItem) =>
                    cartItem.id == action.payload
                        ? { ...cartItem, quantity: cartItem.quantity - 1 }
                        : cartItem
                );
            } else {
                // Remove the product if the quantity is 1
                state.cartItems = state.cartItems.filter(
                    (cartItem) => cartItem.id != action.payload
                );
            }

            // Save the updated cart items to localStorage
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        /**
         * @function removeItem
         * @description Removes a product from the cart entirely, regardless of its quantity.
         * @param {Object} state - The current state of the cart.
         * @param {Object} action - The dispatched action containing the product ID to remove.
         * @param {string} action.payload - The ID of the product to remove from the cart.
         */
        removeItem: (state, action) => {
            // Filter out the product with the given ID
            state.cartItems = state.cartItems.filter(
                (cartItem) => cartItem.id != action.payload
            );

            // Save the updated cart items to localStorage
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
    },
});

/**
 * @exports cartSlice.actions
 * @description Exports the actions for adding, removing, and managing cart items.
 */
export const { addToCart, removeFromCart, removeItem } = cartSlice.actions;

/**
 * @exports cartSlice.reducer
 * @description Exports the reducer for the cart slice to be used in the Redux store.
 */
export default cartSlice.reducer;