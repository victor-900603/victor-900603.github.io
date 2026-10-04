import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SECTIONS } from '../../data/resume'
import { cn, padIndex } from '../../lib/utils'
import { IconButton } from '../ui/IconButton'
import { LangToggle } from './LangToggle'
import { ThemeToggle } from './ThemeToggle'

export function TopBar({ activeId }: { activeId: string }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)')
    const handleChange = () => {
      if (mql.matches) {
        setOpen(false)
      }
    }
    mql.addEventListener('change', handleChange)
    return () => mql.removeEventListener('change', handleChange)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/85 backdrop-blur lg:hidden">
      <div className="flex h-14 items-center justify-between px-4">
        <a href="#about" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center border border-ink font-display text-sm font-semibold">
            V
          </span>
          <span className="readout text-xs tracking-[0.2em] text-ink">VICTOR CHEN</span>
        </a>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <IconButton
            aria-label={open ? t('a11y.closeMenu') : t('a11y.openMenu')}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <X className="h-4 w-4" aria-hidden />
            ) : (
              <Menu className="h-4 w-4" aria-hidden />
            )}
          </IconButton>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            className="overflow-hidden border-t border-line"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <ul className="px-4 py-2">
              {SECTIONS.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={activeId === section.id ? 'true' : undefined}
                    className={cn(
                      'flex items-center gap-3 border-l-2 py-3 pl-3 text-sm',
                      activeId === section.id
                        ? 'border-signal text-signal'
                        : 'border-transparent text-muted',
                    )}
                  >
                    <span className="readout text-xs text-faint">{padIndex(index + 1)}</span>
                    <span>{t(section.navKey)}</span>
                  </a>
                </li>
              ))}
              <li className="mt-2 border-t border-line pt-3">
                <LangToggle />
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
