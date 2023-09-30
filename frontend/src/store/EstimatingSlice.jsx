// estimatingSlice.js

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const estimatingSlice = createSlice({
  name: 'estimating',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addEstimating: (state, action) => {
      state.data.push(action.payload);
    },
    updateEstimating: (state, action) => {
      const { id, newData } = action.payload;
      const index = state.data.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...newData };
      }
    },
    // Define the setData action to update the data in your state
    setData: (state, action) => {
      state.data = action.payload;
    },
    // Define the setStatus action to update the status in your state
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    // Define the setError action to update the error in your state
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Async action to fetch estimating data from the API
export const fetchEstimatingData = () => async (dispatch) => {
  try {
    dispatch(estimatingSlice.actions.setStatus('loading'));

    const response = await axios.get('http://127.0.0.1:8000/api/estimating/estimating/');
    const data = response.data;

    // Use the setData action to update the data in the state
    dispatch(estimatingSlice.actions.setData(data));
    dispatch(estimatingSlice.actions.setStatus('succeeded'));
  } catch (error) {
    dispatch(estimatingSlice.actions.setStatus('failed'));
    dispatch(estimatingSlice.actions.setError(error.message));
  }
};

export const { addEstimating, updateEstimating } = estimatingSlice.actions;

export default estimatingSlice.reducer;
