import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserRegistration = () => {
  const redirect = useNavigate();

  // State for user information
  const [userInfo, setUserInfo] = useState({
    givenName: "",
    familyName: "",
    loginId: "",
    emailAddress: "",
    secretCode: "",
    dialCode: "+91",
    contactNumber: "",
    nation: "",
    town: "",
    taxId: "",
    uidNumber: "",
  });

  // Validation and UI states
  const [validationErrors, setValidationErrors] = useState({});
  const [revealSecretCode, setRevealSecretCode] = useState(false);
  const [interactedFields, setInteractedFields] = useState({});

  // Location data
  const nations = [
    { id: "IN", label: "India" },
    { id: "US", label: "United States" },
    { id: "GB", label: "United Kingdom" },
    { id: "CA", label: "Canada" },
    { id: "AU", label: "Australia" },
  ];

  const townsData = {
    IN: ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai"],
    US: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"],
    GB: ["London", "Manchester", "Birmingham", "Liverpool", "Edinburgh"],
    CA: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
    AU: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
  };

  // Handle user input
  const processInput = (event) => {
    const { name, value } = event.target;
    const processedValue = name === "loginId" ? value.toLowerCase() : value;

    setUserInfo({
      ...userInfo,
      [name]: processedValue,
    });

    setInteractedFields({
      ...interactedFields,
      [name]: true,
    });
  };

  // Handle field blur
  const handleFieldBlur = (event) => {
    const { name } = event.target;
    setInteractedFields({
      ...interactedFields,
      [name]: true,
    });
    checkFieldValidity(name, userInfo[name]);
  };

  // Validate individual field
  const checkFieldValidity = (field, value) => {
    let errorMsg = "";

    const validationRules = {
      givenName: () => {
        if (!value.trim()) return "Given name is required";
        if (value.length < 2) return "Minimum 2 characters required";
        return "";
      },
      familyName: () => {
        if (!value.trim()) return "Family name is required";
        if (value.length < 2) return "Minimum 2 characters required";
        return "";
      },
      loginId: () => {
        if (!value.trim()) return "Login ID is required";
        if (!/^[a-z0-9_]+$/.test(value))
          return "Only lowercase, numbers and underscore allowed";
        if (value.length < 4) return "Minimum 4 characters required";
        return "";
      },
      emailAddress: () => {
        if (!value.trim()) return "Email is required";
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
          return "Valid email format required";
        return "";
      },
      secretCode: () => {
        if (!value) return "Secret code is required";
        if (value.length < 8) return "Minimum 8 characters required";
        if (!/(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/.test(value))
          return "Must include letters, numbers, and special characters";
        return "";
      },
      contactNumber: () => {
        if (!value.trim()) return "Contact number is required";
        if (!/^\d{10}$/.test(value)) return "10 digits required";
        return "";
      },
      nation: () => {
        if (!value) return "Country selection required";
        return "";
      },
      town: () => {
        if (!value) return "Town selection required";
        return "";
      },
      taxId: () => {
        if (!value.trim()) return "Tax ID is required";
        if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value))
          return "Invalid tax ID format";
        return "";
      },
      uidNumber: () => {
        if (!value.trim()) return "UID is required";
        if (!/^\d{12}$/.test(value)) return "12 digits required";
        return "";
      },
    };

    if (validationRules[field]) {
      errorMsg = validationRules[field]();
    }

    setValidationErrors({
      ...validationErrors,
      [field]: errorMsg,
    });
  };

  // Check overall form validity
  const isSubmissionReady = () => {
    return (
      userInfo.givenName.trim() &&
      userInfo.givenName.length >= 2 &&
      userInfo.familyName.trim() &&
      userInfo.familyName.length >= 2 &&
      userInfo.loginId.trim() &&
      /^[a-z0-9_]+$/.test(userInfo.loginId) &&
      userInfo.loginId.length >= 4 &&
      userInfo.emailAddress.trim() &&
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        userInfo.emailAddress
      ) &&
      userInfo.secretCode &&
      userInfo.secretCode.length >= 8 &&
      /(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/.test(userInfo.secretCode) &&
      userInfo.contactNumber.trim() &&
      /^\d{10}$/.test(userInfo.contactNumber) &&
      userInfo.nation &&
      userInfo.town &&
      userInfo.taxId.trim() &&
      /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(userInfo.taxId) &&
      userInfo.uidNumber.trim() &&
      /^\d{12}$/.test(userInfo.uidNumber)
    );
  };

  // Handle form submission
  const submitForm = (event) => {
    event.preventDefault();

    const allFieldsTouched = {};
    Object.keys(userInfo).forEach((field) => {
      allFieldsTouched[field] = true;
    });
    setInteractedFields(allFieldsTouched);

    if (isSubmissionReady()) {
      redirect("/success", { state: userInfo });
    }
  };

  // Validate fields when they change
  useEffect(() => {
    Object.keys(interactedFields).forEach((field) => {
      if (interactedFields[field]) {
        checkFieldValidity(field, userInfo[field]);
      }
    });
  }, [userInfo, interactedFields]);

  return (
    <div className="registration-wrapper">
      <h2>Create New Account</h2>
      <form onSubmit={submitForm}>
        {/* Personal Information Section */}
        <div className="input-section">
          <label>First Name*</label>
          <input
            type="text"
            name="givenName"
            value={userInfo.givenName}
            onChange={processInput}
            onBlur={handleFieldBlur}
            className={validationErrors.givenName ? "invalid" : ""}
          />
          {interactedFields.givenName && validationErrors.givenName && (
            <span className="validation-error">
              {validationErrors.givenName}
            </span>
          )}
        </div>

        <div className="input-section">
          <label>Last Name*</label>
          <input
            type="text"
            name="familyName"
            value={userInfo.familyName}
            onChange={processInput}
            onBlur={handleFieldBlur}
            className={validationErrors.familyName ? "invalid" : ""}
          />
          {interactedFields.familyName && validationErrors.familyName && (
            <span className="validation-error">
              {validationErrors.familyName}
            </span>
          )}
        </div>

        <div className="input-section">
          <label>Username*</label>
          <input
            type="text"
            name="loginId"
            value={userInfo.loginId}
            onChange={processInput}
            onBlur={handleFieldBlur}
            className={validationErrors.loginId ? "invalid" : ""}
          />
          {interactedFields.loginId && validationErrors.loginId && (
            <span className="validation-error">{validationErrors.loginId}</span>
          )}
        </div>

        <div className="input-section">
          <label>Email*</label>
          <input
            type="email"
            name="emailAddress"
            value={userInfo.emailAddress}
            onChange={processInput}
            onBlur={handleFieldBlur}
            className={validationErrors.emailAddress ? "invalid" : ""}
            placeholder="example@domain.com"
          />
          {interactedFields.emailAddress && validationErrors.emailAddress && (
            <span className="validation-error">
              {validationErrors.emailAddress}
            </span>
          )}
        </div>

        {/* Security Section */}
        <div className="input-section">
          <label>Password*</label>
          <div className="password-wrapper">
            <input
              type={revealSecretCode ? "text" : "password"}
              name="secretCode"
              value={userInfo.secretCode}
              onChange={processInput}
              onBlur={handleFieldBlur}
              className={validationErrors.secretCode ? "invalid" : ""}
              placeholder="Minimum 8 characters with mix of letters, numbers, symbols"
            />
            <button
              type="button"
              className="toggle-visibility"
              onClick={() => setRevealSecretCode(!revealSecretCode)}
            >
              {revealSecretCode ? "Hide" : "Show"}
            </button>
          </div>
          {interactedFields.secretCode && validationErrors.secretCode && (
            <span className="validation-error">
              {validationErrors.secretCode}
            </span>
          )}
        </div>

        {/* Contact Information */}
        <div className="input-section">
          <label>Mobile Number*</label>
          <div className="phone-wrapper">
            <select
              name="dialCode"
              value={userInfo.dialCode}
              onChange={processInput}
            >
              <option value="+91">+91 (India)</option>
              <option value="+1">+1 (USA)</option>
              <option value="+44">+44 (UK)</option>
              <option value="+1">+1 (Canada)</option>
              <option value="+61">+61 (Australia)</option>
            </select>
            <input
              type="text"
              name="contactNumber"
              value={userInfo.contactNumber}
              onChange={processInput}
              onBlur={handleFieldBlur}
              placeholder="10 digit number"
              className={validationErrors.contactNumber ? "invalid" : ""}
            />
          </div>
          {interactedFields.contactNumber && validationErrors.contactNumber && (
            <span className="validation-error">
              {validationErrors.contactNumber}
            </span>
          )}
        </div>

        {/* Location Information */}
        <div className="input-section">
          <label>Country*</label>
          <select
            name="nation"
            value={userInfo.nation}
            onChange={(e) => {
              processInput(e);
              setUserInfo({ ...userInfo, nation: e.target.value, town: "" });
            }}
            onBlur={handleFieldBlur}
            className={validationErrors.nation ? "invalid" : ""}
          >
            <option value="">-- Select Country --</option>
            {nations.map((country) => (
              <option key={country.id} value={country.id}>
                {country.label}
              </option>
            ))}
          </select>
          {interactedFields.nation && validationErrors.nation && (
            <span className="validation-error">{validationErrors.nation}</span>
          )}
        </div>

        <div className="input-section">
          <label>City*</label>
          <select
            name="town"
            value={userInfo.town}
            onChange={processInput}
            onBlur={handleFieldBlur}
            disabled={!userInfo.nation}
            className={validationErrors.town ? "invalid" : ""}
          >
            <option value="">-- Select City --</option>
            {userInfo.nation &&
              townsData[userInfo.nation]?.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>
          {interactedFields.town && validationErrors.town && (
            <span className="validation-error">{validationErrors.town}</span>
          )}
        </div>

        {/* Identification Section */}
        <div className="input-section">
          <label>PAN Number*</label>
          <input
            type="text"
            name="taxId"
            value={userInfo.taxId}
            onChange={processInput}
            onBlur={handleFieldBlur}
            placeholder="Format: ABCDE1234F"
            className={validationErrors.taxId ? "invalid" : ""}
          />
          {interactedFields.taxId && validationErrors.taxId && (
            <span className="validation-error">{validationErrors.taxId}</span>
          )}
        </div>

        <div className="input-section">
          <label>Aadhar Number*</label>
          <input
            type="text"
            name="uidNumber"
            value={userInfo.uidNumber}
            onChange={processInput}
            onBlur={handleFieldBlur}
            placeholder="12 digit number"
            className={validationErrors.uidNumber ? "invalid" : ""}
          />
          {interactedFields.uidNumber && validationErrors.uidNumber && (
            <span className="validation-error">{validationErrors.uidNumber}</span>
          )}
        </div>

        {/* Submission Section */}
        <div className="action-section">
          <button
            type="submit"
            className="primary-button"
            disabled={!isSubmissionReady()}
          >
            Register Now
          </button>
          {!isSubmissionReady() && (
            <span className="helper-text">
              Please complete all required fields correctly
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserRegistration;