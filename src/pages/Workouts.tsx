import React, { useEffect, useState } from "react";
import { loadWorkouts, saveWorkouts, sampleWorkouts } from "../lib/storage";

export default function Workouts() {
  const [workouts, setWorkouts] = useState(() => loadWorkouts());

  useEffect(() => {
    saveWorkouts(workouts);
  }, [workouts]);

  if (workouts.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Workouts</h2>
        <p className="text-slate-600">No workouts yet.</p>
        <button
          onClick={() => setWorkouts(sampleWorkouts)}
          className="mt-4 inline-block bg-slate-900 text-white px-4 py-2 rounded"
        >
          Seed sample data
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Workouts</h2>
      <ul className="space-y-4">
        {workouts.map((w) => (
          <li key={w.id} className="p-4 border rounded">
            <div className="flex justify-between">
              <div>
                <div className="font-medium">{w.name}</div>
                <div className="text-sm text-slate-500">
                  {new Date(w.date).toLocaleDateString()}
                </div>
              </div>
              <div className="text-sm text-slate-600">
                {w.exercises.length} exercises
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
