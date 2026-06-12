export type Theme = 'light' | 'dark'
export type Font = 'system' | 'inter' | 'roboto' | 'playfair' | 'montserrat' | 'open-sans' | 'lato' | 'nunito' | 'poppins' | 'raleway' | 'ubuntu' | 'oswald'

const FONT_PRESETS: Record<string, { name: string; cssName: string; category: string }> = {
  system: { name: 'System', cssName: 'system-ui, -apple-system, sans-serif', category: 'Системный' },
  inter: { name: 'Inter', cssName: "'Inter', sans-serif", category: 'Современный' },
  roboto: { name: 'Roboto', cssName: "'Roboto', sans-serif", category: 'Классика' },
  playfair: { name: 'Playfair Display', cssName: "'Playfair Display', serif", category: 'Премиум' },
  montserrat: { name: 'Montserrat', cssName: "'Montserrat', sans-serif", category: 'Современный' },
  'open-sans': { name: 'Open Sans', cssName: "'Open Sans', sans-serif", category: 'Универсальный' },
  lato: { name: 'Lato', cssName: "'Lato', sans-serif", category: 'Универсальный' },
  nunito: { name: 'Nunito', cssName: "'Nunito', sans-serif", category: 'Мягкий' },
  poppins: { name: 'Poppins', cssName: "'Poppins', sans-serif", category: 'Современный' },
  raleway: { name: 'Raleway', cssName: "'Raleway', sans-serif", category: 'Элегантный' },
  ubuntu: { name: 'Ubuntu', cssName: "'Ubuntu', sans-serif", category: 'Технический' },
  oswald: { name: 'Oswald', cssName: "'Oswald', sans-serif", category: 'Акцентный' },
}

const THEME_KEY = 'protoland-theme'
const ACCENT_KEY = 'protoland-accent'
const FONT_KEY = 'protoland-font'
const FONT_WEIGHT_KEY = 'protoland-font-weight'
const CUSTOM_FONT_KEY = 'protoland-custom-font'
const ANIM_KEY = 'protoland-animations'
const SHADOW_KEY = 'protoland-shadows'
const SCROLLBAR_KEY = 'protoland-scrollbar'
const RADIUS_KEY = 'protoland-radius'
const GRADIENT_ENABLED_KEY = 'protoland-gradient-enabled'
const GRADIENT_INTENSITY_KEY = 'protoland-gradient-intensity'
const GRADIENT_FROM_KEY = 'protoland-gradient-from'
const GRADIENT_TO_KEY = 'protoland-gradient-to'

const PRESET_COLORS: Record<string, { light: string; dark: string }> = {
  red: { light: '#e53935', dark: '#ff5252' },
  violet: { light: '#7c3aed', dark: '#a78bfa' },
  indigo: { light: '#4f46e5', dark: '#818cf8' },
  sky: { light: '#0284c7', dark: '#38bdf8' },
  cyan: { light: '#0891b2', dark: '#22d3ee' },
  teal: { light: '#0d9488', dark: '#2dd4bf' },
  lime: { light: '#65a30d', dark: '#a3e635' },
  orange: { light: '#ea580c', dark: '#fb923c' },
  pink: { light: '#db2777', dark: '#f472b6' },
  rose: { light: '#e11d48', dark: '#fb7185' },
  fuchsia: { light: '#c026d3', dark: '#e879f9' },
}

export function darken(hex: string, amount: number): string {
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
  const val = getStoredValue<string>(ANIM_KEY, 'true')
  return val === 'true'
}

