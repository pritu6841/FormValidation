import { useLocation } from "react-router-dom";

const RegistrationConfirmation = () => {
  const { state } = useLocation();
  const userDetails = state || {};

  // Helper function to get full country name
  const getNationLabel = (code) => {
    const nationMap = {
      IN: "India",
      US: "United States of America",
      GB: "United Kingdom",
      CA: "Canada",
      AU: "Australia",
    };
    return nationMap[code] || code;
  };

  return (
    <div className="confirmation-wrapper">
      <h2>Account Created Successfully!</h2>
      <div className="user-details-section">
        <h3>Your Registration Information:</h3>
        
        <div className="detail-item">
          <span className="detail-label">Given Name:</span>
          <span className="detail-value">{userDetails.givenName}</span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">Family Name:</span>
          <span className="detail-value">{userDetails.familyName}</span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">Login ID:</span>
          <span className="detail-value">{userDetails.loginId}</span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">Email Address:</span>
          <span className="detail-value">{userDetails.emailAddress}</span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">Contact Information:</span>
          <span className="detail-value">
            {userDetails.dialCode} {userDetails.contactNumber}
          </span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">Location:</span>
          <span className="detail-value">
            {getNationLabel(userDetails.nation)}, {userDetails.town}
          </span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">Tax Identification:</span>
          <span className="detail-value">{userDetails.taxId}</span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">Unique ID Number:</span>
          <span className="detail-value">{userDetails.uidNumber}</span>
        </div>
      </div>
    </div>
  );
};

export default RegistrationConfirmation;