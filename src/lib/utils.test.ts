import { describe, expect, it } from 'vitest'
import { calculateAge, clamp, cn, externalLinkAttrs, padIndex } from './utils'

describe('calculateAge', () => {
  it('counts full years on the birthday', () => {
    expect(calculateAge('2001-06-03', new Date('2026-06-03'))).toBe(25)
  })

  it('does not count the birthday before it happens', () => {
    expect(calculateAge('2001-06-03', new Date('2026-06-02'))).toBe(24)
  })

  it('counts the birthday after it happens', () => {
    expect(calculateAge('2001-06-03', new Date('2026-12-31'))).toBe(25)
  })

  it('throws on an invalid date', () => {
    expect(() => calculateAge('not-a-date', new Date('2026-01-01'))).toThrow()
  })
})

describe('cn', () => {
  it('joins truthy class names and skips falsy ones', () => {
    expect(cn('a', false, undefined, 'b', null)).toBe('a b')
  })
})

describe('clamp', () => {
  it('keeps values inside the range', () => {
    expect(clamp(5, 0, 10)).toBe(5)
    expect(clamp(-1, 0, 10)).toBe(0)
    expect(clamp(11, 0, 10)).toBe(10)
  })
})

describe('padIndex', () => {
  it('pads single digits to two characters', () => {
    expect(padIndex(1)).toBe('01')
    expect(padIndex(12)).toBe('12')
  })
})

describe('externalLinkAttrs', () => {
  it('opens http links in a new tab safely', () => {
    expect(externalLinkAttrs('https://example.com')).toEqual({
      target: '_blank',
      rel: 'noopener noreferrer',
    })
  })

  it('keeps mailto links in the same tab', () => {
    expect(externalLinkAttrs('mailto:victor@example.com')).toEqual({})
  })
})
