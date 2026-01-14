import React, { useEffect, useState } from "react";
import {
  loadActivities,
  saveActivities,
  sampleActivities,
  Activity,
  ActivityType,
} from "../lib/storage";

// Trang Vận động (Activities) — Tiếng Việt giao diện và chú thích
export default function Activities() {
  const [activities, setActivities] = useState<Activity[]>(() =>
    loadActivities()
  );
  const [type, setType] = useState<ActivityType>("Chạy");
  const [distance, setDistance] = useState<number | "">("");
  const [duration, setDuration] = useState<number | "">("");

  useEffect(() => {
    // Tự động lưu vào localStorage mỗi khi activities thay đổi
    saveActivities(activities);
  }, [activities]);

  function addActivity() {
    // Validate inputs
    if (!type) return;
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
    setActivities((prev) => [newItem, ...prev]);
    // reset inputs
    setDistance("");
    setDuration("");
  }

  return (
    <div className="space-y-4">
      <section className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        <h2 className="text-lg font-semibold text-slate-100">Vận động</h2>
        <p className="text-slate-400 text-sm">
          Chọn loại hoạt động và ghi quãng đường / thời gian.
        </p>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {(["Chạy", "Bơi", "Đạp xe"] as ActivityType[]).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`h-12 rounded-2xl text-sm ${
                type === t
                  ? "bg-primary text-black"
                  : "bg-slate-800 text-slate-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <label className="flex flex-col text-sm text-slate-300">
            Quãng đường (km)
            <input
              value={distance}
              onChange={(e) =>
                setDistance(e.target.value === "" ? "" : Number(e.target.value))
              }
              type="number"
              min="0"
              step="0.1"
              className="mt-2 p-3 rounded-xl bg-slate-800 text-slate-100"
              placeholder="ví dụ: 5.2"
            />
          </label>

          <label className="flex flex-col text-sm text-slate-300">
            Thời gian (phút)
            <input
              value={duration}
              onChange={(e) =>
                setDuration(e.target.value === "" ? "" : Number(e.target.value))
              }
              type="number"
              min="0"
              step="1"
              className="mt-2 p-3 rounded-xl bg-slate-800 text-slate-100"
              placeholder="ví dụ: 30"
            />
          </label>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={addActivity}
            className="bg-primary px-4 py-3 rounded-2xl font-medium"
          >
            Thêm hoạt động
          </button>
          <div>
            <button
              onClick={() => setActivities(sampleActivities)}
              className="text-slate-400 text-sm"
            >
              Seed dữ liệu
            </button>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        <h3 className="text-md font-medium text-slate-100">Lịch sử</h3>
        {activities.length === 0 ? (
          <p className="text-slate-400 mt-2">
            Chưa có hoạt động nào. Hãy thêm 1 hoạt động.
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {activities.map((a) => (
              <li
                key={a.id}
                className="p-3 bg-slate-800 rounded-xl flex justify-between items-center"
              >
                <div>
                  <div className="font-medium text-slate-100">{a.type}</div>
                  <div className="text-slate-400 text-sm">
                    {a.distanceKm ? `${a.distanceKm} km` : ""}{" "}
                    {a.durationMin ? `· ${a.durationMin} phút` : ""}
                  </div>
                </div>
                <div className="text-slate-400 text-xs">
                  {new Date(a.date).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
