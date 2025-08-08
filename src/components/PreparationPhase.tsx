import { useGameStore } from '../store'
import { Scoreboard } from './Scoreboard'
import { RulesModal } from './RulesModal'

export const PreparationPhase = () => {
  const {
    redTeamScore,
    whiteTeamScore,
    currentTeam,
    showRulesModal,
    toggleRulesModal,
    startCountdown,
    winner,
  } = useGameStore()

  const teamNames = {
    red: '紅隊',
    white: '白隊',
  }

  if (winner) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warning/20 to-accent/20 flex items-center justify-center p-6">
        <div className="card bg-base-100 shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-base-content mb-4">遊戲結束！</h1>
          <div className="text-xl mb-6">
            恭喜{' '}
            <span
              className={`font-bold ${winner === 'red' ? 'text-error' : 'text-neutral'}`}
            >
              {teamNames[winner]}
            </span>{' '}
            獲勝！
          </div>
          <Scoreboard
            redScore={redTeamScore}
            whiteScore={whiteTeamScore}
            className="mb-6"
          />
          <button
            onClick={() => useGameStore.getState().resetGame()}
            className="btn btn-primary px-8 py-3 font-medium"
          >
            重新開始
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 to-accent/20 flex flex-col justify-center items-center p-6">
      <div className="card bg-base-100 shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-base-content mb-8">
          Board Game Alias
        </h1>

        {/* Scoreboard */}
        <Scoreboard
          redScore={redTeamScore}
          whiteScore={whiteTeamScore}
          currentTeam={currentTeam}
          className="mb-8"
        />

        {/* Current Team Indicator */}
        <div className="card bg-base-200 shadow-inner p-4 text-center mb-8">
          <div className="text-lg text-base-content/80 mb-2">準備猜題</div>
          <div
            className={`text-2xl font-bold ${
              currentTeam === 'red' ? 'text-error' : 'text-neutral'
            }`}
          >
            {teamNames[currentTeam]}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={toggleRulesModal}
            className="btn btn-neutral w-full py-3 px-6 font-medium"
          >
            規則
          </button>

          <button
            onClick={startCountdown}
            className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
              currentTeam === 'red'
                ? 'btn-error'
                : 'btn-neutral'
            } btn w-full py-3 px-6 font-medium`}
          >
            準備好了
          </button>
        </div>
      </div>

      {/* Rules Modal */}
      <RulesModal isOpen={showRulesModal} onClose={toggleRulesModal} />
    </div>
  )
}
