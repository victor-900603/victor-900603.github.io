import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useTypewriter } from './useTypewriter'

type MediaMap = Record<string, boolean>

describe('useTypewriter', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    ;(globalThis as { __mediaQueries?: MediaMap }).__mediaQueries = {}
  })

  afterEach(() => {
    vi.useRealTimers()
    ;(globalThis as { __mediaQueries?: MediaMap }).__mediaQueries = {}
  })

  it('types characters over time', () => {
    const { result } = renderHook(() =>
      useTypewriter(['ab'], { typeSpeed: 10, deleteSpeed: 5, pause: 50 }),
    )

    expect(result.current).toBe('')

    act(() => vi.advanceTimersByTime(10))
    expect(result.current).toBe('a')

    act(() => vi.advanceTimersByTime(10))
    expect(result.current).toBe('ab')
  })

  it('deletes after the pause', () => {
    const { result } = renderHook(() =>
      useTypewriter(['ab'], { typeSpeed: 10, deleteSpeed: 5, pause: 20 }),
    )

    act(() => vi.advanceTimersByTime(10))
    act(() => vi.advanceTimersByTime(10))
    expect(result.current).toBe('ab')

    act(() => vi.advanceTimersByTime(20))
    expect(result.current).toBe('a')

    act(() => vi.advanceTimersByTime(5))
    expect(result.current).toBe('')
  })

  it('renders the first word without animation when reduced motion is set', () => {
    ;(globalThis as { __mediaQueries?: MediaMap }).__mediaQueries = {
      'prefers-reduced-motion': true,
    }

    const { result } = renderHook(() => useTypewriter(['hello', 'world']))
    expect(result.current).toBe('hello')
  })

  it('returns an empty string when there are no words', () => {
    const { result } = renderHook(() => useTypewriter([]))
    expect(result.current).toBe('')
  })
})
