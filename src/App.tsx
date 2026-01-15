import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import Activities from "./pages/ActivitiesClean";
import Nutrition from "./pages/Nutrition";
import Stats from "./pages/Stats";
import Layout from "./components/Layout";

// App shell — mobile-first, dark theme with green primary accents
export default function App() {
  return (
    <Layout>
      <Routes>
        {/* Root mặc định hiển thị tab Vận động */}
        <Route path="/" element={<Activities />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/workout" element={<Workouts />} />
        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/stats" element={<Stats />} />
        {/* cũ fallback */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Layout>
  );
}
