import { ImageResponse } from "next/og";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export default function AppleIcon() {
  return new ImageResponse(
    <div style={{ width: 180, height: 180, display: "flex", alignItems: "center", justifyContent: "center", background: "#0b0b0d", borderRadius: 40 }}>
      <svg viewBox="0 0 24 24" width="104" height="104" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 4h7l4 4v12H7z" /><path d="M14 4v4h4M10 13h5M10 17h5" /></svg>
    </div>,
    size,
  );
}
