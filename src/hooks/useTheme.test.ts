import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { setTheme, THEME_STORAGE_KEY, toggleTheme, useTheme } from './useTheme'

describe('useTheme', () => {
  beforeEach(() => {
    window.localStorage.clear()
    setTheme('light')
  })

  it('starts from the current theme', () => {
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('light')
  })

  it('applies the dark class and persists when toggled', () => {
    const { result } = renderHook(() => useTheme())

    act(() => {
      result.current.toggle()
    })

    expect(result.current.theme).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark')
  })

  it('exposes setTheme on the hook', () => {
    const { result } = renderHook(() => useTheme())

    act(() => {
      result.current.setTheme('dark')
    })

    expect(result.current.theme).toBe('dark')
  })

  it('toggleTheme flips the shared store', () => {
    expect(toggleTheme).toBeTypeOf('function')
    toggleTheme()
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })
})
