import doctors from "../data/doctors";

function Doctors() {
  console.log("Doctors Rendered");

  return (
    <div className="card shadow">
      <div className="card-header bg-primary text-white">
        Doctors List
      </div>

      <div className="card-body">
        <ul className="list-group">
          {doctors.map((doctor, index) => (
            <li key={index} className="list-group-item">
              {doctor}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Doctors;