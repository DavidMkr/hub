import { expect, test } from "@playwright/test"

const routes = ["/", "/about", "/resume", "/work"] as const

for (const route of routes) {
  test(`${route} returns 200`, async ({ page }) => {
    const response = await page.goto(route)
    expect(response?.ok()).toBeTruthy()
  })
}

test("Mkrty wordmark is the header brand", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByRole("banner").getByRole("link", { name: "Mkrty" })).toBeVisible()
  await expect(page).toHaveTitle(/Mkrty/)
})

test("primary nav reaches every v1 page", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "About" }).click()
  await expect(page).toHaveURL(/\/about\/?$/)
  await expect(page.getByRole("heading", { name: "About" })).toBeVisible()

  await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Resume" }).click()
  await expect(page.getByRole("heading", { name: "Resume" })).toBeVisible()

  await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Work" }).click()
  await expect(page.getByRole("link", { name: "NicPics" })).toBeVisible()
  await expect(page.getByRole("link", { name: "Modern Painting" })).toBeVisible()
})

test("theme toggle persists across pages", async ({ page }) => {
  await page.goto("/")
  await expect(page.locator("html")).toHaveClass(/dark/)
  await page.getByRole("button", { name: "Switch to light mode" }).click()
  await expect(page.locator("html")).not.toHaveClass(/dark/)
  await page.goto("/about")
  await expect(page.locator("html")).not.toHaveClass(/dark/)
})

test("chat dock answers from local content", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("button", { name: "Chat" }).click()
  await page.getByLabel("Ask this site").fill("Where is the resume?")
  await page.getByRole("button", { name: "Send" }).click()
  await expect(page.locator("[data-chat-role='assistant']").last()).toContainText(/resume/i)
})

test("footer exposes email github and linkedin", async ({ page }) => {
  await page.goto("/")
  const contact = page.getByRole("navigation", { name: "Contact" })
  await expect(contact.getByRole("link", { name: "Email" })).toHaveAttribute("href", /mailto:/)
  await expect(contact.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", /github/)
  await expect(contact.getByRole("link", { name: "LinkedIn" })).toHaveAttribute("href", /linkedin/)
})

test("interactive controls have press styles", async ({ page }) => {
  await page.goto("/")
  await expect(page.locator("[data-pressable]").first()).toHaveClass(/pressable/)
  const display = await page.locator(".pressable").first().evaluate((el) => getComputedStyle(el).transitionProperty)
  expect(display).toMatch(/transform/)
})

test("reduced motion still navigates", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto("/")
  await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Resume" }).click()
  await expect(page.getByRole("heading", { name: "Resume" })).toBeVisible()
})

test("skip link and landmarks exist", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByRole("link", { name: "Skip to content" })).toHaveAttribute("href", "#main")
  await expect(page.getByRole("main")).toBeVisible()
  await expect(page.getByRole("banner")).toBeVisible()
  await expect(page.getByRole("contentinfo")).toBeVisible()
})
