import { Trophy } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

interface AwardEntry {
  year: string
  title: string
  award: string
  desc: string
}

export function Awards() {
  const { t } = useTranslation()
  const entries = t('awards.entries', { returnObjects: true }) as AwardEntry[]

  return (
    <Section id="awards" index={4} icon={Trophy} titleKey="awards.title">
      <ul className="grid gap-4 sm:grid-cols-2">
        {entries.map((entry, index) => (
          <li key={`${entry.year}-${entry.title}`}>
            <Reveal delay={index * 0.06} className="h-full">
              <article className="flex h-full flex-col border border-line bg-card p-5 transition-colors hover:border-signal">
                <div className="flex items-center justify-between gap-3">
                  <span className="readout text-xs tracking-wide text-faint">{entry.year}</span>
                  <span className="readout border border-signal px-2 py-0.5 text-[11px] tracking-wide text-signal">
                    {entry.award}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-medium tracking-tight">
                  {entry.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{entry.desc}</p>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
