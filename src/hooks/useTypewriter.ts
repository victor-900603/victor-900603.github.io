import { useEffect, useRef, useState } from 'react'

interface TypewriterOptions {
  typeSpeed?: number
  deleteSpeed?: number
  pause?: number
}

export function useTypewriter(
  words: readonly string[],
  { typeSpeed = 70, deleteSpeed = 34, pause = 1500 }: TypewriterOptions = {},
): string {
  const [display, setDisplay] = useState('')
  const wordsRef = useRef(words)
  const wordsKey = words.join('\u0000')

  useEffect(() => {
    wordsRef.current = words
  }, [words])

  useEffect(() => {
    const list = wordsRef.current

    if (list.length === 0) {
      return
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(list[0])
      return
    }

    let wordIndex = 0
    let charIndex = 0
    let deleting = false
    let timerId: ReturnType<typeof setTimeout>

    setDisplay('')

    const run = () => {
      const word = list[wordIndex]

      if (!deleting) {
        charIndex += 1
        setDisplay(word.slice(0, charIndex))

        if (charIndex === word.length) {
          deleting = true
          timerId = setTimeout(run, pause)
          return
        }
        timerId = setTimeout(run, typeSpeed)
        return
      }

      charIndex -= 1
      setDisplay(word.slice(0, charIndex))

      if (charIndex === 0) {
        deleting = false
        wordIndex = (wordIndex + 1) % list.length
        timerId = setTimeout(run, typeSpeed)
        return
      }
      timerId = setTimeout(run, deleteSpeed)
    }

    timerId = setTimeout(run, typeSpeed)
    return () => clearTimeout(timerId)
  }, [wordsKey, typeSpeed, deleteSpeed, pause])

  return display
}
