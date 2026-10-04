import '@testing-library/jest-dom/vitest'
import '../i18n'

type MediaQueryMap = Record<string, boolean>

function readMediaMap(): MediaQueryMap {
  return (globalThis as { __mediaQueries?: MediaQueryMap }).__mediaQueries ?? {}
}

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string): MediaQueryList => {
    const map = readMediaMap()
    const matched = Object.keys(map).some((key) => query.includes(key) && map[key])
    return {
      matches: matched,
      media: query,
      onchange: null,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      addListener: () => undefined,
      removeListener: () => undefined,
      dispatchEvent: () => false,
    } as unknown as MediaQueryList
  },
})

class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver

interface ObserverEntry {
  isIntersecting: boolean
  intersectionRatio: number
  target: Element
}

class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = []

  callback: IntersectionObserverCallback
  elements: Element[] = []

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback
    MockIntersectionObserver.instances.push(this)
  }

  observe(element: Element) {
    this.elements.push(element)
  }

  unobserve(element: Element) {
    this.elements = this.elements.filter((item) => item !== element)
  }

  disconnect() {
    this.elements = []
  }

  takeRecords(): IntersectionObserverEntry[] {
    return []
  }

  trigger(entries: ObserverEntry[]) {
    this.callback(entries as unknown as IntersectionObserverEntry[], this as never)
  }
}

globalThis.IntersectionObserver =
  MockIntersectionObserver as unknown as typeof IntersectionObserver

HTMLCanvasElement.prototype.getContext = (() => null) as unknown as HTMLCanvasElement['getContext']

window.scrollTo = (() => undefined) as unknown as typeof window.scrollTo

export { MockIntersectionObserver }
