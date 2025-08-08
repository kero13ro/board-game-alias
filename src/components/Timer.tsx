import { useEffect } from 'react'
import { useGameStore } from '../store'

interface TimerProps {
  className?: string
}

export const Timer = ({ className = '' }: TimerProps) => {
  const { timeLeft, isTimerActive, updateTimer } = useGameStore()

  useEffect(() => {
    let interval: number

    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        updateTimer(timeLeft - 1)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTimerActive, timeLeft, updateTimer])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const isLowTime = timeLeft <= 10

  return (
    <div className={`text-center p-4 ${className}`}>
      <div
        className={`text-6xl font-bold transition-colors ${
          isLowTime ? 'text-error animate-pulse' : 'text-primary'
        }`}
      >
        {minutes}:{seconds.toString().padStart(2, '0')}
      </div>
      <div className="text-lg text-base-content/70 mt-2">剩餘時間</div>
    </div>
  )
}
