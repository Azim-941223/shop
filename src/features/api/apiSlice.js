// Import necessary functions and constants
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { buildUrl } from "../../utils/common";
import { BASE_URL } from "../../utils/constants";

// Create the API slice using createApi function
export const apiSlice = createApi({
  // Unique name for the API slice
  reducerPath: "api",
  // Set the baseQuery using fetchBaseQuery with the base URL
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  // Define tagTypes for caching (optional)
  tagTypes: ["Product"],
  // Define the endpoints available in this API
  endpoints: (builder) => ({
    // First endpoint to get a single product by its ID
    getProduct: builder.query({
      // Define the query function that maps parameters to the URL
      query: ({ id }) => `/products/${id}`,
      // Define the tags for caching this endpoint's data
      providesTags: ["Product"],
    }),
    // Second endpoint to get a list of products with optional query parameters
    getProducts: builder.query({
      // Define the query function that builds the URL with parameters
      query: (params) => buildUrl("/products", params),
      // Define the tags for caching this endpoint's data
      providesTags: ["Products"],
    }),
  }),
});

// Export the hooks generated from the API slice for usage in components
export const { useGetProductQuery, useGetProductsQuery } = apiSlice;
