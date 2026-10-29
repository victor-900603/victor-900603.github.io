import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { PROJECTS } from '../../data/resume'
import i18n from '../../i18n'
import { Projects } from './Projects'

describe('Projects', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('zh-TW')
  })

  it('renders one card per project', () => {
    render(<Projects />)

    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(PROJECTS.length)
    expect(screen.getByText('FinNexus 金融財報暨法規檢索問答系統')).toBeInTheDocument()
    expect(screen.getByText('FinCortex 金融投研決策引擎')).toBeInTheDocument()
  })

  it('links to repository and demo pages when available', () => {
    render(<Projects />)

    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(5)

    expect(screen.getByRole('link', { name: /FinNexus.*程式碼/ })).toHaveAttribute(
      'href',
      'https://github.com/victor-900603/fin-nexus',
    )
    expect(screen.getByRole('link', { name: /台灣章魚燒價格指數.*線上展示/ })).toHaveAttribute(
      'href',
      'https://victor-900603.github.io/takoyaki-index/',
    )
  })
})
