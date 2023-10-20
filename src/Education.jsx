import { v4 as uuid } from "uuid";

export function EducationForm({
  educationInfo,
  educationFormState,
  toggleEduFormCollapse,
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
                changeEduInfoEntry(
                  educationFormState.editing,
                  "school",
                  e.target.value
                )
              }
            />
            <label>Degree</label>
            <input
              id="degree"
              name="degree"
              onChange={(e) =>
                changeEduInfoEntry(
                  educationFormState.editing,
                  "degree",
                  e.target.value
                )
              }
            />
            <label>Location</label>
            <input
              id="location"
              name="location"
              onChange={(e) =>
                changeEduInfoEntry(
                  educationFormState.editing,
                  "location",
                  e.target.value
                )
              }
            />
            <label>Start Date</label>
            <input
              id="startDate"
              name="startDate"
              onChange={(e) =>
                changeEduInfoEntry(
                  educationFormState.editing,
                  "startDate",
                  e.target.value
                )
              }
            />
            <label>End Date</label>
            <input
              id="endDate"
              name="endDate"
              onChange={(e) =>
                changeEduInfoEntry(
                  educationFormState.editing,
                  "endDate",
                  e.target.value
                )
              }
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
                onClick={finishEduEntry}
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
          <div onClick={toggleEduFormCollapse}>
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
          <div onClick={toggleEduFormCollapse}>
            <h2>Education</h2>
          </div>
          {educationInfo.map((educationEntry) => {
            <EducationFormListing
              educationEntry={educationEntry}
              key={educationEntry.id}
            />;
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

export function EducationFormListing({ educationEntry }) {
  return (
    <>
      <div onClick={() => editEduEntry(educationEntry.id)}>
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
