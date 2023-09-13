import React, { useRef } from "react";
import "./Purposal.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const Purposal = () => {
  console.log("Purposal component rendered");
  const pdfRef = useRef();
  const Exportpdf = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF(" p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgx = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgx,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("Estimating.pdf");
    });
  };
  return (
    <div className="purposal ">
      <div className="exportdiv">
        <div onClick={Exportpdf}  className="exportSection">
         <img className="pdfimg" src="../../../src/assets/pdfimg.png" alt="" />
        </div> 
      </div>
      <div ref={pdfRef} className="pdf_form">
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
        <main>
          <div>
            <p>January 24, 2023</p>
            <p className="">
              <strong> DMS Drywall & Interior Systems Inc.</strong> is
              submitting the following bid proposal for the{" "}
              <strong> [PROJECT NAME] project.</strong> The plans used to
              formulate the bid proposal are dated XX/XX/20XX, drafted by
              <strong> ARCHITECT </strong> FIRM, and approved by{" "}
              <strong> ARCHITECT</strong> NAME (if listed).
            </p>
          </div>
          <div className="Addendum">
            <p>
              The following addendums were also included in the bid proposal:
            </p>
            <ul>
              <li>Addendum #1 – Dated 09/24/2022</li>
              <li>Addendum #2 – Dated 09/24/2022</li>
              <li>Addendum #3 – Dated 09/24/2022</li>
            </ul>
          </div>
          <div className="dmsdrywall">
            <p>
              <strong> DMS Drywall & Interior Systems Inc.</strong> submits the
              below price for the following scope:
            </p>
          </div>
          <div className="baseBiddrywall">
            <h4 className="baseh4">
              {" "}
              Base Bid Drywall/Framing/Plaster: $#,###,###.00
            </h4>
            <ul className="mt-3">
              <li className="li ms-4">
                <h5>05 40 00 Cold-Formed Metal Framing (For Our Scope Only)</h5>
              </li>
              <li className="li ms-4">
                <h5>07 84 00 Fire-stopping (For Our Scope Only)</h5>
              </li>
              <li className="li ms-4">
                <h5>07 92 00 Joint Sealants (For Our Scope Only)</h5>
              </li>
              <li className="li ms-4">
                <h5>09 21 16.23 Gypsum Board Shaft Wall Assemblies</h5>
              </li>
              <li className="li ms-4">
                <h5>09 22 16 Non-Structural Metal Framing</h5>
              </li>
              <li className="li ms-4">
                <h5>09 29 00 Gypsum Board Assemblies</h5>
              </li>
            </ul>
          </div>
          <div className="baseBiddrywall">
            <h4 className="baseh4">Add/Alt Weather Barriers: $#,###,###.00</h4>
            <ul className="mt-3">
              <li className="li ms-4">
                <h5>07 25 00 Weather Barriers (For Our Scope Only)</h5>
              </li>
            </ul>
          </div>
          <div className="baseBiddrywall">
            <h4 className="baseh4">
              Add/Alt Integrated Ceiling Assemblies: $#,###,###.00
            </h4>
            <ul className="mt-3">
              <li className="li ms-4">
                <h5>
                  09 54 00 Integrated Ceiling Assemblies (For Our Scope Only)
                </h5>
              </li>
            </ul>
          </div>
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
              <li>Light gauge metal framing, wall board and finish</li>
              <li>Cold-formed metal framing for our scope of work only</li>
              <li>
                Fire-stopping and joint sealants for our scope of work only
              </li>
              <li>Scaffolding for our scope of work only</li>
              <li>Badging for our workers only</li>
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
              <li>
                Fire-stopping and joint sealants for our scope of work only
              </li>
              <li>Scaffolding for our scope of work only</li>
              <li>Badging for our workers only</li>
            </ul>
          </div>
          <div className="estimator">
            <p className="myesti"> Louie Hoelscher </p>
            <p className="myesti"> 636-383-2105 </p>
          </div>
        </main>
        <footer className="footer myspan text-center">
          CSLB 1035342 DIR 1000059791
        </footer>
      </div>
    </div>
  );
};

export default Purposal;