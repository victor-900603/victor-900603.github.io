import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Timeline } from './Timeline'

describe('Timeline', () => {
  it('renders every entry with its optional fields', () => {
    render(
      <Timeline
        entries={[
          {
            period: '2020 - 2022',
            title: 'First role',
            subtitle: 'Engineer',
            description: 'Did the work',
            tags: ['React', 'TypeScript'],
          },
          { period: '2022 - now', title: 'Second role' },
        ]}
      />,
    )

    expect(screen.getByText('2020 - 2022')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'First role' })).toBeInTheDocument()
    expect(screen.getByText('Engineer')).toBeInTheDocument()
    expect(screen.getByText('Did the work')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Second role' })).toBeInTheDocument()
  })
})
