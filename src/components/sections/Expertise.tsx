import { LineChart } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { EXPERTISE_ICONS, EXPERTISE_ORDER } from '../../data/resume'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

interface ExpertiseItem {
  title: string
  desc: string
}

export function Expertise() {
  const { t } = useTranslation()
  const items = t('expertise.items', { returnObjects: true }) as Record<string, ExpertiseItem>

  return (
    <Section id="expertise" index={7} icon={LineChart} titleKey="expertise.title">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {EXPERTISE_ORDER.map((key, index) => {
          const item = items[key]
          const Icon = EXPERTISE_ICONS[key]
          if (!item) {
            return null
          }
          return (
            <Reveal key={key} delay={index * 0.06} className="h-full">
              <article className="group h-full border border-line bg-card p-5 transition-colors hover:border-signal">
                <span className="flex h-10 w-10 items-center justify-center border border-line text-signal transition-colors group-hover:border-signal">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-lg font-medium tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
              </article>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
