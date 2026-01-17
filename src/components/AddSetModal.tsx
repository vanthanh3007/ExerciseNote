import React, { useState, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { IconCheck, IconX } from "@tabler/icons-react";

interface AddSetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (weight: number, reps: number) => void;
  initialWeight?: number;
}

const WEIGHT_OPTIONS = Array.from({ length: 60 }, (_, i) => (i + 1) * 2.5);

export default function AddSetModal({
  isOpen,
  onClose,
  onSave,
  initialWeight = 10,
}: AddSetModalProps) {
  const [weight, setWeight] = useState(initialWeight);
  const [reps, setReps] = useState(1);
  const [isManual, setIsManual] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setWeight(initialWeight);
      setReps(1);
      setIsManual(false);
    }
  }, [isOpen, initialWeight]);

  const handleSave = () => {
    onSave(weight, reps);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/60" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full sm:w-[500px] bg-slate-900 border border-slate-800 rounded-2xl p-4 max-h-[90vh] flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-slate-100">Thêm Rep</h3>
            <button onClick={onClose} className="text-slate-400">
              <IconX />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pr-1">
            {/* Reps Input */}
            <div className="mb-6">
              <label className="text-slate-300 text-sm block mb-2">
                Số lần (Reps)
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setReps(Math.max(1, reps - 1))}
                  className="w-12 h-12 rounded-xl bg-slate-800 text-slate-200 text-2xl font-bold flex items-center justify-center"
                >
                  -
                </button>
                <input
                  type="number"
                  value={reps}
                  onChange={(e) => setReps(Math.max(1, parseInt(e.target.value) || 0))}
                  className="flex-1 text-center bg-slate-800 rounded-xl h-12 flex items-center justify-center text-3xl font-bold text-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
                <button
                  onClick={() => setReps(reps + 1)}
                  className="w-12 h-12 rounded-xl bg-slate-800 text-slate-200 text-2xl font-bold flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Weight Input */}
            <div className="mb-2">
              <div className="flex items-center justify-between mb-2">
                <label className="text-slate-300 text-sm">
                  Khối lượng (kg)
                </label>
                <button
                  onClick={() => setIsManual(!isManual)}
                  className="text-xs text-emerald-500 underline"
                >
                  {isManual ? "Chọn từ danh sách" : "Nhập số"}
                </button>
              </div>

              {isManual ? (
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full text-center bg-slate-800 rounded-xl h-16 text-4xl font-bold text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              ) : (
                <div className="text-center bg-slate-800 rounded-xl py-3 border border-slate-700 mb-4">
                  <span className="text-4xl font-bold text-slate-100">
                    {weight}
                  </span>
                  <span className="text-slate-400 text-lg ml-1">kg</span>
                </div>
              )}
            </div>

            {/* Quick Select Grid */}
            {!isManual && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 mb-4">
                {WEIGHT_OPTIONS.map((w) => (
                  <button
                    key={w}
                    onClick={() => setWeight(w)}
                    className={`py-2 rounded-lg font-medium text-sm transition-colors ${
                      weight === w
                        ? "bg-emerald-600 text-black shadow-lg shadow-emerald-900/50 scale-105"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 flex gap-3">
            <button
              onClick={handleSave}
              className="flex-1 bg-emerald-600 text-black py-3 rounded-xl font-bold text-lg flex items-center justify-center gap-2"
            >
              <IconCheck /> Lưu
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
