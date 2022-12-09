import React from "react";
const loading = {
  height: "100vh",
};
function Loading({ name }) {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={loading}
    >
      <div className="d-flex align-items-center">
        <h1>{name || ""}</h1>
        <div
          className="spinner-border ms-auto"
          role="status"
          aria-hidden="true"
        ></div>
      </div>
    </div>
  );
}

export default Loading;
