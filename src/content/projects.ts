export type ProjectHost = "external" | "subdomain" | "path"
export type ProjectStatus = "draft" | "live" | "archived"

export type Project = {
  slug: string
  title: string
  summary: string
  tags: string[]
  status: ProjectStatus
  href: string
  host: ProjectHost
}

export const projects: Project[] = [
  {
    slug: "nicpics",
    title: "NicPics",
    summary: "Swift iOS app that shows a random Nicolas Cage photo when you tap the screen.",
    tags: ["Swift", "iOS"],
    status: "live",
    href: "https://github.com/DavidMkr/NicPics",
    host: "external",
  },
  {
    slug: "modern-painting",
    title: "Modern Painting",
    summary:
      "Brochure and estimate site for a Lynnwood / Seattle painting contractor. Astro, TypeScript, English, Spanish, and Russian.",
    tags: ["Astro", "TypeScript"],
    status: "live",
    href: "https://github.com/DavidMkr/ModernPaint",
    host: "external",
  },
]
