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
export type ActivityType = "Chạy" | "Bơi" | "Đạp xe" | "Leo núi";
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

// ----- Exercises (master list) -----
export type EquipmentType = "Cáp" | "Tạ ấm" | "Tạ đòn" | "Thanh đòn" | "Máy";
export type ExerciseDef = {
  id: string;
  name: string;
  groupId: string; // subgroup id like 'nguc_tren'
  equipment: EquipmentType;
  notes?: string;
};

const EX_KEY = "exlog_exercises_v1";

export function loadExercises(): ExerciseDef[] {
  try {
    const raw = localStorage.getItem(EX_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ExerciseDef[];
  } catch (e) {
    console.error("Không thể load exercises", e);
    return [];
  }
}

export function saveExercises(items: ExerciseDef[]) {
  try {
    localStorage.setItem(EX_KEY, JSON.stringify(items));
  } catch (e) {
    console.error("Không thể save exercises", e);
  }
}

// A small set of sample exercises for common subgroups
export const sampleExercises: ExerciseDef[] = [
  // Ngực trên
  {
    id: "ex_ngucbp1",
    name: "Incline Dumbbell Press",
    groupId: "nguc_tren",
    equipment: "Tạ ấm",
  },
  {
    id: "ex_ngucbp2",
    name: "Incline Cable Fly",
    groupId: "nguc_tren",
    equipment: "Cáp",
  },
  {
    id: "ex_ngucbp3",
    name: "Incline Barbell Press",
    groupId: "nguc_tren",
    equipment: "Thanh đòn",
  },

  // Ngực giữa
  {
    id: "ex_ngucmid1",
    name: "Flat Dumbbell Press",
    groupId: "nguc_giua",
    equipment: "Tạ ấm",
  },
  {
    id: "ex_ngucmid2",
    name: "Flat Bench Press",
    groupId: "nguc_giua",
    equipment: "Tạ đòn",
  },
  {
    id: "ex_ngucmid3",
    name: "Chest Fly (Machine)",
    groupId: "nguc_giua",
    equipment: "Cáp",
  },

  // Ngực dưới
  {
    id: "ex_ngucdown1",
    name: "Decline Dumbbell Press",
    groupId: "nguc_duoi",
    equipment: "Tạ ấm",
  },
  {
    id: "ex_ngucdown2",
    name: "Decline Cable Fly",
    groupId: "nguc_duoi",
    equipment: "Cáp",
  },

  // Xô
  {
    id: "ex_xo1",
    name: "Straight-Arm Pulldown",
    groupId: "xo",
    equipment: "Cáp",
  },
  { id: "ex_xo2", name: "Lat Pulldown", groupId: "xo", equipment: "Cáp" },

  // Lưng trên / dưới
  {
    id: "ex_lung1",
    name: "Bent-over Row (Barbell)",
    groupId: "lung_tren",
    equipment: "Thanh đòn",
  },
  {
    id: "ex_lung2",
    name: "Single-arm Dumbbell Row",
    groupId: "lung_tren",
    equipment: "Tạ ấm",
  },
  {
    id: "ex_lung3",
    name: "Hyperextension",
    groupId: "lung_duoi",
    equipment: "Thanh đòn",
  },

  // Vai
  {
    id: "ex_vai1",
    name: "Front Dumbbell Raise",
    groupId: "vai_truoc",
    equipment: "Tạ ấm",
  },
  {
    id: "ex_vai2",
    name: "Lateral Raise",
    groupId: "vai_ngang",
    equipment: "Tạ ấm",
  },
  {
    id: "ex_vai3",
    name: "Rear Delt Fly",
    groupId: "vai_sau",
    equipment: "Cáp",
  },

  // Chân
  {
    id: "ex_chan1",
    name: "Leg Extension",
    groupId: "dui_truoc",
    equipment: "Thanh đòn",
  },
  {
    id: "ex_chan2",
    name: "Romanian Deadlift",
    groupId: "dui_sau",
    equipment: "Thanh đòn",
  },
  {
    id: "ex_chan3",
    name: "Calf Raise",
    groupId: "bap_chan",
    equipment: "Tạ ấm",
  },

  // Tay
  {
    id: "ex_tay1",
    name: "Bicep Curl (Dumbbell)",
    groupId: "tay_truoc",
    equipment: "Tạ ấm",
  },
  {
    id: "ex_tay2",
    name: "Triceps Pushdown",
    groupId: "tay_sau",
    equipment: "Cáp",
  },
  {
    id: "ex_tay3",
    name: "Wrist Curl",
    groupId: "cang_tay",
    equipment: "Tạ ấm",
  },

  // Bụng
  {
    id: "ex_bung1",
    name: "Hanging Leg Raise",
    groupId: "bung",
    equipment: "Thanh đòn",
  },
  { id: "ex_bung2", name: "Cable Crunch", groupId: "bung", equipment: "Cáp" },

  // Mông
  {
    id: "ex_mong1",
    name: "Hip Thrust",
    groupId: "mong",
    equipment: "Thanh đòn",
  },
  // Máy (machine) subgroup examples
  {
    id: "ex_may1",
    name: "Chest Press Machine",
    groupId: "may_nguc",
    equipment: "Thanh đòn",
  },
  {
    id: "ex_may2",
    name: "Pec Deck Machine",
    groupId: "may_nguc",
    equipment: "Cáp",
  },
  {
    id: "ex_may3",
    name: "Seated Row Machine",
    groupId: "may_lung",
    equipment: "Cáp",
  },
  {
    id: "ex_may4",
    name: "Lat Pulldown Machine",
    groupId: "may_lung",
    equipment: "Cáp",
  },
  {
    id: "ex_may5",
    name: "Shoulder Press Machine",
    groupId: "may_vai",
    equipment: "Thanh đòn",
  },
  {
    id: "ex_may6",
    name: "Cable Lateral Raise (Machine)",
    groupId: "may_vai",
    equipment: "Cáp",
  },
];

// ----- Exercise Logs (Sessions & Sets) -----

export type ExerciseSet = {
  id: string;
  weight: number;
  reps: number;
  timestamp: string; // ISO string
};

export type ExerciseSession = {
  id: string;
  exerciseId: string;
  date: string; // ISO Date (YYYY-MM-DD) for grouping
  sets: ExerciseSet[];
  note?: string;
};

const SESSION_KEY = "exlog_sessions_v1";

export function loadExerciseSessions(): ExerciseSession[] {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ExerciseSession[];
  } catch (e) {
    console.error("Failed to load sessions", e);
    return [];
  }
}

export function saveExerciseSessions(items: ExerciseSession[]) {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(items));
  } catch (e) {
    console.error("Failed to save sessions", e);
  }
}
