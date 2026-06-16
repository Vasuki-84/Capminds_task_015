import { useMemo } from "react";
import patients from "../data/patients";
import doctors from "../data/doctors";

function Dashboard() {
  console.log("Dashboard Rendered");

  const totalPatients = useMemo(() => {
    return patients.length;
  }, []);

  const totalDoctors = useMemo(() => {
    return doctors.length;
  }, []);

  return (
    <div className="row">
      <div className="col-md-6">
        <div className="card bg-success text-white shadow">
          <div className="card-body">
            <h4>Total Patients</h4>
            <h2>{totalPatients}</h2>
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <div className="card bg-info text-white shadow">
          <div className="card-body">
            <h4>Total Doctors</h4>
            <h2>{totalDoctors}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;