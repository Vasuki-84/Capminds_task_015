import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container">
        <span className="navbar-brand">
          Healthcare Performance App
        </span>

        <div>
          <Link to="/" className="btn btn-light me-2">
            Dashboard
          </Link>

          <Link to="/patients" className="btn btn-light me-2">
            Patients
          </Link>

          <Link to="/doctors" className="btn btn-light">
            Doctors
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;