import type { ReactNode } from 'react'

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="readout inline-flex items-center border border-line px-2 py-0.5 text-[11px] tracking-wide text-muted">
      {children}
    </span>
  )
}
