import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  IconPlus,
  IconSearch,
  IconTrash,
  IconX,
  IconCheck,
} from "@tabler/icons-react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { GROUPS } from "../components/GymGroups";
import capImg from "../assets/tool_gym/cap.png";
import mayImg from "../assets/tool_gym/may.png";
import taAmImg from "../assets/tool_gym/ta_am.png";
import taDonImg from "../assets/tool_gym/ta_don.png";
import thanhDonImg from "../assets/tool_gym/thanh_don.png";
import {
  ExerciseDef,
  EquipmentType,
  loadExercises,
  saveExercises,
  sampleExercises,
} from "../lib/storage";
import DetailLayout from "../components/DetailLayout";

function findSubLabel(id?: string): string | null {
  if (!id) return null;
  for (const g of GROUPS) {
    const s = g.subs.find((x) => x.id === id);
    if (s) return s.label;
  }
  return null;
}

const EQUIP_TABS: (EquipmentType | "Tất cả")[] = [
  "Tất cả",
  "Cáp",
  "Tạ ấm",
  "Tạ đòn",
  "Thanh đòn",
  "Máy",
];

const EQUIP_ICONS: Record<EquipmentType, string> = {
  Cáp: capImg,
  Máy: mayImg,
  "Tạ ấm": taAmImg,
  "Tạ đòn": taDonImg,
  "Thanh đòn": thanhDonImg,
};

