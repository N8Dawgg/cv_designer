import { useState, useRef } from "react";
import "./App.css";
import { PersonalDetailsForm, PersonalDetailsHeader } from "./Components.jsx";
import { EducationCVListing, EducationForm } from "./Education.jsx";
import { v4 as uuid } from "uuid";

function App() {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "Name",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const [educationInfo, setEducationInfo] = useState([]);
  const [educationFormState, setEducationFormState] = useState({
    editing: null,
    isCollapsed: true,
  });

  let personalDetailsReferences = {
    fullNameRef: useRef(),
    emailRef: useRef(),
    phoneNumberRef: useRef(),
    addressRef: useRef(),
  };

  function updatePersonalInfo() {
    let newPersonalInfo = { ...personalInfo };
    newPersonalInfo.fullName =
      personalDetailsReferences.fullNameRef.current.value;
    newPersonalInfo.email = personalDetailsReferences.emailRef.current.value;
    newPersonalInfo.phoneNumber =
      personalDetailsReferences.phoneNumberRef.current.value;
    newPersonalInfo.address =
      personalDetailsReferences.addressRef.current.value;
    setPersonalInfo(newPersonalInfo);
  }

  function toggleEduFormCollapse() {
    let newEducationFormState = { ...educationFormState };
    newEducationFormState.isCollapsed = !newEducationFormState.isCollapsed;
    setEducationFormState(newEducationFormState);
  }

  function newEduEntry() {
    let newEducationInfo = [...educationInfo];
    let newEducationEntry = {
      school: "Test",
      degree: "",
      startDate: "",
      endDate: "",
      location: "",
      id: uuid(),
    };
    newEducationInfo.push(newEducationEntry);
    setEducationInfo(newEducationInfo);
    let newEducationFormState = { ...educationFormState };
    newEducationFormState.editing = newEducationEntry.id;
    setEducationFormState(newEducationFormState);
  }

  function editEduEntry() {}

  function changeEduInfoEntry(id, field, value) {
    let newEducationInfo = [...educationInfo];
    let eduEntryIdx = newEducationInfo.findIndex((entry) => entry.id === id);
    newEducationInfo[eduEntryIdx][field] = value;
    console.log(newEducationInfo);
    setEducationInfo(newEducationInfo);
  }

  const setFunctions = {
    educationInfo: setEducationInfo,
  };

  function changeInfoEntry(infoRef, id, field, value) {
    let newInfo = [...educationInfo];
    let entryIdx = newInfo.findIndex((entry) => entry.id === id);
    newInfo[entryIdx][field] = value;
    console.log(newInfo);
    setFunctions[infoRef](newInfo);
  }

  return (
    <>
      <div className="page-splitter">
        <div className="left-panel-div">
          <PersonalDetailsForm
            personalInfo={personalInfo}
            personalInfoChanged={updatePersonalInfo}
            personalInfoReferences={personalDetailsReferences}
          />
          <EducationForm
            educationInfo={educationInfo}
            educationFormState={educationFormState}
            toggleEduFormCollapse={toggleEduFormCollapse}
            changeEduInfoEntry={changeEduInfoEntry}
            newEduEntry={newEduEntry}
            editEduEntry={editEduEntry}
          />
        </div>
        <div className="right-panel-div">
          <PersonalDetailsHeader personalInfo={personalInfo} />
          {educationInfo.map((educationEntry) => {
            return <EducationCVListing educationEntry={educationEntry} />;
          })}
        </div>
      </div>
    </>
  );
}

export default App;
