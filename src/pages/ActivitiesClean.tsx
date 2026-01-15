import React, { useEffect, useState } from "react";
import {
  loadActivities,
  saveActivities,
  sampleActivities,
  Activity,
  ActivityType,
} from "../lib/storage";
import { ArrowLeftIcon } from "lucide-react";

// Clean Activities page: Menu cards -> Detail form + history (Vietnamese UI)
export default function Activities() {
  const [activities, setActivities] = useState<Activity[]>(() =>
    loadActivities()
  );
  const [activeSubTab, setActiveSubTab] = useState<ActivityType | null>(null);
  const [distance, setDistance] = useState<number | "">("");
  const [duration, setDuration] = useState<number | "">("");

  useEffect(() => {
    saveActivities(activities);
  }, [activities]);

  const menuItems: {
    key: ActivityType;
    label: string;
    icon: React.ReactNode;
  }[] = [
    { key: "Chạy", label: "Chạy bộ", icon: null },
    { key: "Bơi", label: "Bơi lội", icon: null },
    {
      key: "Leo núi",
      label: "Leo núi",
      icon: null,
    },
    { key: "Đạp xe", label: "Đạp xe", icon: null },
  ];

  function addActivity(type: ActivityType) {
    const d = typeof distance === "number" ? distance : NaN;
    const t = typeof duration === "number" ? duration : NaN;
    if (isNaN(d) && isNaN(t)) {
      alert("Vui lòng nhập quãng đường hoặc thời gian hợp lệ.");
      return;
    }
    const newItem: Activity = {
      id: crypto.randomUUID?.() ?? Date.now().toString(),
      type,
      distanceKm: isNaN(d) ? undefined : d,
      durationMin: isNaN(t) ? undefined : t,
      date: new Date().toISOString(),
    };
    setActivities((s) => [newItem, ...s]);
    setDistance("");
    setDuration("");
  }

  const history = activeSubTab
    ? activities.filter((a) => a.type === activeSubTab)
    : [];

  return (
    <div className="space-y-4">
      {!activeSubTab && (
        <section className="grid grid-cols-2 gap-3">
          {menuItems.map((m) => (
            <button
              key={m.key}
              onClick={() => setActiveSubTab(m.key)}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-4 h-28 flex flex-col items-start justify-between transition-transform transform hover:-translate-y-1"
            >
              <div className="text-primary">{m.icon}</div>
              <div className="text-slate-100 font-semibold text-lg">
                {m.label}
              </div>
            </button>
          ))}
        </section>
      )}

      {activeSubTab && (
        <section className="space-y-4 transition-all duration-200">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveSubTab(null)}
              className="p-2 rounded-lg bg-slate-800 text-slate-200"
              aria-label="Quay lại"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold text-slate-100">
              {activeSubTab}
            </h2>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
            <h3 className="text-sm text-slate-400">Ghi hoạt động</h3>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <label className="flex flex-col text-sm text-slate-300">
                Quãng đường (km)
                <input
                  value={distance}
                  onChange={(e) =>
                    setDistance(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  type="number"
                  min="0"
                  step="0.1"
                  className="mt-2 p-3 rounded-xl bg-slate-800 text-slate-100 h-12"
                  placeholder="ví dụ: 5.2"
                />
              </label>

              <label className="flex flex-col text-sm text-slate-300">
                Thời gian (phút)
                <input
                  value={duration}
                  onChange={(e) =>
                    setDuration(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  type="number"
                  min="0"
                  step="1"
                  className="mt-2 p-3 rounded-xl bg-slate-800 text-slate-100 h-12"
                  placeholder="ví dụ: 30"
                />
              </label>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => addActivity(activeSubTab)}
                className="bg-primary px-4 py-3 rounded-2xl font-medium h-12"
              >
                Lưu hoạt động
              </button>
              <button
                onClick={() => setActivities(sampleActivities)}
                className="text-slate-400 text-sm"
              >
                Seed dữ liệu
              </button>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
            <h3 className="text-md font-medium text-slate-100">
              Lịch sử {activeSubTab}
            </h3>
            {history.length === 0 ? (
              <p className="text-slate-400 mt-2">
                Chưa có hoạt động cho loại này.
              </p>
            ) : (
              <ul className="mt-3 space-y-2">
                {history.map((a) => {
                  const details = `${a.distanceKm ? a.distanceKm + " km" : ""}${
                    a.durationMin ? " · " + a.durationMin + " phút" : ""
                  }`;
                  return (
                    <li
                      key={a.id}
                      className="p-3 bg-slate-800 rounded-xl flex justify-between items-center"
                    >
                      <div>
                        <div className="font-medium text-slate-100">
                          {a.type}
                        </div>
                        <div className="text-slate-400 text-sm">{details}</div>
                      </div>
                      <div className="text-slate-400 text-xs">
                        {new Date(a.date).toLocaleString()}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
