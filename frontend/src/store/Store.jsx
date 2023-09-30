import { configureStore } from '@reduxjs/toolkit';
import estimatingReducer from './EstimatingSlice';

const store = configureStore({
  reducer: {
    estimating: estimatingReducer,
    // Add other reducers here if needed
  },
});

export default store;