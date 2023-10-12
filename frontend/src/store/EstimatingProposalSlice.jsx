import { createSlice } from "@reduxjs/toolkit";
import estimatingProposalSlice from './EstimatingProposalSlice';

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
      // Define actions for handling status and error (similar to your existing slice)
      setStatus: (state, action) => {
        state.status = action.payload;
      },
      setError: (state, action) => {
        state.error = action.payload;
      },
    },
  });
  
export const fetchProposalData=()=>async(dispatch)=>{
try{
  dispatch(estimatingProposalSlice.actions.setStatus("loading"));
  const response=axios.get("http://127.0.0.1:8000/api/estimating/proposals/");
  const ans=response.data;

  dispatch(estimatingProposalSlice.actions)
}
catch(error){
  console.log(error);
}
}

  export const {
    storeProposalData,
    setStatus,
    setError,
  } = estimatingProposalSlice.actions;
  
  export default estimatingProposalSlice.reducer;
  