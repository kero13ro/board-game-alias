import { useGameStore } from '../store'
import { Scoreboard } from './Scoreboard'
import { TEAM_NAMES, getTeamColorClass } from '../lib/constants'

export const ScoringPhase = () => {
  const {
    redTeamScore,
    blueTeamScore,
    currentTeam,
    correctAnswers,
    skippedQuestions,
    successQuestions,
    adjustScore,
    switchTeam,
    resetRound,
    setPhase,
  } = useGameStore()


  const handleConfirm = () => {
    resetRound()
    switchTeam()
    setPhase('preparation')
  }

  const handleScoreAdjustment = (adjustment: number) => {
    adjustScore(currentTeam, adjustment)
  }

  return (
    <div className="min-h-screen from-secondary/20 to-accent/20 flex flex-col justify-center items-center p-3">
      <div className="card bg-base-100 shadow-xl p-4 w-full max-w-sm">
        <h2 className="text-xl font-bold text-center text-base-content mb-4">
          回合結束
        </h2>

        {/* Scoreboard */}
        <Scoreboard
          redScore={redTeamScore}
          blueScore={blueTeamScore}
          className="mb-4"
        />

        {/* Current Team Results & Score Adjustment */}
        <div className="text-center mb-4">
          <div className="text-xs text-base-content/70 mb-3">
            <span
              className={getTeamColorClass(currentTeam, 'text')}
            >
              {TEAM_NAMES[currentTeam]}
            </span>
            答對 {correctAnswers} 題
          </div>

          {/* Inline Score Adjustment */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => handleScoreAdjustment(-1)}
              className="btn btn-error w-10 h-10 rounded-full text-xl font-bold"
            >
              −
            </button>
            <div className="text-xl font-bold text-base-content min-w-[2.5rem] text-center text-success">
              {currentTeam === 'red' ? redTeamScore : blueTeamScore}
            </div>
            <button
              onClick={() => handleScoreAdjustment(1)}
              className="btn btn-success w-10 h-10 rounded-full text-xl font-bold"
            >
              +
            </button>
          </div>
        </div>

        {/* Questions Summary */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* Success Questions */}
          {successQuestions.length > 0 && (
            <div className="card bg-success/10 p-3">
              <h3 className="text-sm font-semibold text-success mb-2 text-center">
                ✅ 答對題目
              </h3>
              <div className="bg-base-100 rounded-lg p-2 max-h-24 overflow-y-auto">
                <div className="space-y-1">
                  {successQuestions.map((question, index) => (
                    <div
                      key={question.id}
                      className="text-xs text-base-content break-words"
                    >
                      {index + 1}. {question.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Skipped Questions */}
          {skippedQuestions.length > 0 && (
            <div className="card bg-warning/10 p-3">
              <h3 className="text-sm font-semibold text-warning mb-2 text-center">
                ❌ 跳過題目
              </h3>
              <div className="bg-base-100 rounded-lg p-2 max-h-24 overflow-y-auto">
                <div className="space-y-1">
                  {skippedQuestions.map((question, index) => (
                    <div
                      key={question.id}
                      className="text-xs text-base-content break-words"
                    >
                      {index + 1}. {question.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          className="btn btn-primary w-full py-2 px-4 text-sm font-medium"
        >
          確定 - 換隊
        </button>

        {/* Next Team Indicator */}
        <div className="text-center mt-3 text-xs text-base-content/70">
          下一回合：{currentTeam === 'red' ? TEAM_NAMES.blue : TEAM_NAMES.red}
        </div>
      </div>
    </div>
  )
}
