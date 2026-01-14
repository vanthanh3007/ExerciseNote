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

// ----- Activities (Vận động) -----
export type ActivityType = "Chạy" | "Bơi" | "Đạp xe";
export type Activity = {
  id: string;
  type: ActivityType;
  distanceKm?: number;
  durationMin?: number;
  date: string;
};

const ACT_KEY = "exlog_activities_v1";

export function loadActivities(): Activity[] {
  try {
    const raw = localStorage.getItem(ACT_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Activity[];
  } catch (e) {
    console.error("Không thể load activities", e);
    return [];
  }
}

export function saveActivities(items: Activity[]) {
  try {
    localStorage.setItem(ACT_KEY, JSON.stringify(items));
  } catch (e) {
    console.error("Không thể save activities", e);
  }
}

export const sampleActivities: Activity[] = [
  {
    id: "a1",
    type: "Chạy",
    distanceKm: 5,
    durationMin: 30,
    date: new Date().toISOString(),
  },
];
