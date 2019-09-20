import React from "react";

const DisplayError = ({ err }) => {
  return (
    <div className="error-display">
      <p className="uh-oh">UH OH!</p>
      <p>{err}</p>
    </div>
  );
};

export default DisplayError;
