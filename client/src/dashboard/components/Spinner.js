import React from "react";
const loading = {
  height: "90vh",
};
function Spinner() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={loading}
    >
      <div className="d-flex align-items-center">
        <div
          className="spinner-border ms-auto"
          role="status"
          aria-hidden="true"
        ></div>
      </div>
    </div>
  );
}

export default Spinner;
