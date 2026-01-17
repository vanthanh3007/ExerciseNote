// Utilities
// changeWebTitle: set document.title with optional numeric prefix.
// This implementation is defensive: if external helpers like ConfigWebTitle or HCF
// exist on window, it will try to use them; otherwise it falls back to options/localStorage.

type ChangeOpts = { withNumber?: boolean } | Record<string, any>;

export const changeWebTitle = (title?: string, opts: ChangeOpts = {}) => {
  let _title =
    title || (typeof window !== "undefined" ? window.document.title : "");

  // Determine whether we should prefix with a number.
  let useNumber = false;
  try {
    // prefer explicit option
    if ((opts as any).withNumber) useNumber = true;

    // fallback: if a global ConfigWebTitle exists and exposes getWithNumber, use that
    const win: any = typeof window !== "undefined" ? (window as any) : {};
    if (
      !useNumber &&
      win.ConfigWebTitle &&
      typeof win.ConfigWebTitle.getWithNumber === "function"
    ) {
      useNumber = !!win.ConfigWebTitle.getWithNumber(opts);
    }
  } catch (e) {
    // ignore
  }

  if (useNumber) {
    let number: any = 0;
    try {
      const win: any = typeof window !== "undefined" ? (window as any) : {};
      if (win.HCF && typeof win.HCF.getCF === "function") {
        number = win.HCF.getCF("titleNumber");
      } else if (typeof window !== "undefined") {
        const n = window.localStorage.getItem("titleNumber");
        number = n ? Number(n) : 0;
      }
    } catch (e) {
      number = 0;
    }

    if (typeof number === "number") {
      const _cleaned = _title.replace(/^\(\d+\)\s*/, "");
      if (number > 0) {
        _title = `(${number}) ${_cleaned}`;
      } else {
        _title = _cleaned;
      }
    }
  }

  try {
    if (typeof window !== "undefined") window.document.title = _title;
  } catch (e) {
    // ignore
  }

  return _title;
};

export default changeWebTitle;
