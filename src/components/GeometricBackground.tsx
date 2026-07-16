import { useEffect, useRef } from 'react'

const COLORS = [
  '#10B981', // Accent Emerald
  '#34d399', // Emerald 400
  '#059669', // Emerald 600
  '#F5F5F5', // Primary Text
  '#9CA3AF', // Secondary Text
]


interface Branch {
  x: number
  y: number
  prevX: number
  prevY: number
  angle: number
  speed: number
  color: string
  width: number
  life: number
  maxLife: number
  depth: number
  branchInterval: number
  stepsSinceBranch: number
}

export default function GeometricBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const branchesRef = useRef<Branch[]>([])
  const animationFrameId = useRef<number | null>(null)
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Helper to spawn a new root branch
    const spawnRoot = (x?: number, y?: number) => {
      const rect = canvas.getBoundingClientRect()
      const startX = x !== undefined ? x : Math.random() * rect.width
      const startY = y !== undefined ? y : Math.random() * rect.height
      const angle = Math.random() * Math.PI * 2
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      
      const root: Branch = {
        x: startX,
        y: startY,
        prevX: startX,
        prevY: startY,
        angle,
        speed: 1.2 + Math.random() * 0.8,
        color,
        width: 1.5,
        life: 100 + Math.random() * 80,
        maxLife: 180,
        depth: 0,
        branchInterval: 25 + Math.floor(Math.random() * 15),
        stepsSinceBranch: 0,
      }
      
      branchesRef.current.push(root)
    }

    // Initialize with a few branches
    for (let i = 0; i < 4; i++) {
      spawnRoot()
    }

    // Track mouse move for interactive spawning
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      // If mouse is inside the canvas
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouseRef.current = { x, y, active: true }
        
        // Occasionally spawn a branch from mouse position
        if (Math.random() < 0.08 && branchesRef.current.length < 15) {
          spawnRoot(x, y)
        }
      } else {
        mouseRef.current.active = false
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    window.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    // Animation Loop
    const tick = () => {
      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height

      // Subtle trailing fade out: draws a background overlay with low opacity (#101113 is rgb(16, 17, 19))
      ctx.fillStyle = 'rgba(16, 17, 19, 0.04)'
      ctx.fillRect(0, 0, w, h)

      const activeBranches = branchesRef.current
      const nextBranches: Branch[] = []

      for (let i = 0; i < activeBranches.length; i++) {
        const b = activeBranches[i]

        // Advance position
        b.x += Math.cos(b.angle) * b.speed
        b.y += Math.sin(b.angle) * b.speed

        // Bounce/reflect on boundaries
        if (b.x < 0 || b.x > w) {
          b.angle = Math.PI - b.angle
          b.x = Math.max(0, Math.min(w, b.x))
        }
        if (b.y < 0 || b.y > h) {
          b.angle = -b.angle
          b.y = Math.max(0, Math.min(h, b.y))
        }

        // Draw line segment
        ctx.beginPath()
        ctx.moveTo(b.prevX, b.prevY)
        ctx.lineTo(b.x, b.y)
        ctx.strokeStyle = b.color
        ctx.lineWidth = b.width
        ctx.lineCap = 'round'
        ctx.stroke()

        // Update previous points
        b.prevX = b.x
        b.prevY = b.y
        b.life--
        b.stepsSinceBranch++

        // Check if branch should continue
        if (b.life > 0) {
          nextBranches.push(b)

          // Check if it's time to branch
          if (b.stepsSinceBranch >= b.branchInterval && b.depth < 3 && nextBranches.length < 25) {
            b.stepsSinceBranch = 0

            // Choose geometric angles (e.g. 30, 45, 60 or 90 degrees offset)
            const angleOffsets = [Math.PI / 6, Math.PI / 4, Math.PI / 3, Math.PI / 2]
            const offset = angleOffsets[Math.floor(Math.random() * angleOffsets.length)]
            
            // Spawn child 1
            const child1: Branch = {
              x: b.x,
              y: b.y,
              prevX: b.x,
              prevY: b.y,
              angle: b.angle + offset,
              speed: b.speed * 0.9,
              color: b.color,
              width: b.width * 0.8,
              life: b.life * 0.8,
              maxLife: b.maxLife,
              depth: b.depth + 1,
              branchInterval: b.branchInterval,
              stepsSinceBranch: 0,
            }

            // Spawn child 2 (opposite direction)
            const child2: Branch = {
              x: b.x,
              y: b.y,
              prevX: b.x,
              prevY: b.y,
              angle: b.angle - offset,
              speed: b.speed * 0.9,
              color: b.color,
              width: b.width * 0.8,
              life: b.life * 0.8,
              maxLife: b.maxLife,
              depth: b.depth + 1,
              branchInterval: b.branchInterval,
              stepsSinceBranch: 0,
            }

            nextBranches.push(child1)
            nextBranches.push(child2)

            // Terminate the current parent branch to make a clean split
            b.life = 0
          }
        }
      }

      branchesRef.current = nextBranches

      // Ensure we always have at least some root branches active
      if (branchesRef.current.length < 3) {
        spawnRoot()
      }

      animationFrameId.current = requestAnimationFrame(tick)
    }

    tick()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 opacity-25 pointer-events-none transition-opacity duration-500 group-hover:opacity-35"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
