import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Every page and /og image is prerendered at build time and never revalidated,
// so the read-only static-assets cache serves them straight from Workers Assets.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
