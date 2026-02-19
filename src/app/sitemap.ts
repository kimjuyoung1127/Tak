import type { MetadataRoute } from "next";
import { getAllPortfolioSlugs } from "@/lib/content/portfolio";

const BASE_URL = "https://takdjang.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const portfolioSlugs = getAllPortfolioSlugs();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const portfolioPages: MetadataRoute.Sitemap = portfolioSlugs.map((slug) => ({
    url: `${BASE_URL}/portfolio/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...portfolioPages];
}
