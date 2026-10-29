import { render, screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import i18n from './i18n'
import App from './App'

describe('App', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('zh-TW')
  })

  it('renders the hero and the main sections', async () => {
    render(<App />)

    const heading = await screen.findByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('諶昱維')

    const main = within(screen.getByRole('main'))
    expect(main.getByText('求學經歷')).toBeInTheDocument()
    expect(main.getByText('工作經歷')).toBeInTheDocument()
    expect(main.getByText('專案作品')).toBeInTheDocument()
    expect(main.getByText('競賽經歷')).toBeInTheDocument()
    expect(main.getByText('證照')).toBeInTheDocument()
    expect(main.getByText('技能')).toBeInTheDocument()
    expect(main.getByText('專業領域')).toBeInTheDocument()
    expect(main.getByText('聯絡我')).toBeInTheDocument()
  })
})
