import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const baseUrl = "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/onboarding", "/mood", "/home", "/player", "/history", "/explore", "/profile"];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
