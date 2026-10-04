#!/usr/bin/env node
/**
 * Notify IndexNow (Bing, Yandex, Seznam, Naver) about URLs whose content actually changed.
 *
 * Bing's webmaster guidelines ask for timely, targeted notifications and say to avoid batch
 * submissions — resubmitting every URL on every deploy is crawl waste and a weak freshness
 * signal. So we diff the sitemap's <lastmod> values against the last run and send only what moved.
 *
 *   npm run indexnow            submit changed URLs
 *   npm run indexnow -- --dry   show what would be submitted
 *   npm run indexnow -- --all   force a full submission (first run, or after a site-wide change)
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const STATE = join(ROOT, ".indexnow-state.json");
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kaagazo.com";
const ENDPOINT = "https://api.indexnow.org/indexnow";
const dry = process.argv.includes("--dry");
const all = process.argv.includes("--all");

const key = readdirSync(join(ROOT, "public")).find((f) => /^[0-9a-f]{32}\.txt$/.test(f))?.replace(/\.txt$/, "");
if (!key) { console.error("No IndexNow key file in public/ (expected <32-hex>.txt)"); process.exit(1); }

const res = await fetch(`${SITE}/sitemap.xml`);
if (!res.ok) { console.error(`sitemap.xml returned ${res.status}`); process.exit(1); }
const xml = await res.text();

/** url -> lastmod (or "" when the sitemap omits one) */
const current = {};
for (const block of xml.split("<url>").slice(1)) {
  const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1];
  if (loc) current[loc] = block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] ?? "";
}
const urls = Object.keys(current);
if (!urls.length) { console.error("sitemap.xml had no <loc> entries"); process.exit(1); }

const previous = !all && existsSync(STATE) ? JSON.parse(readFileSync(STATE, "utf8")).urls ?? {} : {};
const changed = urls.filter((u) => current[u] !== previous[u]);

if (!changed.length) { console.log(`IndexNow: nothing changed across ${urls.length} URLs`); process.exit(0); }
console.log(`IndexNow: ${changed.length} changed of ${urls.length}${dry ? " (dry run)" : ""}`);
for (const u of changed.slice(0, 12)) console.log(`  ${u}`);
if (changed.length > 12) console.log(`  …and ${changed.length - 12} more`);
if (dry) process.exit(0);

const body = { host: new URL(SITE).host, key, keyLocation: `${SITE}/${key}.txt`, urlList: changed };
const post = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json; charset=utf-8" }, body: JSON.stringify(body) });
// 200 = accepted, 202 = accepted while the key is still being validated
if (post.status !== 200 && post.status !== 202) { console.error(`IndexNow: HTTP ${post.status} — ${await post.text()}`); process.exit(1); }
console.log(`IndexNow: submitted (HTTP ${post.status})`);

mkdirSync(dirname(STATE), { recursive: true });
writeFileSync(STATE, JSON.stringify({ submittedAt: new Date().toISOString(), urls: current }, null, 2));
