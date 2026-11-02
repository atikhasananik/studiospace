import { ImageResponse } from "next/og";

export const alt =
  "StudioSpace — find and book creative studios for your next project";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          color: "#FFFFFF",
          background:
            "radial-gradient(ellipse at 82% 18%, rgba(0,242,254,0.18), transparent 34%), radial-gradient(ellipse at 8% 100%, rgba(255,77,0,0.2), transparent 42%), #090A0F",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "-0.04em",
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 999,
              background: "#00F2FE",
              boxShadow: "0 0 28px rgba(0,242,254,0.7)",
            }}
          />
          Studio<span style={{ color: "#FF4D00" }}>Space</span>
          <span
            style={{
              marginLeft: 12,
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: 999,
              padding: "9px 16px",
              color: "#00F2FE",
              fontSize: 13,
              letterSpacing: "0.16em",
            }}
          >
            MADE FOR CREATORS
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              color: "#00F2FE",
              fontSize: 17,
              fontWeight: 700,
              letterSpacing: "0.2em",
            }}
          >
            YOUR NEXT PROJECT STARTS HERE
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 930,
              fontSize: 76,
              lineHeight: 1.05,
              fontWeight: 800,
              letterSpacing: "-0.055em",
            }}
          >
            <span>Find your space.</span>
            <span>
              Make something <span style={{ color: "#FF4D00" }}>great.</span>
            </span>
          </div>
          <div
            style={{
              color: "#A7AFBF",
              fontSize: 24,
              lineHeight: 1.45,
            }}
          >
            Photography · Film · Podcast · Music · Production
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.16)",
            paddingTop: 22,
            color: "#A7AFBF",
            fontSize: 16,
            letterSpacing: "0.12em",
          }}
        >
          <span>DISCOVER · BOOK · CREATE</span>
          <span style={{ color: "#FFFFFF" }}>STUDIOSPACE</span>
        </div>
      </div>
    ),
    size,
  );
}
