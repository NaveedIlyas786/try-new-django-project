import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Rawpurposal() {
  const { id } = useParams();
  const [proposalData, setProposalData] = useState(null);
  
  useEffect(() => {
    // Use the cors-anywhere proxy to fetch data from the Django API
    const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/'; // Or use your own proxy server URL
    const apiUrl = `http://127.0.0.1:8000/api/estimating/proposals/${id}`;
    const proxyUrl = `${corsAnywhereUrl}${apiUrl}`;
  
    fetch(proxyUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setProposalData(data))
      .catch((error) => console.error('Error fetching proposal data:', error));
  }, [id]);
  

  return (
    <div>
      {/* Display proposalData */}
      {proposalData && (
        <div>
          <h2>Proposal Details</h2>
          <p>{proposalData.name}</p>
          <p>{proposalData.description}</p>
          {/* Display other data fields */}
        </div>
      )}
    </div>
  );
}

export default Rawpurposal;