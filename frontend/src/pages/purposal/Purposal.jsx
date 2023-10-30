import React, { useRef } from "react";
import { PDFExport } from "@progress/kendo-react-pdf";
import "@progress/kendo-theme-material/dist/all.css";
import "./Purposal.css";

const Purposal = () => {
  const PdfExportComponent = useRef(null);

  const handleExportWithComponent = (e) => {
    e.preventDefault();
    PdfExportComponent.current.save();
  };



  return (
    <div id="pdfParent" className="pdfpage">
      <div className="pdfDiv">
      <div className="d-flex">
        <button className="btn btn-primary" onClick={handleExportWithComponent}>
          Download Pdf
        </button>
        <button className="btn btn-info">Download</button>
      </div>
        <PDFExport ref={PdfExportComponent} paperSize="A4" >
          <div className="contentPage">
            <header className="header">
              <h3>Pdf Header</h3>
            </header>
            <div className="bodycontent bg-info">
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            <h5>Pdf Generation</h5>
            </div>
            <footer className="footer">
              <h3>Pdf Footer</h3>
            </footer>
          </div>
        </PDFExport>
      </div>
    </div>
  );
};

export default Purposal;
