import { useGameStore } from '../store'
import { Scoreboard } from './Scoreboard'

export const ScoringPhase = () => {
  const {
    redTeamScore,
    whiteTeamScore,
    currentTeam,
    correctAnswers,
    skippedQuestions,
    successQuestions,
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
    <div className="min-h-screen bg-gradient-to-br from-secondary/20 to-accent/20 flex flex-col justify-center items-center p-6">
      <div className="card bg-base-100 shadow-xl p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-base-content mb-6">
          回合結束
        </h2>

        {/* Current Team Results */}
        <div className="text-center mb-6">
          <div
            className={`text-xl font-bold mb-2 ${
              currentTeam === 'red' ? 'text-error' : 'text-base-content'
            }`}
          >
            {teamNames[currentTeam]}
          </div>
          <div className="text-3xl font-bold text-success mb-2">
            +{correctAnswers}
          </div>
          <div className="text-sm text-base-content/70">答對 {correctAnswers} 題</div>
        </div>

        {/* Scoreboard */}
        <Scoreboard
          redScore={redTeamScore}
          whiteScore={whiteTeamScore}
          className="mb-6"
        />
        
        {/* Questions Summary */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Success Questions */}
          {successQuestions.length > 0 && (
            <div className="card bg-success/10 p-4">
              <h3 className="text-lg font-semibold text-success mb-3 text-center">
                ✅ 答對題目
              </h3>
              <div className="bg-base-100 rounded-lg p-3 max-h-32 overflow-y-auto">
                <div className="space-y-2">
                  {successQuestions.map((question, index) => (
                    <div key={question.id} className="text-sm text-base-content">
                      {index + 1}. {question.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Skipped Questions */}
          {skippedQuestions.length > 0 && (
            <div className="card bg-warning/10 p-4">
              <h3 className="text-lg font-semibold text-warning mb-3 text-center">
                ❌ 跳過題目
              </h3>
              <div className="bg-base-100 rounded-lg p-3 max-h-32 overflow-y-auto">
                <div className="space-y-2">
                  {skippedQuestions.map((question, index) => (
                    <div key={question.id} className="text-sm text-base-content">
                      {index + 1}. {question.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>


        {/* Score Adjustment */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-base-content mb-3 text-center">
            調整分數
          </h3>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => handleScoreAdjustment(-1)}
              className="btn btn-error w-12 h-12 rounded-full text-2xl font-bold"
            >
              −
            </button>
            <div className="text-2xl font-bold text-base-content min-w-[3rem] text-center">
              {currentTeam === 'red' ? redTeamScore : whiteTeamScore}
            </div>
            <button
              onClick={() => handleScoreAdjustment(1)}
              className="btn btn-success w-12 h-12 rounded-full text-2xl font-bold"
            >
              +
            </button>
          </div>
          <div className="text-xs text-base-content/60 text-center mt-2">
            {teamNames[currentTeam]} 目前分數
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          className="btn btn-primary w-full py-3 px-6 font-medium"
        >
          確定 - 換隊
        </button>

        {/* Next Team Indicator */}
        <div className="text-center mt-4 text-sm text-base-content/70">
          下一回合：{currentTeam === 'red' ? teamNames.white : teamNames.red}
        </div>
      </div>
    </div>
  )
}
