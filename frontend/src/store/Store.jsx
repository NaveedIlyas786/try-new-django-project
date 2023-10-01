import { configureStore } from '@reduxjs/toolkit';
import estimatingReducer from './EstimatingSlice';
import In_estimatingPage_ProjectSlice from "./ProjectFormSlice"
const store = configureStore({
  reducer: {
    estimating: estimatingReducer,
    ProjectCreateSlice: In_estimatingPage_ProjectSlice
    // Add other reducers here if needed
  },
});

export default store;