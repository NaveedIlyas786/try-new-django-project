import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./Purposaldata.css";


import "@progress/kendo-theme-material/dist/all.css";
import {
  Page, Text, Document, StyleSheet, View, Image
} from "@react-pdf/renderer";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { pdf } from '@react-pdf/renderer';





const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: 'white'
    
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderBottom: '2 solid black',
    backgroundColor: 'white',
    backgroundcolor: '#333',
    padding: '10px',
    textalign: 'center'
  },
  logo: {
    width: 130,
    height: 80,
  },
  rightTop: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    textAlign: 'right'
  },
  footer: {
    padding: 10,
    borderTop: '2 solid #82bfff',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    color:'#1976d2',
    borderBottom:'2 solid #82bfff',
    paddingBottom:10,
    margin:20,
  }
});











const MyDocument = ({ data, qualificationData }) => {
  return (
    <Document>
      {data.map((proposalData, index) => (
        <Page key={index} style={styles.page} size="A4" wrap>
        <View fixed style={styles.header}>
            <Image
              style={styles.logo}
              src="../../../src/assets/purposal_logo-top.png"
            />
            <View style={styles.rightTop}>
              <Text>{proposalData?.estimating?.company?.adress || ""}</Text>
              <Text>Office: {proposalData?.estimating?.company?.office_phone_number || ""}</Text>
              <Text>Fax: {proposalData?.estimating?.company?.fax_number || ""}</Text>
              <Text>Email: {proposalData?.estimating?.company?.email || ""}</Text>
            </View>
          </View>

          <Text>{proposalData?.date}</Text>

          <Text>
            {proposalData?.estimating?.company?.Cmpny_Name || "No Company Exist"} is submitting the following bid proposal for the
            {proposalData?.estimating?.prjct_name}. The plans used to formulate the bid proposal are dated
            {proposalData?.estimating?.plane_date}, drafted by {proposalData?.architect_firm} FIRM,
            and approved by {proposalData?.architect_name}.
          </Text>

          <Text>The following addendums were also included in the bid proposal:</Text>
          {/* if (Array.isArray(proposalData.Addendums)) { */}
          {proposalData.Addendums.map((e,index) => (
            <Text key={index} vakue={e.addendum_Number}>
              Addendum #{e.addendum_Number} Dated {e.date}
            </Text>
          ))}
      {/* } */}

          <Text>DMS Drywall & Interior Systems Inc. submits the below price for the following scope:</Text>
          {proposalData.spcifc.map((e) => (
            <View key={e.id}>
              <Text>{e.specific_name} : ${e.budget}.00</Text>
              {e.sefic.map((a) => (
                <Text key={`${e.id}-${a.id}`}>
                  {a.number} {a.name}
                </Text>
              ))}
            </View>
          ))}

          <Text>DMS Drywall & Interior Systems Inc. Signatory to the Carpenters Union</Text>

          <Text>INCLUSIONS:</Text>
          {proposalData.services
            .filter((a) => a.service_type === "IN")
            .map((e) => (
              <Text key={e.id}>{e.service}</Text>
          ))}

          <Text>EXCLUSIONS:</Text>
          {proposalData.services
            .filter((a) => a.service_type === "EX")
            .map((e) => (
              <Text key={e.id}>{e.service}</Text>
          ))}

          {/* <Text>QUALIFICATIONS:</Text>
          {qualificationData.map((e,index) => (
            <Text key={index}>{e.detail}</Text>
          ))} */}

          <Text>{proposalData?.estimating?.estimator}</Text>
          <Text>Phone number</Text>

          <View fixed style={styles.footer}>
            {/* <Text render={({ pageNumber, totalPages }) => (
                `${pageNumber} / ${totalPages}`
            )} /> */}
            <Text>{proposalData?.estimating?.company?.license_number || ""}</Text>

          </View>

        </Page>
      ))}
    </Document>
  );
};

const generatePDFBlob = async (data) => {
  const doc = <MyDocument data={data} />;
  const asBlob = true;
  return pdf(doc).toBlob();
};










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

  const AttachedPDF = async () => {
    try {
      const estimatingId = id;  // Fetch or calculate the estimatingId
      const endpoint = `http://127.0.0.1:8000/api/estimating/sendEmail/${estimatingId}/`;
      const pdfBlob = await generatePDFBlob(filteredEntries);  // Use filteredEntries instead of data
  
      const formData = new FormData();
      formData.append('pdf', pdfBlob, 'proposal.pdf');  // 'proposal.pdf' is the filename
  
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData
      });
  
      const result = await response.json();
  
      if (response.ok) {
        console.log(result.message);
      } else {
        console.error(result.error);
      }
  
    } catch (error) {
      console.error("Error sending PDF:", error);
    }
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
          <div className="btn">
              <PDFDownloadLink
                document={<MyDocument data={filteredEntries} qualificationData={qualificationData} />}
                filename="proposal.pdf"
              >
                {({ loading }) =>
                  loading ? (
                    "Generating PDF..."
                  ) : (
                    <i
                      className="fa-solid fa-file-pdf"
                      style={{
                        fontSize: "38px",
                        color: "#1976d2",
                        fontWeight: "900",
                      }}
                    ></i>
                  )
                }
              </PDFDownloadLink>
            </div>

            <div className="btn" onClick={AttachedPDF}>
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

          <div >

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
                        <strong> {proposalData?.estimating?.prjct_name}</strong>
                        . The plans used to formulate the bid proposal are dated
                        <strong> {proposalData?.estimating?.plane_date}</strong>
                        , drafted by{" "}
                        <strong> {proposalData?.architect_firm}</strong> FIRM,
                        and approved by{" "}
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
          </div>

          {/* </div> */}
        </div>
        // </div>
      )}
    </>
  );
}

export default Rawpurposal;
