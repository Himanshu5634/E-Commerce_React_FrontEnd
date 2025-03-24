import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * @api ProductApi
 * @description A Redux Toolkit Query API for fetching product data from the dummy JSON API.
 */
export const ProductApi = createApi({
    /**
     * @property {string} reducerPath - The unique key for the API slice in the Redux store.
     */
    reducerPath: "ProductApi",

    /**
     * @property {Object} baseQuery - The base query configuration for the API.
     * @property {string} baseQuery.baseUrl - The base URL for all API requests.
     */
    baseQuery: fetchBaseQuery({
        baseUrl: "https://dummyjson.com/",
    }),

    /**
     * @property {Function} endpoints - Defines the API endpoints and their configurations.
     * @param {Object} builder - The builder object for defining endpoints.
     */
    endpoints: (builder) => ({
        /**
         * @endpoint getProducts
         * @description Fetches a list of products with a limit of 200.
         * @returns {Object} The query configuration for fetching products.
         */
        getProducts: builder.query({
            query: () => "products?limit=200",
        }),

        /**
         * @endpoint getProduct
         * @description Fetches details of a single product by its ID.
         * @param {string} id - The unique ID of the product to fetch.
         * @returns {Object} The query configuration for fetching a product by ID.
         */
        getProduct: builder.query({
            query: (id) => `products/${id}`,
        }),
    }),
});

/**
 * @exports useGetProductsQuery
 * @description A hook for fetching the list of products using the `getProducts` endpoint.
 * 
 * @exports useGetProductQuery
 * @description A hook for fetching a single product by ID using the `getProduct` endpoint.
 */
export const { useGetProductsQuery, useGetProductQuery } = ProductApi;