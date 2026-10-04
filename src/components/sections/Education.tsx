import { GraduationCap } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Section } from '../ui/Section'
import { Timeline, type TimelineEntry } from '../ui/Timeline'

interface EducationEntry {
  period: string
  name: string
  dept: string
  tags: string[]
}

export function Education() {
  const { t } = useTranslation()
  const entries = t('education.entries', { returnObjects: true }) as EducationEntry[]

  const items: TimelineEntry[] = entries.map((entry) => ({
    period: entry.period,
    title: entry.name,
    subtitle: entry.dept,
    tags: entry.tags,
  }))

  return (
    <Section id="education" index={1} icon={GraduationCap} titleKey="education.title">
      <Timeline entries={items} />
    </Section>
  )
}
