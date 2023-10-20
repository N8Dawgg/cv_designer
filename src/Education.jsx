import { v4 as uuid } from "uuid";

export function EducationForm({
  educationInfo,
  educationFormState,
  toggleEduFormCollapse,
  setState,
  changeEduInfoEntry,
  editEduEntry,
  newEduEntry,
  deleteEduEntry,
  cancelEduEntry,
  finishEduEntry,
}) {
  if (educationFormState.editing != null) {
    return (
      <>
        <div className="form-container">
          <div>
            <h2>Education</h2>
          </div>
          <div className="left-panel-form">
            <label>School</label>
            <input
              id="school"
              name="school"
              onChange={(e) =>
                setState(
                  "educationInfo",
                  educationInfo,
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
                  educationInfo,
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
                  educationInfo,
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
                  educationInfo,
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
                  educationInfo,
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
                onClick={deleteEduEntry}
              >
                Delete
              </button>
              <button
                className="cancel-button"
                name="cancel-education"
                id="cancel-education"
                onClick={cancelEduEntry}
              >
                Cancel
              </button>
              <button
                className="finish-button"
                name="finsih-education"
                id="finish-education"
                onClick={() =>
                  setState(
                    "educationFormState",
                    educationFormState,
                    "editing",
                    null
                  )
                }
              >
                Finish
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
                educationFormState,
                "isCollapsed",
                !educationFormState.isCollapsed
              );
            }}
          >
            <h2>Education</h2>
          </div>
        </div>
      </>
    );
  } else {
    let content;
    return (
      <>
        <div className="form-container">
          <div
            onClick={() => {
              setState(
                "educationFormState",
                educationFormState,
                "isCollapsed",
                !educationFormState.isCollapsed
              );
            }}
          >
            <h2>Education</h2>
          </div>
          {Object.keys(educationInfo).map((key) => {
            return (
              <EducationFormListing
                educationEntry={educationInfo[key]}
                educationInfo={educationInfo}
                entryID={key}
                setState={setState}
                key={key}
              />
            );
          })}
          <div className="form-bottom">
            <button className="add-entry-button" onClick={newEduEntry}>
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
}) {
  return (
    <>
      <div
        onClick={() =>
          setState("educationFormState", educationFormState, "editing", entryID)
        }
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
