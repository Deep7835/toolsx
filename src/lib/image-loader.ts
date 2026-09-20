/** Static image loader: our /og/* images are prerendered at 1200×630 and 600×315; pick the smaller when it fits. No runtime optimisation needed. */
export default function loader({ src, width }: { src: string; width: number; quality?: number }) {
  if (/^\/og\/(blog|tool)\/[^/]+$/.test(src)) return width <= 640 ? `${src}/thumb` : src;
  return src;
}
