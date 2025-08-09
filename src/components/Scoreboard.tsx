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
    <div className={`flex justify-center items-center gap-8 p-4 ${className}`}>
      {/* Red Team */}
      <div
        className={`card bg-base-200 shadow-lg text-center p-6 transition-all ${
          currentTeam === 'red'
            ? 'ring-2 ring-error bg-error/10'
            : ''
        }`}
      >
        <div className="text-error font-bold text-lg mb-1">紅隊</div>
        <div className="text-3xl font-bold text-error">{redScore}</div>
        <div className="text-sm text-base-content/70">分</div>
      </div>

      {/* VS Divider */}
      <div className="text-2xl font-bold text-base-content/60 bg-base-300 px-3 py-1 rounded-full">VS</div>

      {/* White Team */}
      <div
        className={`card bg-base-200 shadow-lg text-center p-6 transition-all ${
          currentTeam === 'white'
            ? 'ring-2 ring-base-content bg-base-content/10'
            : ''
        }`}
      >
        <div className="text-base-content font-bold text-lg mb-1">白隊</div>
        <div className="text-3xl font-bold text-base-content">{whiteScore}</div>
        <div className="text-sm text-base-content/70">分</div>
      </div>
    </div>
  )
}
