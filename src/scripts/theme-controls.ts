import {
  THEME_STORAGE_KEY,
  nextTheme,
  parseTheme,
  themeToggleLabel,
  type Theme,
} from "../lib/theme"

export function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle("dark", theme === "dark")
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
}

export function currentTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light"
}

function syncToggleButtons(root: ParentNode): void {
  const theme = currentTheme()
  const pressed = theme === "dark" ? "true" : "false"
  const label = themeToggleLabel(theme)
  for (const button of root.querySelectorAll<HTMLButtonElement>("[data-theme-toggle]")) {
    button.setAttribute("aria-pressed", pressed)
    button.setAttribute("aria-label", label)
    button.title = label
  }
}

export function initThemeControls(root: ParentNode = document): void {
  applyTheme(parseTheme(localStorage.getItem(THEME_STORAGE_KEY)))
  syncToggleButtons(root)

  for (const button of root.querySelectorAll("[data-theme-toggle]")) {
    if (button instanceof HTMLElement && button.dataset.themeBound === "true") {
      continue
    }
    if (button instanceof HTMLElement) {
      button.dataset.themeBound = "true"
    }
    button.addEventListener("click", () => {
      const next = nextTheme(currentTheme())
      localStorage.setItem(THEME_STORAGE_KEY, next)
      applyTheme(next)
      syncToggleButtons(root)
    })
  }
}
