import { Award } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { padIndex } from '../../lib/utils'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

export function Certificates() {
  const { t } = useTranslation()
  const items = t('certificate.items', { returnObjects: true }) as string[]

  return (
    <Section id="certificate" index={4} icon={Award} titleKey="certificate.title">
      <Reveal>
        <p className="eyebrow mb-4 text-faint">{t('certificate.category')}</p>
        <ul className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
          {items.map((item, index) => (
            <li key={item} className="flex items-center gap-3 bg-card px-4 py-4">
              <span className="readout text-xs text-faint">{padIndex(index + 1)}</span>
              <Award className="h-4 w-4 shrink-0 text-signal" aria-hidden />
              <span className="text-sm text-ink">{item}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}
