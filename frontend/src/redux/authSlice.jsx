import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: null, // You can store user data here if needed
  loading: false,
  error: null,
};

export const signUpUser = createAsyncThunk("auth/signUpUser", async (userData, { rejectWithValue }) => {
  try {
    console.log("Sending user data for signup: ", userData);

    // const response = await fetch("http://127.0.0.1:8000/api/user/Userapi/", {
    const response = await fetch("http://127.0.0.1:8000/api/user/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const data = await response.json();
      console.error("Error response from server for signup: ", data);
      return rejectWithValue(data);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("An error occurred during signup: ", error);
    return rejectWithValue("An error occurred during registration.");
  }
});

export const loginUser = createAsyncThunk("auth/loginUser", async (userData, { rejectWithValue }) => {
  try {
    console.log("Sending user data for login: ", userData);

    const response = await fetch("http://127.0.0.1:8000/api/user/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const data = await response.json();
      console.error("Error response from server for login: ", data);
      return rejectWithValue(data);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("An error occurred during login: ", error);
    return rejectWithValue("An error occurred during login.");
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
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred during login.";
      });
  },
});

export default authSlice.reducer;
