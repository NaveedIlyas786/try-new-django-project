import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProposalData, storeProposalData } from '../../store/EstimatingProposalSlice';

const RawProposal = () => {
  // const dispatch = useDispatch();
  // const proposalData = useSelector((state) => state.estimatingProposal.data);

  // When the component initializes
  // useEffect(() => {
  //   // Check if there's data in local storage
  //   const localStorageData = localStorage.getItem('proposalData');

  //   if (localStorageData) {
  //     // Parse the data from local storage
  //     const parsedData = JSON.parse(localStorageData);

  //     // Dispatch the parsed data to the Redux store
  //     dispatch(storeProposalData(parsedData));
  //   }},[dispatch])



  return (
    <div className='rawPage'>
      <h1 className='mt-5 bg-danger'>Raw Proposal Data</h1>
     
    </div>
  );
}

export default RawProposal;
