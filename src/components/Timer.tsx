import { useEffect } from 'react'
import { motion } from 'motion/react'
import { useGameStore } from '../store'
import { ROUND_DURATION } from '../lib/constants'

interface TimerProps {
  className?: string
  /** 環的顏色（依當前隊伍）。預設 stroke-primary。低於 10 秒一律轉成 error。 */
  strokeClass?: string
}

const SIZE = 78
const STROKE = 8
const R = (SIZE - STROKE) / 2
const C = 2 * Math.PI * R

export const Timer = ({ className = '', strokeClass = 'stroke-primary' }: TimerProps) => {
  const { timeLeft, isTimerActive, updateTimer } = useGameStore()

  useEffect(() => {
    let interval: number | undefined
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => updateTimer(timeLeft - 1), 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTimerActive, timeLeft, updateTimer])

  const pct = Math.max(0, Math.min(1, timeLeft / ROUND_DURATION))
  const isLow = timeLeft <= 10
  const ring = isLow ? 'stroke-error' : strokeClass
  // 數字顏色跟著環的隊色（game1：color = ringColor）
  const numColor = isLow ? 'text-error' : strokeClass.replace('stroke-', 'text-')

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <span className="text-base-content/55 text-sm font-medium">剩餘</span>
      <motion.div
        className="relative"
        style={{ width: SIZE, height: SIZE }}
        animate={isLow ? { rotate: [-3, 3, -3] } : { rotate: 0 }}
        transition={isLow ? { duration: 0.5, repeat: Infinity } : { duration: 0.2 }}
      >
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-full w-full -rotate-90">
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            fill="none"
            strokeWidth={STROKE}
            className="stroke-base-content/10"
          />
          <motion.circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            fill="none"
            strokeWidth={STROKE}
            strokeLinecap="round"
            className={ring}
            strokeDasharray={C}
            animate={{ strokeDashoffset: C * (1 - pct) }}
            transition={{ duration: 1, ease: 'linear' }}
          />
        </svg>
        <div
          className={`font-num absolute inset-0 flex items-center justify-center text-3xl font-bold ${numColor}`}
        >
          {timeLeft}
        </div>
      </motion.div>
    </div>
  )
}
