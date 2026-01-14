import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, List, PlusCircle, MoreHorizontal } from "lucide-react";

const NavIcon = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex flex-col items-center text-xs">
    <div className="w-6 h-6 text-primary">{icon}</div>
    <div className="mt-1 text-slate-300">{label}</div>
  </div>
);

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const loc = useLocation();

  return (
    <div className="min-h-screen bg-black text-slate-100 flex flex-col">
      <header className="border-b border-slate-800">
        <div className="container flex items-center justify-between h-14">
          <Link to="/" className="text-lg font-semibold text-primary">
            Workout Log
          </Link>
          <nav className="hidden sm:flex items-center space-x-4">
            <Link
              to="/"
              className={`text-sm ${
                loc.pathname === "/" ? "text-primary" : "text-slate-400"
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/workouts"
              className={`text-sm ${
                loc.pathname === "/workouts" ? "text-primary" : "text-slate-400"
              }`}
            >
              Workouts
            </Link>
          </nav>
        </div>
      </header>

      <main className="container py-6 flex-1">{children}</main>

      {/* mobile bottom nav */}
      <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[92%] sm:hidden bg-slate-900/60 backdrop-blur rounded-xl px-4 py-3 flex items-center justify-between">
        <Link to="/">
          <NavIcon
            icon={<Home className="w-full h-full stroke-current" />}
            label="Home"
          />
        </Link>
        <Link to="/workouts">
          <NavIcon
            icon={<List className="w-full h-full stroke-current" />}
            label="Workouts"
          />
        </Link>
        <Link to="/workouts" className="-mt-3">
          <div className="bg-primary p-3 rounded-full shadow-lg">
            <PlusCircle className="w-5 h-5 text-white" />
          </div>
        </Link>
        <Link to="#">
          <NavIcon
            icon={<MoreHorizontal className="w-full h-full stroke-current" />}
            label="More"
          />
        </Link>
      </nav>

      <footer className="hidden sm:block text-center text-sm text-slate-500 py-4">
        Built with ❤️ — Workout Log
      </footer>
    </div>
  );
};

export default Layout;
