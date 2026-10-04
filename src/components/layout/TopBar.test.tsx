import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import i18n from '../../i18n'
import { TopBar } from './TopBar'

describe('TopBar', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('zh-TW')
  })

  it('opens and closes the navigation menu', async () => {
    const user = userEvent.setup()
    render(<TopBar activeId="about" />)

    const openButton = screen.getByRole('button', { name: i18n.t('a11y.openMenu') })
    expect(openButton).toHaveAttribute('aria-expanded', 'false')

    await user.click(openButton)
    expect(screen.getByRole('button', { name: i18n.t('a11y.closeMenu') })).toHaveAttribute(
      'aria-expanded',
      'true',
    )

    await user.click(screen.getByRole('link', { name: /教育背景/ }))
    expect(screen.getByRole('button', { name: i18n.t('a11y.openMenu') })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
  })
})
