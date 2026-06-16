import React from "react";

function PatientCard({ patient }) {
  console.log("Patient Card Rendered:", patient.name);

  return (
    <div className="card mb-2 shadow-sm">
      <div className="card-body">
        {patient.name}
      </div>
    </div>
  );
}

export default React.memo(PatientCard);