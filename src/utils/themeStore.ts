export type Theme = 'light' | 'dark'
export type Accent = 'red' | 'green' | 'blue'

const THEME_KEY = 'protoland-theme'
const ACCENT_KEY = 'protoland-accent'

function getStoredValue<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const stored = localStorage.getItem(key)
    return stored !== null ? (stored as T) : fallback
  } catch {
    return fallback
  }
}

function setStoredValue(key: string, value: string): void {
  try {
    localStorage.setItem(key, value)
  } catch {
    /* localStorage unavailable */
  }
}

export function getStoredTheme(): Theme {
  return getStoredValue<Theme>(THEME_KEY, 'light')
}

export function getStoredAccent(): Accent {
  return getStoredValue<Accent>(ACCENT_KEY, 'red')
}

function applyTheme(theme: Theme, accent: Accent): void {
  const root = document.documentElement
  root.setAttribute('data-theme', theme)
  root.setAttribute('data-accent', accent)
  setStoredValue(THEME_KEY, theme)
  setStoredValue(ACCENT_KEY, accent)
}

export function initTheme(): void {
  const theme = getStoredTheme()
  const accent = getStoredAccent()
  applyTheme(theme, accent)
}

export function setTheme(theme: Theme): void {
  const accent = getStoredAccent()
  applyTheme(theme, accent)
}

export function setAccent(accent: Accent): void {
  const theme = getStoredTheme()
  applyTheme(theme, accent)
}

export function toggleTheme(): Theme {
  const current = getStoredTheme()
  const next: Theme = current === 'light' ? 'dark' : 'light'
  setTheme(next)
  return next
}
