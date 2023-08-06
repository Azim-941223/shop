// Import necessary functions and dependencies
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

/**
 * Asynchronous Thunk for Fetching Categories
 *
 * The `getCategories` async thunk function is used to fetch categories data from the server.
 * It sends a GET request to the API endpoint `${BASE_URL}/categories` using Axios and returns
 * the response data on success. If an error occurs during the request, it logs the error and
 * returns the error with the `rejectWithValue` method.
 */
export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, thunkAPI) => {
    try {
      const res = await axios(`${BASE_URL}/categories`);
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

/**
 * Categories Slice
 *
 * The `categoriesSlice` is a Redux slice responsible for managing the categories state.
 * It defines the initial state with an empty `list` array for categories data and a `isLoading`
 * boolean flag to indicate the loading state during API requests.
 */
const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    list: [],
    isLoading: false,
  },
  // Reducers for handling the asynchronous thunk actions
  extraReducers: (builder) => {
    // Handles the pending state while the API request is ongoing
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
    });
    // Handles the fulfilled state when the API request is successful
    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.isLoading = false;
    });
    // Handles the rejected state when the API request encounters an error
    builder.addCase(getCategories.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

// Export the categories reducer as the default export
export default categoriesSlice.reducer;
