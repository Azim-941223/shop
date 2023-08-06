// Import necessary dependencies and constants
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

// --- Asynchronous Action Creators (Thunks) ---

// createUser: Thunk for creating a new user by making a POST request to the server.
export const createUser = createAsyncThunk(
  "users/createUser",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/users`, payload);
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// loginUser: Thunk for user login by making a POST request to the server for authentication
// and retrieving user profile data with an access token.
export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, payload);
      const login = await axios(`${BASE_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${res.data.access_token}`,
        },
      });
      return login.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// updateUser: Thunk for updating user data by making a PUT request to the server.
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.put(`${BASE_URL}/users/${payload.id}`, payload);
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// --- Reducer Functions ---

// addCurrentUser: A helper function to update the currentUser state with the payload data.
const addCurrentUser = (state, { payload }) => {
  state.currentUser = payload;
};

// --- Redux Slice Definition ---

const userSlice = createSlice({
  name: "user", // The name of the Redux slice.
  initialState: {
    // The initial state of the user slice.
    currentUser: null, // Current user data (null if not logged in).
    cart: [], // An array to store items in the user's shopping cart.
    isLoading: false, // A flag to indicate if there is an ongoing API call.
    formType: "signup", // The type of form to display (signup/login).
    showForm: false, // A flag to indicate whether to display the user form or not.
  },
  reducers: {
    // Reducer functions for handling synchronous actions.
    addItemToCart: (state, { payload }) => {
      // Add an item to the user's shopping cart or update its quantity.
      // If the item is not in the cart, it will be added with a quantity of 1.
      // If the item is already in the cart, its quantity will be updated.
      // The payload contains the item data and optionally the quantity to update.
      let newCart = [...state.cart];
      const found = state.cart.find(({ id }) => id === payload.id);
      if (found) {
        newCart = newCart.map((item) => {
          return item.id === payload.id
            ? { ...item, quantity: payload.quantity || item.quantity + 1 }
            : item;
        });
      } else {
        newCart.push({ ...payload, quantity: 1 });
      }
      state.cart = newCart;
    },
    removeItemFromCart: (state, { payload }) => {
      // Remove an item from the user's shopping cart based on its ID.
      state.cart = state.cart.filter(({ id }) => id !== payload);
    },
    toggleForm: (state, { payload }) => {
      // Toggle the display of the user form.
      state.showForm = payload;
    },
    toggleFormType: (state, { payload }) => {
      // Toggle the form type between "signup" and "login".
      state.formType = payload;
    },
  },
  extraReducers: (builder) => {
    // Extra reducers to handle actions dispatched by createAsyncThunk.
    builder.addCase(createUser.fulfilled, addCurrentUser);
    builder.addCase(loginUser.fulfilled, addCurrentUser);
    builder.addCase(updateUser.fulfilled, addCurrentUser);
  },
});

// --- Export Actions and Reducer ---

export const {
  addItemToCart,
  removeItemFromCart,
  toggleForm,
  toggleFormType,
} = userSlice.actions;

export default userSlice.reducer;
