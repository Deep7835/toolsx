import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/brand";
import { TOOLS } from "@/lib/registry";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BRAND.name,
    short_name: BRAND.name,
    description: `${TOOLS.length} free, private business utilities for Indian MSMEs.`,
    start_url: "/",
    display: "standalone",
    background_color: "#fafaf9",
    theme_color: "#047857",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
