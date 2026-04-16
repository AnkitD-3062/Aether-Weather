"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export function LegacyRouteRedirect() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-6 text-[var(--foreground)]">
      <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-black/25 p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.32em] text-white/45">Aether Weather</p>
        <h1 className="mt-4 text-3xl font-semibold text-white">Redirecting to the live weather experience</h1>
        <p className="mt-4 text-sm leading-7 text-white/65">
          <span className="font-semibold text-white/85">{pathname}</span> is a legacy route from the previous project and now redirects to the main app.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full border border-white/12 bg-white/10 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/14"
        >
          Open Aether Weather
        </Link>
      </div>
    </main>
  );
}
