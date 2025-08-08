import { useEffect } from 'react'
import { motion } from 'motion/react'
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
    <motion.div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="card bg-base-100/10 backdrop-blur-md border border-base-content/20 p-8 text-center"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <motion.div 
          className="text-8xl font-bold text-white mb-4 drop-shadow-lg"
          key={countdownValue}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 25,
            duration: 0.4
          }}
        >
          {countdownValue}
        </motion.div>
        <motion.div 
          className="text-2xl text-white font-medium drop-shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {countdownValue === 3
            ? '準備開始...'
            : countdownValue === 2
              ? '準備...'
              : '開始！'}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
