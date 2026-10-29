import { Wrench } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SKILL_CATEGORIES } from '../../data/resume'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { Tag } from '../ui/Tag'

export function Skills() {
  const { t } = useTranslation()

  return (
    <Section id="skill" index={6} icon={Wrench} titleKey="skill.title">
      <div className="grid gap-4 sm:grid-cols-2">
        {SKILL_CATEGORIES.map((category, index) => {
          const Icon = category.icon
          const featured = category.key === 'genai'
          return (
            <Reveal
              key={category.key}
              delay={index * 0.05}
              className={featured ? 'h-full sm:col-span-2' : 'h-full'}
            >
              <article
                className={
                  featured
                    ? 'h-full border border-signal bg-card p-5'
                    : 'h-full border border-line bg-card p-5 transition-colors hover:border-signal'
                }
              >
                <h3 className="mb-4 flex items-center gap-2 border-b border-line pb-3">
                  <Icon className="h-4 w-4 text-signal" aria-hidden />
                  <span className="font-display text-lg font-medium">{t(category.labelKey)}</span>
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {category.tags.map((tag) => (
                    <li key={tag}>
                      <Tag className={featured ? 'px-2.5 py-1 text-xs text-ink' : undefined}>
                        {tag}
                      </Tag>
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
