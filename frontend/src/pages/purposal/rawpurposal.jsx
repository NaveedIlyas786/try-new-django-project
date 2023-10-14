import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Purposaldata.css";

function Rawpurposal() {
  const { id } = useParams();
  const [proposalData, setProposalData] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/estimating/proposals/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProposalData(data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching proposal data:", error));
  }, [id]);

  return (
    <div className="rawk">
      <header className="header ">
        <div className="topSection">
          <img
            className="logoimg"
            src="../../../src/assets/purposal_logo-top.png"
            alt="myimg"
          />
          <div className="rightTop">
            <p className="topinfo">2900 E. Belle Terrace,</p>
            <p className="topinfo">Unit A</p>
            <p className="topinfo">Bakersfield, CA 93307</p>
            <p className="topinfo">Office (415) 508-4968</p>
            <p className="topinfo">Fax (415) 508-4585</p>
            <p className="topinfo">estimating@dmsmgt.com</p>
          </div>
        </div>
      </header>
      {proposalData && (
        <main>
          <div>
            <p>January 24, 2023</p>
            <p className="">
              <strong> DMS Drywall & Interior Systems Inc.</strong> is
              submitting the following bid proposal for the{" "}
              <strong> {proposalData.estimating}</strong> The plans used to
              formulate the bid proposal are dated XX/XX/20XX, drafted by
              <strong> {proposalData.architect_firm} </strong> FIRM, and
              approved by <strong> {proposalData.architect_name}</strong>.
            </p>
          </div>
          <div className="Addendum">
            <p>
              The following addendums were also included in the bid proposal:
            </p>
            <ul>
              {proposalData.Addendums.map((e) => (
                <li>
                  Addendums #
                  <span key={e.id}>
                    {e.addendum_Number} Dated
                    <span className="addendumdate ms-1"> {e.date}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="dmsdrywall">
            <p>
              <strong> DMS Drywall & Interior Systems Inc.</strong> submits the
              below price for the following scope:
            </p>
          </div>
          {proposalData.spcifc.map((e) => (
            <div className="baseBiddrywall">
              <h4 key={e.id} className="baseh4">
                {e.specific_name} : $<span className="ms-1">{e.budget}.00</span>
              </h4>

              <ul className="mt-3">
                {proposalData.spcifc.map((e) => (
                  <li className="li ms-4" key={e.id}>
                    {e.sefic.map((a) => (
                      <h5 key={a.id}>
                        {a.number} <span className="ms-2">{a.sefic}</span>
                      </h5>
                    ))}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="drywall-interior">
            <h4>
              DMS Drywall & Interior Systems Inc. Signatory to the Carpenters
              Union
            </h4>
          </div>
          <div className="inclusions">
            <p>
              <strong>INCLUSIONS:</strong>
            </p>
            <ul>
              {/* {proposalData.} */}
              <li>Light gauge metal framing, wall board and finish</li>
             
            </ul>
          </div>
          <div className="exclusions">
            <p>
              <strong>ExCLUSIONS:</strong>
            </p>
            <ul>
              <li>Light gauge metal framing, wall board and finish</li>
              <li>Cold-formed metal framing for our scope of work only</li>
              <li>
                Fire-stopping and joint sealants for our scope of work only
              </li>
              <li>Scaffolding for our scope of work only</li>
              <li>Badging for our workers only</li>
            </ul>
          </div>
          <div className="qualifications"> 
            <p>
              <strong>QUALIFICATIONS:</strong>
            </p>
            <ul>
              <li>Light gauge metal framing, wall board and finish</li>
              <li>Cold-formed metal framing for our scope of work only</li>
              <li>
                Fire-stopping and joint sealants for our scope of work only
              </li>
              <li>Scaffolding for our scope of work only</li>
              <li>Badging for our workers only</li>
              <li>Cold-formed metal framing for our scope of work only</li>
              <li>
                Fire-stopping and joint sealants for our scope of work only
              </li>
              <li>Scaffolding for our scope of work only</li>
              <li>Badging for our workers only</li>
              <li>Cold-formed metal framing for our scope of work only</li>
              <li>Scaffolding for our scope of work only</li>
              <li>Complete Car</li>
            </ul>
          </div>
          <div className="estimator">
            <p className="myesti"> Louie Hoelscher </p>
            <p className="myesti"> 636-383-2105 </p>
          </div>
        </main>

        // <div className='mt-5 '>
        //   <h2 className='mt-5'>Proposal Details</h2>
        //   <p>{proposalData.estimating}</p>
        //   <p>{proposalData.architect_name}</p>
        // </div>
      )}
    </div>
  );
}

export default Rawpurposal;
