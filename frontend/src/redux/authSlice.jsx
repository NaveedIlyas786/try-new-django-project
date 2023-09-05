// authSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: null, // You can store user data here if needed
  loading: false,
  error: null,
};

// Create an asynchronous thunk to handle user registration
export const signUpUser = createAsyncThunk("auth/signUpUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/user/Userapi/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const data = await response.json();
      return rejectWithValue(data); // Handle the error in the catch block
    }

    const data = await response.json();
    return data; // This can be any data you want to store in your state, like user information

  } catch (error) {
    throw error; // Let the catch block handle the error
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred during registration.";
      });
  },
});

export default authSlice.reducer;
