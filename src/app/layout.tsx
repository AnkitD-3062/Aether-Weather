import type { Metadata, Viewport } from "next";

import { AppShell } from "@/components/app-shell";
import { AppProviders } from "@/providers/app-providers";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Mood Based Music Player",
  description: "A premium mood-reactive music player with adaptive visuals and emotional recommendations.",
  applicationName: "Mood Based Music Player",
};

export const viewport: Viewport = {
  themeColor: "#0b1020",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProviders>
          <AppShell>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  );
}
