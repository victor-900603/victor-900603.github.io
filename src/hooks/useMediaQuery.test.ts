import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { useMediaQuery } from './useMediaQuery'

type MediaMap = Record<string, boolean>

describe('useMediaQuery', () => {
  beforeEach(() => {
    ;(globalThis as { __mediaQueries?: MediaMap }).__mediaQueries = {}
  })

  it('returns false when the query does not match', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 1024px)'))
    expect(result.current).toBe(false)
  })

  it('returns true when the query matches', () => {
    ;(globalThis as { __mediaQueries?: MediaMap }).__mediaQueries = { '1024': true }
    const { result } = renderHook(() => useMediaQuery('(min-width: 1024px)'))
    expect(result.current).toBe(true)
  })
})
