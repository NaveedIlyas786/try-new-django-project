// estimatingSlice.js

import { createSlice } from "@reduxjs/toolkit";

export const In_estimatingPage_ProjectSlice = createSlice({
  name: "ProjectCreateSlice",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addProject: (state, action) => {
      state.data.push(action.payload);
    },

    setData: (state, action) => {
      state.data = [...action.payload];
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});



export const { addProject } = In_estimatingPage_ProjectSlice.actions;

export default In_estimatingPage_ProjectSlice.reducer;
