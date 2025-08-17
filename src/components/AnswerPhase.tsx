import { motion } from 'motion/react'
import { useState } from 'react'
import { getCurrentQuestion } from '../lib/questions'
import { useGameStore } from '../store'
import { Timer } from './Timer'

const throttleDelay = 1000

export const AnswerPhase = () => {
  const { currentQuestionIndex, handleCorrectAnswer, handleSkipQuestion } =
    useGameStore()

  const currentQuestion = getCurrentQuestion(currentQuestionIndex)
  const [isThrottled, setIsThrottled] = useState(false)

  const handleCorrectClick = () => {
    if (isThrottled) return

    setIsThrottled(true)
    handleCorrectAnswer()

    setTimeout(() => setIsThrottled(false), throttleDelay)
  }

  const handleSkipClick = () => {
    if (isThrottled) return

    setIsThrottled(true)
    handleSkipQuestion()

    setTimeout(() => setIsThrottled(false), throttleDelay)
  }

  return (
    <div className="min-h-screen from-primary/20 to-secondary/20 flex flex-col justify-center items-center p-3">
      <div className="w-full max-w-sm space-y-4">
        <div className="card bg-base-100 shadow-xl text-center">
          <Timer />
        </div>

        {/* Question Card */}
        <div className="relative">
          <motion.div
            className="card bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20 shadow-2xl p-8 text-center rounded-3xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 25,
              delay: 0.1,
            }}
            key={currentQuestionIndex}
          >
            <div className="flex flex-col justify-center">
              <div className="text-sm text-primary/70 font-medium">
                #{currentQuestionIndex + 1}
              </div>

              <motion.div
                className="text-4xl font-bold my-6 break-words hyphens-auto leading-tight"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                {currentQuestion}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Instructions */}
        <div className="card bg-base-100/80 backdrop-blur shadow-lg "></div>
        <div className="text-xs text-base-content/80 mb-2 break-words pt-4 pb-2 text-center">
          描述這個詞語，但不能說出答案中的文字！
        </div>

        {/* Action Buttons */}
        <motion.div
          className="flex gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.button
            onClick={handleSkipClick}
            className={`btn btn-warning flex-1 py-3 px-4 text-base font-medium ${isThrottled ? 'opacity-50 cursor-not-allowed' : ''}`}
            whileHover={!isThrottled ? { scale: 1.05 } : {}}
            whileTap={!isThrottled ? { scale: 0.95 } : {}}
          >
            ❌ 跳過
          </motion.button>
          <motion.button
            onClick={handleCorrectClick}
            className={`btn btn-success flex-1 py-3 px-4 text-base font-medium ${isThrottled ? 'opacity-50 cursor-not-allowed' : ''}`}
            whileHover={!isThrottled ? { scale: 1.05 } : {}}
            whileTap={!isThrottled ? { scale: 0.95 } : {}}
          >
            ✅ 答對
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
