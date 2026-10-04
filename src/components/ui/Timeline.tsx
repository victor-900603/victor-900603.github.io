import { Reveal } from './Reveal'
import { Tag } from './Tag'

export interface TimelineEntry {
  period: string
  title: string
  subtitle?: string
  description?: string
  tags?: readonly string[]
}

export function Timeline({ entries }: { entries: readonly TimelineEntry[] }) {
  return (
    <ol className="relative ml-1 border-l border-line">
      {entries.map((entry, index) => (
        <li key={`${entry.title}-${index}`} className="relative pb-10 pl-8 last:pb-0">
          <span
            className="absolute top-1.5 -left-[5px] h-2 w-2 rounded-full bg-signal ring-4 ring-paper"
            aria-hidden
          />
          <Reveal delay={index * 0.06}>
            <p className="readout text-xs tracking-wide text-muted">{entry.period}</p>
            <h3 className="mt-1 font-display text-xl font-medium tracking-tight">{entry.title}</h3>
            {entry.subtitle && <p className="mt-0.5 text-sm text-muted">{entry.subtitle}</p>}
            {entry.description && (
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                {entry.description}
              </p>
            )}
            {entry.tags && entry.tags.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <li key={tag}>
                    <Tag>{tag}</Tag>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        </li>
      ))}
    </ol>
  )
}
