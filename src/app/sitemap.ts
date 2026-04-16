import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const baseUrl = "https://ankitd-3062.github.io/Aether-Weather";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/"];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
