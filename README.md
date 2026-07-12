# Task 015 - Healthcare Performance App (React Router + useMemo + useCallback + React.memo)

## 📌 Project Overview

This project demonstrates multi-page navigation and performance optimization using:

- React
- React Router DOM
- React.lazy + Suspense (Code Splitting)
- useMemo
- useCallback
- React.memo

Users can:

- Navigate between Dashboard, Patients, and Doctors pages
- Search/filter a patient list in real time
- View patient counts without unnecessary recalculation
- See how memoization avoids wasted re-renders

---

# 📁 Folder Structure

```text
src
│
├── data
│   ├── patients.js
│   └── doctors.js
│
├── components
│   ├── Navbar.jsx
│   └── PatientCard.jsx
│
├── pages
│   ├── Dashboard.jsx
│   ├── Patients.jsx
│   └── Doctors.jsx
│
├── assets
│   ├── hero.png
│   ├── react.svg
│   └── vite.svg
│
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

---

# 🔥 Concepts Used

## 1. React Router (BrowserRouter, Routes, Route)

Enables client-side navigation between pages without a full page reload.

```js
<BrowserRouter>
  <Navbar />
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/patients" element={<Patients />} />
    <Route path="/doctors" element={<Doctors />} />
  </Routes>
</BrowserRouter>
```

Flow:

```text
User Clicks Link
      ↓
URL Changes (No Page Reload)
      ↓
Router Matches Path
      ↓
Matching Route's Component Renders
```

---

## 2. Link (Navigation without Reload)

```js
<Link to="/patients" className="btn btn-light me-2">
  Patients
</Link>
```

Unlike a normal `<a>` tag, `Link` updates the URL and swaps the rendered component without refreshing the browser.

---

## 3. Code Splitting — React.lazy + Suspense

`Patients` and `Doctors` are only downloaded when the user actually visits those routes:

```js
const Patients = lazy(() => import("./pages/Patients"));
const Doctors = lazy(() => import("./pages/Doctors"));

<Suspense fallback={<h4>Loading...</h4>}>
  <Routes>...</Routes>
</Suspense>
```

Flow:

```text
User Navigates to /patients
        ↓
Patients.jsx Chunk Not Yet Loaded
        ↓
Suspense Shows "Loading..." Fallback
        ↓
Chunk Downloads
        ↓
Patients Component Renders
```

`Dashboard` is **not** lazy-loaded, so it's available instantly on first page load.

---

## 4. useMemo() — Memoizing Expensive/Derived Values

Used in `Dashboard` to avoid recalculating counts on every render:

```js
const totalPatients = useMemo(() => patients.length, []);
const totalDoctors = useMemo(() => doctors.length, []);
```

Used in `Patients` to only re-filter the list when `search` actually changes:

```js
const filteredPatients = useMemo(() => {
  console.log("Filtering Patients");
  return patients.filter((patient) =>
    patient.name.toLowerCase().includes(search.toLowerCase())
  );
}, [search]);
```

Flow:

```text
Component Re-renders
        ↓
useMemo Checks Dependency Array
        ↓
Dependencies Unchanged → Return Cached Value (Skip Recalculation)
Dependencies Changed   → Recalculate Value
```

---

## 5. useCallback() — Memoizing Functions

Without `useCallback`, a new function is created on every render, which would cause `React.memo`-wrapped children to re-render unnecessarily.

```js
const handleSearch = useCallback((e) => {
  setSearch(e.target.value);
}, []);

const handleButtonClick = useCallback((name) => {
  alert(name);
}, []);
```

---

## 6. React.memo() — Preventing Unnecessary Child Re-renders

```js
function PatientCard({ patient, onView }) {
  console.log("Patient Card Rendered:", patient.name);
  ...
}

export default React.memo(PatientCard);
```

`React.memo` makes `PatientCard` only re-render when its own props (`patient`, `onView`) change — not simply because its parent (`Patients`) re-rendered.

Flow:

```text
Parent Re-renders
       ↓
React.memo Compares New Props vs Old Props
       ↓
Props Unchanged → Skip Re-render (Reuse Previous Output)
Props Changed   → Re-render Component
```

---

## 7. Controlled Search Input

```js
<input
  value={search}
  onChange={handleSearch}
  placeholder="Search Patient"
/>
```

---

# 🚀 Application Flow

When localhost loads:

```text
Browser
   ↓
main.jsx
   ↓
App.jsx Renders
   ↓
BrowserRouter + Navbar + Suspense + Routes
   ↓
