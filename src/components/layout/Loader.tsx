import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export function Loader() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (document.readyState === 'complete') {
      const id = window.setTimeout(() => setDone(true), 320)
      return () => window.clearTimeout(id)
    }

    const finish = () => setDone(true)
    window.addEventListener('load', finish, { once: true })
    const fallback = window.setTimeout(finish, 1600)
    return () => {
      window.removeEventListener('load', finish)
      window.clearTimeout(fallback)
    }
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-paper"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          aria-hidden
        >
          <span className="flex h-12 w-12 items-center justify-center border border-ink font-display text-xl font-semibold">
            V
          </span>
          <span className="relative block h-0.5 w-40 overflow-hidden bg-line">
            <motion.span
              className="absolute inset-y-0 w-1/3 bg-signal"
              initial={{ x: '-120%' }}
              animate={{ x: '320%' }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
