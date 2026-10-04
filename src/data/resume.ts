import type { LucideIcon } from 'lucide-react'
import {
  Award,
  Bot,
  BrainCircuit,
  Briefcase,
  Bug,
  Cloud,
  Code2,
  Database,
  GraduationCap,
  Layers,
  LineChart,
  Music,
  PieChart,
  Search,
  Send,
  User,
  Wrench,
} from 'lucide-react'
import type { IconType } from 'react-icons'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

import awsIcon from '../assets/skills/AWS.png'
import cssIcon from '../assets/skills/CSS.png'
import dockerIcon from '../assets/skills/Docker.png'
import gitIcon from '../assets/skills/Git.png'
import githubIcon from '../assets/skills/Github.png'
import htmlIcon from '../assets/skills/HTML5.png'
import javascriptIcon from '../assets/skills/JavaScript.png'
import mongodbIcon from '../assets/skills/MongoDB.png'
import mysqlIcon from '../assets/skills/MySQL.png'
import pythonIcon from '../assets/skills/Python.png'
import reactIcon from '../assets/skills/React.png'
import vueIcon from '../assets/skills/Vue.png'
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
  { id: 'certificate', navKey: 'nav.certificate', icon: Award },
  { id: 'skill', navKey: 'nav.skill', icon: Wrench },
  { id: 'expertise', navKey: 'nav.expertise', icon: LineChart },
  { id: 'contact', navKey: 'nav.contact', icon: Send },
] as const

export const SECTION_IDS: readonly string[] = SECTIONS.map((section) => section.id)

export interface SocialLink {
  key: string
  label: string
  href: string
  icon: IconType
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
] as const

export interface Skill {
  name: string
  icon: string
  level: number
}

export interface SkillCategory {
  key: string
  labelKey: string
  skills: readonly Skill[]
}

export const SKILL_CATEGORIES: readonly SkillCategory[] = [
  {
    key: 'languages',
    labelKey: 'skill.categories.languages',
    skills: [
      { name: 'Python', icon: pythonIcon, level: 90 },
      { name: 'JavaScript', icon: javascriptIcon, level: 80 },
    ],
  },
  {
    key: 'frontend',
    labelKey: 'skill.categories.frontend',
    skills: [
      { name: 'HTML5', icon: htmlIcon, level: 85 },
      { name: 'CSS', icon: cssIcon, level: 80 },
      { name: 'Vue.js', icon: vueIcon, level: 80 },
      { name: 'React', icon: reactIcon, level: 70 },
    ],
  },
  {
    key: 'database',
    labelKey: 'skill.categories.database',
    skills: [
      { name: 'MongoDB', icon: mongodbIcon, level: 75 },
      { name: 'MySQL', icon: mysqlIcon, level: 80 },
    ],
  },
  {
    key: 'tools',
    labelKey: 'skill.categories.tools',
    skills: [
      { name: 'Git', icon: gitIcon, level: 85 },
      { name: 'GitHub', icon: githubIcon, level: 85 },
      { name: 'Docker', icon: dockerIcon, level: 70 },
      { name: 'AWS', icon: awsIcon, level: 70 },
    ],
  },
] as const

export interface ProjectMeta {
  icon: LucideIcon
  tags: readonly string[]
}

export const PROJECTS: readonly ProjectMeta[] = [
  { icon: Bug, tags: ['Python', 'Crawler', 'Async'] },
  { icon: Music, tags: ['Python', 'Discord', 'FastAPI', 'React'] },
  { icon: Bot, tags: ['Python', 'Pandas', 'Langchain', 'Django', 'RAG', 'OLLAMA'] },
] as const

export type ExpertiseKey = 'data' | 'finance' | 'fullstack' | 'crawler' | 'cloud' | 'rag'

export const EXPERTISE_ORDER: readonly ExpertiseKey[] = [
  'data',
  'finance',
  'fullstack',
  'crawler',
  'cloud',
  'rag',
] as const

export const EXPERTISE_ICONS: Record<ExpertiseKey, LucideIcon> = {
  data: Database,
  finance: PieChart,
  fullstack: Layers,
  crawler: Search,
  cloud: Cloud,
  rag: BrainCircuit,
}

export interface PortraitSet {
  formal: string
  casual: string
}

export const PORTRAITS: PortraitSet = {
  formal: formalPortrait,
  casual: casualPortrait,
}

export const PROFILE = {
  birthDate: '2001-06-03',
  email: 'mail@gmail.com',
  github: 'https://github.com/victor-900603',
  linkedin: 'https://www.linkedin.com/in/昱維-諶-1b6100380/',
} as const
