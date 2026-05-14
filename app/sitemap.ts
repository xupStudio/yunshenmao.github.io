import type { MetadataRoute } from "next";
import { cats } from "@/data/cats";

export const dynamic = "force-static";

const BASE = "https://yunshenmao.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/story/`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/cats/`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/adopt/`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/support/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/dev/`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/privacy/`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms/`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const catRoutes: MetadataRoute.Sitemap = cats.map((cat) => ({
    url: `${BASE}/cats/${cat.slug}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...catRoutes];
}
