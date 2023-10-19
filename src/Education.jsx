import { v4 as uuid } from "uuid";

export function EducationForm({
  educationInfo,
  educationFormState,
  toggleEduFormCollapse,
  changeEduInfoEntry,
  editEduEntry,
  newEduEntry,
}) {
  //IF the education editor is open:
  //display the education editor
  //Elseif the tab is closed
  //display the closed tab
  //else
  //display the education listings in order, and then the close tab

  if (educationFormState.editing != null) {
    return (
      <>
        <div className="form-container">
          <div>
            <h2>Education</h2>
          </div>
          <form className="left-panel-form">
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
          </form>
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
            <EducationFormListing educationEntry={educationEntry} />;
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
        <h3>{educationEntry.school}</h3>
        <p>{educationEntry.degree}</p>
      </div>
    </>
  );
}
