import { act, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { Loader } from './Loader'

describe('Loader', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'requestAnimationFrame',
      vi.fn(() => 1),
    )
    vi.stubGlobal('cancelAnimationFrame', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    Object.defineProperty(document, 'readyState', { configurable: true, value: 'complete' })
  })

  it('shows the loading indicator until the window load event', async () => {
    Object.defineProperty(document, 'readyState', { configurable: true, value: 'loading' })

    render(<Loader />)
    expect(screen.getByText('V')).toBeInTheDocument()

    act(() => {
      window.dispatchEvent(new Event('load'))
    })

    await waitFor(() => expect(screen.queryByText('V')).not.toBeInTheDocument())
  })

  it('hides shortly after the document is already complete', async () => {
    Object.defineProperty(document, 'readyState', { configurable: true, value: 'complete' })

    render(<Loader />)
    expect(screen.getByText('V')).toBeInTheDocument()

    await waitFor(() => expect(screen.queryByText('V')).not.toBeInTheDocument(), {
      timeout: 1500,
    })
  })
})
