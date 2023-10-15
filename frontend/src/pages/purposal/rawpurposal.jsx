import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./Purposaldata.css";
import { useReactToPrint } from "react-to-print";

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

  const [qualificationData, setQualificationData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/estimating/Qualification/")
      .then((response) => {
        if (!response.ok) {
          throw Error(`API request failed with status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setQualificationData(data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const conponentPDF = useRef();
  const generatePDF = useReactToPrint({
    content: () => conponentPDF.current,
    documentTitle: "Userdata",
    onAfterPrint: () => alert("Data saved in PDF"),
  });

  return (
    <div className="rawk">
      <div id="pdf-content">
        <button className="btn btn-success" onClick={generatePDF}>
          PDF
        </button>
        <div ref={conponentPDF} id="pdf-content">
          <header className="header">
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
                  The following addendums were also included in the bid
                  proposal:
                </p>
                <ul>
                  {proposalData.Addendums.map((e) => (
                    <li key={`${e.id}-${e.addendum_Number}`}>
                      Addendum #{e.addendum_Number} Dated{" "}
                      <span className="addendumdate ms-1">{e.date}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="dmsdrywall">
                <p>
                  <strong> DMS Drywall & Interior Systems Inc.</strong> submits
                  the below price for the following scope:
                </p>
              </div>
              {proposalData.spcifc.map((e) => (
                <div className="baseBiddrywall" key={e.id}>
                  <h4 className="baseh4">
                    {e.specific_name} : $
                    <span className="ms-1">{e.budget}.00</span>
                  </h4>
                  <ul className="mt-3">
                    {e.sefic.map((a) => (
                      <li className="li ms-4" key={a.id}>
                        <h5 key={`${e.id}-${a.id}`}>
                          {a.number} <span className="ms-2">{a.sefic}</span>
                        </h5>
                        
                      </li>
                    ))}
                    
                  </ul>
                </div>
              ))}
               
              <div className="drywall-interior">
                <h4>
                  DMS Drywall & Interior Systems Inc. Signatory to the
                  Carpenters Union
                </h4>
              </div>
              <div className="inclusions">
                <p>
                  <strong>INCLUSIONS:</strong>
                </p>
                <ul>
                  {proposalData.services
                    .filter((a) => a.service_type === "IN")
                    .map((e) => (
                      <li key={e.id}>{e.service}</li>
                    ))}
                </ul>
              </div>
              <div className="exclusions">
                <p>
                  <strong>EXCLUSIONS:</strong>
                </p>
                <ul>
                  {proposalData.services
                    .filter((a) => a.service_type === "EX")
                    .map((e) => (
                      <li key={e.id}>{e.service}</li>
                    ))}
                </ul>
              </div>
              <div className="qualifications">
                <p>
                  <strong>QUALIFICATIONS:</strong>
                </p>
                <ul>
                  {qualificationData.map((e) => (
                    <li key={e.id}>{e.detail}</li>
                  ))}
                </ul>
              </div>
              <div className="estimator">
                <p className="myesti"> Louie Hoelscher </p>
                <p className="myesti"> 636-383-2105 </p>
              </div>
            </main>
          )}
        </div>
      </div>
    </div>
  );
}

export default Rawpurposal;
