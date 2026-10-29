import { useTranslation } from 'react-i18next'
import { SOCIAL_LINKS } from '../../data/resume'
import { cn, externalLinkAttrs } from '../../lib/utils'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-line px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="readout text-xs text-faint">{t('footer.copyright')}</p>
        <ul className="flex items-center gap-2">
          {SOCIAL_LINKS.map((link) => {
            const Icon = link.icon
            return (
              <li key={link.key}>
                <a
                  href={link.href}
                  {...externalLinkAttrs(link.href)}
                  aria-label={link.label}
                  className={cn(
                    'inline-flex h-9 w-9 items-center justify-center border border-line bg-card text-muted',
                    'transition-colors hover:border-signal hover:text-signal',
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </footer>
  )
}
