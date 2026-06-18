import { useState, useMemo, useCallback } from "react";
import patients from "../data/patients";
import PatientCard from "../components/PatientCard";

function Patients() {
  console.log("Patients Rendered");

  const [search, setSearch] = useState("");

  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);
 
  const handleButtonClick = useCallback(() => {
    alert("useCallback Example");
  }, []);

  const filteredPatients = useMemo(() => {
    console.log("Filtering Patients");

    return patients.filter((patient) =>
      patient.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <>
      <div className="card shadow mb-4">
        <div className="card-header bg-success text-white">
          Patient Search
        </div>

        <div className="card-body">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search Patient"
            value={search}
            onChange={handleSearch}
          />

          <button
            className="btn btn-primary mb-3"
            onClick={handleButtonClick}
          >
            Test useCallback
          </button>
        </div>
      </div>

      {filteredPatients.map((patient) => (
        <PatientCard
          key={patient.id}
          patient={patient}
            onDelete={handleButtonClick}

        />
      ))}
    </>
  );
}

export default Patients;