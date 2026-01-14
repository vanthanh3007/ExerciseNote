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
              to="/activities"
              className={`text-sm ${
                loc.pathname === "/activities" || loc.pathname === "/"
                  ? "text-primary"
                  : "text-slate-400"
              }`}
            >
              Vận động
            </Link>
            <Link
              to="/workout"
              className={`text-sm ${
                loc.pathname === "/workout" || loc.pathname === "/workouts"
                  ? "text-primary"
                  : "text-slate-400"
              }`}
            >
              Tập Gym
            </Link>
            <Link
              to="/nutrition"
              className={`text-sm ${
                loc.pathname === "/nutrition"
                  ? "text-primary"
                  : "text-slate-400"
              }`}
            >
              Ăn uống
            </Link>
            <Link
              to="/stats"
              className={`text-sm ${
                loc.pathname === "/stats" ? "text-primary" : "text-slate-400"
              }`}
            >
              Thống kê
            </Link>
          </nav>
        </div>
      </header>

      <main className="container py-6 flex-1">{children}</main>

      {/* mobile bottom nav */}
      <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[92%] sm:hidden bg-slate-900/60 backdrop-blur rounded-xl px-4 py-3 flex items-center justify-between">
        <Link to="/activities">
          <NavIcon
            icon={<Home className="w-full h-full stroke-current" />}
            label="Vận động"
          />
        </Link>
        <Link to="/workout">
          <NavIcon
            icon={<List className="w-full h-full stroke-current" />}
            label="Tập Gym"
          />
        </Link>
        <Link to="/nutrition">
          <NavIcon
            icon={<PlusCircle className="w-full h-full stroke-current" />}
            label="Ăn uống"
          />
        </Link>
        <Link to="/stats">
          <NavIcon
            icon={<MoreHorizontal className="w-full h-full stroke-current" />}
            label="Thống kê"
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
