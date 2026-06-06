export type Theme = 'light' | 'dark'

const THEME_KEY = 'protoland-theme'
const ACCENT_KEY = 'protoland-accent'

const PRESET_COLORS: Record<string, { light: string; dark: string }> = {
  red: { light: '#e53935', dark: '#ff5252' },
  green: { light: '#2e7d32', dark: '#4caf50' },
  blue: { light: '#1565c0', dark: '#42a5f5' },
}

function darken(hex: string, amount: number): string {
  const num = parseInt(hex.slice(1), 16)
  const r = Math.max(0, (num >> 16) + amount)
  const g = Math.max(0, ((num >> 8) & 0x00ff) + amount)
  const b = Math.max(0, (num & 0x0000ff) + amount)
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`
}

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
  } catch { /* unavailable */ }
}

export function getStoredTheme(): Theme {
  return getStoredValue<Theme>(THEME_KEY, 'light')
}

export function getStoredAccent(): string {
  return getStoredValue<string>(ACCENT_KEY, 'red')
}

export function getAccentColor(accent: string, theme: Theme): string {
  if (accent.startsWith('#')) return accent
  return PRESET_COLORS[accent]?.[theme] ?? PRESET_COLORS.red[theme]
}

export function getAccentHover(accent: string, theme: Theme): string {
  const color = getAccentColor(accent, theme)
  return darken(color, theme === 'light' ? -30 : 20)
}

export function applyTheme(theme: Theme, accent: string): void {
  const root = document.documentElement
  root.setAttribute('data-theme', theme)
  root.setAttribute('data-accent', 'custom')

  const color = accent.startsWith('#') ? accent : PRESET_COLORS[accent]?.[theme] ?? PRESET_COLORS.red[theme]
  const hover = darken(color, theme === 'light' ? -30 : 20)

  root.style.setProperty('--accent', color)
  root.style.setProperty('--accent-hover', hover)

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

export function setAccent(accent: string): void {
  const theme = getStoredTheme()
  applyTheme(theme, accent)
}

export function toggleTheme(): Theme {
  const current = getStoredTheme()
  const next: Theme = current === 'light' ? 'dark' : 'light'
  setTheme(next)
  return next
}
