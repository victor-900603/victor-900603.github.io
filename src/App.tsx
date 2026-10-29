import { MotionConfig } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { BackToTop } from './components/layout/BackToTop'
import { Footer } from './components/layout/Footer'
import { Loader } from './components/layout/Loader'
import { ScrollProgress } from './components/layout/ScrollProgress'
import { TerminalRail } from './components/layout/TerminalRail'
import { TopBar } from './components/layout/TopBar'
import { Awards } from './components/sections/Awards'
import { Certificates } from './components/sections/Certificates'
import { Contact } from './components/sections/Contact'
import { Education } from './components/sections/Education'
import { Expertise } from './components/sections/Expertise'
import { Hero } from './components/sections/Hero'
import { Internships } from './components/sections/Internships'
import { Projects } from './components/sections/Projects'
import { Skills } from './components/sections/Skills'
import { SECTION_IDS } from './data/resume'
import { useScrollSpy } from './hooks/useScrollSpy'

export default function App() {
  const { t } = useTranslation()
  const activeId = useScrollSpy(SECTION_IDS)

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[110] focus:border focus:border-line focus:bg-card focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
      >
        {t('a11y.skipToContent')}
      </a>

      <ScrollProgress />
      <Loader />
      <TopBar activeId={activeId} />
      <TerminalRail activeId={activeId} />

      <div className="pt-14 lg:pt-0 lg:pl-72">
        <main id="content">
          <Hero />
          <Education />
          <Internships />
          <Projects />
          <Awards />
          <Certificates />
          <Skills />
          <Expertise />
          <Contact />
        </main>
        <Footer />
      </div>

      <BackToTop />
    </MotionConfig>
  )
}
