# Healthcare Performance App – Routing, Memoization & Code Splitting (task_015)

A React + Vite multi-page application that demonstrates **client-side routing**, **lazy loading**, and **performance optimization** techniques (`useMemo`, `useCallback`, `React.memo`) using a Patients/Doctors dashboard.

---

## Concepts Used

- **React Router (`react-router-dom`)** – `BrowserRouter`, `Routes`, and `Route` define three pages: `/` (Dashboard), `/patients` (Patients), and `/doctors` (Doctors). `Link` components in the `Navbar` provide client-side navigation without full page reloads.
- **Code Splitting with `React.lazy` + `Suspense`** – `Patients` and `Doctors` pages are loaded lazily (`lazy(() => import(...))`), so their code is only downloaded when the user navigates to that route. A `Suspense` fallback shows a "Loading..." message while the chunk loads.
- **`useMemo` Hook** – Used in `Dashboard` to memoize `totalPatients`/`totalDoctors` counts, and in `Patients` to memoize the filtered patient list so filtering only re-runs when `search` changes.
- **`useCallback` Hook** – Used in `Patients` to memoize `handleSearch` and `handleButtonClick`, preventing these functions from being recreated on every render (which matters for `React.memo`-wrapped children).
- **`React.memo`** – `PatientCard` is wrapped in `React.memo` so it only re-renders when its own props (`patient`, `onView`) actually change, not whenever the parent `Patients` page re-renders.
- **Controlled Search Input** – The patient search box is a controlled input filtering the static patient list in real time.
- **Static Local Data** – `data/patients.js` and `data/doctors.js` provide hardcoded arrays used across pages instead of an API.
- **Component Composition & Props** – `PatientCard` receives `patient` and an `onView` callback from the `Patients` page.

---

## Application Flow

1. **App Bootstrap & Routing Setup**
   - `App.jsx` wraps everything in `BrowserRouter` and renders a persistent `Navbar` plus a `Suspense`-wrapped `Routes` block with three routes: Dashboard, Patients, Doctors.

2. **Dashboard (`/`)**
   - Loaded eagerly (not lazy). Uses `useMemo` to compute `totalPatients` and `totalDoctors` from the static data files and displays them as summary cards.

3. **Navigating to Patients (`/patients`)**
   - Clicking the **Patients** link triggers React Router to swap the route; since `Patients` is lazy-loaded, `Suspense` briefly shows "Loading..." while its chunk downloads (only on first visit).
   - The `Patients` page renders a search input (`search` state) and a memoized, filtered list of patients (`filteredPatients`, recomputed via `useMemo` only when `search` changes).
   - Each patient renders as a `PatientCard` (wrapped in `React.memo`), receiving the memoized `handleButtonClick` (`useCallback`) as the `onView` prop — clicking **View** triggers an `alert` with the patient's name.
   - Typing in the search box updates `search` state via the memoized `handleSearch` callback, which re-filters the list without needlessly re-rendering `PatientCard` instances whose own props haven't changed.

4. **Navigating to Doctors (`/doctors`)**
   - Also lazy-loaded on first visit. Simply maps over the static `doctors` array and renders each name in a list.

---

## Folder Structure

```
Capminds_task_015/
├── index.html                        # HTML entry point, mounts the React app
├── package.json                      # Project metadata, scripts, dependencies
├── vite.config.js                    # Vite build/dev server configuration
├── eslint.config.js                  # ESLint rules for code quality
├── README.md                         # Project documentation (this file)
├── public/
│   ├── favicon.svg                    # App favicon
│   └── icons.svg                      # Shared icon sprite
└── src/
    ├── main.jsx                       # App bootstrap, renders <App />
    ├── App.jsx                        # Root component: routing setup (BrowserRouter, Routes, Suspense)
    ├── App.css                        # Layout/page styles
    ├── index.css                      # Base/reset styles
    ├── assets/                        # Static images (hero.png, react.svg, vite.svg)
    ├── data/
    │   ├── patients.js                 # Static list of patient objects ({ id, name })
    │   └── doctors.js                  # Static list of doctor names
    ├── components/
    │   ├── Navbar.jsx                   # Route links (Dashboard / Patients / Doctors)
    │   └── PatientCard.jsx               # Memoized card showing a patient + "View" button
    └── pages/
        ├── Dashboard.jsx                 # "/" — summary counts via useMemo
        ├── Patients.jsx                  # "/patients" — search + filtered, memoized patient list (lazy-loaded)
        └── Doctors.jsx                   # "/doctors" — static doctor list (lazy-loaded)
```

---

## Tech Stack

- **React 19** – UI library
- **React Router DOM 7** – Client-side routing
- **Vite** – Development server and build tool
- **Bootstrap 5** – UI styling
- **ESLint** – Linting and code quality

---

## Getting Started

```bash
npm install       # Install dependencies
npm run dev        # Start development server
npm run build       # Build for production
npm run preview      # Preview production build
npm run lint          # Run lint checks
```