import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { jsPDF } from "jspdf";

function RawProposal() {
  // ... (unchanged code)

  return (
    <div className="rawk">
      <div className="pdfside">
        <button className="btn" onClick={generatePDF} style={{ width: "70px" }}>
          <i
            className="fa-solid fa-file-pdf"
            style={{ fontSize: "38px", color: "#ee1d22", fontWeight: "900" }}
          ></i>
        </button>
        <img
          onClick={sendMyEmail}
          style={{ width: "100px", cursor: "pointer", height: "60px" }}
          src="../../../src/assets/emailImg.png"
          alt="Email img"
        />
      </div>
      {filteredEntries.length > 0 && (
        <div ref={conponentPDF} id="pdf-content" className="mt-5">
          {filteredEntries.map((proposalData) => (
            <div className="header">
                     //       <div className="topSection">
                 <img
                   className="logoimg"
                   src="../../../src/assets/purposal_logo-top.png"
                   alt="myimg"
                 />
                 <div className="rightTop">
                   <p className="topinfo">{entry.estimating.company.adress}</p>
                   <p className="topinfo">Bakersfield, CA 93307</p>
                   <p className="topinfo">
                     Office:{" "}
                     <span>{entry.estimating.company.office_phone_number}</span>{" "}
                   </p>
                   <p className="topinfo">
                     Fax: <span>{entry.estimating.company.fax_number}</span>{" "}
                   </p>
                   <p className="topinfo">
                     Email: {entry.estimating.company.email}
                   </p>
                 </div>
               </div>

              <div>
                <p className="fs-5">January 24, 2023</p>
                <p className="fs-6 DMS">
                  <strong>{proposalData.estimating.company.Cmpny_Name}</strong> is
                  submitting the following bid proposal for the
                  <strong>{proposalData.estimating.name}</strong>. The plans
                  used to formulate the bid proposal are dated XX/XX/20XX,
                  drafted by
                  <strong>{proposalData.architect_firm}</strong> FIRM, and
                  approved by <strong>{proposalData.architect_name}</strong>.
                </p>
              </div>

              {/* ... (unchanged code) */}

              <div className="Addendum">
                <p className="DMS">
                  The following addendums were also included in the bid proposal:
                </p>
                <ul>
                  {proposalData.Addendums.map((e) => (
                    <li key={`${e.id}-${e.addendum_Number}`} className="DMS">
                      Addendum #{e.addendum_Number} Dated{" "}
                      <span className="addendumdate ms-1">{e.date}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ... (unchanged code) */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RawProposal;
