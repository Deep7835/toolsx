import { Receipt, Landmark, Users, TrendingUp, QrCode, Package, Store, Image as ImageIcon, Briefcase, Scale, type LucideProps } from "lucide-react";
import type { ComponentType } from "react";

const map: Record<string, ComponentType<LucideProps>> = {
  receipt: Receipt, landmark: Landmark, users: Users, "trending-up": TrendingUp, "qr-code": QrCode, package: Package, store: Store, image: ImageIcon, briefcase: Briefcase, scale: Scale,
};

export function CategoryIcon({ name, className }: { name: string; className?: string }) {
  const I = map[name] ?? Receipt;
  return <I className={className} strokeWidth={1.75} aria-hidden />;
}
