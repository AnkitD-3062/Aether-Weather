import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at top, rgba(255,255,255,0.24), transparent 32%), linear-gradient(135deg, #7b61ff, #3ddc97)",
          color: "#fff",
          fontSize: 220,
        }}
      >
        🎧
      </div>
    ),
    size,
  );
}
