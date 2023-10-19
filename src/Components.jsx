import { useRef } from "react";

//Side Bar
//  Personal Details Form
//  Education Tab
//    Education Listing
//      Education Editor
//  Experience Tab
//    Experience Listing
//      Experience Editor
//  Accent Color Picker
//Display Area
//  Personal Information Header
//  Education List
//    Education Entry
//  Experience List
//    Experience Entry

export function PersonalDetailsForm({
  personalInfo,
  personalInfoChanged,
  personalInfoReferences,
}) {
  return (
    <>
      <div className="form-container">
        <h1>Personal Details</h1>
        <form className="left-panel-form">
          <label>Full Name</label>
          <input
            ref={personalInfoReferences.fullNameRef}
            id="full-name"
            name="full-name"
            onChange={personalInfoChanged}
          />
          <label>Email</label>
          <input
            ref={personalInfoReferences.emailRef}
            id="email"
            name="email"
            onChange={personalInfoChanged}
          />
          <label>Phone Number</label>
          <input
            ref={personalInfoReferences.phoneNumberRef}
            id="phone-number"
            name="phone-number"
            onChange={personalInfoChanged}
          />
          <label>Address</label>
          <input
            ref={personalInfoReferences.addressRef}
            id="address"
            name="address"
            onChange={personalInfoChanged}
          />
        </form>
      </div>
    </>
  );
}

export function PersonalDetailsHeader({ personalInfo }) {
  let personalInfoString = "";
  let dashBeforeEntry = false;
  if (personalInfo.email != "") {
    personalInfoString += personalInfo.email;
    dashBeforeEntry = true;
  }
  if (personalInfo.phoneNumber != "") {
    if (dashBeforeEntry) {
      personalInfoString += " - ";
    }
    personalInfoString += personalInfo.phoneNumber;
    dashBeforeEntry = true;
  }
  if (personalInfo.address != "") {
    if (dashBeforeEntry) {
      personalInfoString += " - ";
    }
    personalInfoString += personalInfo.address;
    dashBeforeEntry = true;
  }
  if (personalInfoString === "" && personalInfo.fullName === "") {
    return <></>;
  }
  return (
    <>
      <div className="personal-details-header">
        <h1 style={{ textAlign: "center" }}>{personalInfo.fullName}</h1>
        <p style={{ textAlign: "center" }}>{personalInfoString}</p>
      </div>
    </>
  );
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

export function EducationForm({ educationInfo, educationFormState }) {
  //IF the education editor is open:
  //display the education editor
  //Elseif the tab is closed
  //display the closed tab
  //else
  //display the education listings in order, and then the close tab
  return (
    <>
      <div className="form-container"></div>
    </>
  );
}

export function EducationFormListing() {}

export function EducationCVListing() {}
