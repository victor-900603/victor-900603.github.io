import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
}

export function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0
    let color = '#0e9384'
    let points: Particle[] = []
    let frame = 0

    const readColor = () => {
      const value = getComputedStyle(canvas).getPropertyValue('--color-signal').trim()
      color = value || color
    }

    const seed = () => {
      const count = Math.min(52, Math.max(16, Math.floor((width * height) / 28000)))
      points = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.24,
        vy: (Math.random() - 0.5) * 0.24,
      }))
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      const linkDistance = 132

      for (let i = 0; i < points.length; i += 1) {
        const point = points[i]

        if (!reduceMotion) {
          point.x += point.vx
          point.y += point.vy
          if (point.x <= 0 || point.x >= width) point.vx *= -1
          if (point.y <= 0 || point.y >= height) point.vy *= -1
        }

        for (let j = i + 1; j < points.length; j += 1) {
          const other = points[j]
          const distance = Math.hypot(point.x - other.x, point.y - other.y)
          if (distance < linkDistance) {
            ctx.globalAlpha = (1 - distance / linkDistance) * 0.18
            ctx.strokeStyle = color
            ctx.beginPath()
            ctx.moveTo(point.x, point.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()
          }
        }

        ctx.globalAlpha = 0.55
        ctx.fillStyle = color
        ctx.fillRect(point.x - 1, point.y - 1, 2, 2)
      }

      ctx.globalAlpha = 1
      if (!reduceMotion) {
        frame = requestAnimationFrame(draw)
      }
    }

    readColor()
    resize()
    draw()

    const resizeObserver = new ResizeObserver(() => {
      resize()
    })
    resizeObserver.observe(canvas)

    const themeObserver = new MutationObserver(() => {
      readColor()
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      themeObserver.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className={className} aria-hidden />
}
