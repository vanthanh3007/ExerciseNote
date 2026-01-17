import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
import { changeWebTitle } from "../utils";

type DetailTitleContext = {
  title: string | null;
  subtitle?: string | null;
  setTitle: (t: string | null) => void;
  setSubtitle: (t: string | null) => void;
};

const ctx = createContext<DetailTitleContext | null>(null);

export const useDetailTitle = () => {
  const c = useContext(ctx);
  if (!c) throw new Error("useDetailTitle must be used inside DetailLayout");
  return c;
};

const DetailLayout: React.FC<{
  children?: React.ReactNode;
  defaultTitle?: string;
  defaultSubtitle?: string | null;
}> = ({ children, defaultTitle, defaultSubtitle = null }) => {
  const [title, setTitle] = useState<string | null>(defaultTitle || null);
  const [subtitle, setSubtitle] = useState<string | null>(
    defaultSubtitle || null
  );

  // update document title when title changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    changeWebTitle(title || undefined, {});
  }, [title]);

  // respond when default props change (pages will pass in new title/subtitle)
  useEffect(() => {
    setTitle(defaultTitle || null);
  }, [defaultTitle]);

  useEffect(() => {
    setSubtitle(defaultSubtitle ?? null);
  }, [defaultSubtitle]);

  const value = useMemo(
    () => ({ title, subtitle, setTitle, setSubtitle }),
    [title, subtitle]
  );
  const navigate = useNavigate();

  return (
    <ctx.Provider value={value}>
      <div className="min-h-screen bg-black text-slate-100">
        <header className="sticky top-0 z-30 bg-black/90 backdrop-blur border-b border-slate-800">
          <div className="container py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700"
                aria-label="Quay lại"
              >
                <IconArrowLeft size={18} />
              </button>

              <div className="flex-1">
                <h1 className="text-lg font-semibold text-slate-100 text-left">
                  {title || ""}
                </h1>
                {subtitle && (
                  <div className="text-slate-400 text-sm mt-0.5 text-left">
                    {subtitle}
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="container py-4">{children}</main>
      </div>
    </ctx.Provider>
  );
};

export default DetailLayout;
