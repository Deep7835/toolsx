export const inr = (n: number, opts: { decimals?: number; symbol?: boolean } = {}) => {
  const { decimals = 2, symbol = true } = opts;
  if (!isFinite(n)) n = 0;
  const s = new Intl.NumberFormat("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(n);
  return symbol ? `₹${s}` : s;
};

export const num = (n: number, decimals = 2) => {
  if (!isFinite(n)) n = 0;
  return new Intl.NumberFormat("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: decimals }).format(n);
};

export const pct = (n: number, decimals = 2) => `${num(n, decimals)}%`;

export const round = (n: number, d = 2) => Math.round((n + Number.EPSILON) * 10 ** d) / 10 ** d;

export const toNum = (v: string | number | undefined | null): number => {
  if (typeof v === "number") return isFinite(v) ? v : 0;
  if (!v) return 0;
  const n = parseFloat(String(v).replace(/[^0-9.\-]/g, ""));
  return isFinite(n) ? n : 0;
};

export const todayISO = () => {
  const d = new Date();
  const off = d.getTimezoneOffset();
  return new Date(d.getTime() - off * 60000).toISOString().slice(0, 10);
};

export const addDaysISO = (iso: string, days: number) => {
  const d = new Date(iso + "T00:00:00");
  d.setDate(d.getDate() + days);
  const off = d.getTimezoneOffset();
  return new Date(d.getTime() - off * 60000).toISOString().slice(0, 10);
};

export const fmtDate = (iso?: string, style: "short" | "long" = "short") => {
  if (!iso) return "";
  const d = new Date(iso.length === 10 ? iso + "T00:00:00" : iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", style === "long" ? { day: "numeric", month: "long", year: "numeric" } : { day: "2-digit", month: "short", year: "numeric" });
};

export const fmtTime = (hhmm?: string) => {
  if (!hhmm) return "";
  const [h, m] = hhmm.split(":").map(Number);
  const ap = h >= 12 ? "PM" : "AM";
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${hh}:${String(m).padStart(2, "0")} ${ap}`;
};

/** Indian numbering system words: lakh / crore */
export function numberToWordsINR(amount: number): string {
  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const two = (n: number) => (n < 20 ? ones[n] : tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : ""));
  const three = (n: number) => (n >= 100 ? ones[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + two(n % 100) : "") : two(n));
  const words = (n: number): string => {
    if (n === 0) return "Zero";
    let out = "";
    const crore = Math.floor(n / 1e7); n %= 1e7;
    const lakh = Math.floor(n / 1e5); n %= 1e5;
    const thousand = Math.floor(n / 1000); n %= 1000;
    if (crore) out += words(crore) + " Crore ";
    if (lakh) out += two(lakh) + " Lakh ";
    if (thousand) out += two(thousand) + " Thousand ";
    if (n) out += three(n);
    return out.trim();
  };
  const rupees = Math.floor(Math.abs(amount));
  const paise = Math.round((Math.abs(amount) - rupees) * 100);
  let s = `Rupees ${words(rupees)}`;
  if (paise) s += ` and ${two(paise)} Paise`;
  return s + " Only";
}

export const uid = () => Math.random().toString(36).slice(2, 9);

export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
