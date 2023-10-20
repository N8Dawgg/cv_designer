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
  const [educationInfo, setEducationInfo] = useState({});
  const [educationFormState, setEducationFormState] = useState({
    editing: null,
    isCollapsed: true,
  });

  let stateSetFunctions = {
    personalInfo: setPersonalInfo,
  };
  function setState(stateName, stateRef, id, field, value) {
    let newInfo = [...stateRef];
    newInfo[id][field] = value;
    console.log(newInfo);
    stateSetFunctions[stateName].call(newInfo);
  }

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
    let newEducationInfo = { ...educationInfo };
    let newEntryID = uuid();
    let newEducationEntry = {
      school: "Test",
      degree: "",
      startDate: "",
      endDate: "",
      location: "",
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
    setEducationInfo(newEducationInfo);
  }

  function deleteEduEntry() {}

  let storedEduInfo;
  function cancelEduEntry() {}

  function finishEduEntry() {}

  /* HIGHLY EXPERIMENTAL LOL
  let setFunctions = {
    educationInfo: setEducationInfo,
  };

  
  function changeInfoEntry(infoRef, id, field, value) {
    let newInfo = [...educationInfo];
    let entryIdx = newInfo.findIndex((entry) => entry.id === id);
    newInfo[entryIdx][field] = value;
    console.log(newInfo);
    setFunctions[infoRef].call(newInfo);
  }
  */

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
            deleteEduEntry={deleteEduEntry}
            cancelEduEntry={cancelEduEntry}
            finishEduEntry={finishEduEntry}
          />
        </div>
        <div className="white-page">
          <div className="right-panel-div">
            <PersonalDetailsHeader personalInfo={personalInfo} />
            {educationInfo.map((educationEntry) => {
              return (
                <EducationCVListing
                  educationEntry={educationEntry}
                  key={educationEntry.id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
