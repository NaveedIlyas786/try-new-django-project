import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./Purposaldata.css";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import html2pdf from "html2pdf.js";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import "@progress/kendo-theme-material/dist/all.css";


function Rawpurposal() {
  const { id } = useParams();
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [proposalNotFound, setProposalNotFound] = useState(false); // State to track if the proposal is not found

  useEffect(() => {
    const idNumber = parseInt(id, 10);
    fetch("http://127.0.0.1:8000/api/estimating/proposals/")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const myfilteredEntries = data.filter(
          (entry) => entry.estimating.id === idNumber
        );

        if (myfilteredEntries.length === 0) {
          // No proposal found for the specific estimating ID
          setProposalNotFound(true);
        } else {
          setFilteredEntries(myfilteredEntries); // Update the state with filtered data
        }
      })
      .catch((error) => console.error("Error fetching proposal data:", error));
  }, [id]);

  const [qualificationData, setQualificationData] = useState([]);
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


// ****************  Kendo PDF generator React JS Library ****************
const PdfExportCompnent=useRef(null);
  
const handleExportWithComponent = (e) => {
  e.preventDefault();
  PdfExportCompnent.current.save()
};


  const sendMyEmail = () => {
    const element = document.getElementById("pdf-content");

    html2canvas(element)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        let heightLeft = pdfHeight;
        let position = 0;

        while (heightLeft >= 0) {
          pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
          heightLeft -= pdf.internal.pageSize.getHeight();
          position -= pdf.internal.pageSize.getHeight();

          if (heightLeft >= 0) {
            pdf.addPage();
          }
        }

        return pdf.output("datauristring"); // Changed to 'datauristring'
      })
      .then((base64data) => {
        base64data = base64data.split(",")[1]; // Remove the prefix
        console.log("Sending Base64 Data:", base64data.slice(0, 100)); // Log the first 100 chars

        return axios.post(
          `http://127.0.0.1:8000/api/estimating/sendEmail/${id}/`,
          { pdf: handleExportWithComponent() },
          { headers: { "Content-Type": "application/json" } } // Added headers
        );
      })
      .then((response) => {
        console.log("Email sent successfully:", response.data);
      })
      .catch((error) => {
        console.error("Failed:", error);
      });
  };

  return (
    <>
      {proposalNotFound && (
        <div className="parent">
          <div className="text-center">
            <h1 className="text-dark">
              Purposal is not Created yet! Create it first.
            </h1>
          </div>
        </div>
      )}

      {filteredEntries.length > 0 && (
        <div className="rawk">
          <div className="pdfside ">
            <div className="btn" onClick={handleExportWithComponent}>
              <i
                className="fa-solid fa-file-pdf"
                style={{
                  fontSize: "38px",
                  color: "#1976d2",
                  fontWeight: "900",
                }}
              ></i>
            </div>

            <div className="btn" onClick={sendMyEmail}>
              <i
                className="fa-solid fa-envelope"
                style={{
                  fontSize: "38px",
                  color: "#1976d2",
                  fontWeight: "900",
                }}
              ></i>
            </div>
          </div>

          {/* <div ref={conponentPDF} id="pdf-content" className=" coverdiv"> */}
          <PDFExport ref={PdfExportCompnent} id="pdf-content" paperSize="A4" className=" coverdiv">
            {filteredEntries.map((proposalData) => (
              <div className="pdfPage">
                <header className="topSection">
                  <img
                    className="logoimg"
                    src="../../../src/assets/purposal_logo-top.png"
                    alt="myimg"
                  />
                  <div className="rightTop topinfo">
                    <p className="  ">
                      {proposalData?.estimating?.company?.adress || ""}
                    </p>
                    <p className="topinfo">
                      Office:
                      <span>
                        {proposalData?.estimating?.company
                          ?.office_phone_number || ""}
                      </span>
                    </p>
                    <p className="topinfo">
                      Fax:{" "}
                      <span>
                        {proposalData?.estimating?.company?.fax_number || ""}
                      </span>{" "}
                    </p>
                    <p className="topinfo">
                      Email: {proposalData?.estimating?.company?.email || ""}
                    </p>
                  </div>
                </header>
                {/* ******************* */}

                <div key={proposalData.id}>
                  <div>
                    {/* <p className="fs-5">January 24, 2023</p> */}
                    <p className="fs-5">{proposalData?.date}</p>

                    <p className="fs-6 DMS">
                      <strong>
                        {proposalData?.estimating?.company?.Cmpny_Name
                          ? proposalData?.estimating?.company?.Cmpny_Name
                          : "No Company Exist"}
                      </strong>{" "}
                      is submitting the following bid proposal for the
                      <strong> {proposalData?.estimating?.prjct_name}</strong>.
                      The plans used to formulate the bid proposal are dated
                      <strong> {proposalData?.estimating?.start_date}</strong>, drafted by{" "}
                      <strong> {proposalData?.architect_firm}</strong> FIRM, and
                      approved by{" "}
                      <strong>{proposalData?.architect_name}</strong>.
                    </p>
                  </div>

                  <div className="Addendum">
                    <p className="DMS">
                      The following addendums were also included in the bid
                      proposal:
                    </p>
                    <ul>
                      {proposalData.Addendums.map((e) => (
                        <li
                          key={`${e.id}-${e.addendum_Number}`}
                          className="DMS"
                        >
                          Addendum #{e.addendum_Number} Dated{" "}
                          <span className="addendumdate ms-1">{e.date}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="dmsdrywall">
                    <p className="DMS">
                      <strong> DMS Drywall & Interior Systems Inc.</strong>{" "}
                      submits the below price for the following scope:
                    </p>
                  </div>
                  {proposalData.spcifc.map((e) => (
                    <div className="baseBiddrywall " key={e.id}>
                      <h4 className="baseh4  ">
                        {e.specific_name} : $
                        <span className="ms-1 baseh4">{e.budget}.00</span>
                      </h4>
                      <ul className="mt-3">
                        {e.sefic.map((a) => (
                          <li className="li ms-4 fwww" key={a.id}>
                            <h5 key={`${e.id}-${a.id}`}>
                              {a.number}
                              <span className="ms-2 fwww  ">{a.name}</span>
                            </h5>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* ******************* */}
                <div className="drywall-interior">
                  <h4 className="baseh5">
                    DMS Drywall & Interior Systems Inc. Signatory to the
                    Carpenters Union
                  </h4>
                </div>
                <div className="inclusions ms-3">
                  <p>
                    <strong className="headd">INCLUSIONS:</strong>
                  </p>
                  <ol>
                    {proposalData.services
                      .filter((a) => a.service_type === "IN")
                      .map((e) => (
                        <li key={e.id} className="DMS ps-3">
                          {e.service}
                        </li>
                      ))}
                  </ol>
                </div>
                <div className="exclusions ms-3 mt-4">
                  <p>
                    <strong className="headd">EXCLUSIONS:</strong>
                  </p>
                  <ol>
                    {proposalData.services
                      .filter((a) => a.service_type === "EX")
                      .map((e) => (
                        <li key={e.id} className="DMS ps-3 ">
                          {e.service}
                        </li>
                      ))}
                  </ol>
                </div>

                <div className="qualifications ms-3 mt-4">
                  <p>
                    <strong className="headd">QUALIFICATIONS:</strong>
                  </p>
                  <ol>
                    {qualificationData.map((e) => (
                      <li key={e.id} className="DMS ps-3">
                        {e.detail}
                      </li>
                    ))}
                  </ol>
                </div>
                {/* <h5>Aurthur Name</h5> */}
                <h5>{proposalData?.estimating?.estimator}</h5>

                <p>Phone number</p>
              </div>
            ))}
            </PDFExport>
          {/* </div> */}
        </div>
        // </div>
      )}
    </>
  );
}

export default Rawpurposal;