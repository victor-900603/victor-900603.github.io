import type { LucideIcon } from 'lucide-react'
import {
  Award,
  BrainCircuit,
  Briefcase,
  Bug,
  Cloud,
  Code2,
  Database,
  FileSearch,
  GraduationCap,
  Layers,
  LineChart,
  Mail,
  Map,
  Music,
  Palette,
  PieChart,
  Search,
  Send,
  Server,
  Terminal,
  Trophy,
  User,
  Workflow,
  Wrench,
} from 'lucide-react'
import type { IconType } from 'react-icons'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

import casualPortrait from '../assets/portraits/casual_portrait.webp'
import formalPortrait from '../assets/portraits/formal_portrait.webp'

export interface SectionMeta {
  id: string
  navKey: string
  icon: LucideIcon
}

export const SECTIONS: readonly SectionMeta[] = [
  { id: 'about', navKey: 'nav.about', icon: User },
  { id: 'education', navKey: 'nav.education', icon: GraduationCap },
  { id: 'internships', navKey: 'nav.internships', icon: Briefcase },
  { id: 'projects', navKey: 'nav.projects', icon: Code2 },
  { id: 'awards', navKey: 'nav.awards', icon: Trophy },
  { id: 'certificate', navKey: 'nav.certificate', icon: Award },
  { id: 'skill', navKey: 'nav.skill', icon: Wrench },
  { id: 'expertise', navKey: 'nav.expertise', icon: LineChart },
  { id: 'contact', navKey: 'nav.contact', icon: Send },
] as const

export const SECTION_IDS: readonly string[] = SECTIONS.map((section) => section.id)

export const PROFILE = {
  birthDate: '2001-06-03',
  email: 'victor.aimhigh0603@gmail.com',
  github: 'https://github.com/victor-900603',
  linkedin: 'https://www.linkedin.com/in/昱維-諶-1b6100380/',
} as const

export interface SocialLink {
  key: string
  label: string
  href: string
  icon: IconType | LucideIcon
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    key: 'github',
    label: 'GitHub',
    href: 'https://github.com/victor-900603',
    icon: FaGithub,
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/昱維-諶-1b6100380/',
    icon: FaLinkedin,
  },
  {
    key: 'email',
    label: 'Email',
    href: `mailto:${PROFILE.email}`,
    icon: Mail,
  },
] as const

export interface SkillCategory {
  key: string
  labelKey: string
  icon: LucideIcon
  tags: readonly string[]
}

export const SKILL_CATEGORIES: readonly SkillCategory[] = [
  {
    key: 'genai',
    labelKey: 'skill.categories.genai',
    icon: BrainCircuit,
    tags: [
      'RAG',
      'AI Agent',
      'LangGraph',
      'LangChain',
      'Hybrid Retrieval',
      'Cross-Encoder Reranking',
      'Tool Calling',
      'Grounded Citation',
    ],
  },
  {
    key: 'languages',
    labelKey: 'skill.categories.languages',
    icon: Terminal,
    tags: ['Python', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    key: 'backend',
    labelKey: 'skill.categories.backend',
    icon: Server,
    tags: ['Django', 'DRF', 'FastAPI', 'Node.js', 'Express', 'RESTful API', 'JWT', 'RBAC'],
  },
  {
    key: 'frontend',
    labelKey: 'skill.categories.frontend',
    icon: Palette,
    tags: ['React', 'Vue.js', 'HTML5', 'CSS', 'Tailwind CSS'],
  },
  {
    key: 'data',
    labelKey: 'skill.categories.data',
    icon: Workflow,
    tags: ['Pandas', 'ETL', 'Celery', 'NLP', 'BERT', 'LSTM'],
  },
  {
    key: 'database',
    labelKey: 'skill.categories.database',
    icon: Database,
    tags: ['MySQL', 'MongoDB', 'Redis', 'Qdrant'],
  },
  {
    key: 'cloud',
    labelKey: 'skill.categories.cloud',
    icon: Cloud,
    tags: ['AWS', 'Docker', 'Git', 'GitHub', 'CI/CD'],
  },
] as const

export interface ProjectMeta {
  icon: LucideIcon
  tags: readonly string[]
  repo?: string
  demo?: string
}

export const PROJECTS: readonly ProjectMeta[] = [
  {
    icon: FileSearch,
    tags: ['Python', 'FastAPI', 'RAG', 'Qdrant', 'Docker'],
    repo: 'https://github.com/victor-900603/fin-nexus',
  },
  {
    icon: BrainCircuit,
    tags: ['Python', 'LangGraph', 'FastAPI', 'Redis'],
  },
  {
    icon: Bug,
    tags: ['Python', 'Crawler', 'ETL', 'YAML'],
    repo: 'https://github.com/victor-900603/web-harvester',
  },
  {
    icon: Music,
    tags: ['Python', 'FastAPI', 'React', 'Docker'],
    repo: 'https://github.com/victor-900603/discord-music-bot',
  },
  {
    icon: Map,
    tags: ['React', 'TypeScript', 'D3.js', 'GitHub Pages'],
    repo: 'https://github.com/victor-900603/takoyaki-index',
    demo: 'https://victor-900603.github.io/takoyaki-index/',
  },
  {
    icon: Palette,
    tags: ['React', 'TypeScript', 'Chrome Extension'],
  },
] as const

export type ExpertiseKey = 'finance' | 'fullstack' | 'rag' | 'cloud' | 'crawler'

export const EXPERTISE_ORDER: readonly ExpertiseKey[] = [
  'rag',
  'fullstack',
  'cloud',
  'crawler',
  'finance',
] as const

export const EXPERTISE_ICONS: Record<ExpertiseKey, LucideIcon> = {
  finance: PieChart,
  fullstack: Layers,
  rag: BrainCircuit,
  cloud: Cloud,
  crawler: Search,
}

export interface PortraitSet {
  formal: string
  casual: string
}

export const PORTRAITS: PortraitSet = {
  formal: formalPortrait,
  casual: casualPortrait,
}
