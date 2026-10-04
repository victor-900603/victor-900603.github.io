import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { useLocalStorage } from './useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  afterEach(() => {
    window.localStorage.clear()
  })

  it('returns the initial value when nothing is stored', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'initial'))
    expect(result.current[0]).toBe('initial')
  })

  it('reads an existing value from storage', () => {
    window.localStorage.setItem('key', JSON.stringify('stored'))
    const { result } = renderHook(() => useLocalStorage('key', 'initial'))
    expect(result.current[0]).toBe('stored')
  })

  it('writes updates to storage', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'initial'))

    act(() => {
      result.current[1]('next')
    })

    expect(result.current[0]).toBe('next')
    expect(window.localStorage.getItem('key')).toBe(JSON.stringify('next'))
  })

  it('supports functional updates', () => {
    const { result } = renderHook(() => useLocalStorage('count', 1))

    act(() => {
      result.current[1]((prev) => prev + 1)
    })

    expect(result.current[0]).toBe(2)
  })
})
