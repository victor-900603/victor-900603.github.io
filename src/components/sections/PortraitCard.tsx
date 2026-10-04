import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRightLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PORTRAITS, SOCIAL_LINKS } from '../../data/resume'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { IconButton } from '../ui/IconButton'

type PortraitMode = 'formal' | 'casual'

export function PortraitCard({ alt }: { alt: string }) {
  const { t } = useTranslation()
  const [mode, setMode] = useLocalStorage<PortraitMode>('portrait', 'casual')

  const next: PortraitMode = mode === 'formal' ? 'casual' : 'formal'

  return (
    <div className="relative border border-line bg-card p-3 shadow-ledger">
      <div className="grid-surface relative aspect-3/4 overflow-hidden bg-panel">
        <AnimatePresence mode="wait">
          <motion.img
            key={mode}
            src={PORTRAITS[mode]}
            alt={alt}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-linear-to-t from-black/60 to-transparent p-3">
          <ul className="flex items-center gap-2">
            {SOCIAL_LINKS.map((link) => {
              const Icon = link.icon
              return (
                <li key={link.key}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="inline-flex h-8 w-8 items-center justify-center border border-white/30 bg-black/20 text-white transition-colors hover:border-white hover:text-white"
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden />
                  </a>
                </li>
              )
            })}
          </ul>
          <IconButton
            className="h-8 w-8 border-white/30 bg-black/20 text-white hover:border-white hover:text-white"
            aria-label={t('about.portraitToggle')}
            onClick={() => setMode(next)}
          >
            <ArrowRightLeft className="h-3.5 w-3.5" aria-hidden />
          </IconButton>
        </div>
      </div>

      <div className="readout mt-3 flex items-center justify-between text-[10px] tracking-[0.2em] text-faint">
        <span>FIG. 01</span>
        <span className="text-signal">{mode === 'formal' ? 'FORMAL' : 'CASUAL'}</span>
      </div>
    </div>
  )
}
