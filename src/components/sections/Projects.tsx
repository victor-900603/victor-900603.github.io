import { Code2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PROJECTS } from '../../data/resume'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { Tag } from '../ui/Tag'

interface ProjectEntry {
  title: string
  desc: string
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
            <Reveal key={entry.title} delay={index * 0.07}>
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
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{entry.desc}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {meta.tags.map((tag) => (
                    <li key={tag}>
                      <Tag>{tag}</Tag>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
