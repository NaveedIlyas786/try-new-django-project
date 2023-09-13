import React from "react";
import "./Purposal.css";
const Purposal = () => {
  console.log("Purposal component rendered");
  return (
    <div className="purposal">
      <div className="pdf_form  d-flex flex-column gap-5 justify-content-right">
        <button className="text-white">Export</button>
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
            <strong className="fs-5"> Base Bid Drywall/Framing/Plaster: $#,###,###.00</strong>
          </div>
        </main>
        <footer className="bg-primary">
          <p>footer</p>
        </footer>
      </div>
    </div>
  );
};

export default Purposal;
