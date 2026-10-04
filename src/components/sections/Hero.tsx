import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PROFILE } from '../../data/resume'
import { useTypewriter } from '../../hooks/useTypewriter'
import { calculateAge } from '../../lib/utils'
import { ParticleField } from '../ui/ParticleField'
import { PortraitCard } from './PortraitCard'

interface LedgerRow {
  labelKey: string
  valueKey?: string
  value?: string
  mono?: boolean
}

export function Hero() {
  const { t } = useTranslation()

  const taglines = t('about.taglines', { returnObjects: true }) as string[]
  const typed = useTypewriter(taglines)

  const age = useMemo(() => calculateAge(PROFILE.birthDate), [])

  const rows: LedgerRow[] = [
    { labelKey: 'about.nicknameLabel', valueKey: 'about.nicknameValue' },
    { labelKey: 'about.ageLabel', value: String(age), mono: true },
    { labelKey: 'about.eduLabel', valueKey: 'about.eduValue' },
    { labelKey: 'about.codingLabel', valueKey: 'about.codingValue' },
    { labelKey: 'about.financeLabel', valueKey: 'about.financeValue' },
    { labelKey: 'about.goalLabel', valueKey: 'about.goalValue', mono: true },
  ]

  return (
    <section id="about" className="relative overflow-hidden scroll-mt-24">
      <ParticleField className="absolute inset-0 h-full w-full opacity-70" />
      <div className="grid-surface pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-transparent to-paper" />

      <div className="relative mx-auto grid max-w-5xl gap-12 px-6 py-20 md:px-10 md:py-28 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <div className="readout flex flex-wrap items-center gap-x-3 gap-y-2 text-xs tracking-[0.2em] text-muted">
            <span className="text-signal">{t('hero.eyebrow')}</span>
            <span className="h-px w-8 bg-line" aria-hidden />
            <span className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
              </span>
              {t('hero.status')}
            </span>
          </div>

          <h1 className="mt-6 font-display text-5xl leading-[1.05] font-semibold tracking-tight md:text-6xl lg:text-7xl">
            {t('about.name')}
            <span className="mt-2 block font-mono text-lg font-normal tracking-tight text-muted md:text-xl">
              {t('about.engName')}
            </span>
          </h1>

          <p className="readout mt-6 flex min-h-7 items-center text-base text-ink md:text-lg">
            <span className="mr-2 text-signal select-none">{'>'}</span>
            <span>{typed}</span>
            <span
              className="caret ml-1 inline-block h-5 w-2.5 bg-signal align-middle"
              aria-hidden
            />
          </p>

          <dl className="mt-10 grid grid-cols-1 border-t border-line sm:grid-cols-2 sm:gap-x-10">
            {rows.map((row) => (
              <div
                key={row.labelKey}
                className="flex items-baseline gap-4 border-b border-line py-3"
              >
                <dt className="eyebrow w-24 shrink-0 text-faint">{t(row.labelKey)}</dt>
                <dd className={row.mono ? 'readout text-sm text-ink' : 'text-sm text-ink'}>
                  {row.valueKey ? t(row.valueKey) : row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <PortraitCard alt={t('about.name')} />
        </motion.div>
      </div>

      <div className="readout relative mx-auto flex max-w-5xl items-center justify-center gap-2 px-6 pb-12 text-[10px] tracking-[0.3em] text-faint md:px-10">
        <span>{t('about.scrollHint')}</span>
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-3.5 w-3.5" aria-hidden />
        </motion.span>
      </div>
    </section>
  )
}
