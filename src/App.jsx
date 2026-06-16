import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";

const Patients = lazy(() => import("./pages/Patients"));
const Doctors = lazy(() => import("./pages/Doctors"));

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="container mt-4">
        <Suspense
          fallback={
            <div className="text-center">
              <h4>Loading...</h4>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/doctors" element={<Doctors />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;