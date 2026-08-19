import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import { describe, expect, it } from "vitest"
import { pageRoutes } from "../src/lib/paths"

const dist = resolve("dist")

function readDist(route: string): string {
  const file = route === "/" ? "index.html" : `${route.replace(/^\//, "")}/index.html`
  return readFileSync(resolve(dist, file), "utf8")
}

describe("built html invariants", () => {
  it("has a production build", () => {
    expect(existsSync(resolve(dist, "index.html"))).toBe(true)
  })

  it("ships every v1 route", () => {
    for (const route of pageRoutes) {
      const html = readDist(route)
      expect(html).toContain("Skip to content")
      expect(html).toContain('id="main"')
      expect(html).toContain("data-theme-toggle")
      expect(html).toContain("data-chat-dock")
      expect(html).toContain("data-pressable")
      expect(html).toContain("hub-theme")
      expect(html).not.toContain(">TODO<")
    }
  })

  it("resume page can print", () => {
    const html = readDist("/resume")
    expect(html).toContain("data-print-resume")
    expect(html).toContain("data-resume-page")
    const css = readFileSync(resolve("src/styles/global.css"), "utf8")
    expect(css).toContain("@media print")
    expect(css).toContain(".pressable:active")
  })

  it("work page lists public projects", () => {
    const html = readDist("/work")
    expect(html).toContain("NicPics")
    expect(html).toContain("Modern Painting")
    expect(html).not.toContain("trimble-demo")
    expect(html).not.toContain("data-work-empty")
  })

  it("home keeps identity CTAs", () => {
    const html = readDist("/")
    expect(html).toContain("Resume")
    expect(html).toContain("GitHub")
    expect(html).toContain("LinkedIn")
    expect(html).toContain("Mkrty")
  })
})
