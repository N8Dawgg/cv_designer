import { useState, useRef } from "react";
import "./App.css";
import { PersonalDetailsForm, PersonalDetailsHeader } from "./Components.jsx";
import { EducationForm } from "./Education.jsx";

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
          />
        </div>
        <div className="right-panel-div">
          <PersonalDetailsHeader personalInfo={personalInfo} />
        </div>
      </div>
    </>
  );
}

export default App;
