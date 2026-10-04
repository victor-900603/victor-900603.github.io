import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { useScrollSpy } from './useScrollSpy'

interface ObserverStub {
  trigger: (entries: unknown[]) => void
}

function lastObserver(): ObserverStub {
  const ctor = globalThis.IntersectionObserver as unknown as { instances: ObserverStub[] }
  return ctor.instances[ctor.instances.length - 1]
}

describe('useScrollSpy', () => {
  beforeEach(() => {
    document.body.innerHTML = '<section id="a"></section><section id="b"></section>'
  })

  it('returns the first id before any intersection', () => {
    const { result } = renderHook(() => useScrollSpy(['a', 'b']))
    expect(result.current).toBe('a')
  })

  it('updates the active id when a section intersects', () => {
    const { result } = renderHook(() => useScrollSpy(['a', 'b']))
    const target = document.getElementById('b')
    if (!target) {
      throw new Error('missing test target')
    }

    act(() => {
      lastObserver().trigger([{ isIntersecting: true, intersectionRatio: 1, target }])
    })

    expect(result.current).toBe('b')
  })
})
