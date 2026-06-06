import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { useGameStore } from '../store'
import { Scoreboard } from './Scoreboard'
import { getTeamClasses } from '../lib/constants'

const popIn = {
  initial: { opacity: 0, y: 20, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
}

export const ScoringPhase = () => {
  const {
    redTeamScore,
    blueTeamScore,
    currentTeam,
    skippedQuestions,
    successQuestions,
    adjustScore,
    switchTeam,
    resetRound,
    setPhase,
  } = useGameStore()

  const t = getTeamClasses(currentTeam)
  const next = getTeamClasses(currentTeam === 'red' ? 'blue' : 'red')
  const currentScore = currentTeam === 'red' ? redTeamScore : blueTeamScore

  const handleConfirm = () => {
    resetRound()
    switchTeam()
    setPhase('preparation')
  }

  const QuestionList = ({
    title,
    items,
    accent,
    chip,
  }: {
    title: ReactNode
    items: string[]
    accent: string
    chip: string
  }) => (
    <div className={`card bg-base-100 border-2 p-3 ${accent}`}>
      <div className="mb-2 flex items-center gap-1 text-sm font-bold">
        {title}
        <span className="font-num text-xs opacity-60">{items.length}</span>
      </div>
      <div className="flex max-h-36 flex-col gap-1 overflow-y-auto pr-1">
        {items.map((q, i) => (
          <div key={i} className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm ${chip}`}>
            <span className="font-num w-4 text-center text-xs font-bold opacity-70">{i + 1}</span>
            <span className="text-base-content/85 truncate">{q}</span>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-base-content/40 px-2 py-3 text-center text-xs">無</div>
        )}
      </div>
    </div>
  )

  return (
    <div className={`relative flex min-h-screen flex-col overflow-hidden ${t.tint}`}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className={`absolute -right-16 -top-12 h-52 w-52 rounded-full blur-sm ${t.soft}`} />
        <div className={`absolute -bottom-20 -left-10 h-48 w-48 rounded-full blur-sm ${t.soft}`} />
      </div>

      <div className="relative flex flex-1 flex-col gap-4 overflow-y-auto px-5 py-6">
        <motion.div className="text-center" {...popIn}>
          <div className={`font-num text-3xl font-bold ${t.text}`}>回合結束 🏁</div>
        </motion.div>

        <motion.div {...popIn} transition={{ delay: 0.05 }}>
          <Scoreboard redScore={redTeamScore} blueScore={blueTeamScore} currentTeam={currentTeam} />
        </motion.div>

        {/* 本回合答對 + 加減分 */}
        <motion.div
          className={`card bg-base-100 flex flex-row items-center justify-between border-2 px-4 py-4 ${t.softBorder}`}
          {...popIn}
          transition={{ delay: 0.1 }}
        >
          <motion.button
            onClick={() => adjustScore(currentTeam, -1)}
            className="btn btn-circle border-0 bg-error/15 text-error h-11 w-11 text-2xl shadow-[0_4px_0_0_#f4ccd3]"
            whileTap={{ scale: 0.9 }}
            aria-label="減一分"
          >
            −
          </motion.button>
          <div className="text-center">
            <div className="text-base-content/55 text-sm">
              {t.name}・本回合答對 {successQuestions.length} 題
            </div>
            <motion.div
              key={currentScore}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 16 }}
              className={`font-num mt-0.5 text-4xl font-bold leading-none ${t.text}`}
            >
              {currentScore}
              <span className="text-base-content/50 text-lg"> 分</span>
            </motion.div>
          </div>
          <motion.button
            onClick={() => adjustScore(currentTeam, 1)}
            className="btn btn-circle border-0 bg-success/15 text-success h-11 w-11 text-2xl shadow-[0_4px_0_0_#c2ebd3]"
            whileTap={{ scale: 0.9 }}
            aria-label="加一分"
          >
            +
          </motion.button>
        </motion.div>

        {/* 兩欄清單 */}
        <motion.div className="grid grid-cols-2 gap-3" {...popIn} transition={{ delay: 0.15 }}>
          <QuestionList
            title="❌ 跳過"
            items={skippedQuestions}
            accent="border-warning/30"
            chip="bg-warning/10"
          />
          <QuestionList
            title="✅ 答對"
            items={successQuestions}
            accent="border-success/30"
            chip="bg-success/10"
          />
        </motion.div>
      </div>

      {/* 底部 */}
      <div className="bg-base-100/70 relative px-5 pb-7 pt-2 backdrop-blur">
        <motion.button
          onClick={handleConfirm}
          className={`btn ${t.btn} h-auto w-full rounded-2xl py-4 text-xl ${t.shadow3d}`}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
        >
          確定 ✓
        </motion.button>
        <div className="text-base-content/60 mt-3 text-center text-sm">
          下一回合輪到 <span className={`font-bold ${next.text}`}>{next.name}</span>
        </div>
      </div>
    </div>
  )
}
