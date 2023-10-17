import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./Purposaldata.css";
import { useReactToPrint } from "react-to-print";
import axios from "axios";

function Rawpurposal() {
  const { id } = useParams();
  const [filteredEntries, setFilteredEntries] = useState([]);

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
        const filteredEntries = data.filter((entry) => entry.estimating === idNumber);
        setFilteredEntries(filteredEntries); // Update the state with filtered data
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

  const conponentPDF = useRef();
  const generatePDF = useReactToPrint({
    content: () => conponentPDF.current,
    documentTitle: "Userdata",
    onAfterPrint: () => alert("Data saved in PDF"),
  });

  const [sendUserEMail, setsendUserEMail] = useState(null);
  const sendMyEmail = () => {
    html2canvas(document.querySelector("#pdf-content")).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      const pdfBase64 = btoa(pdf.output()); // Convert the PDF to a Base64 string

      // Sending the email by making a POST request to the server with the PDF attached
      axios
        .post(`http://127.0.0.1:8000/api/estimating/sendEmail/${id}/`, {
          pdf: pdfBase64, // Including the PDF in the POST request
        })
        .then((response) => {
          console.log(response.data);
          setsendUserEMail(response.data);
          // You can also show a success message or perform any other necessary actions here
        })
        .catch((error) => {
          console.error("Failed to send email:", error);
          // You can show an error message or perform error handling here
        });
    });
  }

  return (
    <div className="rawk">
      <button className="btn btn-success" onClick={generatePDF}>
        PDF
      </button>
      <img
        onClick={sendMyEmail}
        style={{ width: "100px" }}
        src="../../../src/assets/emailImg.png" // Replace with the correct image path or URL
        alt="EMail img"
        className="emailbtn"
      />
      <div ref={conponentPDF}>
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
        {filteredEntries.map((entry, index) => (
          <main key={index}>
            <div>
                <p>January 24, 2023</p>
                <p className="">
                  <strong> DMS Drywall & Interior Systems Inc.</strong> is
                  submitting the following bid proposal for the{" "}
                  <strong> {entry.estimating}</strong> The plans used to
                  formulate the bid proposal are dated XX/XX/20XX, drafted by
                  <strong> {entry.architect_firm} </strong> FIRM, and
                  approved by <strong> {entry.architect_name}</strong>.
                </p>
              </div>
              <div className="Addendum">
                <p className="DMS">
                  The following addendums were also included in the bid
                  proposal:
                </p>
                <ul>
                {entry.Addendums.map((e) => (
  <li key={`${e.id}-${e.addendum_Number}`}>
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
              {entry.spcifc.map((e) => (
                <div className="baseBiddrywall" key={e.id}>
                  <h4 className="baseh4">
                    {e.specific_name} : $
                    <span className="ms-1 baseh4">{e.budget}.00</span>
                  </h4>
                  <ul className="mt-3">
                    {e.sefic.map((a) => (
                      <li className="li ms-4 fwww" key={a.id} >
                        <h5 key={`${e.id}-${a.id}`}>
                          {a.number} <span className="ms-2 fwww  ">{a.sefic}</span>
                        </h5>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

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
                <ul>
                  {entry.services
                    .filter((a) => a.service_type === "IN")
                    .map((e) => (
                      <li key={e.id} className="DMS ms-5">{e.service}</li>
                    ))}
                </ul>
              </div>
              <div className="exclusions ms-3 mt-4">
                <p>
                  <strong className="headd">EXCLUSIONS:</strong>
                </p>
                <ul>
                  {entry.services
                    .filter((a) => a.service_type === "EX")
                    .map((e) => (
                      <li key={e.id} className="DMS ms-5 ">{e.service}</li>
                    ))}
                </ul>
              </div>
              <div className="qualifications ms-3 mt-4">
                <p>
                  <strong className="headd">QUALIFICATIONS:</strong>
                </p>
                <ul>
                  {qualificationData.map((e) => (
                    <li key={e.id} className="DMS ms-5">{e.detail}</li>
                  ))}
                </ul>
              </div>
              <div className="estimator">
                <p className="myesti "> Louie Hoelscher </p>
                <p className="myesti DMS">cell: 636-383-2105 </p>
              </div>
          </main>
        ))}
      </div>
    </div>
  );
}

export default Rawpurposal;
