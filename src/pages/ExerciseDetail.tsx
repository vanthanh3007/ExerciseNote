import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
  IconArrowLeft,
  IconCalendar,
  IconPlus,
  IconClock,
  IconX,
  IconChevronRight,
  IconTrash,
  IconCheck,
} from "@tabler/icons-react";
import AddSetModal from "../components/AddSetModal";
import CreateSessionModal from "../components/CreateSessionModal";
import {
  loadExercises,
  loadExerciseSessions,
  saveExerciseSessions,
  ExerciseDef,
  ExerciseSession,
  ExerciseSet,
} from "../lib/storage";
import CustomCalendar from "../components/CustomCalendar";

// Define the custom input component separately or use forwardRef inline if simple
const DateFilterTrigger = React.forwardRef<
  HTMLDivElement,
  { value?: string; onClick?: () => void; customDate: string }
>(({ value, onClick, customDate }, ref) => (
  <div 
    ref={ref}
    onClick={onClick}
    className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-xl p-3 hover:border-emerald-500/50 transition-colors cursor-pointer group"
  >
    <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-100">
            <IconCalendar size={18} />
        </div>
        <div className="text-slate-100 font-semibold">
            {customDate ? new Date(customDate).toLocaleDateString('vi-VN') : 'Chọn ngày'}
        </div>
    </div>
    <IconChevronRight className="text-slate-500 group-hover:text-emerald-500 transition-colors" />
  </div>
));

type DateFilter = "week" | "month" | "all" | "custom";

type DeleteTarget = 
  | { type: 'session'; sessionId: string; date: string }
  | { type: 'set'; sessionId: string; setId: string; weight: number; reps: number };

