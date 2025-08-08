import { useGameStore } from '../store'
import { Scoreboard } from './Scoreboard'

export const ScoringPhase = () => {
  const {
    redTeamScore,
    whiteTeamScore,
    currentTeam,
    correctAnswers,
    skippedQuestions,
    adjustScore,
    switchTeam,
    resetRound,
    setPhase,
  } = useGameStore()

  const teamNames = {
    red: '紅隊',
    white: '白隊',
  }

  const handleConfirm = () => {
    resetRound()
    switchTeam()
    setPhase('preparation')
  }

  const handleScoreAdjustment = (adjustment: number) => {
    adjustScore(currentTeam, adjustment)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-200 flex flex-col justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          回合結束
        </h2>

        {/* Current Team Results */}
        <div className="text-center mb-6">
          <div
            className={`text-xl font-bold mb-2 ${
              currentTeam === 'red' ? 'text-red-600' : 'text-gray-600'
            }`}
          >
            {teamNames[currentTeam]}
          </div>
          <div className="text-3xl font-bold text-green-600 mb-2">
            +{correctAnswers}
          </div>
          <div className="text-sm text-gray-600">答對 {correctAnswers} 題</div>
        </div>

        {/* Scoreboard */}
        <Scoreboard
          redScore={redTeamScore}
          whiteScore={whiteTeamScore}
          className="mb-6"
        />

        {/* Skipped Questions */}
        {skippedQuestions.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              跳過的題目：
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 max-h-32 overflow-y-auto">
              <div className="space-y-2">
                {skippedQuestions.map((question, index) => (
                  <div key={question.id} className="text-sm text-gray-600">
                    {index + 1}. {question.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Score Adjustment */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 text-center">
            調整分數
          </h3>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => handleScoreAdjustment(-1)}
              className="bg-red-500 hover:bg-red-600 text-white w-12 h-12 rounded-full text-2xl font-bold transition-colors"
            >
              −
            </button>
            <div className="text-2xl font-bold text-gray-700 min-w-[3rem] text-center">
              {currentTeam === 'red' ? redTeamScore : whiteTeamScore}
            </div>
            <button
              onClick={() => handleScoreAdjustment(1)}
              className="bg-green-500 hover:bg-green-600 text-white w-12 h-12 rounded-full text-2xl font-bold transition-colors"
            >
              +
            </button>
          </div>
          <div className="text-xs text-gray-500 text-center mt-2">
            {teamNames[currentTeam]} 目前分數
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
        >
          確定 - 換隊
        </button>

        {/* Next Team Indicator */}
        <div className="text-center mt-4 text-sm text-gray-600">
          下一回合：{currentTeam === 'red' ? teamNames.white : teamNames.red}
        </div>
      </div>
    </div>
  )
}
