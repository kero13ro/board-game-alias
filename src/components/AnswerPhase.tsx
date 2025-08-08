import { useState, useEffect, useRef } from 'react'
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

  const [startX, setStartX] = useState<number>(0)
  const [currentX, setCurrentX] = useState<number>(0)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const SWIPE_THRESHOLD = 100

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

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX)
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const currentX = e.touches[0].clientX
    setCurrentX(currentX - startX)
  }

  const handleTouchEnd = () => {
    if (!isDragging) return

    if (currentX > SWIPE_THRESHOLD) {
      // Right swipe - Correct answer
      handleCorrectAnswer()
    } else if (currentX < -SWIPE_THRESHOLD) {
      // Left swipe - Skip question
      handleSkipQuestion()
    }

    // Reset
    setCurrentX(0)
    setIsDragging(false)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX)
    setIsDragging(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    setCurrentX(e.clientX - startX)
  }

  const handleMouseUp = () => {
    if (!isDragging) return

    if (currentX > SWIPE_THRESHOLD) {
      handleCorrectAnswer()
    } else if (currentX < -SWIPE_THRESHOLD) {
      handleSkipQuestion()
    }

    setCurrentX(0)
    setIsDragging(false)
  }

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

  const getSwipeHint = () => {
    if (Math.abs(currentX) < 20) return null

    if (currentX > SWIPE_THRESHOLD) {
      return (
        <div className="absolute top-4 left-4 badge badge-success text-white px-4 py-2 text-base font-bold">
          答對！ ✓
        </div>
      )
    } else if (currentX < -SWIPE_THRESHOLD) {
      return (
        <div className="absolute top-4 right-4 badge badge-warning text-white px-4 py-2 text-base font-bold">
          跳過！ →
        </div>
      )
    } else if (currentX > 50) {
      return (
        <div className="absolute top-4 left-4 badge badge-success badge-outline px-4 py-2 text-base">
          向右滑答對 →
        </div>
      )
    } else if (currentX < -50) {
      return (
        <div className="absolute top-4 right-4 badge badge-warning badge-outline px-4 py-2 text-base">
          ← 向左滑跳過
        </div>
      )
    }

    return null
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
        <div className="relative">
          <div
            ref={cardRef}
            className="card bg-base-100 shadow-xl p-12 text-center transform transition-transform duration-200 select-none cursor-grab active:cursor-grabbing"
            style={{
              transform: `translateX(${currentX}px) rotate(${currentX * 0.1}deg)`,
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div className="text-4xl font-bold text-base-content mb-4">
              {currentQuestion}
            </div>
            <div className="text-sm text-base-content/60">
              題目 #{currentQuestionIndex + 1}
            </div>
          </div>

          {/* Swipe Hints */}
          {getSwipeHint()}
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
        <div className="flex gap-4 mt-8 md:hidden">
          <button
            onClick={handleSkipQuestion}
            className="btn btn-warning flex-1 py-3 px-6 font-medium"
          >
            跳過
          </button>
          <button
            onClick={handleCorrectAnswer}
            className="btn btn-success flex-1 py-3 px-6 font-medium"
          >
            答對
          </button>
        </div>
      </div>
    </div>
  )
}
