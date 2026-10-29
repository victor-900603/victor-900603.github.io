import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'readout inline-flex items-center border border-line px-2 py-0.5 text-[11px] tracking-wide text-muted',
        className,
      )}
    >
      {children}
    </span>
  )
}
