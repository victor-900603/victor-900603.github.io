import { Send } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SOCIAL_LINKS } from '../../data/resume'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

export function Contact() {
  const { t } = useTranslation()

  return (
    <Section id="contact" index={7} icon={Send} titleKey="contact.title">
      <Reveal>
        <p className="max-w-xl text-sm leading-relaxed text-muted">{t('contact.lede')}</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {SOCIAL_LINKS.map((link) => {
            const Icon = link.icon
            return (
              <li key={link.key}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 border border-line bg-card p-5 transition-colors hover:border-signal"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-line text-signal transition-colors group-hover:border-signal">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-ink">{link.label}</span>
                    <span className="readout block truncate text-xs text-muted">{link.href}</span>
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </Reveal>
    </Section>
  )
}
