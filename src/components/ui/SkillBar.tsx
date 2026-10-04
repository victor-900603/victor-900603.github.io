import { motion } from 'framer-motion'

interface SkillBarProps {
  level: number
  delay?: number
}

export function SkillBar({ level, delay = 0 }: SkillBarProps) {
  return (
    <div
      className="relative h-1.5 w-full overflow-hidden bg-panel"
      role="meter"
      aria-valuenow={level}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className="absolute inset-y-0 left-0 bg-signal"
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}
