import { nav } from "../content/site"

export const pageRoutes = ["/", "/about", "/resume", "/work"] as const

export type PageRoute = (typeof pageRoutes)[number]

export function normalizePath(pathname: string): string {
  if (pathname === "/") {
    return "/"
  }
  return pathname.replace(/\/+$/, "") || "/"
}

export function isCurrentPath(pathname: string, href: string): boolean {
  const current = normalizePath(pathname)
  const target = normalizePath(href)
  if (target === "/") {
    return current === "/"
  }
  return current === target || current.startsWith(`${target}/`)
}

export function canonicalUrl(site: string, pathname: string): string {
  const base = site.replace(/\/+$/, "")
  const path = normalizePath(pathname)
  return path === "/" ? `${base}/` : `${base}${path}/`
}

export function navHrefs(): string[] {
  return nav.map((item) => item.href)
}
