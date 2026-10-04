import type { LucideIcon } from 'lucide-react'
import { Database, Palette, Terminal, Wrench } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SKILL_CATEGORIES } from '../../data/resume'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SkillBar } from '../ui/SkillBar'

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  languages: Terminal,
  frontend: Palette,
  database: Database,
  tools: Wrench,
}

export function Skills() {
  const { t } = useTranslation()

  return (
    <Section id="skill" index={5} icon={Wrench} titleKey="skill.title">
      <div className="grid gap-10">
        {SKILL_CATEGORIES.map((category, categoryIndex) => {
          const Icon = CATEGORY_ICONS[category.key] ?? Wrench
          return (
            <Reveal key={category.key} delay={categoryIndex * 0.06}>
              <div>
                <h3 className="mb-4 flex items-center gap-2 border-b border-line pb-3">
                  <Icon className="h-4 w-4 text-signal" aria-hidden />
                  <span className="font-display text-lg font-medium">{t(category.labelKey)}</span>
                </h3>
                <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
                  {category.skills.map((skill, skillIndex) => (
                    <li key={skill.name}>
                      <div className="flex items-center gap-3">
                        <img
                          src={skill.icon}
                          alt=""
                          className="h-6 w-6 object-contain"
                          loading="lazy"
                        />
                        <span className="text-sm font-medium text-ink">{skill.name}</span>
                        <span className="readout ml-auto text-xs text-muted">{skill.level}</span>
                      </div>
                      <div className="mt-2">
                        <SkillBar level={skill.level} delay={skillIndex * 0.05} />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
