import type { LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { ReactNode } from 'react'
import { cn, padIndex } from '../../lib/utils'

interface SectionProps {
  id: string
  index: number
  icon: LucideIcon
  titleKey: string
  children: ReactNode
  className?: string
}

export function Section({ id, index, icon: Icon, titleKey, children, className }: SectionProps) {
  const { t } = useTranslation()

  return (
    <section id={id} className={cn('scroll-mt-24 px-6 py-16 md:px-10 md:py-24', className)}>
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-line pb-4">
          <span className="readout text-sm text-signal">{padIndex(index + 1)}</span>
          <Icon className="h-4 w-4 translate-y-0.5 text-muted" aria-hidden />
          <h2 className="font-display text-2xl font-medium tracking-tight md:text-3xl">
            {t(titleKey)}
          </h2>
          <span className="eyebrow ml-auto text-faint">{id}</span>
        </header>
        {children}
      </div>
    </section>
  )
}