Path "/" Matches → Dashboard Renders (eager-loaded)
```

---

# 🟢 Dashboard Flow

## Step 1

`Dashboard` mounts.

---

## Step 2

`useMemo` computes counts from static data files (only once, since dependency array is `[]`).

```js
totalPatients = 12
totalDoctors  = 5
```

---

## Step 3

UI displays two summary cards.

```text
Total Patients: 12
Total Doctors: 5
```

---

# 🔵 Navigate to Patients Page Flow

## Step 1

User clicks:

```text
Patients
```

link in `Navbar`.

---

## Step 2

URL changes to `/patients` — Router matches the route.

---

## Step 3

Since `Patients` is lazy-loaded and hasn't been visited yet, `Suspense` shows:

```text
Loading...
```

---

## Step 4

`Patients.jsx` chunk finishes downloading.

---

## Step 5

`Patients` component renders. `search` state starts as `""`.

---

## Step 6

`filteredPatients` (`useMemo`) computes the full patient list, since `search` is empty — logs `"Filtering Patients"` once.

---

## Step 7

Each patient renders as a memoized `PatientCard` — logs `"Patient Card Rendered: <name>"` once per card.

---

# 🟠 Search / Filter Flow

## Step 1

User types `"John"` into the search box.

---

## Step 2

`handleSearch` (memoized via `useCallback`) fires on each keystroke.

```js
setSearch(e.target.value);
```

---

## Step 3

`Patients` re-renders because `search` state changed.

---

## Step 4

`useMemo` detects that its dependency (`search`) changed, so it **recomputes** `filteredPatients` — logs `"Filtering Patients"` again.

```text
Before: 12 patients
After:  1 patient ("John Doe")
```

---

## Step 5

Only `PatientCard`s whose `patient` prop actually changed (i.e. the new filtered set) render. `React.memo` + `useCallback` together mean cards that already existed with the same props are **not** re-rendered.

---

# 🟣 View Patient Flow

## Step 1

User clicks:

```text
View
```

on a `PatientCard`.

---

## Step 2

`PatientCard` calls the memoized `onView(patient.name)` prop.

---

## Step 3

`handleButtonClick` (defined in `Patients`, memoized via `useCallback`) executes:

```js
alert(name);
```

---

## Step 4

Browser shows:

```text
John Doe
```

---

# 🟡 Navigate to Doctors Page Flow

## Step 1

User clicks:

```text
Doctors
```

link.

---

## Step 2

URL changes to `/doctors`; since this is the first visit, `Doctors.jsx` is lazily downloaded and `Suspense` briefly shows "Loading...".

---

## Step 3

`Doctors` renders, mapping over the static `doctors` array.

```text
Dr. Smith
Dr. David
Dr. Wilson
Dr. Anderson
Dr. Taylor
```

---

# 🔥 Why Doesn't Typing in Search Re-render Every PatientCard?

```text
User Types
     ↓
search State Updates
     ↓
Patients Re-renders
     ↓
useMemo Recomputes filteredPatients (search changed)
     ↓
handleButtonClick Reference Stays the Same (useCallback, [] deps)
     ↓
React.memo Compares Props of Each PatientCard
     ↓
Same patient + Same onView Reference → Skip Re-render
Changed patient (new filtered set) → Re-render Only Those
```

Without `useCallback`, `handleButtonClick` would be a **new function reference** on every render, breaking `React.memo`'s prop comparison and causing every card to re-render regardless of whether its data changed.

---

# 🎯 Key Interview Points

### What is React Router used for?

To enable client-side navigation between different "pages" (components) in a single-page application, without full browser reloads.

---

### What is Code Splitting?

Breaking the app's JavaScript bundle into smaller chunks that load on demand (e.g. per-route), so users don't download code for pages they haven't visited yet.

---

### What is the difference between useMemo and useCallback?

`useMemo` memoizes a **computed value** (like a filtered array); `useCallback` memoizes a **function reference**, so it isn't recreated on every render.

---

### What is React.memo?

A higher-order component that skips re-rendering a component if its props haven't changed compared to the previous render.

---

### Why combine useCallback with React.memo?

`React.memo` compares props by reference. If a function prop is recreated on every render (a new reference each time), `React.memo` will always see it as "changed" and re-render anyway — `useCallback` keeps that reference stable so memoization actually works.

---

# Final Flow

```text
BrowserRouter Matches URL to a Route
              ↓
Suspense Shows Fallback While Lazy Chunk Loads (if needed)
              ↓
Page Component Renders
              ↓
useMemo Computes/Caches Derived Data
              ↓
useCallback Keeps Function Props Stable
              ↓
React.memo Skips Re-rendering Unchanged Children
              ↓
UI Updates Efficiently
```