import { createSlice } from "@reduxjs/toolkit";

/**
 * @constant initialState
 * @description The initial state of the order slice, containing the list of orders loaded from localStorage or an empty array.
 */
const initialState = {
    orders: JSON.parse(localStorage.getItem("orders")) || [], // List of orders
};

/**
 * @slice orderSlice
 * @description A Redux slice for managing order-related actions and state.
 */
export const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        /**
         * @function addOrder
         * @description Adds a new order to the list of orders and updates localStorage.
         * @param {Object} state - The current state of the orders.
         * @param {Object} action - The dispatched action containing the new order data.
         * @param {Object} action.payload - The new order object to add to the list.
         */
        addOrder: (state, action) => {
            state.orders.push(action.payload); // Add the new order to the array
            localStorage.setItem("orders", JSON.stringify(state.orders)); // Update localStorage
        },
    },
});

/**
 * @exports orderSlice.actions
 * @description Exports the action for adding a new order.
 */
export const { addOrder } = orderSlice.actions;

/**
 * @exports orderSlice.reducer
 * @description Exports the reducer for the order slice to be used in the Redux store.
 */
export default orderSlice.reducer;