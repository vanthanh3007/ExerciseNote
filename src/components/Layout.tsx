import React from "react";
import { Link } from "react-router-dom";

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-white shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="text-lg font-semibold">
            Workout Log
          </Link>
          <nav className="space-x-4">
            <Link
              to="/"
              className="text-sm text-slate-600 hover:text-slate-900"
            >
              Dashboard
            </Link>
            <Link
              to="/workouts"
              className="text-sm text-slate-600 hover:text-slate-900"
            >
              Workouts
            </Link>
          </nav>
        </div>
      </header>
      <main className="container py-8">{children}</main>
      <footer className="text-center text-sm text-slate-500 py-6">
        Built with ❤️ — Workout Log
      </footer>
    </div>
  );
};

export default Layout;
