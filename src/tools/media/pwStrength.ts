const COMMON = ["password", "123456", "12345678", "qwerty", "abc123", "111111", "123123", "admin", "welcome", "india123", "letmein", "iloveyou", "pass@123", "admin123", "password1", "p@ssw0rd", "qwerty123", "000000", "1234567890", "monkey", "dragon", "sunshine", "princess", "football", "shadow", "master", "superman", "michael", "jordan", "delhi123", "mumbai123", "india@123", "welcome123", "abcd1234", "test123", "user123"];
const SEQ = "abcdefghijklmnopqrstuvwxyz0123456789qwertyuiopasdfghjklzxcvbnm";

export function strength(pw: string) {
  const len = pw.length;
  let pool = 0;
  if (/[a-z]/.test(pw)) pool += 26;
  if (/[A-Z]/.test(pw)) pool += 26;
  if (/\d/.test(pw)) pool += 10;
  if (/[^A-Za-z0-9]/.test(pw)) pool += 33;
  let entropy = len ? len * Math.log2(pool || 1) : 0;
  const issues: string[] = [];
  const lower = pw.toLowerCase();
  if (COMMON.some((c) => lower === c || (c.length > 5 && lower.includes(c)))) { issues.push("Contains a very common password"); entropy = Math.min(entropy, 10); }
  if (/(.)\1{2,}/.test(pw)) { issues.push("Repeated characters"); entropy -= 8; }
  for (let i = 0; i + 3 <= lower.length; i++) { const chunk = lower.slice(i, i + 3); if (SEQ.includes(chunk) || SEQ.split("").reverse().join("").includes(chunk)) { issues.push("Sequential characters (abc, 123, qwe)"); entropy -= 8; break; } }
  if (/^(19|20)\d{2}$|(19|20)\d{2}/.test(pw)) { issues.push("Looks like it contains a year"); entropy -= 6; }
  if (len < 8) issues.push("Shorter than 8 characters");
  if (len >= 8 && pool < 62) issues.push("Add more character types");
  entropy = Math.max(0, entropy);
  const guesses = Math.pow(2, entropy);
  // 10 billion guesses/sec offline GPU attack, 100/sec online throttled
  const secs = guesses / 1e10 / 2;
  const online = guesses / 100 / 2;
  const score = entropy < 28 ? 0 : entropy < 36 ? 1 : entropy < 60 ? 2 : entropy < 80 ? 3 : 4;
  const label = ["Very weak", "Weak", "Fair", "Strong", "Very strong"][score];
  const color = ["#b91c1c", "#c2410c", "#b45309", "#047857", "#065f46"][score];
  return { entropy: Math.round(entropy), guesses, secs, online, score, label, color, issues: Array.from(new Set(issues)), pool, len };
}

export function humanTime(s: number) {
  if (s < 1) return "instantly";
  const u: Array<[number, string]> = [[31557600 * 1e9, "billion years"], [31557600 * 1e6, "million years"], [31557600 * 1000, "thousand years"], [31557600, "years"], [2629800, "months"], [604800, "weeks"], [86400, "days"], [3600, "hours"], [60, "minutes"], [1, "seconds"]];
  for (const [v, n] of u) if (s >= v) { const x = s / v; return `${x >= 100 ? Math.round(x).toLocaleString("en-IN") : x.toFixed(x >= 10 ? 0 : 1)} ${n}`; }
  return "instantly";
}
