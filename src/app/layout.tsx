import type { Metadata, Viewport } from "next";

import { AppShell } from "@/components/app-shell";
import { AppProviders } from "@/providers/app-providers";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Aether Weather",
  description: "A cinematic weather web app with immersive video backdrops, glassmorphism UI, and fluid transitions.",
  applicationName: "Aether Weather",
  metadataBase: new URL("https://ankitd-3062.github.io/Aether-Weather/"),
  openGraph: {
    title: "Aether Weather",
    description: "Watch each city unfold through cinematic weather scenes, ambient motion, and a premium glass interface.",
    siteName: "Aether Weather",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aether Weather",
    description: "Cinematic weather experience built with Next.js.",
  },
};

export const viewport: Viewport = {
  themeColor: "#080f1d",
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
