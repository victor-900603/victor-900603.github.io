import { render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ParticleField } from './ParticleField'

type MediaMap = Record<string, boolean>

function createFakeContext() {
  return {
    globalAlpha: 1,
    strokeStyle: '',
    fillStyle: '',
    clearRect: vi.fn(),
    setTransform: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    stroke: vi.fn(),
    fillRect: vi.fn(),
  }
}

describe('ParticleField', () => {
  beforeEach(() => {
    ;(globalThis as { __mediaQueries?: MediaMap }).__mediaQueries = {}
    vi.stubGlobal(
      'requestAnimationFrame',
      vi.fn(() => 1),
    )
    vi.stubGlobal('cancelAnimationFrame', vi.fn())
    vi.spyOn(HTMLCanvasElement.prototype, 'getBoundingClientRect').mockReturnValue({
      width: 320,
      height: 200,
      top: 0,
      left: 0,
      right: 320,
      bottom: 200,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    } as DOMRect)
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
    ;(globalThis as { __mediaQueries?: MediaMap }).__mediaQueries = {}
  })

  it('draws particles when a 2D context is available', () => {
    const context = createFakeContext()
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
      context as unknown as CanvasRenderingContext2D,
    )

    const { unmount } = render(<ParticleField className="test-field" />)

    expect(context.clearRect).toHaveBeenCalled()
    expect(context.fillRect).toHaveBeenCalled()
    expect(requestAnimationFrame).toHaveBeenCalled()

    unmount()
    expect(cancelAnimationFrame).toHaveBeenCalled()
  })

  it('renders the canvas even without a 2D context', () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null)

    const { container } = render(<ParticleField />)

    expect(container.querySelector('canvas')).toBeInTheDocument()
  })
})
