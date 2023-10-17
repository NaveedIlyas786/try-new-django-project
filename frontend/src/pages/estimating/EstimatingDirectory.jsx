{
  showProjectModal && (
    <div
      className={`modal-container projectPopup bg-white pt-5 ps-2 ${
        showProjectModal ? "show" : ""
      }`}
    >
      <h4 className="text-center addnewtxt">Add New Project Entry</h4>
      <button className="close-btn" onClick={closeModal}></button>
      <div className="d-flex justify-content-center  align-items-center flex-column gap-5 pb-5 px-5">
        <div className="projName">
          <label htmlFor="projectName" className="form-label">
            Estimating/Project Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="projectName"
            placeholder="AutoPopulate not shown on frontend"
            defaultValue={selectedEstimatingID}
            readOnly
          />
        </div>
        <div className="bothDiv lllp gap-3 mt-3">
          <div className="projName Oneline">
            <label htmlFor="projectName" className="form-label">
              Start Date:
            </label>
            <input
              type="date"
              className="form-control"
              id="DateId"
              value={startDate}
              onChange={handleStartDateChange}
            />
          </div>
          <div className="projName Oneline">
            <label htmlFor="projectName" className="form-label">
              Job Number:
            </label>
            <input
              type="text"
              className="form-control"
              id="projectID"
              value={jobNo}
              onChange={handleJobNoChange}
            />
          </div>
        </div>
        <div className="bothDiv gap-3">
          <div className="Oneline">
            <label htmlFor="estimatorName" className="form-label">
              Project Manager:
            </label>
            <select
              className="form-select"
              id="projectManagerID"
              value={selectedProjectManager}
              onChange={handleProjectManagerChange}
            >
              <option value="">Select Project Manager</option>
              {projectManager && projectManager.length > 0 ? (
                projectManager.map((user) => (
                  <option value={user.id} key={user.id}>
                    {user.full_Name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  Loading...
                </option>
              )}
            </select>
          </div>
          <div className="Oneline">
            <label htmlFor="location" className="form-label">
              Foreman:
            </label>
            <select
              className="form-select"
              id="estimatorNameID"
              value={selectedForeman}
              onChange={handleForemanChange}
            >
              <option value="">Select Forman</option>
              {formanName.length > 0 ? (
                formanName.map((user) => (
                  <option value={user.id} key={user.id}>
                    {user.full_Name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  Loading...
                </option>
              )}
            </select>
          </div>
        </div>

        <div className="bothDiv gap-3">
          <div className="Oneline">
            <label htmlFor="estimatorName" className="form-label">
              Bim Operator:
            </label>
            <select
              className="form-select"
              id="bimOperatorID"
              value={selectedBimOperator} // Use the selectedBimOperator value
              onChange={handleBimOperatorChange}
            >
              <option value="">Select Bim Operator</option>
              {BimOperator && BimOperator.length > 0 ? (
                BimOperator.map((user) => (
                  <option value={user.id} key={user.id}>
                    {user.full_Name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  Loading...
                </option>
              )}
            </select>
          </div>
          <div className="Oneline">
            <label htmlFor="location" className="form-label">
              Project Engineer:
            </label>
            <select
              className="form-select"
              id="ProjectEngineerID"
              value={selectedProjectEngineer}
              onChange={handleProjectEngineerChange}
            >
              <option value="">Select Project Engineer</option>

              {ProjEnger && ProjEnger.length > 0 ? (
                ProjEnger.map((user) => (
                  <option value={user.id} key={user.id}>
                    {user.full_Name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  Loading...
                </option>
              )}
            </select>
          </div>
        </div>
        <div className="bothDiv gap-3">
          <div className="Oneline">
            <label htmlFor="estimatorName" className="form-label">
              BIM Modeler:
            </label>
            <select
              className="form-select"
              id="bimOperatorID"
              value={selectedBimOperator} // Use the selectedBimOperator value
              onChange={handleBimOperatorChange}
            >
              <option value="">Select Bim Operator</option>
              {BimOperator && BimOperator.length > 0 ? (
                BimOperator.map((user) => (
                  <option value={user.id} key={user.id}>
                    {user.full_Name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  Loading...
                </option>
              )}
            </select>
          </div>
          <div className="Oneline">
            <label htmlFor="location" className="form-label">
              Genral_superintendent:
            </label>
            <select
              className="form-select"
              id="ProjectEngineerID"
              value={SelectedGeneralSuperintendent}
              onChange={handleGenralSuperintendentChange}
            >
              <option value="">Select Project Engineer</option>

              {GeneralSuperintendent && GeneralSuperintendent.length > 0 ? (
                GeneralSuperintendent.map((user) => (
                  <option value={user.id} key={user.id}>
                    {user.full_Name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  Loading...
                </option>
              )}
            </select>
          </div>
        </div>
        <div className="projName">
          <label htmlFor="projectName" className="form-label">
            Add project address::
          </label>
          <input
            type="text"
            className="form-control"
            id="projectName"
            placeholder="Your project address!"
            value={selectedProjectAddress}
            onChange={handleProjectAddressChange}
          />
        </div>

        <div className="bothDiv gap-3">
          <div className="Oneline">
            <label htmlFor="estimatorName" className="form-label">
              Addendum:
            </label>
            <select
              className="form-select"
              id="bimOperatorID"
              value={selectedAddendum} // Use the selectedBimOperator value
              onChange={handleSelectedAddendumChange}
            >
              <option value="">Select Addendum</option>
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>
          </div>

          <div className="Oneline">
            <label htmlFor="location" className="form-label">
              Bid:
            </label>
            <select
              className="form-select"
              id="ProjectEngineerID"
              value={selectedBid}
              onChange={handleSelectedBidChange}
            >
              <option value="">Select Bid</option>
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>
          </div>
        </div>
        <div className="bothDiv gap-3">
          <div className="Oneline">
            <label htmlFor="estimatorName" className="form-label">
              Spec's per our Scope:
            </label>
            <select
              className="form-select"
              id="bimOperatorID"
              value={selectedspec} // Use the selectedBimOperator value
              onChange={handleSelectedSpecChange}
            >
              <option value="">Select Spec's</option>
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>
          </div>

          <div className="Oneline">
            <label htmlFor="location" className="form-label">
              WALL TYPE MAPPING:
            </label>
            <select
              className="form-select"
              id="ProjectEngineerID"
              value={selectedWallType}
              onChange={handleWallTypeChange}
            >
              <option value="">Select Choice</option>
              <option value="Completed">Completed</option>
              <option value="Working">Working</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
        <div className="bothDiv gap-3">
          <div className="Oneline">
            <label htmlFor="location" className="form-label">
              Drywell Conttrol Joins:
            </label>
            <select
              className="form-select"
              id="ProjectEngineerID"
              value={selectedDrywell}
              onChange={handleDrywellChange}
            >
              <option value="">Select Choice</option>
              <option value="Submited">Submited</option>
              <option value="Working">Working</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div className="Oneline">
            <label htmlFor="location" className="form-label">
              FINISH LEVEL MARKUPS:
            </label>
            <select
              className="form-select"
              id="ProjectEngineerID"
              value={selectedFINISHLEVELMARKUPS}
              onChange={handleFINISHLEVELMARKUPSChange}
            >
              <option value="">Select Choice</option>
              <option value="Completed">Completed</option>
              <option value="Working">Working</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
        <div className="bothDiv gap-3">
          <div className="Oneline">
            <label htmlFor="location" className="form-label">
              PROGRESS TRACKING:
            </label>
            <select
              className="form-select"
              id="ProjectEngineerID"
              value={selectedPROGRESSTRACKING}
              onChange={handlePROGRESSTRACKINGChange}
            >
              <option value="">Select Choice</option>
              <option value="Completed">Completed</option>
              <option value="Working">Working</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div className="Oneline">
            <label htmlFor="location" className="form-label">
              RO-Door:
            </label>
            <select
              className="form-select"
              id="ProjectEngineerID"
              value={selectedRO_Door}
              onChange={handleRO_DoorChange}
            >
              <option value="">Select Choice</option>
              <option value="Working">Working</option>
              <option value="Submited">Submited</option>
              <option value="Pending">Pending</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </div>
        <div className="bothDiv  gap-3">
          <div className="Oneline">
            <label htmlFor="location" className="form-label">
              RO-Window:
            </label>
            <select
              className="form-select"
              id="ProjectEngineerID"
              value={selectedRO_Window}
              onChange={handleRO_WindowChange}
            >
              <option value="">Select Choice</option>
              <option value="Working">Working</option>
              <option value="Submited">Submited</option>
              <option value="Pending">Pending</option>
              <option value="Done">Done</option>
            </select>
          </div>

          <div className="Oneline">
            <label htmlFor="location" className="form-label">
              Status:
            </label>
            <select
              className="form-select"
              id="ProjectEngineerID"
              value={selectedProjectStatus}
              onChange={handleProjectStatusChange}
            >
              <option value="">Select Bid</option>
              <option value="C">C</option>
              <option value="P">P</option>
              <option value="Q">Q</option>
              <option value="V">V</option>
              <option value="X">X</option>
            </select>
          </div>
        </div>
        <div className="bothDiv  gap-3">
          <div className="Oneline">
            <label htmlFor="location" className="form-label">
              Contacts:
            </label>
            <select
              className="form-select"
              id="ProjectEngineerID"
              value={selectedContacts}
              onChange={handleContactsChange}
            >
              <option value="">Select Bid</option>
              <option value="On build">On build</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <div className="Oneline">
            <label htmlFor="projectName" className="form-label">
              Substitution:
            </label>
            <input
              type="text"
              className="form-control"
              id="projectName"
              placeholder="Write here!"
              value={selectedSubstitution}
              onChange={handleSubstitutionChange}
            />
          </div>
        </div>

        <div className="px-3" style={{ width: "100%" }}>
          <div>
            <label className="form-label">
              <span> Contract</span>
            </label>
            <div id="" className="input-group">
              <select
                className="form-select"
                placeholder="Contract"
                id="ProjectEngineerID"
                value={selectedContract}
                onChange={handleContractChange}
              >
                <option value="">Select Choice</option>
                <option value="On build">Fully Executed</option>
                <option value="Pending">Pending</option>
              </select>
              <input
                id=""
                type="date"
                name="date" // Set the name attribute to differentiate
                className="form-control"
                value={selectedProjectDate}
                onChange={handleProjectDateChange}
              />
            </div>
          </div>
        </div>
        <div className="px-3" style={{ width: "100%" }}>
          <div>
            <label className="form-label">
              <span>SCHEDULE_OF_ VALUES:</span>
            </label>
            <div id="" className="input-group">
              <select
                className="form-select"
                placeholder="Contract"
                id="ProjectEngineerID"
                value=""
                onChange={() => {}}
              >
                <option value="">Select Choice</option>
                <option value="On build">Fully Executed</option>
                <option value="Pending">Pending</option>
              </select>
              <input
                id=""
                type="date"
                name="date" // Set the name attribute to differentiate
                className="form-control"
                value=""
              />
            </div>
          </div>
        </div>
        <div className="px-3" style={{ width: "100%" }}>
          <div>
            <label className="form-label">
              <span>INSURANCES:</span>
            </label>
            <div id="" className="input-group">
              <select
                className="form-select"
                placeholder="Contract"
                id="ProjectEngineerID"
                value=""
                onChange={() => {}}
              >
                <option value="">Select Choice</option>
                <option value="On build">Fully Executed</option>
                <option value="Pending">Pending</option>
              </select>
              <input
                id=""
                type="date"
                name="date" // Set the name attribute to differentiate
                className="form-control"
                value=""
              />
            </div>
          </div>
        </div>
        <div className="px-3" style={{ width: "100%" }}>
          <div>
            <label className="form-label">
              <span>BONDS:</span>
            </label>
            <div id="" className="input-group">
              <select
                className="form-select"
                placeholder="Contract"
                id="ProjectEngineerID"
                value=""
                onChange={() => {}}
              >
                <option value="">Select Choice</option>
                <option value="On build">Fully Executed</option>
                <option value="Pending">Pending</option>
              </select>
              <input
                id=""
                type="date"
                name="date" // Set the name attribute to differentiate
                className="form-control"
                value=""
              />
            </div>
          </div>
        </div>
        <div className="px-3" style={{ width: "100%" }}>
          <div>
            <label className="form-label">
              <span>ZLIENS:</span>
            </label>
            <div id="" className="input-group">
              <select
                className="form-select"
                placeholder="Contract"
                id="ProjectEngineerID"
                value=""
                onChange={() => {}}
              >
                <option value="">Select Choice</option>
                <option value="On build">Fully Executed</option>
                <option value="Pending">Pending</option>
              </select>
              <input
                id=""
                type="date"
                name="date" // Set the name attribute to differentiate
                className="form-control"
                value=""
              />
            </div>
          </div>
        </div>
        <div className="px-3" style={{ width: "100%" }}>
          <div>
            <label className="form-label">
              <span>SUBMITTALSS</span>
            </label>
            <div id="" className="input-group">
              <select
                className="form-select"
                placeholder="Contract"
                id="ProjectEngineerID"
                value=""
                onChange={() => {}}
              >
                <option value="">Select Choice</option>
                <option value="On build">Fully Executed</option>
                <option value="Pending">Pending</option>
              </select>
              <input
                id=""
                type="date"
                name="date" // Set the name attribute to differentiate
                className="form-control"
                value=""
              />
            </div>
          </div>
        </div>
        <div className="px-3" style={{ width: "100%" }}>
          <div>
            <label className="form-label">
              <span>RO-Window:</span>
            </label>
            <div id="" className="input-group">
              <select
                className="form-select"
                placeholder="Contract"
                id="ProjectEngineerID"
                value=""
                onChange={() => {}}
              >
                <option value="">Select Choice</option>
                <option value="On build">Fully Executed</option>
                <option value="Pending">Pending</option>
              </select>
              <input
                id=""
                type="date"
                name="date" // Set the name attribute to differentiate
                className="form-control"
                value=""
              />
            </div>
          </div>
        </div>

        <div className="px-3" style={{ width: "100%" }}>
          <label htmlFor="projectName" className="form-label mt-2">
            <span>SUBMITTALSS</span>
          </label>
          {step2FormData.map((entry, index) => (
            <div className="wholespecificationEntry" key={index}>
              <div className="ScopofWorkSectionRemove">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleRemoveWholeWorkSectionEntry(index)}
                >
                  <i className="far">X</i>
                </button>
              </div>
              <div className="mt-5">
                <label
                  htmlFor={`specificBudget-${index}`}
                  className="form-label"
                >
                  Add Proposal:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id={`specificBudget-${index}`}
                  value=""
                />
              </div>
              <div className="mb-2 mt-2">
                <label htmlFor={`specificName-${index}`} className="form-label">
                  Add scope of Work
                </label>
                <select
                  className="form-select"
                  aria-label="Select Specification"
                  value={entry.specific_name || ""}
                  onChange={(e) =>
                    handleEntryChange(index, "specific_name", e.target.value)
                  }
                >
                  <option value="Base Bid Drywall/Framing">
                    All scope numbers wil here
                  </option>
                </select>
              </div>
              <div className="bothDiv  gap-3">
                <div className="Oneline mb-4">
                  <label htmlFor="location" className="form-label">
                    Submittals:
                  </label>
                  <select
                    className="form-select"
                    id="ProjectEngineerID"
                    value={selectedProjectEngineer}
                    onChange={handleProjectEngineerChange}
                  >
                    <option value="">Select Choice</option>
                    <option value="On build">Approved</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>

                <div className="Oneline">
                  <label htmlFor="location" className="form-label">
                    Status:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dueDate"
                    value=""
                    onChange={() => {}}
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            className="btn btn-success"
            onClick={handleAddEntry}
          >
            Add SUBMITTALSS
          </button>
        </div>
        <div className="px-3" style={{ width: "100%" }}>
          <label htmlFor="projectName" className="form-label mt-2">
            <span>SHOP DRAWINGS</span>
          </label>
          {step2FormData.map((entry, index) => (
            <div className="wholespecificationEntry" key={index}>
              <div className="ScopofWorkSectionRemove">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleRemoveWholeWorkSectionEntry(index)}
                >
                  <i className="far">X</i>
                </button>
              </div>
              <div className="mt-5">
                <label
                  htmlFor={`specificBudget-${index}`}
                  className="form-label"
                >
                  Add Proposal:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id={`specificBudget-${index}`}
                  value=""
                />
              </div>
              <div className="mb-2 mt-2">
                <label htmlFor={`specificName-${index}`} className="form-label">
                  Add scope of Work
                </label>
                <select
                  className="form-select"
                  aria-label="Select Specification"
                  value={entry.specific_name || ""}
                  onChange={(e) =>
                    handleEntryChange(index, "specific_name", e.target.value)
                  }
                >
                  <option value="Base Bid Drywall/Framing">
                    All scope numbers wil here
                  </option>
                </select>
              </div>
              <div className="bothDiv  gap-3">
                <div className="Oneline mb-4">
                  <label htmlFor="location" className="form-label">
                    Submittals:
                  </label>
                  <select
                    className="form-select"
                    id="ProjectEngineerID"
                    value={selectedProjectEngineer}
                    onChange={handleProjectEngineerChange}
                  >
                    <option value="">Select Choice</option>
                    <option value="On build">Approved</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>

                <div className="Oneline">
                  <label htmlFor="location" className="form-label">
                    Status:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dueDate"
                    value=""
                    onChange={() => {}}
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            className="btn btn-success"
            onClick={handleAddEntry}
          >
            Add SHOP DRAWINGS
          </button>
        </div>
        <div className="px-3" style={{ width: "100%" }}>
          <label htmlFor="projectName" className="form-label mt-2">
            <span>SAFITYS</span>
          </label>
          {step2FormData.map((entry, index) => (
            <div className="wholespecificationEntry" key={index}>
              <div className="ScopofWorkSectionRemove">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleRemoveWholeWorkSectionEntry(index)}
                >
                  <i className="far">X</i>
                </button>
              </div>
              <div className="mt-5">
                <label
                  htmlFor={`specificBudget-${index}`}
                  className="form-label"
                >
                  Add Proposal:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id={`specificBudget-${index}`}
                  value=""
                />
              </div>
              <div className="mb-2 mt-2">
                <label htmlFor={`specificName-${index}`} className="form-label">
                  Add scope of Work
                </label>
                <select
                  className="form-select"
                  aria-label="Select Specification"
                  value={entry.specific_name || ""}
                  onChange={(e) =>
                    handleEntryChange(index, "specific_name", e.target.value)
                  }
                >
                  <option value="Base Bid Drywall/Framing">
                    All scope numbers wil here
                  </option>
                </select>
              </div>
              <div className="bothDiv  gap-3">
                <div className="Oneline mb-4">
                  <label htmlFor="location" className="form-label">
                    Submittals:
                  </label>
                  <select
                    className="form-select"
                    id="ProjectEngineerID"
                    value={selectedProjectEngineer}
                    onChange={handleProjectEngineerChange}
                  >
                    <option value="">Select Choice</option>
                    <option value="On build">Approved</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>

                <div className="Oneline">
                  <label htmlFor="location" className="form-label">
                    Status:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dueDate"
                    value=""
                    onChange={() => {}}
                  />
                </div>
              </div>
              <div className="mt-2">
                <label htmlFor="comment">Comment:</label>
                <textarea
                  id="comment"
                  style={{
                    width: "100%",
                    backgroundColor: "white",
                    color: "black",
                    padding: "10px",
                  }}
                  rows="2"
                  placeholder=" Write your comment here !"
                ></textarea>
              </div>
            </div>
          ))}

          <button
            type="button"
            className="btn btn-success"
            onClick={handleAddEntry}
          >
            Add SAFITYs
          </button>
        </div>
        <div className="px-3" style={{ width: "100%" }}>
          <label htmlFor="projectName" className="form-label mt-2">
            <span>Schedules</span>
          </label>
          {step2FormData.map((entry, index) => (
            <div className="wholespecificationEntry" key={index}>
              <div className="mb-2 mt-3">
                <label
                  htmlFor={`specificDetails-${index}`}
                  className="form-label"
                >
                  Scope of work divisions
                </label>
                {Array.isArray(entry.sefic) &&
                  entry.sefic.map((detail, detailIndex) => (
                    <div
                      key={detailIndex}
                      className="input-group myrowInputgrouup"
                    >
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Scope Of Work Number"
                        value={detail.number}
                        onChange={(e) =>
                          handleScopeDivisionInputChange(
                            index,
                            detailIndex,
                            "number",
                            e.target.value
                          )
                        }
                      />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Scope Of Work Description"
                        value={detail.name}
                        onChange={(e) =>
                          handleScopeDivisionInputChange(
                            index,
                            detailIndex,
                            "name",
                            e.target.value
                          )
                        }
                      />
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() =>
                          handleRemoveScopeDivisionEntry(index, detailIndex)
                        }
                      >
                        <i className="far">X</i>
                      </button>
                    </div>
                  ))}
                <button
                  type="button"
                  className="btn btn-success bk"
                  onClick={() => handleAddScopeDivisionEntry(index)}
                >
                  <i className="fa-regular icon fa-plus"></i>
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            className="btn btn-success"
            onClick={handleAddEntry}
          >
            Add Schedule
          </button>
        </div>
        <div className="px-3" style={{ width: "100%" }}>
          <label htmlFor="projectName" className="form-label mt-2">
            <span>SUB_ CONTRACTORSS</span>
          </label>
          {step2FormData.map((entry, index) => (
            <div className="wholespecificationEntry" key={index}>
              <div className="mb-2 mt-3">
                <label
                  htmlFor={`specificDetails-${index}`}
                  className="form-label"
                >
                  Scope of work divisions
                </label>
                {Array.isArray(entry.sefic) &&
                  entry.sefic.map((detail, detailIndex) => (
                    <div
                      key={detailIndex}
                      className="input-group myrowInputgrouup"
                    >
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Scope Of Work Number"
                        value={detail.number}
                        onChange={(e) =>
                          handleScopeDivisionInputChange(
                            index,
                            detailIndex,
                            "number",
                            e.target.value
                          )
                        }
                      />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Scope Of Work Description"
                        value={detail.name}
                        onChange={(e) =>
                          handleScopeDivisionInputChange(
                            index,
                            detailIndex,
                            "name",
                            e.target.value
                          )
                        }
                      />
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() =>
                          handleRemoveScopeDivisionEntry(index, detailIndex)
                        }
                      >
                        <i className="far">X</i>
                      </button>
                    </div>
                  ))}
                <div className="mt-2">
                  <label htmlFor="comment">Comment:</label>
                  <textarea
                    id="comment"
                    style={{
                      width: "100%",
                      backgroundColor: "white",
                      color: "black",
                      padding: "10px",
                    }}
                    rows="2"
                    placeholder=" Write your comment here !"
                  ></textarea>
                </div>
                <button
                  type="button"
                  className="btn btn-success bk"
                  onClick={() => handleAddScopeDivisionEntry(index)}
                >
                  <i className="fa-regular icon fa-plus"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="px-3" style={{ width: "100%" }}>
          <label htmlFor="projectName" className="form-label mt-2">
            <span>LABOR RATES</span>
          </label>
          {step2FormData.map((entry, index) => (
            <div className="wholespecificationEntry" key={index}>
              <div className="mb-2 mt-3">
                <label
                  htmlFor={`specificDetails-${index}`}
                  className="form-label"
                >
                  Scope of work divisions
                </label>
                {Array.isArray(entry.sefic) &&
                  entry.sefic.map((detail, detailIndex) => (
                    <div
                      key={detailIndex}
                      className="input-group myrowInputgrouup"
                    >
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Scope Of Work Number"
                        value={detail.number}
                        onChange={(e) =>
                          handleScopeDivisionInputChange(
                            index,
                            detailIndex,
                            "number",
                            e.target.value
                          )
                        }
                      />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Scope Of Work Description"
                        value={detail.name}
                        onChange={(e) =>
                          handleScopeDivisionInputChange(
                            index,
                            detailIndex,
                            "name",
                            e.target.value
                          )
                        }
                      />
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() =>
                          handleRemoveScopeDivisionEntry(index, detailIndex)
                        }
                      >
                        <i className="far">X</i>
                      </button>
                    </div>
                  ))}
                <div className="mt-2">
                  <label htmlFor="comment">Comment:</label>
                  <textarea
                    id="comment"
                    style={{
                      width: "100%",
                      backgroundColor: "white",
                      color: "black",
                      padding: "10px",
                    }}
                    rows="2"
                    placeholder=" Write your comment here !"
                  ></textarea>
                </div>
                <button
                  type="button"
                  className="btn btn-success bk"
                  onClick={() => handleAddScopeDivisionEntry(index)}
                >
                  <i className="fa-regular icon fa-plus"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="px-3" style={{ width: "100%" }}>
          <label htmlFor="projectName" className="form-label mt-2">
            <span>BILLINGS</span>
          </label>
          {step2FormData.map((entry, index) => (
            <div className="wholespecificationEntry" key={index}>
              <div className="mb-2 mt-3">
                {/* <label
                      htmlFor={`specificDetails-${index}`}
                      className="form-label"
                    >
                      Scope of work divisions
                    </label> */}
                {Array.isArray(entry.sefic) &&
                  entry.sefic.map((detail, detailIndex) => (
                    <div
                      key={detailIndex}
                      className="input-group myrowInputgrouup"
                    >
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Due Date"
                        value=""
                        onChange={() => {}}
                      />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Add Reduction:"
                        value=""
                        onChange={() => {}}
                      />
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() =>
                          handleRemoveScopeDivisionEntry(index, detailIndex)
                        }
                      >
                        <i className="far">X</i>
                      </button>
                    </div>
                  ))}

                <button
                  type="button"
                  className="btn btn-success bk"
                  onClick={() => handleAddScopeDivisionEntry(index)}
                >
                  <i className="fa-regular icon fa-plus"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="px-3" style={{ width: "100%" }}>
          <label htmlFor="projectName" className="form-label mt-2">
            <span>SOVS</span>
          </label>
          {step2FormData.map((entry, index) => (
            <div className="wholespecificationEntry" key={index}>
              <div className="mb-2 mt-3">
                {/* <label
                      htmlFor={`specificDetails-${index}`}
                      className="form-label"
                    >
                      Scope of work divisions
                    </label> */}
                {Array.isArray(entry.sefic) &&
                  entry.sefic.map((detail, detailIndex) => (
                    <div
                      key={detailIndex}
                      className="input-group myrowInputgrouup"
                    >
                      <select
                        className="form-select"
                        aria-label="Select Specification"
                        value={entry.specific_name || ""}
                        onChange={() => {}}
                      >
                        <option value="">Select Choice</option>
                        <option value="Approved">Approved</option>
                        <option value="Pending">Pending</option>
                        <option value="Custom">Custom</option>
                      </select>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Due Date"
                        value=""
                        onChange={() => {}}
                      />
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() =>
                          handleRemoveScopeDivisionEntry(index, detailIndex)
                        }
                      >
                        <i className="far">X</i>
                      </button>
                    </div>
                  ))}

                <button
                  type="button"
                  className="btn btn-success bk"
                  onClick={() => handleAddScopeDivisionEntry(index)}
                >
                  <i className="fa-regular icon fa-plus"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="px-3" style={{ width: "100%" }}>
          <label htmlFor="projectName" className="form-label mt-2">
            <span>HD S_SYSTEMS</span>
          </label>
          {step2FormData.map((entry, index) => (
            <div className="wholespecificationEntry" key={index}>
              <div className="mb-2 mt-3">
                <label
                  htmlFor={`specificDetails-${index}`}
                  className="form-label"
                >
                  Scope of work divisions
                </label>
                {Array.isArray(entry.sefic) &&
                  entry.sefic.map((detail, detailIndex) => (
                    <div
                      key={detailIndex}
                      className="input-group myrowInputgrouup"
                    >
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Scope Of Work Number"
                        value={detail.number}
                        onChange={(e) =>
                          handleScopeDivisionInputChange(
                            index,
                            detailIndex,
                            "number",
                            e.target.value
                          )
                        }
                      />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Scope Of Work Description"
                        value={detail.name}
                        onChange={(e) =>
                          handleScopeDivisionInputChange(
                            index,
                            detailIndex,
                            "name",
                            e.target.value
                          )
                        }
                      />
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() =>
                          handleRemoveScopeDivisionEntry(index, detailIndex)
                        }
                      >
                        <i className="far">X</i>
                      </button>
                    </div>
                  ))}
                <div className="mt-2">
                  <label htmlFor="comment">Comment:</label>
                  <textarea
                    id="comment"
                    style={{
                      width: "100%",
                      backgroundColor: "white",
                      color: "black",
                      padding: "10px",
                    }}
                    rows="2"
                    placeholder=" Write your comment here !"
                  ></textarea>
                </div>
                <button
                  type="button"
                  className="btn btn-success bk"
                  onClick={() => handleAddScopeDivisionEntry(index)}
                >
                  <i className="fa-regular icon fa-plus"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="px-3" style={{ width: "100%" }}>
          <label htmlFor="projectName" className="form-label mt-2">
            <span>ON BUILDS</span>
          </label>
          {step2FormData.map((entry, index) => (
            <div className="wholespecificationEntry" key={index}>
              <div className="mb-2 mt-3">
                {/* <label
                      htmlFor={`specificDetails-${index}`}
                      className="form-label"
                    >
                      Scope of work divisions
                    </label> */}
                {Array.isArray(entry.sefic) &&
                  entry.sefic.map((detail, detailIndex) => (
                    <div
                      key={detailIndex}
                      className="input-group myrowInputgrouup"
                    >
                      <select
                        className="form-select"
                        aria-label="Select Specification"
                        value={entry.specific_name || ""}
                        onChange={() => {}}
                      >
                        <option value="">Select Choice</option>
                        <option value="Approved">Bid Proposal</option>
                        <option value="Pending">Specs</option>
                        <option value="Custom">Contract</option>
                        <option value="Approved">Submitile</option>
                        <option value="Pending">Safety</option>
                        <option value="Custom">Shop Drawing</option>
                        <option value="Custom">Budget</option>
                      </select>
                      <select
                        className="form-select"
                        aria-label="Select Specification"
                        value={entry.specific_name || ""}
                        onChange={() => {}}
                      >
                        <option value="">Select Choice</option>
                        <option value="Approved">Upload</option>
                        <option value="Pending">Pending</option>
                      </select>

                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() =>
                          handleRemoveScopeDivisionEntry(index, detailIndex)
                        }
                      >
                        <i className="far">X</i>
                      </button>
                    </div>
                  ))}

                <button
                  type="button"
                  className="btn btn-success bk"
                  onClick={() => handleAddScopeDivisionEntry(index)}
                >
                  <i className="fa-regular icon fa-plus"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="px-3" style={{ width: "100%" }}>
          <label htmlFor="projectName" className="form-label mt-2">
            <span>BUGETS</span>
          </label>
          {step2FormData.map((entry, index) => (
            <div className="wholespecificationEntry" key={index}>
              <div className="mb-2 mt-3">
                {/* <label
                      htmlFor={`specificDetails-${index}`}
                      className="form-label"
                    >
                      Scope of work divisions
                    </label> */}
                {Array.isArray(entry.sefic) &&
                  entry.sefic.map((detail, detailIndex) => (
                    <div
                      key={detailIndex}
                      className="input-group myrowInputgrouup"
                    >
                      <select
                        className="form-select"
                        aria-label="Select Specification"
                        value={entry.specific_name || ""}
                        onChange={() => {}}
                      >
                        <option value="">Select Choice</option>
                        <option value="Approved">Done</option>
                        <option value="Pending">Pending</option>
                        <option value="Custom">Custom</option>
                      </select>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Comment"
                        value=""
                        onChange={() => {}}
                      />

                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() =>
                          handleRemoveScopeDivisionEntry(index, detailIndex)
                        }
                      >
                        <i className="far">X</i>
                      </button>
                    </div>
                  ))}

                <button
                  type="button"
                  className="btn btn-success bk"
                  onClick={() => handleAddScopeDivisionEntry(index)}
                >
                  <i className="fa-regular icon fa-plus"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleProjectFormSubmit}
          className="btn btn-submit m-auto mt-3 mb-4"
        >
          Add Project
        </button>
      </div>
    </div>
  );
}
