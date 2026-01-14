export type SetRecord = { reps: number; weight?: number };
export type Exercise = { id: string; name: string; sets: SetRecord[] };
export type Workout = {
  id: string;
  name: string;
  date: string;
  exercises: Exercise[];
};

const KEY = "workout_log_v1";

export function loadWorkouts(): Workout[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Workout[];
  } catch (e) {
    console.error("Failed to load workouts", e);
    return [];
  }
}

export function saveWorkouts(ws: Workout[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(ws));
  } catch (e) {
    console.error("Failed to save workouts", e);
  }
}

export const sampleWorkouts: Workout[] = [
  {
    id: "w1",
    name: "Upper Body Blast",
    date: new Date().toISOString(),
    exercises: [
      {
        id: "e1",
        name: "Bench Press",
        sets: [
          { reps: 5, weight: 100 },
          { reps: 5, weight: 105 },
        ],
      },
      { id: "e2", name: "Pull Ups", sets: [{ reps: 8 }, { reps: 6 }] },
    ],
  },
];
