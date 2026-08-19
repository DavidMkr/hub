export const THEME_STORAGE_KEY = "hub-theme"

export type Theme = "light" | "dark"

export function parseTheme(value: string | null | undefined): Theme {
  return value === "light" ? "light" : "dark"
}

export function nextTheme(current: Theme): Theme {
  return current === "dark" ? "light" : "dark"
}

export function themeToggleLabel(theme: Theme): string {
  return theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
}
