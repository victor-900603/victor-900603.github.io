import { Globe } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { normalizeLanguage } from '../../i18n'
import { cn } from '../../lib/utils'
import { IconButton } from '../ui/IconButton'

export function LangToggle({ className }: { className?: string }) {
  const { t, i18n } = useTranslation()
  const current = normalizeLanguage(i18n.resolvedLanguage ?? i18n.language)
  const next = current === 'zh-TW' ? 'en' : 'zh-TW'
  const label = current === 'zh-TW' ? 'EN' : '中文'

  return (
    <IconButton
      className={cn('w-auto gap-1.5 px-2.5', className)}
      onClick={() => void i18n.changeLanguage(next)}
      aria-label={t('a11y.toggleLanguage')}
    >
      <Globe className="h-4 w-4" aria-hidden />
      <span className="readout text-xs">{label}</span>
    </IconButton>
  )
}
