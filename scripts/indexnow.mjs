#!/usr/bin/env node
/**
 * Submit every sitemap URL to IndexNow (Bing, Yandex, Seznam, Naver).
 * The key is a public text file at the site root; no account is needed.
 * Runs after `npm run deploy`; `npm run indexnow -- --dry` prints without submitting.
 */
import { readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kaagazo.com";
const ENDPOINT = "https://api.indexnow.org/indexnow";
const dry = process.argv.includes("--dry");

const key = readdirSync(join(ROOT, "public")).find((f) => /^[0-9a-f]{32}\.txt$/.test(f))?.replace(/\.txt$/, "");
if (!key) { console.error("No IndexNow key file in public/ (expected <32-hex>.txt)"); process.exit(1); }

const res = await fetch(`${SITE}/sitemap.xml`);
if (!res.ok) { console.error(`sitemap.xml returned ${res.status}`); process.exit(1); }
const urlList = [...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urlList.length) { console.error("sitemap.xml had no <loc> entries"); process.exit(1); }

const host = new URL(SITE).host;
const body = { host, key, keyLocation: `${SITE}/${key}.txt`, urlList };
console.log(`IndexNow: ${urlList.length} URLs for ${host}${dry ? " (dry run)" : ""}`);
if (dry) process.exit(0);

const post = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json; charset=utf-8" }, body: JSON.stringify(body) });
// 200 = accepted, 202 = accepted but key still being validated
if (post.status === 200 || post.status === 202) console.log(`IndexNow: submitted (HTTP ${post.status})`);
else { console.error(`IndexNow: HTTP ${post.status} — ${await post.text()}`); process.exit(1); }