export default function ExerciseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState<ExerciseDef | null>(null);
  const [sessions, setSessions] = useState<ExerciseSession[]>([]);
  const [filter, setFilter] = useState<DateFilter>("week");
  const [customDate, setCustomDate] = useState("");

  // Modals
  const [showAddSet, setShowAddSet] = useState(false);
  const [showCreateSession, setShowCreateSession] = useState(false);
  const [targetSessionId, setTargetSessionId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);

  useEffect(() => {
    // Load exercise info
    const allEx = loadExercises();
    const found = allEx.find((e) => e.id === id);
    if (found) setExercise(found);

    // Load sessions
    setSessions(loadExerciseSessions());
  }, [id]);

  const filteredSessions = useMemo(() => {
    if (!id) return [];
    let mySessions = sessions.filter((s) => s.exerciseId === id);

    // Date filtering
    const now = new Date();
    if (filter === "week") {
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      mySessions = mySessions.filter((s) => new Date(s.date) >= oneWeekAgo);
    } else if (filter === "month") {
      const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      mySessions = mySessions.filter((s) => new Date(s.date) >= oneMonthAgo);
    } else if (filter === "custom" && customDate) {
      mySessions = mySessions.filter((s) => s.date === customDate);
    }

    // Sort by date desc and return new objects with sorted sets
    return mySessions.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    ).map(s => ({
      ...s,
      sets: [...s.sets].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    }));
  }, [sessions, id, filter, customDate]);

  const handleCreateSession = (date: string) => {
    if (!id) return;
    
    // Check if session for date already exists
    const existing = sessions.find(
      (s) => s.exerciseId === id && s.date === date
    );

    if (existing) {
      setCustomDate(date);
      setFilter("custom");
    } else {
      // Create new session
      const newSession: ExerciseSession = {
        id: `sess_${Date.now()}`,
        exerciseId: id,
        date: date,
        sets: [],
      };
      setSessions((prev) => [...prev, newSession]);
      saveExerciseSessions([...sessions, newSession]);
      
      setCustomDate(date);
      setFilter("custom");
    }
  };

  const handleAddSet = (sessionId: string) => {
    setTargetSessionId(sessionId);
    setShowAddSet(true);
  };

  const handleSaveSet = (weight: number, reps: number) => {
    if (!targetSessionId) return;

    const newSet: ExerciseSet = {
      id: `set_${Date.now()}`,
      weight,
      reps,
      timestamp: new Date().toISOString(),
    };

    const nextSessions = sessions.map((s) => {
      if (s.id === targetSessionId) {
        // Prepend new set to the beginning
        return { ...s, sets: [newSet, ...s.sets] };
      }
      return s;
    });

    setSessions(nextSessions);
    saveExerciseSessions(nextSessions);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;

    let nextSessions = [...sessions];

    if (deleteTarget.type === 'session') {
      nextSessions = nextSessions.filter(s => s.id !== deleteTarget.sessionId);
    } else {
      nextSessions = nextSessions.map(s => {
        if (s.id === deleteTarget.sessionId) {
          return { ...s, sets: s.sets.filter(set => set.id !== deleteTarget.setId) };
        }
        return s;
      });
    }

    setSessions(nextSessions);
    saveExerciseSessions(nextSessions);
    setDeleteTarget(null);
  };

  // Helper to format date
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const today = new Date();
    const isToday = d.toDateString() === today.toDateString();
    
    const dayName = d.toLocaleDateString("vi-VN", { weekday: "long" });
    const dayDate = d.toLocaleDateString("vi-VN", { day: "numeric", month: "numeric" });
    
    return isToday ? `Hôm nay, ${dayDate}` : `${dayName}, ${dayDate}`;
  };

  // Helper to format timestamp
  const formatTime = (iso: string) => {
    return new Date(iso).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!exercise) return null;

  return (
    <div className="bg-black min-h-screen text-slate-100 font-sans pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-slate-800 p-4 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 rounded-full hover:bg-slate-800 text-slate-400"
        >
          <IconArrowLeft />
        </button>
        <div>
          <h1 className="text-lg font-bold leading-tight">{exercise.name}</h1>
          <div className="text-xs text-slate-400">{exercise.equipment}</div>
        </div>
      </div>

      <div className="p-4">
        {/* Filter Tabs */}
        <div className="flex bg-slate-900 rounded-xl p-1 mb-6">
          {(["week", "month", "all"] as const).map((f) => (
            <button
              key={f}
              onClick={() => {
                setFilter(f);
                setCustomDate("");
              }}
              className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-all ${
                filter === f
                  ? "bg-slate-800 text-slate-100 shadow-sm"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {f === "week" ? "Tuần" : f === "month" ? "Tháng" : "Tất cả"}
            </button>
          ))}
          {/* Custom Date Filter Toggle */}
          <button
              onClick={() => {
                 if (filter !== "custom") {
                   setFilter("custom");
                   if(!customDate) setCustomDate(new Date().toISOString().split("T")[0]);
                 }
              }}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center justify-center gap-2 ${
                filter === "custom"
                  ? "bg-slate-800 text-slate-100"
                  : "text-slate-500 hover:text-slate-300"
              }`}
          >
              <IconCalendar size={16} />
              <span className="text-sm font-medium">Chọn ngày</span>
          </button>
        </div>

        {/* Date Picker Input (Visible only if custom filter is active) */}
        {filter === "custom" && (
            <div className="mb-6">
                 <CustomCalendar
                    selected={customDate ? new Date(customDate) : null}
                    onChange={(date: Date | null) => {
                       if(date) setCustomDate(date.toISOString().split("T")[0]);
                    }}
                    customInput={<DateFilterTrigger customDate={customDate} />}
                    dateFormat="yyyy-MM-dd"
                    popperPlacement="bottom-start"
                 />
            </div>
        )}

        {/* Sessions List */}
        <div className="space-y-6">
          {filteredSessions.length === 0 ? (
            <div className="text-center py-10 text-slate-500">
              {filter === "custom" 
                ? "Không có buổi tập nào vào ngày này." 
                : "Chưa có lịch sử tập luyện."}
              <br />
              Bấm nút + để tạo buổi tập mới.
            </div>
          ) : (
            filteredSessions.map((session) => (
              <div
                key={session.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden"
              >
                {/* Session Header */}
                <div className="bg-slate-800/50 px-4 py-3 border-b border-slate-800 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-emerald-500 font-medium">
                    <IconCalendar size={18} />
                    <span>{formatDate(session.date)}</span>
                    <span className="text-slate-500 px-1">•</span>
                    <span className="text-slate-400 font-normal">{formatTime(session.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setDeleteTarget({ type: 'session', sessionId: session.id, date: formatDate(session.date) });
                        }}
                        className="p-1.5 text-slate-500 hover:text-rose-500 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        <IconTrash size={18} />
                    </button>
                    <button
                        onClick={() => handleAddSet(session.id)}
                        className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 font-medium hover:border-emerald-500/50 transition-colors pointer-events-auto z-30"
                    >
                        + Thêm Rep
                    </button>
                  </div>
                </div>

                {/* Sets List */}
                <div className="divide-y divide-slate-800/50">
                  {session.sets.length === 0 ? (
                    <div className="p-4 text-center">
                      <div className="text-sm text-slate-500 italic mb-2">
                        Chưa có set nào.
                      </div>
                      <button 
                         onClick={() => handleAddSet(session.id)}
                         className="text-sm text-emerald-500 hover:underline"
                      >
                         Thêm set đầu tiên ngay
                      </button>
                    </div>
                  ) : (
                    session.sets.map((set, idx) => (
                      <div
                        key={set.id}
                        className="p-3 flex items-center justify-between hover:bg-slate-800/30 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-slate-800 text-xs text-slate-500 flex items-center justify-center font-mono">
                            {session.sets.length - idx}
                          </div>
                          <div>
                            <div className="text-lg font-bold text-slate-200">
                              {set.weight} <span className="text-sm font-normal text-slate-500">kg</span>
                              <span className="mx-2 text-slate-600">x</span>
                              {set.reps} <span className="text-sm font-normal text-slate-500">reps</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                           <div className="text-xs text-slate-500 flex items-center gap-1">
                             <IconClock size={12} />
                             {formatTime(set.timestamp)}
                           </div>
                           <button
                             onClick={() => setDeleteTarget({ type: 'set', sessionId: session.id, setId: set.id, weight: set.weight, reps: set.reps })}
                             className="p-1.5 text-slate-600 hover:text-rose-500 hover:bg-slate-800 rounded-lg transition-all"
                           >
                              <IconTrash size={16} />
                           </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* FAB */}
      <button
        onClick={() => setShowCreateSession(true)}
        className="fixed right-4 bottom-6 w-14 h-14 rounded-full bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-900/40 hover:bg-emerald-500 transition-colors z-30"
      >
        <IconPlus className="text-black" size={28} />
      </button>

      {/* Modals */}
      <AddSetModal
        isOpen={showAddSet}
        onClose={() => setShowAddSet(false)}
        onSave={handleSaveSet}
        equipmentType={exercise?.equipment}
        weightStep={exercise?.weightStep}
      />
      
      <CreateSessionModal
        isOpen={showCreateSession}
        onClose={() => setShowCreateSession(false)}
        onSave={handleCreateSession}
      />

      {/* Delete Confirmation Modal */}
      <Dialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="text-amber-400 mt-1">
                <IconX />
              </div>
              <div className="flex-1">
                <div className="text-lg font-semibold text-slate-100 mb-1">
                  Xác nhận xóa
                </div>
                <div className="text-slate-300 text-sm">
                  {deleteTarget?.type === 'session' ? (
                     <span>Bạn có chắc muốn xóa buổi tập ngày <strong className="text-slate-100">{deleteTarget.date}</strong>?</span>
                  ) : (
                     <span>Bạn có chắc muốn xóa Rep: <strong className="text-slate-100">{deleteTarget?.weight}kg x {deleteTarget?.reps}</strong>?</span>
                  )}
                  <div className="mt-1 text-slate-400 text-xs">Hành động này không thể hoàn tác.</div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={handleDelete}
                className="flex-1 bg-rose-600 text-black py-2 rounded-lg flex items-center justify-center gap-2 font-medium"
              >
                <IconCheck size={18} />
                <span>Xóa</span>
              </button>

              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 bg-slate-800 text-slate-200 py-2 rounded-lg font-medium hover:bg-slate-700"
              >
                Hủy
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
