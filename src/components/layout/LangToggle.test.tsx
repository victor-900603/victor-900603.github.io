import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import i18n from '../../i18n'
import { LangToggle } from './LangToggle'

describe('LangToggle', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('zh-TW')
  })

  it('shows the target language and switches the language on click', async () => {
    render(<LangToggle />)
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('EN')

    await userEvent.click(button)

    await waitFor(() => expect(screen.getByRole('button')).toHaveTextContent('中文'))
  })
})
