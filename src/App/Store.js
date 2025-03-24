import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../Features/userSlice";
import cartSlice from "../Features/CartSlice";
import orderSlice from "../Features/orderSlice";
import { ProductApi } from "../Features/ProductApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import loginPopupSlice from "../Features/loginPopup";

/**
 * Configures the Redux store for the application.
 * Combines all reducers and middleware, including API middleware for RTK Query.
 */
export const store = configureStore({
  reducer: {
    /**
     * Reducer for managing user-related state.
     */
    userSlice,

    /**
     * Reducer for managing cart-related state.
     */
    cartSlice,

    /**
     * Reducer for managing login popup state.
     */
    loginPopupSlice,

    /**
     * Reducer for managing order-related state.
     */
    orderSlice,

    /**
     * Reducer for managing product API state using RTK Query.
     */
    [ProductApi.reducerPath]: ProductApi.reducer,
  },
  /**
   * Middleware configuration for the store.
   * Adds default middleware and RTK Query middleware for handling API calls.
   */
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ProductApi.middleware),
});

/**
 * Sets up listeners for RTK Query to enable features like refetchOnFocus and refetchOnReconnect.
 */
setupListeners(store.dispatch);