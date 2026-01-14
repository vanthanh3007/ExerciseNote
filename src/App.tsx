import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import Layout from "./components/Layout";

// App shell — mobile-first, dark theme with green primary accents
export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </Layout>
  );
}
