import { useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'theme'

function getSystemTheme(): Theme {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return 'light'
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'light'
  }
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') {
      return stored
    }
  } catch {
    // Storage unavailable; fall back to the system preference.
  }
  return getSystemTheme()
}

const listeners = new Set<() => void>()

let currentTheme: Theme = getInitialTheme()

function applyTheme(theme: Theme) {
  if (typeof document === 'undefined') {
    return
  }
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.style.colorScheme = theme
}

function emit() {
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function getSnapshot(): Theme {
  return currentTheme
}

export function setTheme(theme: Theme) {
  currentTheme = theme
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // Ignore storage failures; the in-memory theme still applies.
  }
  applyTheme(theme)
  emit()
}

export function toggleTheme() {
  setTheme(currentTheme === 'dark' ? 'light' : 'dark')
}

applyTheme(currentTheme)

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  return { theme, setTheme, toggle: toggleTheme }
}
