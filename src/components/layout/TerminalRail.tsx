import { useTranslation } from 'react-i18next'
import { SECTIONS } from '../../data/resume'
import { cn, padIndex } from '../../lib/utils'
import { LangToggle } from './LangToggle'
import { ThemeToggle } from './ThemeToggle'

export function TerminalRail({ activeId }: { activeId: string }) {
  const { t } = useTranslation()

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col border-r border-line bg-panel/70 px-8 py-9 backdrop-blur lg:flex">
      <a href="#about" className="group flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center border border-ink font-display text-lg font-semibold transition-colors group-hover:border-signal group-hover:text-signal">
          V
        </span>
        <span className="flex flex-col leading-tight">
          <span className="readout text-xs tracking-[0.2em] text-ink">VICTOR CHEN</span>
          <span className="readout text-[10px] tracking-[0.2em] text-faint">DATA / FINANCE</span>
        </span>
      </a>

      <nav className="mt-12 flex-1" aria-label={t('nav.about')}>
        <ul className="space-y-0.5">
          {SECTIONS.map((section, index) => {
            const active = activeId === section.id
            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={active ? 'true' : undefined}
                  className={cn(
                    'group flex items-center gap-3 border-l-2 py-2.5 pl-3 text-sm transition-colors',
                    active
                      ? 'border-signal text-ink'
                      : 'border-transparent text-muted hover:border-line hover:text-ink',
                  )}
                >
                  <span className={cn('readout text-xs', active ? 'text-signal' : 'text-faint')}>
                    {padIndex(index + 1)}
                  </span>
                  <span>{t(section.navKey)}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="flex items-center gap-2 border-t border-line pt-6">
        <ThemeToggle />
        <LangToggle />
        <span className="readout ml-auto text-[10px] tracking-[0.2em] text-faint">2026</span>
      </div>
    </aside>
  )
}
