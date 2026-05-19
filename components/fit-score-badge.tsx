'use client'

import { useEffect, useRef, useState } from 'react'
import { cn, getScoreColor, getScoreBgColor } from '@/lib/utils'

interface FitScoreBadgeProps {
  score: number
  size?: 'sm' | 'md' | 'lg'
  animate?: boolean
}

export function FitScoreBadge({
  score,
  size = 'md',
  animate = true,
}: FitScoreBadgeProps) {
  const [displayScore, setDisplayScore] = useState(animate ? 0 : score)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!animate || hasAnimated.current) return
    hasAnimated.current = true

    const duration = 1000
    const steps = 30
    const increment = score / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= score) {
        setDisplayScore(score)
        clearInterval(timer)
      } else {
        setDisplayScore(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [score, animate])

  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full border font-semibold',
        sizeClasses[size],
        getScoreBgColor(score),
        getScoreColor(score)
      )}
    >
      {displayScore}
    </div>
  )
}
