import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProposalData, storeProposalData } from '../../store/EstimatingProposalSlice';

const RawProposal = () => {
  const dispatch = useDispatch();
  const proposalData = useSelector((state) => state.estimatingProposal.data);

  // When the component initializes
  useEffect(() => {
    // Check if there's data in local storage
    const localStorageData = localStorage.getItem('proposalData');

    if (localStorageData) {
      // Parse the data from local storage
      const parsedData = JSON.parse(localStorageData);

      // Dispatch the parsed data to the Redux store
      dispatch(storeProposalData(parsedData));
    }},[dispatch])

  return (
    <div>
      <h1>Raw Proposal Data</h1>
      {proposalData ? (
        <ul>
          {proposalData.map((proposal) => (
            <li key={proposal.id}>
              {/* Display your proposal data here */}
              Date: {proposal?.date}
              Estimating: {proposal?.estimating}
              {/* Add other fields as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p className=' mt-5 text-danger'>Loading proposal data...</p>
      )}
    </div>
  );
}

export default RawProposal;
