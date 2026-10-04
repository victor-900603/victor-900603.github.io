import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SkillBar } from './SkillBar'

describe('SkillBar', () => {
  it('exposes the level as an accessible meter', () => {
    const { getByRole } = render(<SkillBar level={80} />)
    const meter = getByRole('meter')
    expect(meter).toHaveAttribute('aria-valuenow', '80')
    expect(meter).toHaveAttribute('aria-valuemax', '100')
  })
})
