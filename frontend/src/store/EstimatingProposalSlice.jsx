import { createSlice } from "@reduxjs/toolkit";

const estimatingProposalSlice = createSlice({
    name: "estimatingProposal",
    initialState: {
      proposalData: [], // Initialize with null or an empty object
      status: "idle",
      error: null,
    },
    reducers: {
      // Define an action to store the proposal data in the state
      storeProposalData: (state, action) => {
        state.proposalData = action.payload;
      },
      // Define actions for handling status and error (similar to your existing slice)
      setStatus: (state, action) => {
        state.status = action.payload;
      },
      setError: (state, action) => {
        state.error = action.payload;
      },
    },
  });
  
  export const {
    storeProposalData,
    setStatus,
    setError,
  } = estimatingProposalSlice.actions;
  
  export default estimatingProposalSlice.reducer;
  