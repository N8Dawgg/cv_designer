import { v4 as uuid } from "uuid";
import { Icon } from "./Icon.jsx";

export function EmploymentForm({
  employmentInfo,
  employmentFormState,
  setState,
  addStateEntry,
  removeStateEntry,
  storeState,
  restoreState,
}) {
  if (employmentFormState.editing != null) {
    console.log("EduForm: ", employmentInfo);
    return (
      <>
        <div className="form-container">
          <div>
            <h2> {Icon.employment()} Employment</h2>
          </div>
          <div className="left-panel-form">
            <label>Employer</label>
            <input
              id="employer"
              name="employer"
              onChange={(e) =>
                setState(
                  "employmentInfo",
                  "employer",
                  e.target.value,
                  employmentFormState.editing
                )
              }
              value={employmentInfo[employmentFormState.editing].employer}
            />
            <label>Position</label>
            <input
              id="position"
              name="position"
              onChange={(e) =>
                setState(
                  "employmentInfo",
                  "position",
                  e.target.value,
                  employmentFormState.editing
                )
              }
              value={employmentInfo[employmentFormState.editing].position}
            />
            <label>Location</label>
            <input
              id="location"
              name="location"
              onChange={(e) =>
                setState(
                  "employmentInfo",
                  "location",
                  e.target.value,
                  employmentFormState.editing
                )
              }
              value={employmentInfo[employmentFormState.editing].location}
            />
            <label>Start Date</label>
            <input
              id="startDate"
              name="startDate"
              onChange={(e) =>
                setState(
                  "employmentInfo",
                  "startDate",
                  e.target.value,
                  employmentFormState.editing
                )
              }
              value={employmentInfo[employmentFormState.editing].startDate}
            />
            <label>End Date</label>
            <input
              id="endDate"
              name="endDate"
              onChange={(e) =>
                setState(
                  "employmentInfo",
                  "endDate",
                  e.target.value,
                  employmentFormState.editing
                )
              }
              value={employmentInfo[employmentFormState.editing].endDate}
            />
            <label>Job Description</label>
            <textarea
              id="description"
              name="description"
              style={{ minHeight: "5rem" }}
              onChange={(e) =>
                setState(
                  "employmentInfo",
                  "description",
                  e.target.value,
                  employmentFormState.editing
                )
              }
              value={employmentInfo[employmentFormState.editing].description}
            />
            <div className="form-button-div">
              <button
                className="delete-button"
                name="delete-employment"
                id="delete-employment"
                onClick={() => {
                  removeStateEntry(
                    "employmentInfo",
                    employmentFormState.editing
                  );
                  setState("employmentFormState", "editing", null);
                }}
              >
                {Icon.trash()} Delete
              </button>
              <button
                className="cancel-button"
                name="cancel-employment"
                id="cancel-employment"
                onClick={() => {
                  setState("employmentFormState", "editing", null);
                  restoreState("employmentInfo");
                }}
              >
                {Icon.close()} Cancel
              </button>
              <button
                className="finish-button"
                name="finish-employment"
                id="finish-employment"
                onClick={() => setState("employmentFormState", "editing", null)}
              >
                {Icon.check()} Finish
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
  if (employmentFormState.isCollapsed) {
    return (
      <>
        <div className="form-container">
          <div
            onClick={() => {
              setState(
                "employmentFormState",
                "isCollapsed",
                !employmentFormState.isCollapsed
              );
            }}
          >
            <h2> {Icon.employment()} Employment</h2>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="form-container">
          <div
            onClick={() => {
              setState(
                "employmentFormState",
                "isCollapsed",
                !employmentFormState.isCollapsed
              );
            }}
          >
            <h2> {Icon.employment()} Employment</h2>
          </div>
          {Object.keys(employmentInfo).map((key) => {
            return (
              <EmploymentFormListing
                employmentEntry={employmentInfo[key]}
                employmentInfo={employmentInfo}
                entryID={key}
                setState={setState}
                storeState={storeState}
                key={key}
              />
            );
          })}
          <div className="form-buttom">
            <button
              className="add-entry-button"
              onClick={() => {
                storeState("employmentInfo");
                let newEntryID = addStateEntry("employmentInfo");
                setState("employmentFormState", "editing", newEntryID);
              }}
            >
              + Employment
            </button>
          </div>
        </div>
      </>
    );
  }
}

/*
EmploymentDataEntry:
employerName,
position,
startDate,
endDate,
location
*/

//delete, cancel and save buttons

export function EmploymentFormListing({
  employmentEntry,
  employmentFormState,
  entryID,
  setState,
  storeState,
}) {
  return (
    <>
      <div
        onClick={() => {
          storeState("employmentInfo");
          setState("employmentFormState", "editing", entryID);
        }}
      >
        <h3>{employmentEntry.employer}</h3>
      </div>
    </>
  );
}

export function EmploymentCVListing({ employmentEntry }) {
  return (
    <>
      <div className="cv-listing">
        <div className="cv-listing-left">
          <p>{employmentEntry.startDate + " - " + employmentEntry.endDate}</p>
          <p>{employmentEntry.location}</p>
        </div>
        <div className="cv-listing-right">
          <h3>{employmentEntry.employer}</h3>
          <p>{employmentEntry.position}</p>
          <br></br>
          <p style={{ textAlign: "left" }}>{employmentEntry.description}</p>
        </div>
      </div>
    </>
  );
}
