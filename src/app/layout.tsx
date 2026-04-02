import type { Metadata, Viewport } from "next";

import { AppShell } from "@/components/app-shell";
import { AppProviders } from "@/providers/app-providers";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Mood Based Music Player",
  description: "A premium mood-reactive music player with adaptive visuals, playlist generation, and a cinematic listening interface.",
  applicationName: "Mood Based Music Player",
  metadataBase: new URL("https://ankitd-3062.github.io/Mood-Based-Music-Player/"),
  openGraph: {
    title: "Mood Based Music Player",
    description: "Choose a mood, generate a soundtrack, and watch the interface react in real time.",
    siteName: "Mood Based Music Player",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mood Based Music Player",
    description: "Mood-reactive music UI built with Next.js.",
  },
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
