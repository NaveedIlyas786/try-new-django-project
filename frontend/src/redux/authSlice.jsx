<<<<<<< HEAD
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
=======
  // authSlice.js

  import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
>>>>>>> 84f183def357767c7598423b9252e409046f0dff

  const initialState = {
    user: null, // You can store user data here if needed
    loading: false,
    error: null,
  };

<<<<<<< HEAD
export const signUpUser = createAsyncThunk("auth/signUpUser", async (userData, { rejectWithValue }) => {
  try {
    console.log("Sending user data: ", userData); // This will log the userData to the console before making the request

    const response = await fetch("http://127.0.0.1:8000/api/user/Userapi/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const data = await response.json();
      console.error("Error response from server: ", data); // This will log the error data from server to the console
      return rejectWithValue(data); // Handle the error in the catch block
    }

    const data = await response.json();
    return data; 

  } catch (error) {
    console.error("An error occurred: ", error); // This will log any other errors to the console
    return rejectWithValue("An error occurred during registration."); // This will return a more generic error message
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
=======
  // Create an asynchronous thunk to handle user registration
  export const signUpUser = createAsyncThunk("auth/signUpUser", async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/user/Userapi/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
>>>>>>> 84f183def357767c7598423b9252e409046f0dff
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
