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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="card bg-base-100/10 backdrop-blur-md border border-base-content/20 p-8 text-center">
        <div className="text-8xl font-bold text-white mb-4 animate-pulse drop-shadow-lg">
          {countdownValue}
        </div>
        <div className="text-2xl text-white font-medium drop-shadow-md">
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
