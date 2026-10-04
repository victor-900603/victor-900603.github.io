import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Reveal } from './Reveal'

describe('Reveal', () => {
  it('renders its children', () => {
    render(
      <Reveal className="reveal-test" delay={0.1}>
        <p>revealed</p>
      </Reveal>,
    )

    expect(screen.getByText('revealed')).toBeInTheDocument()
  })
})
