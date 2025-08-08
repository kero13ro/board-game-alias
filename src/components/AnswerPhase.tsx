import { useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'motion/react'
import { useGameStore } from '../store'
import { Timer } from './Timer'

export const AnswerPhase = () => {
  const {
    currentTeam,
    currentQuestionIndex,
    correctAnswers,
    handleCorrectAnswer,
    handleSkipQuestion,
  } = useGameStore()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useTransform(x, [-300, 0, 300], [-30, 0, 30])
  
  const SWIPE_THRESHOLD = 120
  const [isExiting, setIsExiting] = useState(false)

  // Sample questions - in a real app, these would come from props or API
  const sampleQuestions = [
    '蘋果',
    '電腦',
    '汽車',
    '音樂',
    '書本',
    '咖啡',
    '手機',
    '運動',
    '電影',
    '旅行',
    '朋友',
    '學校',
    '工作',
    '家庭',
    '美食',
    '購物',
    '遊戲',
    '動物',
    '天氣',
    '節日',
    '海洋',
    '山脈',
    '城市',
    '鄉村',
  ]

  const currentQuestion =
    sampleQuestions[currentQuestionIndex % sampleQuestions.length]

  const handleDrag = (event: any, info: any) => {
    setDragOffset(info.offset.x)
  }

  const handleDragEnd = (event: any, info: any) => {
    const { offset, velocity } = info
    const swipe = Math.abs(offset.x) > SWIPE_THRESHOLD || Math.abs(velocity.x) > 500
    
    if (swipe) {
      // Set exiting state
      setIsExiting(true)
      
      // Determine swipe direction
      const direction = offset.x > 0 ? 1 : -1
      
      // Animate card off screen
      animate(x, direction * 1000, { 
        duration: 0.4,
        ease: "easeOut"
      })
      
      // Trigger game action after animation completes
      setTimeout(() => {
        if (direction > 0) {
          handleCorrectAnswer()
        } else {
          handleSkipQuestion()
        }
        
        // Reset everything for next card
        setIsExiting(false)
        x.set(0)
        y.set(0)
        setDragOffset(0)
      }, 400)
    } else {
      // Snap back to center with spring animation
      animate(x, 0, { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      })
      animate(y, 0, { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      })
      setDragOffset(0)
    }
  }

  // Reset card position when question changes
  useEffect(() => {
    if (!isExiting) {
      x.set(0)
      y.set(0)
      setDragOffset(0)
    }
  }, [currentQuestion, x, y, isExiting])

  // Prevent context menu on long press
  useEffect(() => {
    const handleContextMenu = (e: Event) => e.preventDefault()
    document.addEventListener('contextmenu', handleContextMenu)
    return () => document.removeEventListener('contextmenu', handleContextMenu)
  }, [])

  const teamNames = {
    red: '紅隊',
    white: '白隊',
  }

  const [dragOffset, setDragOffset] = useState(0)
  
  const SwipeHints = () => {
    const showHints = Math.abs(dragOffset) > 30
    const isRightSwipe = dragOffset > 0
    const isCommitted = Math.abs(dragOffset) > SWIPE_THRESHOLD
    
    if (!showHints) return null

    return (
      <>
        {isRightSwipe && (
          <motion.div 
            className={`absolute top-4 left-4 px-4 py-2 text-base rounded-full ${
              isCommitted 
                ? 'bg-success text-white font-bold' 
                : 'bg-success/20 text-success border border-success'
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            {isCommitted ? '答對！ ✓' : '向右滑答對 →'}
          </motion.div>
        )}
        
        {!isRightSwipe && (
          <motion.div 
            className={`absolute top-4 right-4 px-4 py-2 text-base rounded-full ${
              isCommitted 
                ? 'bg-warning text-white font-bold' 
                : 'bg-warning/20 text-warning border border-warning'
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            {isCommitted ? '跳過！ ✗' : '← 向左滑跳過'}
          </motion.div>
        )}
      </>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 to-secondary/20 flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md">
        {/* Timer */}
        <div className="card bg-base-100 shadow-xl p-4 mb-8">
          <Timer className="" />
        </div>

        {/* Team and Score Info */}
        <div className="card bg-base-100 shadow-lg p-4 text-center mb-6">
          <div
            className={`text-xl font-bold ${
              currentTeam === 'red' ? 'text-error' : 'text-neutral'
            }`}
          >
            {teamNames[currentTeam]}
          </div>
          <div className="text-sm text-base-content/70">
            本回合答對：{correctAnswers} 題
          </div>
        </div>

        {/* Question Card */}
        <div className="relative h-80 w-full max-w-sm mx-auto">
          <motion.div
            className="absolute inset-0 card bg-base-100 shadow-xl p-12 text-center select-none cursor-grab active:cursor-grabbing rounded-2xl"
            style={{ 
              x,
              y,
              rotate
            }}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.1}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            whileDrag={{ 
              scale: 1.05,
              cursor: "grabbing"
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: isExiting ? 0.8 : 1, 
              opacity: isExiting ? 0 : 1
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
            key={currentQuestion}
          >
            <div className="flex flex-col justify-center h-full">
              <motion.div 
                className="text-4xl font-bold text-base-content mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                {currentQuestion}
              </motion.div>
              <div className="text-sm text-base-content/60">
                題目 #{currentQuestionIndex + 1}
              </div>
            </div>
            
            {/* Background indicators */}
            <motion.div 
              className="absolute inset-0 bg-success/10 border-4 border-success rounded-2xl flex items-center justify-center"
              style={{ 
                opacity: useTransform(x, [0, 150], [0, 1])
              }}
            >
              <div className="text-6xl">✓</div>
            </motion.div>
            
            <motion.div 
              className="absolute inset-0 bg-warning/10 border-4 border-warning rounded-2xl flex items-center justify-center"
              style={{ 
                opacity: useTransform(x, [-150, 0], [1, 0])
              }}
            >
              <div className="text-6xl">✕</div>
            </motion.div>
          </motion.div>

          {/* Swipe Hints */}
          <SwipeHints />
        </div>

        {/* Instructions */}
        <div className="card bg-base-100/80 backdrop-blur shadow-lg p-6 text-center mt-8 space-y-2">
          <div className="text-sm text-base-content/80">向右滑動 = 答對 ✓</div>
          <div className="text-sm text-base-content/80">向左滑動 = 跳過 ←</div>
          <div className="text-xs text-base-content/60 mt-4">
            描述這個詞語，但不能說出答案中的文字！
          </div>
        </div>

        {/* Action Buttons for Desktop */}
        <motion.div 
          className="flex gap-4 mt-8 md:hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.button
            onClick={() => {
              setIsExiting(false)
              x.set(0)
              y.set(0)
              setDragOffset(0)
              handleSkipQuestion()
            }}
            className="btn btn-warning flex-1 py-3 px-6 font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            跳過
          </motion.button>
          <motion.button
            onClick={() => {
              setIsExiting(false)
              x.set(0)
              y.set(0)
              setDragOffset(0)
              handleCorrectAnswer()
            }}
            className="btn btn-success flex-1 py-3 px-6 font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            答對
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
