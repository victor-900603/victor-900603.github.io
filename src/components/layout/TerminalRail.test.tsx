import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import i18n from '../../i18n'
import { TerminalRail } from './TerminalRail'

describe('TerminalRail', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('zh-TW')
  })

  it('marks the active section and leaves others unmarked', () => {
    render(<TerminalRail activeId="projects" />)

    expect(screen.getByRole('link', { name: /專案作品/ })).toHaveAttribute('aria-current', 'true')
    expect(screen.getByRole('link', { name: /教育背景/ })).not.toHaveAttribute('aria-current')
  })
})
