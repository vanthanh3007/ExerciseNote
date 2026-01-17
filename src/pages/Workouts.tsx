import React, { useEffect, useState } from "react";
import { loadWorkouts, saveWorkouts, sampleWorkouts } from "../lib/storage";
import GymGroups from "../components/GymGroups";

export default function Workouts() {
  const [workouts, setWorkouts] = useState(() => loadWorkouts());

  useEffect(() => {
    saveWorkouts(workouts);
  }, [workouts]);

  return (
    <div className="space-y-4 pb-20">
      {/* Gym groups section (cards) */}
      <GymGroups />

      {/* Workouts list */}
      {workouts.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2 text-slate-100">
            Workouts
          </h2>
          <p className="text-slate-400">Chưa có buổi tập.</p>
          <button
            onClick={() => setWorkouts(sampleWorkouts)}
            className="mt-4 inline-block bg-primary text-black px-4 py-2 rounded"
          >
            Seed sample data
          </button>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-slate-100">
            Workouts
          </h2>
          <ul className="space-y-4">
            {workouts.map((w) => (
              <li key={w.id} className="p-4 border border-slate-800 rounded">
                <div className="flex justify-between">
                  <div>
                    <div className="font-medium text-slate-100">{w.name}</div>
                    <div className="text-sm text-slate-400">
                      {new Date(w.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-sm text-slate-400">
                    {w.exercises.length} exercises
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
