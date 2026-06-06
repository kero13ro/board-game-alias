import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { getCurrentQuestion } from '../lib/questions'
import { useGameStore } from '../store'
import { getTeamClasses } from '../lib/constants'
import { Timer } from './Timer'

const throttleDelay = 1000

export const AnswerPhase = () => {
  const {
    currentQuestionIndex,
    currentTeam,
    successQuestions,
    skippedQuestions,
    handleCorrectAnswer,
    handleSkipQuestion,
  } = useGameStore()
  const t = getTeamClasses(currentTeam)
  const currentQuestion = getCurrentQuestion(currentQuestionIndex)
  // 本回合第幾題（不是全域隨機索引）
  const roundQuestionNo =
    successQuestions.length + skippedQuestions.length + 1
  const [isThrottled, setIsThrottled] = useState(false)

  const guard = (fn: () => void) => () => {
    if (isThrottled) return
    setIsThrottled(true)
    fn()
    setTimeout(() => setIsThrottled(false), throttleDelay)
  }

  return (
    <div className={`relative flex min-h-screen flex-col overflow-hidden ${t.tint}`}>
      {/* 柔光裝飾 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className={`absolute -right-16 -top-10 h-52 w-52 rounded-full blur-sm ${t.soft}`} />
        <div className={`absolute -bottom-16 -left-12 h-48 w-48 rounded-full blur-sm ${t.soft}`} />
      </div>

      {/* 頂部：隊伍 + 環形計時 */}
      <div className="relative flex items-center gap-3 px-5 pb-3 pt-7">
        <div className={`rounded-full px-3 py-1.5 text-sm font-bold ${t.solid} ${t.solidText}`}>
          {t.name}
        </div>
        <Timer
          className="ml-auto"
          strokeClass={currentTeam === 'red' ? 'stroke-error' : 'stroke-primary'}
        />
      </div>

      {/* 題目大卡 */}
      <div className="relative flex flex-1 items-center px-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            className={`card bg-base-100 w-full border-[3px] px-6 py-12 text-center shadow-2xl ${t.border} ${t.shadow}`}
            initial={{ scale: 0.85, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -12 }}
            transition={{ type: 'spring', stiffness: 400, damping: 26 }}
          >
            <div className={`mb-5 inline-block rounded-full px-3 py-1 ${t.soft} ${t.text} font-num text-sm font-bold`}>
              第 {roundQuestionNo} 題
            </div>
            <div className={`font-num text-6xl font-bold leading-tight ${t.text} break-words`}>
              {currentQuestion}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 提示 */}
      <div className="relative px-6 pb-3 text-center">
        <p className="text-base-content/60 text-sm font-medium text-pretty">
          描述這個詞語，但<span className={`font-bold ${t.text}`}>不能說出</span>答案中的文字！
        </p>
      </div>

      {/* 大按鈕 */}
      <div className="relative grid grid-cols-2 gap-3 px-5 pb-7">
        <motion.button
          onClick={guard(handleSkipQuestion)}
          disabled={isThrottled}
          className={`btn btn-warning h-auto flex-col gap-0.5 rounded-2xl py-5 text-lg shadow-[0_6px_0_0_#d96a26] ${isThrottled ? 'opacity-50' : ''}`}
          whileHover={!isThrottled ? { scale: 1.04 } : {}}
          whileTap={!isThrottled ? { scale: 0.95 } : {}}
        >
          <span className="text-2xl">❌</span>
          <span>跳過</span>
        </motion.button>
        <motion.button
          onClick={guard(handleCorrectAnswer)}
          disabled={isThrottled}
          className={`btn btn-success h-auto flex-col gap-0.5 rounded-2xl py-5 text-lg shadow-[0_6px_0_0_#169a53] ${isThrottled ? 'opacity-50' : ''}`}
          whileHover={!isThrottled ? { scale: 1.04 } : {}}
          whileTap={!isThrottled ? { scale: 0.95 } : {}}
        >
          <span className="text-2xl">✅</span>
          <span>答對</span>
        </motion.button>
      </div>
    </div>
  )
}
