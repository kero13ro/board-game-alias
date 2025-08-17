import { TEAM_NAMES } from '../lib/constants'
import { useGameStore } from '../store'
import { Scoreboard } from './Scoreboard'

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

        {/* Questions Summary */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* Skipped Questions */}
          {
            <div className="card bg-warning/10 p-3">
              <h3 className="text-sm font-semibold text-warning mb-2 text-center">
                ❌ 跳過題目
              </h3>
              <div className="bg-base-100 rounded-lg p-2 max-h-40 overflow-y-auto">
                <div className="space-y-1">
                  {skippedQuestions.map((question, index) => (
                    <div
                      key={index}
                      className="text-xs text-base-content break-words"
                    >
                      {index + 1}. {question}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          }

          {/* Success Questions */}
          {
            <div className="card bg-success/10 p-3">
              <h3 className="text-sm font-semibold text-success mb-2 text-center">
                ✅ 答對題目
              </h3>
              <div className="bg-base-100 rounded-lg p-2 max-h-40 overflow-y-auto">
                <div className="space-y-1">
                  {successQuestions.map((question, index) => (
                    <div
                      key={index}
                      className="text-xs text-base-content break-words"
                    >
                      {index + 1}. {question}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          }
        </div>

        {/* Current Team Results & Score Adjustment */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center mb-3 gap-3">
            <button
              onClick={() => handleScoreAdjustment(-1)}
              className="btn btn-error size-8 rounded-full  font-bold"
            >
              −
            </button>
            <div className="text-base-content/70">
              {TEAM_NAMES[currentTeam]} 答對{' '}
              {currentTeam === 'red' ? redTeamScore : blueTeamScore} 題
            </div>
            <button
              onClick={() => handleScoreAdjustment(1)}
              className="btn btn-success size-8 rounded-full  font-bold"
            >
              +
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={handleConfirm}
            className="btn btn-success w-full py-2 px-4 text-sm font-medium"
          >
            確定
          </button>

          {/* <button
            onClick={resetGame}
            className="btn btn-outline btn-error w-full py-2 px-4 text-sm font-medium"
          >
            重新開始遊戲
          </button> */}
        </div>

        {/* Next Team Indicator */}
        <div className="text-center mt-3 text-xs text-base-content/70">
          下一回合：{currentTeam === 'red' ? TEAM_NAMES.blue : TEAM_NAMES.red}
        </div>
      </div>
    </div>
  )
}
