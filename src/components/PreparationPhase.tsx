import { motion } from 'motion/react'
import { useGameStore } from '../store'
import { Scoreboard } from './Scoreboard'
import { RulesModal } from './RulesModal'
import { getTeamClasses } from '../lib/constants'

/** 角落柔光裝飾（依隊色）*/
const Blobs = ({ tint }: { tint: string }) => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className={`absolute -left-16 -top-16 h-56 w-56 rounded-full blur-sm ${tint}`} />
    <div className={`absolute -right-20 top-1/3 h-52 w-52 rounded-full blur-sm ${tint}`} />
    <div className={`absolute -bottom-20 -left-10 h-48 w-48 rounded-full blur-sm ${tint}`} />
  </div>
)

const popIn = {
  initial: { opacity: 0, y: 24, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
}

export const PreparationPhase = () => {
  const {
    redTeamScore,
    blueTeamScore,
    currentTeam,
    showRulesModal,
    toggleRulesModal,
    startCountdown,
    winner,
  } = useGameStore()

  // ---------- 勝利結算 ----------
  if (winner) {
    const w = getTeamClasses(winner)
    const confettiColor = ['bg-error', 'bg-primary', 'bg-accent', 'bg-success', 'bg-secondary']
    return (
      <div className={`relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-6 ${w.tint}`}>
        <Blobs tint={w.soft} />

        {/* 彩帶 */}
        {Array.from({ length: 24 }).map((_, i) => (
          <motion.span
            key={i}
            className={`absolute top-0 h-4 w-2.5 rounded-sm ${confettiColor[i % 5]}`}
            style={{ left: `${(i * 37) % 100}%` }}
            initial={{ y: -30, rotate: 0, opacity: 1 }}
            animate={{ y: 760, rotate: 540, opacity: [1, 1, 0] }}
            transition={{
              duration: 2.4 + (i % 5) * 0.4,
              repeat: Infinity,
              delay: (i % 7) * 0.3,
              ease: 'linear',
            }}
          />
        ))}

        <div className="relative flex w-full max-w-sm flex-col items-center">
          <motion.div
            className="mb-2 text-8xl"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 14 }}
          >
            🎉
          </motion.div>
          <motion.div className="text-center" {...popIn} transition={{ delay: 0.1 }}>
            <div className="text-base-content/60 mb-1 text-lg font-medium">遊戲結束！恭喜</div>
            <motion.div
              className={`font-num mb-4 inline-block text-6xl font-bold ${w.text}`}
              animate={{ rotate: [-2, 2, -2] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              {w.name}
            </motion.div>
            <div className="text-base-content/80 mb-7 text-2xl font-bold">獲得勝利 👑</div>
          </motion.div>

          <motion.div className="mb-7 w-full" {...popIn} transition={{ delay: 0.2 }}>
            <Scoreboard redScore={redTeamScore} blueScore={blueTeamScore} currentTeam={winner} />
          </motion.div>

          <motion.button
            onClick={() => useGameStore.getState().resetGame()}
            className={`btn ${w.btn} h-auto w-full rounded-2xl py-4 text-xl ${w.shadow3d}`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            {...popIn}
            transition={{ delay: 0.3 }}
          >
            🔄 重新開始
          </motion.button>
        </div>
      </div>
    )
  }

  // ---------- 準備畫面 ----------
  const t = getTeamClasses(currentTeam)
  return (
    <div className={`relative flex min-h-screen flex-col justify-center overflow-hidden p-5 ${t.tint}`}>
      <Blobs tint={t.soft} />

      <div className="relative mx-auto flex w-full max-w-sm flex-col gap-5">
        <motion.div {...popIn}>
          <Scoreboard redScore={redTeamScore} blueScore={blueTeamScore} currentTeam={currentTeam} />
        </motion.div>

        {/* 當前隊伍大卡（厚邊框染色）*/}
        <motion.div
          className={`card bg-base-100 relative overflow-hidden border-[3px] px-6 py-9 text-center shadow-xl ${t.border} ${t.shadow}`}
          {...popIn}
          transition={{ delay: 0.1 }}
        >
          <div className={`absolute inset-x-0 top-0 h-2 ${t.solid}`} />
          <div className="text-base-content/60 mb-2 text-base font-medium">輪到</div>
          <motion.div
            className={`font-num mb-3 inline-block text-5xl font-bold ${t.text}`}
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            {t.name}
          </motion.div>
          <div className="text-base-content/80 text-lg font-bold">準備猜題 🎤</div>
          <div className="text-base-content/50 mt-2 text-sm">
            手機交給出題者，其他人圍好囉！
          </div>
        </motion.div>

        {/* 按鈕 */}
        <motion.div className="flex flex-col gap-3" {...popIn} transition={{ delay: 0.2 }}>
          <motion.button
            onClick={toggleRulesModal}
            className={`btn btn-ghost bg-base-100 h-auto w-full rounded-2xl border-2 py-3 text-base ${t.softBorder} ${t.softShadow3d}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            📖 規則
          </motion.button>
          <motion.button
            onClick={startCountdown}
            className={`btn ${t.btn} h-auto w-full rounded-2xl py-4 text-xl ${t.shadow3d}`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
          >
            準備好了 🚀
          </motion.button>
        </motion.div>
      </div>

      <RulesModal isOpen={showRulesModal} onClose={toggleRulesModal} />
    </div>
  )
}
