import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import i18n from '../../i18n'
import { setTheme } from '../../hooks/useTheme'
import { ThemeToggle } from './ThemeToggle'

describe('ThemeToggle', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('zh-TW')
    setTheme('light')
  })

  it('toggles between light and dark', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)

    const button = screen.getByRole('button', { name: i18n.t('a11y.toggleTheme') })
    expect(button).toHaveAttribute('aria-pressed', 'false')

    await user.click(button)
    expect(button).toHaveAttribute('aria-pressed', 'true')

    await user.click(button)
    expect(button).toHaveAttribute('aria-pressed', 'false')
  })
})
