import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const fontData = await readFile(
    path.join(process.cwd(), "app/_lib/Geist-Bold.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#18181b",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#f4f4f5",
          fontFamily: "Geist",
          fontSize: 38,
          letterSpacing: -2,
          fontWeight: 700,
        }}
      >
        CB
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: fontData, weight: 700, style: "normal" },
      ],
    }
  );
}
