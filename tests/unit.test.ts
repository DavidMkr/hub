import { describe, expect, it } from "vitest"
import { faq } from "../src/content/faq"
import { projects } from "../src/content/projects"
import { resume } from "../src/content/resume"
import { nav, site } from "../src/content/site"
import { answerFromFaq, CHAT_EMPTY, CHAT_FALLBACK, scoreFaq, tokens } from "../src/lib/chat"
import { isCurrentPath, navHrefs, normalizePath, pageRoutes } from "../src/lib/paths"
import { nextTheme, parseTheme, THEME_STORAGE_KEY, themeToggleLabel } from "../src/lib/theme"

describe("site content", () => {
  it("has identity fields", () => {
    expect(site.brand).toBe("Mkrty")
    expect(site.name).toBe("David Mkrtychyan")
    expect(site.email).toBe("dmkrtychyan@gmail.com")
    expect(site.github).toBe("https://github.com/DavidMkr")
    expect(site.linkedin).toBe("https://www.linkedin.com/in/mkrtychyan/")
    expect(site.now).toContain("Trimble")
  })

  it("nav matches the v1 routes", () => {
    expect(navHrefs()).toEqual(["/", "/about", "/resume", "/work"])
    expect(pageRoutes).toEqual(["/", "/about", "/resume", "/work"])
    expect(nav.some((item) => item.label === "TODO")).toBe(false)
  })

  it("resume has structured experience and skills", () => {
    expect(resume.experience.length).toBeGreaterThan(0)
    expect(resume.experience[0]?.company).toBe("Trimble")
    expect(resume.experience[0]?.summary.toLowerCase()).toContain("viewpoint")
    expect(resume.education[0]?.school).toContain("Washington Tacoma")
    expect(resume.skills).toContain("TypeScript")
  })

  it("projects catalog lists public GitHub work", () => {
    expect(projects.map((project) => project.slug)).toEqual(["nicpics", "modern-painting"])
  })
})

describe("paths", () => {
  it("normalizes trailing slashes", () => {
    expect(normalizePath("/about/")).toBe("/about")
    expect(normalizePath("/")).toBe("/")
  })

  it("marks current nav items", () => {
    expect(isCurrentPath("/", "/")).toBe(true)
    expect(isCurrentPath("/about", "/")).toBe(false)
    expect(isCurrentPath("/resume", "/resume")).toBe(true)
  })
})

describe("theme", () => {
  it("defaults to dark", () => {
    expect(parseTheme(null)).toBe("dark")
    expect(parseTheme("nope")).toBe("dark")
    expect(parseTheme("light")).toBe("light")
    expect(THEME_STORAGE_KEY).toBe("hub-theme")
  })

  it("toggles dark and light", () => {
    expect(nextTheme("dark")).toBe("light")
    expect(nextTheme("light")).toBe("dark")
    expect(themeToggleLabel("dark")).toBe("Switch to light mode")
  })
})

describe("chat local backend", () => {
  it("tokenizes queries", () => {
    expect(tokens("Resume PDF?")).toEqual(["resume", "pdf"])
  })

  it("scores FAQ overlap", () => {
    const resumeFaq = faq.find((item) => item.q.includes("resume"))
    expect(resumeFaq).toBeTruthy()
    expect(scoreFaq("where is the resume pdf", resumeFaq!)).toBeGreaterThan(0)
  })

  it("answers resume questions from local content", () => {
    const reply = answerFromFaq("Where can I see your resume?", faq)
    expect(reply.answer.toLowerCase()).toContain("resume")
    expect(reply.sources?.[0]).toBeTruthy()
  })

  it("returns empty and fallback copy", () => {
    expect(answerFromFaq("   ", faq).answer).toBe(CHAT_EMPTY)
    expect(answerFromFaq("zzzz-not-a-topic", faq).answer).toBe(CHAT_FALLBACK)
  })
})
