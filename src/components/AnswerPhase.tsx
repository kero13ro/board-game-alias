import { motion } from 'motion/react'
import { useGameStore } from '../store'
import { Timer } from './Timer'
import { getCurrentQuestion } from '../lib/questions'
import { TEAM_NAMES, getTeamColorClass } from '../lib/constants'

export const AnswerPhase = () => {
  const {
    currentTeam,
    currentQuestionIndex,
    correctAnswers,
    handleCorrectAnswer,
    handleSkipQuestion,
  } = useGameStore()
  
  const currentQuestion = getCurrentQuestion(currentQuestionIndex)


  const handleCorrectClick = () => {
    handleCorrectAnswer()
  }

  const handleSkipClick = () => {
    handleSkipQuestion()
  }

  return (
    <div className="min-h-screen from-primary/20 to-secondary/20 flex flex-col justify-center items-center p-3">
      <div className="w-full max-w-sm space-y-4">
        
        {/* Timer */}
        <div className="card bg-base-100 shadow-xl p-3">
          <Timer />
        </div>

        {/* Team and Score Info */}
        <div className="card bg-base-100 shadow-lg p-4 text-center">
          <div
            className={`text-lg font-bold mb-2 ${getTeamColorClass(currentTeam, 'text')}`}
          >
            {TEAM_NAMES[currentTeam]}
          </div>
          <div className="text-xs text-base-content/70">
            本回合答對：{correctAnswers} 題
          </div>
        </div>

        {/* Question Card */}
        <div className="relative">
          <motion.div
            className="card bg-base-100 shadow-xl p-6 text-center rounded-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
              delay: 0.1
            }}
            key={currentQuestion.id}
          >
            <div className="flex flex-col justify-center">
              <motion.div 
                className="text-3xl font-bold text-base-content mb-4 break-words hyphens-auto"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                {currentQuestion.text}
              </motion.div>
              
              <div className="text-xs text-base-content/60 mb-2">
                題目 #{currentQuestionIndex + 1}
              </div>
              
            </div>
          </motion.div>
        </div>

        {/* Instructions */}
        <div className="card bg-base-100/80 backdrop-blur shadow-lg p-4 text-center">
          <div className="text-xs text-base-content/80 mb-2 break-words">
            描述這個詞語，但不能說出答案中的文字！
          </div>
          <div className="text-xs text-base-content/60">
            使用下方按鈕選擇答對或跳過
          </div>
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
            className="btn btn-warning flex-1 py-3 px-4 text-base font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ❌ 跳過
          </motion.button>
          <motion.button
            onClick={handleCorrectClick}
            className="btn btn-success flex-1 py-3 px-4 text-base font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ✅ 答對
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}