import { useState, useRef } from "react";
import "./App.css";
import { PersonalDetailsForm, PersonalDetailsHeader } from "./Components.jsx";
import { EducationCVListing, EducationForm } from "./Education.jsx";
import { EmploymentCVListing, EmploymentForm } from "./Employment.jsx";
import { v4 as uuid } from "uuid";

let storedStates = {};

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
  const [employmentInfo, setEmploymentInfo] = useState({});
  const [employmentFormState, setEmploymentFormState] = useState({
    editing: null,
    isCollapsed: true,
  });

  let states = {
    personalInfo: { reference: personalInfo, setter: setPersonalInfo },
    educationInfo: {
      reference: educationInfo,
      setter: setEducationInfo,
      newEntry: {
        employer: "",
        position: "",
        startDate: "",
        endDate: "",
        location: "",
        description: "",
      },
    },
    educationFormState: {
      reference: educationFormState,
      setter: setEducationFormState,
    },
    employmentInfo: {
      reference: employmentInfo,
      setter: setEmploymentInfo,
      newEntry: {},
    },
    employmentFormState: {
      reference: employmentFormState,
      setter: setEmploymentFormState,
    },
  };

  function setState(stateName, field, value, id = null) {
    let state = states[stateName];
    let newInfo = { ...state.reference };
    if (id === null) {
      newInfo[field] = value;
    } else {
      newInfo[id][field] = value;
    }
    console.log(newInfo);
    state.setter(newInfo);
  }

  function addStateEntry(stateName, entry = null) {
    let state = states[stateName];
    let newInfo = { ...state.reference };
    let id = uuid();
    if (entry === null) {
      newInfo[id] = { ...state.newEntry };
    } else {
      newInfo[id] = entry;
    }
    console.log(newInfo);
    state.setter(newInfo);
    return id;
  }

  function removeStateEntry(stateName, id) {
    let state = states[stateName];
    let newInfo = { ...state.reference };
    delete newInfo[id];
    state.setter(newInfo);
  }

  function storeState(stateName) {
    storedStates[stateName] = { ...states[stateName].reference };
    console.log("storedState:", storedStates);
  }

  function restoreState(stateName) {
    let state = states[stateName];
    console.log(storedStates[stateName]);
    state.setter({ ...storedStates[stateName] });
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
            setState={setState}
            addStateEntry={addStateEntry}
            removeStateEntry={removeStateEntry}
            storeState={storeState}
            restoreState={restoreState}
          />
          <EmploymentForm
            employmentInfo={employmentInfo}
            employmentFormState={employmentFormState}
            setState={setState}
            addStateEntry={addStateEntry}
            removeStateEntry={removeStateEntry}
            storeState={storeState}
            restoreState={restoreState}
          />
        </div>
        <div className="white-page">
          <div className="right-panel-div">
            <PersonalDetailsHeader personalInfo={personalInfo} />
            <div style={{ padding: "16px" }}>
              {Object.keys(educationInfo).length > 0 && (
                <div className="cv-list-header">Education</div>
              )}
              {Object.keys(educationInfo).map((key) => {
                return (
                  <EducationCVListing
                    educationEntry={educationInfo[key]}
                    key={key}
                  />
                );
              })}

              {Object.keys(employmentInfo).length > 0 && (
                <div className="cv-list-header">Employment</div>
              )}
              {Object.keys(employmentInfo).map((key) => {
                return (
                  <EmploymentCVListing
                    employmentEntry={employmentInfo[key]}
                    key={key}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
