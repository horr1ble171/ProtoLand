export type Theme = 'light' | 'dark'
export type Font = 'system' | 'inter' | 'roboto' | 'playfair'

const THEME_KEY = 'protoland-theme'
const ACCENT_KEY = 'protoland-accent'
const FONT_KEY = 'protoland-font'
const ANIM_KEY = 'protoland-animations'

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

export function getStoredFont(): Font {
  return getStoredValue<Font>(FONT_KEY, 'system')
}

export function getStoredAnimations(): boolean {
  return getStoredValue<boolean>(ANIM_KEY, true)
}

export function setAnimations(enabled: boolean): void {
  setStoredValue(ANIM_KEY, enabled.toString())
  const root = document.documentElement
  if (enabled) {
    root.removeAttribute('data-no-animations')
  } else {
    root.setAttribute('data-no-animations', '')
  }
}

export function getAccentColor(accent: string, theme: Theme): string {
  if (accent.startsWith('#')) return accent
  return PRESET_COLORS[accent]?.[theme] ?? PRESET_COLORS.red[theme]
}

export function applyTheme(theme: Theme, accent: string, font?: Font): void {
  const root = document.documentElement
  root.setAttribute('data-theme', theme)
  root.setAttribute('data-accent', 'custom')

  const color = accent.startsWith('#') ? accent : PRESET_COLORS[accent]?.[theme] ?? PRESET_COLORS.red[theme]
  const hover = darken(color, theme === 'light' ? -30 : 20)

  root.style.setProperty('--accent', color)
  root.style.setProperty('--accent-hover', hover)

  setStoredValue(THEME_KEY, theme)
  setStoredValue(ACCENT_KEY, accent)

  if (font) {
    root.setAttribute('data-font', font)
    setStoredValue(FONT_KEY, font)
  }
}

export function initTheme(): void {
  const theme = getStoredTheme()
  const accent = getStoredAccent()
  const font = getStoredFont()
  applyTheme(theme, accent, font)
  setAnimations(getStoredAnimations())
}

export function setTheme(theme: Theme): void {
  const accent = getStoredAccent()
  applyTheme(theme, accent)
}

export function setAccent(accent: string): void {
  const theme = getStoredTheme()
  applyTheme(theme, accent)
}

export function setFont(font: Font): void {
  const theme = getStoredTheme()
  const accent = getStoredAccent()
  applyTheme(theme, accent, font)
}

export function toggleTheme(): Theme {
  const current = getStoredTheme()
  const next: Theme = current === 'light' ? 'dark' : 'light'
  setTheme(next)
  return next
}

export function exportTheme(): string {
  const theme = getStoredTheme()
  const accent = getStoredAccent()
  const font = getStoredFont()
  const color = getAccentColor(accent, theme)
  const animations = getStoredAnimations()
  return JSON.stringify({ theme, accent: color, font, animations }, null, 2)
}

export function importTheme(json: string): boolean {
  try {
    const data = JSON.parse(json)
    if (!data.theme || !['light', 'dark'].includes(data.theme)) return false
    if (!data.accent || typeof data.accent !== 'string') return false
    const theme = data.theme as Theme
    const accent = data.accent.startsWith('#') ? data.accent : data.accent
    const font = data.font && ['system', 'inter', 'roboto', 'playfair'].includes(data.font) ? data.font as Font : undefined
    const animations = typeof data.animations === 'boolean' ? data.animations : true

    applyTheme(theme, accent, font)
    setAnimations(animations)
    return true
  } catch {
    return false
  }
}
