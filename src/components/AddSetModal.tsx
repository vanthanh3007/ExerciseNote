import React, { useState, useEffect, useMemo } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { IconCheck, IconX } from "@tabler/icons-react";
import {
  EquipmentType,
  loadCustomWeights,
  addCustomWeight,
} from "../lib/storage";

interface AddSetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (weight: number, reps: number) => void;
  initialWeight?: number;
  equipmentType?: EquipmentType;
  weightStep?: number;
}

export default function AddSetModal({
  isOpen,
  onClose,
  onSave,
  initialWeight = 10,
  equipmentType,
  weightStep = 2.5,
}: AddSetModalProps) {
  const [weight, setWeight] = useState<number | string>(initialWeight);
  const [reps, setReps] = useState<number | string>(1);
  const [suggestions, setSuggestions] = useState<number[]>([]);

  const weightOptions = useMemo(() => {
    // Generate ~60 options based on step
    // e.g. step=2.5 -> 2.5, 5.0, 7.5...
    // e.g. step=5.0 -> 5, 10, 15...
    return Array.from({ length: 60 }, (_, i) => (i + 1) * weightStep);
  }, [weightStep]);

  useEffect(() => {
    if (isOpen) {
      setWeight(initialWeight);
      setReps(1);

      // Load suggestions
      if (equipmentType) {
        const map = loadCustomWeights();
        if (map[equipmentType]) {
          setSuggestions(map[equipmentType]);
        } else {
            setSuggestions([]);
        }
      }
    }
  }, [isOpen, initialWeight, equipmentType]);

  const handleSave = () => {
    const finalReps = typeof reps === "string" ? (parseInt(reps) || 1) : reps;
    const finalWeight = typeof weight === "string" ? (parseFloat(weight) || 0) : weight;
    
    onSave(finalWeight, finalReps);
    
    // Save to history ONLY if not a standard increment (multiple of weightStep or 2.5)
    // Actually, user wants to save history regardless?
    // User requested "custom weights" save odd ones.
    // If step is 5, and i enter 6, it should probably be saved.
    // So logic: save if not in the generated grid?
    // Let's stick to previous logic: if simple mod check fails.
    // Or check if it exists in weightOptions?
    if (equipmentType && finalWeight > 0 && finalWeight % weightStep !== 0) {
      addCustomWeight(equipmentType, finalWeight);
    }
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
                  onClick={() => setReps((r) => Math.max(1, (typeof r === 'string' ? parseInt(r)||0 : r) - 1))}
                  className="w-12 h-12 rounded-xl bg-slate-800 text-slate-200 text-2xl font-bold flex items-center justify-center"
                >
                  -
                </button>
                <input
                  type="number"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  onBlur={() => {
                     // Enforce min 1 on blur
                     const r = typeof reps === 'string' ? parseInt(reps) : reps;
                     if (!r || r < 1) setReps(1);
                  }}
                  className="flex-1 text-center bg-slate-800 rounded-xl h-12 flex items-center justify-center text-3xl font-bold text-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
                <button
                   onClick={() => setReps((r) => (typeof r === 'string' ? parseInt(r)||0 : r) + 1)}
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
              </div>

              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                onBlur={() => {
                    // On blur, if empty, maybe reset to 0 or leave empty? 
                    // Let's ensure it's at least a valid number format if needed
                    // But typically users might want to leave it 0
                }}
                className="w-full text-center bg-slate-800 rounded-xl h-16 text-4xl font-bold text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-600 mb-4"
              />
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="mb-4">
                 <div className="text-xs text-emerald-500 mb-2 font-medium">Gợi ý từ lịch sử ({equipmentType}):</div>
                 <div className="flex flex-wrap gap-2">
                    {suggestions.map((w) => (
                        <button
                          key={`sugg_${w}`}
                          onClick={() => setWeight(w)}
                          className={`px-3 py-1.5 rounded-lg font-bold text-sm border ${
                             weight === w 
                              ? "bg-emerald-600 border-emerald-500 text-black" 
                              : "bg-slate-800 border-slate-700 text-emerald-500 hover:border-emerald-500/50"
                          }`}
                        >
                            {w}kg
                        </button>
                    ))}
                 </div>
              </div>
            )}

            {/* Quick Select Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 mb-4">
                {weightOptions.map((w) => (
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
