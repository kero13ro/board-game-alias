import type { Team } from '../types'

interface ScoreboardProps {
  redScore: number
  whiteScore: number
  currentTeam?: Team
  className?: string
}

export const Scoreboard = ({
  redScore,
  whiteScore,
  currentTeam,
  className = '',
}: ScoreboardProps) => {
  return (
    <div className={`flex justify-center items-center gap-8 ${className}`}>
      {/* Red Team */}
      <div
        className={`text-center p-4 rounded-lg transition-all ${
          currentTeam === 'red'
            ? 'bg-red-100 border-2 border-red-400'
            : 'bg-gray-100'
        }`}
      >
        <div className="text-red-600 font-bold text-lg mb-1">紅隊</div>
        <div className="text-3xl font-bold text-red-700">{redScore}</div>
        <div className="text-sm text-gray-600">分</div>
      </div>

      {/* VS Divider */}
      <div className="text-2xl font-bold text-gray-400">VS</div>

      {/* White Team */}
      <div
        className={`text-center p-4 rounded-lg transition-all ${
          currentTeam === 'white'
            ? 'bg-gray-100 border-2 border-gray-400'
            : 'bg-gray-50'
        }`}
      >
        <div className="text-gray-600 font-bold text-lg mb-1">白隊</div>
        <div className="text-3xl font-bold text-gray-700">{whiteScore}</div>
        <div className="text-sm text-gray-600">分</div>
      </div>
    </div>
  )
}