export function getStoredShadows(): boolean {
  const val = getStoredValue<string>(SHADOW_KEY, 'true')
  return val === 'true'
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

export function getStoredScrollbar(): boolean {
  const val = getStoredValue<string>(SCROLLBAR_KEY, 'true')
  return val === 'true'
}

export function setShadows(enabled: boolean): void {
  setStoredValue(SHADOW_KEY, enabled.toString())
  const root = document.documentElement
  if (enabled) {
    root.removeAttribute('data-no-shadows')
  } else {
    root.setAttribute('data-no-shadows', '')
  }
}

export function setScrollbar(enabled: boolean): void {
  setStoredValue(SCROLLBAR_KEY, enabled.toString())
  const root = document.documentElement
  if (enabled) {
    root.style.setProperty('--scrollbar-w', '8px')
    root.style.setProperty('--scrollbar-thumb', 'var(--accent)')
    root.style.setProperty('--scrollbar-thumb-hover', 'var(--accent)')
  } else {
    root.style.setProperty('--scrollbar-w', '0px')
    root.style.setProperty('--scrollbar-thumb', 'transparent')
    root.style.setProperty('--scrollbar-thumb-hover', 'transparent')
  }
}

export function getStoredRadius(): number {
  return getStoredValue<number>(RADIUS_KEY, 16)
}

export function getStoredGradientEnabled(): boolean {
  return getStoredValue<string>(GRADIENT_ENABLED_KEY, 'false') === 'true'
}

export function getStoredGradientIntensity(): number {
  return getStoredValue<number>(GRADIENT_INTENSITY_KEY, 70)
}

export function getStoredGradientFrom(): string {
  return getStoredValue<string>(GRADIENT_FROM_KEY, '')
}

export function getStoredGradientTo(): string {
  return getStoredValue<string>(GRADIENT_TO_KEY, '')
}

export function setRadius(px: number): void {
  setStoredValue(RADIUS_KEY, px.toString())
  const root = document.documentElement
  root.style.setProperty('--radius-card', px + 'px')
  root.style.setProperty('--radius-panel', Math.round(px * 0.75) + 'px')
  root.style.setProperty('--radius-btn', Math.round(px * 0.5) + 'px')
}

export function applyGradient(): void {
  const root = document.documentElement
  const enabled = getStoredGradientEnabled()
  const intensity = getStoredGradientIntensity()
  const from = getStoredGradientFrom()
  const to = getStoredGradientTo()

  if (enabled) {
    root.setAttribute('data-gradient-text', 'true')
  } else {
    root.removeAttribute('data-gradient-text')
  }

  root.style.setProperty('--gradient-intensity', intensity.toString())

  if (from) {
    root.style.setProperty('--gradient-from', from)
  } else {
    root.style.removeProperty('--gradient-from')
  }

  if (to) {
    root.style.setProperty('--gradient-to', to)
  } else {
    root.style.removeProperty('--gradient-to')
  }
}

export function setGradientEnabled(enabled: boolean): void {
  setStoredValue(GRADIENT_ENABLED_KEY, enabled.toString())
  applyGradient()
}

export function setGradientIntensity(intensity: number): void {
  setStoredValue(GRADIENT_INTENSITY_KEY, intensity.toString())
  applyGradient()
}

export function setGradientFrom(color: string): void {
  setStoredValue(GRADIENT_FROM_KEY, color)
  applyGradient()
}

export function setGradientTo(color: string): void {
  setStoredValue(GRADIENT_TO_KEY, color)
  applyGradient()
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
    if (font !== 'custom') {
      const preset = FONT_PRESETS[font]
      if (preset) root.style.setProperty('--font-family', preset.cssName)
    } else {
      const custom = getStoredCustomFont()
      if (custom) root.style.setProperty('--font-family', `'${custom}', sans-serif`)
    }
    const weight = getStoredFontWeight()
    root.style.setProperty('--font-weight', weight.toString())
  }
}

export function initTheme(): void {
  const theme = getStoredTheme()
  const accent = getStoredAccent()
  const font = getStoredFont()
  applyTheme(theme, accent, font)
  setFontWeight(getStoredFontWeight())
  const custom = getStoredCustomFont()
  if (custom) {
    loadGoogleFont(custom)
  } else if (font !== 'system') {
    loadGoogleFont(FONT_PRESETS[font]?.name || font)
  }
  setAnimations(getStoredAnimations())
  setShadows(getStoredShadows())
  setScrollbar(getStoredScrollbar())
  setRadius(getStoredRadius())
  applyGradient()
}

export function setTheme(theme: Theme): void {
  const accent = getStoredAccent()
  applyTheme(theme, accent)
}

export function setAccent(accent: string): void {
  const theme = getStoredTheme()
  applyTheme(theme, accent)
}

export function getStoredFontWeight(): number {
  return getStoredValue<number>(FONT_WEIGHT_KEY, 400)
}

export function getStoredCustomFont(): string {
  return getStoredValue<string>(CUSTOM_FONT_KEY, '')
}

export function setFont(font: Font): void {
  const theme = getStoredTheme()
  const accent = getStoredAccent()
  applyTheme(theme, accent, font)
  if (font !== 'system' && font !== 'custom') {
    loadGoogleFont(FONT_PRESETS[font]?.name || font)
  }
}

export function setFontWeight(weight: number): void {
  setStoredValue(FONT_WEIGHT_KEY, weight.toString())
  document.documentElement.style.setProperty('--font-weight', weight.toString())
}

export function setCustomFont(name: string): void {
  setStoredValue(CUSTOM_FONT_KEY, name)
  if (name) {
    loadGoogleFont(name)
    document.documentElement.style.setProperty('--font-family', `'${name}', sans-serif`)
    document.documentElement.setAttribute('data-font', 'custom')
  }
}

