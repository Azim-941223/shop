// Import necessary dependencies
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import categoriesSlice from "./categories/categoriesSlice";
import productsSlice from "./products/productsSlice";
import userSlice from "./user/userSlice";

// Create the Redux store
export const store = configureStore({
  reducer: {
    // Combine multiple slices into the store's reducer object.
    categories: categoriesSlice, // Reducer for categories data.
    products: productsSlice, // Reducer for products data.
    user: userSlice, // Reducer for user data.
    [apiSlice.reducerPath]: apiSlice.reducer, // Reducer for API data using RTK Query.
  },
  middleware: (getMiddleware) =>
    getMiddleware().concat(apiSlice.middleware), // Apply middleware for API handling.
  devTools: true, // Enable Redux DevTools extension for development.
});
