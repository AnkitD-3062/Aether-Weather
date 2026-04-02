"use client";

import { usePathname } from "next/navigation";

import { BottomNav } from "@/components/bottom-nav";
import { MiniPlayer } from "@/components/mini-player";

const hiddenRoutes = new Set(["/", "/onboarding"]);

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showChrome = !hiddenRoutes.has(pathname);

  return (
    <>
      {children}
      {showChrome ? (
        <>
          <MiniPlayer />
          <BottomNav />
        </>
      ) : null}
    </>
  );
}
