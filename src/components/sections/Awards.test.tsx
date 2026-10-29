import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import i18n from '../../i18n'
import { Awards } from './Awards'

describe('Awards', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('zh-TW')
  })

  it('renders every competition with its year and award', () => {
    render(<Awards />)

    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(4)
    expect(screen.getByText('校園證券投資智慧王總決賽')).toBeInTheDocument()
    expect(screen.getByText('冠軍')).toBeInTheDocument()
    expect(screen.getByText('季軍')).toBeInTheDocument()
    expect(screen.getByText('佳作')).toBeInTheDocument()
    expect(screen.getByText('金獎')).toBeInTheDocument()
  })
})
