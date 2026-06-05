import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/a-gurizada`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/roles`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/eventos`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/parceiros`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/loja`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];
}
