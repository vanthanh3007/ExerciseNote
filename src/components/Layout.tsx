import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, List, PlusCircle, MoreHorizontal } from "lucide-react";

const NavIcon = ({
  icon,
  label,
  isActive,
}: {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}) => (
  <div className="flex flex-col items-center text-xs">
    <div
      className={`w-9 h-9 flex items-center justify-center rounded-lg ${
        isActive ? "bg-primary text-black" : "text-slate-300"
      }`}
    >
      {icon}
    </div>
    <div
      className={`mt-1 text-xs ${
        isActive ? "text-primary font-semibold" : "text-slate-400"
      }`}
    >
      {label}
    </div>
  </div>
);

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const loc = useLocation();
  const isAct = (p: string | string[]) => {
    const paths = Array.isArray(p) ? p : [p];
    return paths.some(
      (path) => loc.pathname === path || loc.pathname.startsWith(path + "/")
    );
  };

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
                isAct(["/activities", "/"])
                  ? "text-primary font-semibold"
                  : "text-slate-400"
              }`}
            >
              Vận động
            </Link>
            <Link
              to="/workout"
              className={`text-sm ${
                isAct(["/workout", "/workouts"])
                  ? "text-primary font-semibold"
                  : "text-slate-400"
              }`}
            >
              Tập Gym
            </Link>
            <Link
              to="/nutrition"
              className={`text-sm ${
                isAct("/nutrition")
                  ? "text-primary font-semibold"
                  : "text-slate-400"
              }`}
            >
              Ăn uống
            </Link>
            <Link
              to="/stats"
              className={`text-sm ${
                isAct("/stats")
                  ? "text-primary font-semibold"
                  : "text-slate-400"
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
            icon={<Home className="w-5 h-5 stroke-current" />}
            label="Vận động"
            isActive={isAct(["/activities", "/"])}
          />
        </Link>
        <Link to="/workout">
          <NavIcon
            icon={<List className="w-5 h-5 stroke-current" />}
            label="Tập Gym"
            isActive={isAct(["/workout", "/workouts"])}
          />
        </Link>
        <Link to="/nutrition">
          <NavIcon
            icon={<PlusCircle className="w-5 h-5 stroke-current" />}
            label="Ăn uống"
            isActive={isAct("/nutrition")}
          />
        </Link>
        <Link to="/stats">
          <NavIcon
            icon={<MoreHorizontal className="w-5 h-5 stroke-current" />}
            label="Thống kê"
            isActive={isAct("/stats")}
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
