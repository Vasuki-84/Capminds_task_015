function PatientCard({ patient, onDelete }) {

  console.log("Patient Card Rendered:", patient.name);

  return (
    <div className="card mb-2 shadow-sm">
      <div className="card-body">
        {patient.name}

        <button onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default PatientCard;