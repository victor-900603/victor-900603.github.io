import { render, screen } from '@testing-library/react'
import { GraduationCap } from 'lucide-react'
import { beforeEach, describe, expect, it } from 'vitest'
import i18n from '../../i18n'
import { Section } from './Section'

describe('Section', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('zh-TW')
  })

  it('renders the index, title, id and children', () => {
    render(
      <Section id="education" index={1} icon={GraduationCap} titleKey="education.title">
        <p>section-content</p>
      </Section>,
    )

    expect(
      screen.getByRole('heading', { level: 2, name: i18n.t('education.title') }),
    ).toBeInTheDocument()
    expect(screen.getByText('02')).toBeInTheDocument()
    expect(screen.getByText('education')).toBeInTheDocument()
    expect(screen.getByText('section-content')).toBeInTheDocument()
  })
})
