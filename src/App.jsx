import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRegistration from "./UserRegistration";
import RegistrationConfirmation from "./RegistrationConfirmation";
import "./App.css";

const ApplicationRouter = () => {
  return (
    <Router>
      <div className="application-container">
        <Routes>
          <Route
            path="/"
            element={<UserRegistration />}
          />
          <Route
            path="/success"
            element={<RegistrationConfirmation />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default ApplicationRouter;