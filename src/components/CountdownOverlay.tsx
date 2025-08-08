import { useEffect } from 'react'
import { useGameStore } from '../store'

export const CountdownOverlay = () => {
  const { countdownValue, setPhase } = useGameStore()

  useEffect(() => {
    if (countdownValue > 0) {
      const timer = setTimeout(() => {
        if (countdownValue === 1) {
          // Countdown finished, start the round
          useGameStore.getState().startRound()
        } else {
          // Continue countdown
          useGameStore.setState({ countdownValue: countdownValue - 1 })
        }
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [countdownValue, setPhase])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="text-8xl font-bold text-white mb-4 animate-pulse">
          {countdownValue}
        </div>
        <div className="text-2xl text-white font-medium">
          {countdownValue === 3
            ? '準備開始...'
            : countdownValue === 2
              ? '準備...'
              : '開始！'}
        </div>
      </div>
    </div>
  )
}
