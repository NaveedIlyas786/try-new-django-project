import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./Purposaldata.css";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import html2pdf from "html2pdf.js";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

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
  const generatePDF = () => {
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
        pdf.save("test.pdf");

        return pdf.output("datauristring"); // Changed to 'datauristring'
      })


      .catch((error) => {
        console.error("Failed to generate PDF:", error);
      });
  };

  const [sendUserEMail, setsendUserEMail] = useState(null);

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
          { pdf: base64data },
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
    <div className="rawk">
      <div className="pdfside ">
        <button className="btn" onClick={generatePDF} style={{ width: "70px" }}>
          {/* <img src="../../../src/assets/pngegg.png" alt="PDF IMAGE" style={{width:"100px", height:'60px'}} /> */}
          <i
            class="fa-solid fa-file-pdf"
            style={{ fontSize: "38px", color: "#ee1d22", fontWeight: "900" }}
          ></i>
        </button>
        <img
          onClick={sendMyEmail}
          style={{ width: "100px", cursor: "pointer", height: "60px" }}
          src="../../../src/assets/emailImg.png"
          alt="EMail img"
        />
      </div>
      <div ref={conponentPDF} id="pdf-content" className="mt-5">
        <header className="header">
          <div className="topSection">
            <img
              className="logoimg"
              src="../../../src/assets/purposal_logo-top.png"
              alt="myimg"
            />
            <div className="rightTop">
              <p className="topinfo">2900 E. Belle Terrace,</p>
              <p className="topinfo newww">Unit A</p>
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
              <p className="fs-5">January 24, 2023</p>
              <p className="fs-6 DMS">
                <strong> DMS Drywall & Interior Systems Inc.</strong> is
                submitting the following bid proposal for the{" "}
                <strong> {proposalData.estimating}</strong> The plans used to
                formulate the bid proposal are dated XX/XX/20XX, drafted by
                <strong> {proposalData.architect_firm} </strong> FIRM, and
                approved by <strong> {proposalData.architect_name}</strong>.
              </p>
            </div>
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
            <div className="dmsdrywall">
              <p className="DMS">
                <strong> DMS Drywall & Interior Systems Inc.</strong> submits
                the below price for the following scope:
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
                        {a.number}{" "}
                        <span className="ms-2 fwww  ">{a.sefic}</span>
                      </h5>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="drywall-interior">
              <h4 className="baseh5">
                DMS Drywall & Interior Systems Inc. Signatory to the Carpenters
                Union
              </h4>
            </div>
            <div className="inclusions ms-3">
              <p>
                <strong className="headd">INCLUSIONS:</strong>
              </p>
              <ul>
                {proposalData.services
                  .filter((a) => a.service_type === "IN")
                  .map((e) => (
                    <li key={e.id} className="DMS ms-5">
                      {e.service}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="exclusions ms-3 mt-4">
              <p>
                <strong className="headd">EXCLUSIONS:</strong>
              </p>
              <ul>
                {proposalData.services
                  .filter((a) => a.service_type === "EX")
                  .map((e) => (
                    <li key={e.id} className="DMS ms-5 ">
                      {e.service}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="qualifications ms-3 mt-4">
              <p>
                <strong className="headd">QUALIFICATIONS:</strong>
              </p>
              <ul>
                {qualificationData.map((e) => (
                  <li key={e.id} className="DMS ms-5">
                    {e.detail}
                  </li>
                ))}
              </ul>
            </div>
            <div className="estimator">
              <p className="myesti "> Louie Hoelscher </p>
              <p className="myesti DMS">cell: 636-383-2105 </p>
            </div>
          </main>
        )}
      </div>
    </div>
  );
}

export default Rawpurposal;
