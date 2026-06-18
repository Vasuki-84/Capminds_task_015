import React from "react";

function PatientCard({ patient, onView }) {
  console.log("Patient Card Rendered:", patient.name);

  return (
    <div className="card mb-2 shadow-sm">
      <div className="card-body d-flex justify-content-between align-items-center">
        <span>{patient.name}</span>

        <button
          className="btn btn-primary"
          onClick={() => onView(patient.name)}
        >
          View
        </button>
      </div>
    </div>
  );
}

export default React.memo(PatientCard);