export function getEffectiveFont(): string {
  const font = getStoredFont()
  if (font === 'custom') {
    const custom = getStoredCustomFont()
    return custom || 'system-ui, sans-serif'
  }
  return FONT_PRESETS[font]?.cssName || 'system-ui, sans-serif'
}

export function loadGoogleFont(name: string, weights?: string): void {
  if (typeof document === 'undefined') return
  const existing = document.querySelector(`link[href*="${name.replace(/ /g, '+')}"]`)
  if (existing) return
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  const w = weights || '300;400;500;600;700;800;900'
  link.href = `https://fonts.googleapis.com/css2?family=${name.replace(/ /g, '+')}:wght@${w}&display=swap`
  document.head.appendChild(link)
}

export function toggleTheme(): Theme {
  const current = getStoredTheme()
  const next: Theme = current === 'light' ? 'dark' : 'light'
  setTheme(next)
  return next
}

export function resetSettings(): void {
  localStorage.removeItem(THEME_KEY)
  localStorage.removeItem(ACCENT_KEY)
  localStorage.removeItem(FONT_KEY)
  localStorage.removeItem(FONT_WEIGHT_KEY)
  localStorage.removeItem(CUSTOM_FONT_KEY)
  localStorage.removeItem(ANIM_KEY)
  localStorage.removeItem(SHADOW_KEY)
  localStorage.removeItem(SCROLLBAR_KEY)
  localStorage.removeItem(RADIUS_KEY)
  localStorage.removeItem(GRADIENT_ENABLED_KEY)
  localStorage.removeItem(GRADIENT_INTENSITY_KEY)
  localStorage.removeItem(GRADIENT_FROM_KEY)
  localStorage.removeItem(GRADIENT_TO_KEY)
  initTheme()
}

export function exportTheme(): string {
  const theme = getStoredTheme()
  const accent = getStoredAccent()
  const font = getStoredFont()
  const fontWeight = getStoredFontWeight()
  const customFont = getStoredCustomFont()
  const color = getAccentColor(accent, theme)
  const animations = getStoredAnimations()
  const shadows = getStoredShadows()
  const scrollbar = getStoredScrollbar()
  const radius = getStoredRadius()
  const gradientEnabled = getStoredGradientEnabled()
  const gradientIntensity = getStoredGradientIntensity()
  const gradientFrom = getStoredGradientFrom()
  const gradientTo = getStoredGradientTo()
  return JSON.stringify({ theme, accent: color, font, fontWeight, customFont, animations, shadows, scrollbar, radius, gradientEnabled, gradientIntensity, gradientFrom, gradientTo }, null, 2)
}

export function importTheme(json: string): boolean {
  try {
    const data = JSON.parse(json)
    if (!data.theme || !['light', 'dark'].includes(data.theme)) return false
    if (!data.accent || typeof data.accent !== 'string') return false
    const theme = data.theme as Theme
    const accent = data.accent.startsWith('#') ? data.accent : data.accent
    const font = data.font && Object.keys(FONT_PRESETS).includes(data.font) ? data.font as Font : undefined
    const fontWeight = typeof data.fontWeight === 'number' ? data.fontWeight : 400
    const customFont = typeof data.customFont === 'string' ? data.customFont : ''
    const animations = typeof data.animations === 'boolean' ? data.animations : true
    const shadows = typeof data.shadows === 'boolean' ? data.shadows : true
    const scrollbar = typeof data.scrollbar === 'boolean' ? data.scrollbar : true
    const radius = typeof data.radius === 'number' ? data.radius : 16
    const gradientEnabled = typeof data.gradientEnabled === 'boolean' ? data.gradientEnabled : false
    const gradientIntensity = typeof data.gradientIntensity === 'number' ? data.gradientIntensity : 70
    const gradientFrom = typeof data.gradientFrom === 'string' ? data.gradientFrom : ''
    const gradientTo = typeof data.gradientTo === 'string' ? data.gradientTo : ''

    applyTheme(theme, accent, font)
    setFontWeight(fontWeight)
    if (customFont) {
      setCustomFont(customFont)
    } else if (font && font !== 'system') {
      loadGoogleFont(FONT_PRESETS[font]?.name || font)
    }
    setAnimations(animations)
    setShadows(shadows)
    setScrollbar(scrollbar)
    setRadius(radius)
    setGradientEnabled(gradientEnabled)
    setGradientIntensity(gradientIntensity)
    if (gradientFrom) setGradientFrom(gradientFrom)
    if (gradientTo) setGradientTo(gradientTo)
    return true
  } catch {
    return false
  }
}
