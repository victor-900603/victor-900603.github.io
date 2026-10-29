export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

export function calculateAge(birthDate: string, now: Date = new Date()): number {
  const birth = new Date(birthDate)
  if (Number.isNaN(birth.getTime())) {
    throw new Error(`Invalid birth date: ${birthDate}`)
  }

  let age = now.getFullYear() - birth.getFullYear()
  const monthDelta = now.getMonth() - birth.getMonth()
  const hasNotHadBirthday = monthDelta < 0 || (monthDelta === 0 && now.getDate() < birth.getDate())

  if (hasNotHadBirthday) {
    age -= 1
  }

  return age
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function padIndex(value: number): string {
  return String(value).padStart(2, '0')
}

export interface ExternalLinkAttrs {
  target?: '_blank'
  rel?: 'noopener noreferrer'
}

export function externalLinkAttrs(href: string): ExternalLinkAttrs {
  return href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {}
}
