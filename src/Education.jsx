import { v4 as uuid } from "uuid";
import { Icon } from "./Icon";

export function EducationForm({
  educationInfo,
  educationFormState,
  setState,
  addStateEntry,
  removeStateEntry,
  storeState,
  restoreState,
}) {
  if (educationFormState.editing != null) {
    console.log("EduForm: ", educationInfo);
    return (
      <>
        <div className="form-container">
          <div>
            <h2> {Icon.education()} Education</h2>
          </div>
          <div className="left-panel-form">
            <label>School</label>
            <input
              id="school"
              name="school"
              onChange={(e) =>
                setState(
                  "educationInfo",
                  "school",
                  e.target.value,
                  educationFormState.editing
                )
              }
              value={educationInfo[educationFormState.editing].school}
            />
            <label>Degree</label>
            <input
              id="degree"
              name="degree"
              onChange={(e) =>
                setState(
                  "educationInfo",
                  "degree",
                  e.target.value,
                  educationFormState.editing
                )
              }
              value={educationInfo[educationFormState.editing].degree}
            />
            <label>Location</label>
            <input
              id="location"
              name="location"
              onChange={(e) =>
                setState(
                  "educationInfo",
                  "location",
                  e.target.value,
                  educationFormState.editing
                )
              }
              value={educationInfo[educationFormState.editing].location}
            />
            <label>Start Date</label>
            <input
              id="startDate"
              name="startDate"
              onChange={(e) =>
                setState(
                  "educationInfo",
                  "startDate",
                  e.target.value,
                  educationFormState.editing
                )
              }
              value={educationInfo[educationFormState.editing].startDate}
            />
            <label>End Date</label>
            <input
              id="endDate"
              name="endDate"
              onChange={(e) =>
                setState(
                  "educationInfo",
                  "endDate",
                  e.target.value,
                  educationFormState.editing
                )
              }
              value={educationInfo[educationFormState.editing].endDate}
            />
            <div className="form-button-div">
              <button
                className="delete-button"
                name="delete-education"
                id="delete-education"
                onClick={() => {
                  removeStateEntry("educationInfo", educationFormState.editing);
                  setState("educationFormState", "editing", null);
                }}
              >
                {Icon.trash()} Delete
              </button>
              <button
                className="cancel-button"
                name="cancel-education"
                id="cancel-education"
                onClick={() => {
                  setState("educationFormState", "editing", null);
                  restoreState("educationInfo");
                }}
              >
                {Icon.close()} Cancel
              </button>
              <button
                className="finish-button"
                name="finish-education"
                id="finish-education"
                onClick={() => setState("educationFormState", "editing", null)}
              >
                {Icon.check()} Finish
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
  if (educationFormState.isCollapsed) {
    return (
      <>
        <div className="form-container">
          <div
            onClick={() => {
              setState(
                "educationFormState",
                "isCollapsed",
                !educationFormState.isCollapsed
              );
            }}
          >
            <h2> {Icon.education()} Education</h2>
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
                "educationFormState",
                "isCollapsed",
                !educationFormState.isCollapsed
              );
            }}
          >
            <h2> {Icon.education()} Education</h2>
          </div>
          {Object.keys(educationInfo).map((key) => {
            return (
              <EducationFormListing
                educationEntry={educationInfo[key]}
                educationInfo={educationInfo}
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
                storeState("educationInfo");
                let newEntryID = addStateEntry("educationInfo");
                setState("educationFormState", "editing", newEntryID);
              }}
            >
              + Education
            </button>
          </div>
        </div>
      </>
    );
  }
}

/*
EducationDataEntry:
schoolName,
degree,
startDate,
endDate,
location
*/

//delete, cancel and save buttons

export function EducationFormListing({
  educationEntry,
  educationFormState,
  entryID,
  setState,
  storeState,
}) {
  return (
    <>
      <div
        onClick={() => {
          storeState("educationInfo");
          setState("educationFormState", "editing", entryID);
        }}
      >
        <h3>{educationEntry.school}</h3>
      </div>
    </>
  );
}

export function EducationCVListing({ educationEntry }) {
  return (
    <>
      <div className="cv-listing">
        <div className="cv-listing-left">
          <p>{educationEntry.startDate + " - " + educationEntry.endDate}</p>
          <p>{educationEntry.location}</p>
        </div>
        <div className="cv-listing-right">
          <h3>{educationEntry.school}</h3>
          <p>{educationEntry.degree}</p>
        </div>
      </div>
    </>
  );
}