export default function ExercisesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const subgroup = searchParams.get("subgroup") || undefined;
  const group = searchParams.get("group") || undefined;
  const navigate = useNavigate();

  const [items, setItems] = useState<ExerciseDef[]>(() => loadExercises());
  const [query, setQuery] = useState("");
  const [equipFilter, setEquipFilter] = useState<EquipmentType | "Tất cả">(
    "Tất cả"
  );

  // modal state
  const [showAdd, setShowAdd] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [addSub, setAddSub] = useState<string | undefined>(subgroup);
  const [addEquip, setAddEquip] = useState<EquipmentType>("Tạ ấm");
  const [addWeightStep, setAddWeightStep] = useState(2.5);
  const [deleteTarget, setDeleteTarget] = useState<ExerciseDef | null>(null);

  // seed sample data if empty
  useEffect(() => {
    const loaded = loadExercises();
    if (!loaded || loaded.length === 0) {
      saveExercises(sampleExercises);
      setItems(sampleExercises);
    } else {
      setItems(loaded);
    }
  }, []);

  // when subgroup changes from a link, update local addSub default
  useEffect(() => {
    setAddSub(subgroup);
  }, [subgroup]);

  // if viewing a group (no subgroup selected), default addSub to the first subgroup of that group
  // (moved later, after groupObj is known)

  const subLabel = findSubLabel(subgroup);
  // if group param present, find group's label
  const groupObj = group ? GROUPS.find((g) => g.id === group) : undefined;
  const groupLabel = groupObj ? groupObj.label : null;

  // if viewing a group (no subgroup selected), default addSub to the first subgroup of that group
  useEffect(() => {
    if (!subgroup && groupObj && groupObj.subs.length > 0) {
      setAddSub((s) => s || groupObj.subs[0].id);
    }
  }, [groupObj, subgroup]);

  const filtered = useMemo(() => {
    return items.filter((it) => {
      // subgroup filter takes precedence
      if (subgroup && it.groupId !== subgroup) return false;
      // if group provided, include exercises belonging to any subgroup in that group
      if (groupObj && !groupObj.subs.some((s) => s.id === it.groupId))
        return false;
      if (equipFilter !== "Tất cả" && it.equipment !== equipFilter)
        return false;
      if (query && !it.name.toLowerCase().includes(query.toLowerCase()))
        return false;
      return true;
    });
  }, [items, subgroup, groupObj, equipFilter, query]);

  function handleAddSave() {
    if (!nameInput.trim() || !addSub) return;
    const id = `ex_${Date.now()}`;
    const newItem: ExerciseDef = {
      id,
      name: nameInput.trim(),
      groupId: addSub,
      equipment: addEquip,
      weightStep: addWeightStep,
    };
    const next = [newItem, ...items];
    setItems(next);
    saveExercises(next);
    setShowAdd(false);
    setNameInput("");
    setAddWeightStep(2.5); // Reset step
  }

  // header: prefer subgroup label, then group label; no static "Bài tập"
  const headerTitle = subLabel || groupLabel || "";

  return (
    <DetailLayout defaultTitle={headerTitle} defaultSubtitle={null}>
      <div className="p-4 pb-28">
        {/* search */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-2xl px-3 py-2 w-full">
            <IconSearch className="text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm bài tập hoặc thiết bị..."
              className="bg-transparent outline-none ml-2 text-slate-100 w-full"
            />
          </div>
        </div>

        {/* filter tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {EQUIP_TABS.map((t) => (
            <button
              key={t}
              onClick={() => setEquipFilter(t)}
              className={`px-3 py-1 rounded-2xl text-sm ${
                equipFilter === t
                  ? "bg-emerald-600 text-black"
                  : "bg-slate-900 text-slate-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* list */}
        <div className="space-y-2">
          {filtered.map((it) => (
            <div
              key={it.id}
              onClick={() => navigate(`/exercises/${it.id}`)}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex items-center justify-between cursor-pointer hover:border-emerald-500/50 transition-colors"
            >
              <div className="flex items-center">
                <img
                  src={EQUIP_ICONS[it.equipment]}
                  alt={it.equipment}
                  className="w-10 h-10 object-contain mr-3 bg-white rounded-full p-1"
                />
                <div>
                  <div className="text-slate-100 font-medium">{it.name}</div>
                  <div className="text-slate-400 text-sm">{it.equipment}</div>
                </div>
              </div>

              <div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteTarget(it);
                  }}
                  className="p-2 rounded-lg text-slate-300 hover:bg-slate-800"
                  aria-label={`Xóa ${it.name}`}
                >
                  <IconTrash />
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-slate-400 text-sm">
              Không có bài tập nào khớp.
            </div>
          )}
        </div>

        {/* FAB */}
        <button
          onClick={() => setShowAdd(true)}
          className="fixed right-4 bottom-6 w-14 h-14 rounded-full bg-emerald-600 flex items-center justify-center shadow-lg"
          aria-label="Thêm bài tập"
        >
          <IconPlus className="text-black" />
        </button>

        {/* Add modal */}
        {showAdd && (
          <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center">
            <div className="w-full sm:w-96 bg-slate-900 border border-slate-800 rounded-t-2xl sm:rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-lg font-semibold text-slate-100">
                  Thêm bài tập
                </div>
                <button
                  className="text-slate-400"
                  onClick={() => setShowAdd(false)}
                >
                  Đóng
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-slate-300 text-sm">Tên bài tập</label>
                  <input
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="w-full mt-1 p-2 rounded-lg bg-slate-800 text-slate-100"
                  />
                </div>

                {/* subgroup selection removed — default chosen from page context */}

                <div>
                  <label className="text-slate-300 text-sm">
                    Thiết bị - Dụng cụ
                  </label>
                  <div className="mt-2 flex items-center gap-2">
                    <img
                      src={EQUIP_ICONS[addEquip]}
                      alt={addEquip}
                      className="w-8 h-8 object-contain bg-white rounded-full p-1"
                    />
                    <select
                      value={addEquip}
                      onChange={(e) =>
                        setAddEquip(e.target.value as EquipmentType)
                      }
                      className="flex-1 mt-0 p-2 rounded-lg bg-slate-800 text-slate-100"
                    >
                      <option value={"Tạ ấm"}>Tạ ấm</option>
                      <option value={"Cáp"}>Cáp</option>
                      <option value={"Máy"}>Máy</option>
                      <option value={"Tạ đòn"}>Tạ đòn</option>
                      <option value={"Thanh đòn"}>Thanh đòn</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 text-sm">Bước tăng tạ (kg)</label>
                  <input
                    type="number"
                    value={addWeightStep}
                    onChange={(e) => setAddWeightStep(Number(e.target.value))}
                    className="w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    placeholder="2.5"
                    step="0.5"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAddSave}
                    className="flex-1 bg-emerald-600 text-black py-2 rounded-lg"
                  >
                    Lưu
                  </button>
                  <button
                    onClick={() => setShowAdd(false)}
                    className="flex-1 bg-slate-800 text-slate-200 py-2 rounded-lg"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete confirmation modal */}
        <Dialog
          open={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          className="relative z-50"
        >
          {/* The backdrop, rendered as a fixed sibling to the panel container */}
          <div className="fixed inset-0 bg-black/60" aria-hidden="true" />

          {/* Full-screen scrollable container */}
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
                    Bạn có chắc muốn xóa{" "}
                    <strong className="text-slate-100">
                      {deleteTarget?.name}
                    </strong>
                    ? Hành động này không thể hoàn tác.
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => {
                    if (deleteTarget) {
                      const next = items.filter((x) => x.id !== deleteTarget.id);
                      setItems(next);
                      saveExercises(next);
                      setDeleteTarget(null);
                    }
                  }}
                  className="flex-1 bg-rose-600 text-black py-2 rounded-lg flex items-center justify-center gap-2"
                >
                  <IconCheck />
                  <span>Xóa</span>
                </button>

                <button
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 bg-slate-800 text-slate-200 py-2 rounded-lg"
                >
                  Hủy
                </button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </div>
    </DetailLayout>
  );
}
