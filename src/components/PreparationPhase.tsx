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
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">遊戲結束！</h1>
          <div className="text-xl mb-6">
            恭喜{' '}
            <span
              className={`font-bold ${winner === 'red' ? 'text-red-600' : 'text-gray-600'}`}
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
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            重新開始
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
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
        <div className="text-center mb-8">
          <div className="text-lg text-gray-600 mb-2">準備猜題</div>
          <div
            className={`text-2xl font-bold ${
              currentTeam === 'red' ? 'text-red-600' : 'text-gray-600'
            }`}
          >
            {teamNames[currentTeam]}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={toggleRulesModal}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            規則
          </button>

          <button
            onClick={startCountdown}
            className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
              currentTeam === 'red'
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-gray-500 hover:bg-gray-600 text-white'
            }`}
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
