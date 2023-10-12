import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"

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
        // state.proposalData.push(action.payload);
      },
      // Define the setData action to update the data in your state
    setData: (state, action) => {
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
  
  export const fetchProposalData = () => async (dispatch) => {
    try {
      dispatch(estimatingProposalSlice.actions.setStatus("loading"));
  
      const response = await axios.get("http://127.0.0.1:8000/api/estimating/proposals");
      if (response.status === 200) {
        const ans = response.data;
        dispatch(estimatingProposalSlice.actions.setData(ans));
        dispatch(estimatingProposalSlice.actions.setStatus("succeeded"));
      } else {
        // Handle non-200 response status codes
        dispatch(estimatingProposalSlice.actions.setStatus("failed"));
        dispatch(estimatingProposalSlice.actions.setError("Failed to fetch data."));
      }
    } catch (error) {
      // Handle other errors (e.g., network errors)
      dispatch(estimatingProposalSlice.actions.setStatus("failed"));
      dispatch(estimatingProposalSlice.actions.setError(error.message));
    }
  };
  

  export const {
    storeProposalData,
    setStatus,
    setError,
  } = estimatingProposalSlice.actions;
  
  export default estimatingProposalSlice.reducer;
  