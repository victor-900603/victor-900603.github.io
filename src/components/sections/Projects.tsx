import { Code2, ExternalLink } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { FaGithub } from 'react-icons/fa'
import { PROJECTS } from '../../data/resume'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { Tag } from '../ui/Tag'

interface ProjectEntry {
  title: string
  desc: string
  highlights: string[]
}

export function Projects() {
  const { t } = useTranslation()
  const entries = t('projects.entries', { returnObjects: true }) as ProjectEntry[]

  return (
    <Section id="projects" index={3} icon={Code2} titleKey="projects.title">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((meta, index) => {
          const entry = entries[index]
          const Icon = meta.icon
          if (!entry) {
            return null
          }
          return (
            <Reveal key={entry.title} delay={index * 0.07} className="h-full">
              <article className="group flex h-full flex-col border border-line bg-card p-5 transition-colors hover:border-signal">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center border border-line text-signal transition-colors group-hover:border-signal">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="readout text-[10px] tracking-[0.2em] text-faint">
                    {`P-${String(index + 1).padStart(2, '0')}`}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-medium tracking-tight">
                  {entry.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{entry.desc}</p>
                <ul className="mt-3 flex-1 space-y-1.5 text-sm leading-relaxed text-muted">
                  {entry.highlights.map((highlight) => (
                    <li key={highlight} className="relative pl-3.5">
                      <span className="absolute top-[0.6em] left-0 h-1 w-1 bg-signal" aria-hidden />
                      {highlight}
                    </li>
                  ))}
                </ul>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {meta.tags.map((tag) => (
                    <li key={tag}>
                      <Tag>{tag}</Tag>
                    </li>
                  ))}
                </ul>
                {(meta.repo ?? meta.demo) && (
                  <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-line pt-3">
                    {meta.repo && (
                      <a
                        href={meta.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${entry.title} ${t('projects.repo')}`}
                        className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-signal"
                      >
                        <FaGithub className="h-3.5 w-3.5" aria-hidden />
                        {t('projects.repo')}
                      </a>
                    )}
                    {meta.demo && (
                      <a
                        href={meta.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${entry.title} ${t('projects.demo')}`}
                        className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-signal"
                      >
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                        {t('projects.demo')}
                      </a>
                    )}
                  </div>
                )}
              </article>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
