import { Briefcase } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Section } from '../ui/Section'
import { Timeline, type TimelineEntry } from '../ui/Timeline'

interface InternshipEntry {
  period: string
  name: string
  role: string
  desc: string
  tags: string[]
}

export function Internships() {
  const { t } = useTranslation()
  const entries = t('internships.entries', { returnObjects: true }) as InternshipEntry[]

  const items: TimelineEntry[] = entries.map((entry) => ({
    period: entry.period,
    title: entry.name,
    subtitle: entry.role,
    description: entry.desc,
    tags: entry.tags,
  }))

  return (
    <Section id="internships" index={2} icon={Briefcase} titleKey="internships.title">
      <Timeline entries={items} />
    </Section>
  )
}
