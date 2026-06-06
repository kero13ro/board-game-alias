import { useEffect } from 'react'
import { motion } from 'motion/react'
import { useGameStore } from '../store'
import { getTeamClasses } from '../lib/constants'

export const CountdownOverlay = () => {
  const { countdownValue, currentTeam, setPhase } = useGameStore()
  const t = getTeamClasses(currentTeam)

  useEffect(() => {
    if (countdownValue > 0) {
      const timer = setTimeout(() => {
        if (countdownValue === 1) {
          useGameStore.getState().startRound()
        } else {
          useGameStore.setState({ countdownValue: countdownValue - 1 })
        }
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [countdownValue, setPhase])

  const label =
    countdownValue === 3 ? '準備開始' : countdownValue === 2 ? '準備' : '開始！'

  return (
    <motion.div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden ${t.solid}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* 柔光裝飾 */}
      <div className="bg-base-100/15 absolute -left-10 -top-10 h-60 w-60 rounded-full blur-sm" />
      <div className="absolute -bottom-16 -right-10 h-72 w-72 rounded-full bg-black/10 blur-sm" />

      <motion.div
        className={`mb-6 text-2xl font-bold tracking-widest ${t.solidText} opacity-90`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 0.9 }}
      >
        {t.name} 準備
      </motion.div>

      <div className="relative flex h-44 w-44 items-center justify-center rounded-full border-4 border-white/40 bg-white/15 backdrop-blur">
        <motion.span
          key={countdownValue}
          className={`font-num font-bold leading-none ${t.solidText}`}
          style={{ fontSize: '7rem' }}
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 16 }}
        >
          {countdownValue}
        </motion.span>
      </div>

      <motion.div
        key={`label-${countdownValue}`}
        className={`mt-8 text-3xl font-bold ${t.solidText}`}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        {label}
      </motion.div>
    </motion.div>
  )
}
