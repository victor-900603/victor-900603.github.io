import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { SKILL_CATEGORIES } from '../../data/resume'
import i18n from '../../i18n'
import { Skills } from './Skills'

describe('Skills', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('zh-TW')
  })

  it('renders every category with its tags', () => {
    render(<Skills />)

    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(SKILL_CATEGORIES.length)

    for (const category of SKILL_CATEGORIES) {
      expect(screen.getByText(i18n.t(category.labelKey))).toBeInTheDocument()
    }

    expect(screen.getByText('RAG')).toBeInTheDocument()
    expect(screen.getByText('LangGraph')).toBeInTheDocument()
    expect(screen.getByText('RBAC')).toBeInTheDocument()
  })

  it('puts generative AI in the featured card', () => {
    render(<Skills />)

    const heading = screen.getByText(i18n.t('skill.categories.genai'))
    const card = heading.closest('article')
    expect(card).not.toBeNull()
    expect(card).toHaveClass('border-signal')
  })
})
