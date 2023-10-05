import { configureStore } from '@reduxjs/toolkit';
import estimatingReducer from './EstimatingSlice';
import In_estimatingPage_ProjectSlice from './ProjectFormSlice';
import EstimatingProposalSliceReducer from './EstimatingProposalSlice'; // Import the new slice reducer

const store = configureStore({
  reducer: {
    estimating: estimatingReducer,
    ProjectCreateSlice: In_estimatingPage_ProjectSlice,
    estimatingProposal: EstimatingProposalSliceReducer, // Add the new slice reducer
    // Add other reducers here if needed
  },
});

export default store;
