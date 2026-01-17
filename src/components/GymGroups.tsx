import React from "react";
import { IconBarbell } from "@tabler/icons-react";
import { Link } from "react-router-dom";

// static image imports from the existing assets folder
import ngucImg from "../assets/gym/nguc.png";
import xoImg from "../assets/gym/xo.png";
import lung_trenImg from "../assets/gym/lung_tren.png";
import lung_duoiImg from "../assets/gym/lung_duoi.png";
import vaiImg from "../assets/gym/vai.png";
import chan_truocImg from "../assets/gym/chan_truoc.png";
import dui_sauImg from "../assets/gym/dui_sau.png";
import bap_chanImg from "../assets/gym/bap_chan.png";
import tay_truocImg from "../assets/gym/tay_truoc.png";
import tay_sauImg from "../assets/gym/tay sau.png";
import bungImg from "../assets/gym/bung.png";
import mongImg from "../assets/gym/mong.png";

type Sub = { id: string; label: string; img: string };
type ParentGroup = { id: string; label: string; subs: Sub[] };

export const GROUPS: ParentGroup[] = [
  {
    id: "nguc",
    label: "Ngực",
    subs: [
      { id: "nguc_tren", label: "Ngực trên", img: ngucImg },
      { id: "nguc_giua", label: "Ngực giữa", img: ngucImg },
      { id: "nguc_duoi", label: "Ngực dưới", img: ngucImg },
    ],
  },
  { id: "xo", label: "Xô", subs: [{ id: "xo", label: "Xô", img: xoImg }] },
  {
    id: "lung",
    label: "Lưng",
    subs: [
      { id: "lung_tren", label: "Lưng trên", img: lung_trenImg },
      { id: "lung_duoi", label: "Lưng dưới", img: lung_duoiImg },
    ],
  },
  {
    id: "vai",
    label: "Vai",
    subs: [
      { id: "vai_truoc", label: "Vai trước", img: vaiImg },
      { id: "vai_ngang", label: "Vai ngang", img: vaiImg },
      { id: "vai_sau", label: "Vai sau", img: vaiImg },
    ],
  },
  {
    id: "chan",
    label: "Chân",
    subs: [
      { id: "dui_truoc", label: "Chân đùi trước", img: chan_truocImg },
      { id: "dui_sau", label: "Đùi sau", img: dui_sauImg },
      { id: "bap_chan", label: "Bắp chân", img: bap_chanImg },
    ],
  },
  {
    id: "tay",
    label: "Tay",
    subs: [
      { id: "tay_truoc", label: "Tay trước", img: tay_truocImg },
      { id: "tay_sau", label: "Tay sau", img: tay_sauImg },
      { id: "cang_tay", label: "Cẳng tay", img: tay_truocImg },
    ],
  },
  {
    id: "bung",
    label: "Bụng",
    subs: [{ id: "bung", label: "Bụng", img: bungImg }],
  },
  {
    id: "mong",
    label: "Mông",
    subs: [{ id: "mong", label: "Mông", img: mongImg }],
  },
];

function IconFallback() {
  return <IconBarbell size={28} className="text-primary" />;
}

export default function GymGroups() {
  return (
    <section className="mb-4">
      <h3 className="text-lg font-semibold text-slate-100 mb-3">
        Nhóm cơ (Gym)
      </h3>
      <div className="space-y-4">
        {GROUPS.map((group) => (
          <div key={group.id}>
            <div className="mb-2 flex items-center justify-between">
              <h4 className="text-md font-medium text-slate-100">
                <Link to={`/exercises?group=${group.id}`}>{group.label}</Link>
              </h4>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-2">
              {group.subs.map((s) => (
                <Link
                  key={s.id}
                  to={`/exercises?subgroup=${s.id}`}
                  className="block"
                >
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex items-start gap-3 hover:scale-[1.01] transform transition">
                    <div className="w-12 h-12 flex items-center justify-center bg-slate-800 rounded-xl rounded-lg overflow-hidden relative">
                      <img
                        src={s.img}
                        alt={s.label}
                        className="object-contain"
                      />
                      {/* fallback handled at build-time via imports; IconFallback kept for completeness */}
                    </div>

                    <div>
                      <div className="text-slate-100 font-medium">
                        {s.label}
                      </div>
                      {/* <div className="text-slate-400 text-sm">{s.id}</div> */}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
