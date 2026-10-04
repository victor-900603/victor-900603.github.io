import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { IconButton } from './IconButton'

describe('IconButton', () => {
  it('defaults to a button type and forwards props', () => {
    render(<IconButton aria-label="action">icon</IconButton>)

    const button = screen.getByRole('button', { name: 'action' })
    expect(button).toHaveAttribute('type', 'button')
    expect(button).toHaveTextContent('icon')
  })

  it('honours an explicit type', () => {
    render(
      <IconButton type="submit" aria-label="submit">
        go
      </IconButton>,
    )

    expect(screen.getByRole('button', { name: 'submit' })).toHaveAttribute('type', 'submit')
  })
})
