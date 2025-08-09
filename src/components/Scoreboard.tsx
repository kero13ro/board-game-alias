import type { Team } from '../types'

interface ScoreboardProps {
  redScore: number
  blueScore: number
  currentTeam?: Team
  className?: string
}

export const Scoreboard = ({
  redScore,
  blueScore,
  currentTeam,
  className = '',
}: ScoreboardProps) => {
  return (
    <div className={`flex justify-center items-center gap-4 p-2 ${className}`}>
      {/* Red Team */}
      <div
        className={`card bg-base-200 shadow-lg text-center p-3 transition-all ${
          currentTeam === 'red'
            ? 'ring-2 ring-error bg-error/10'
            : ''
        }`}
      >
        <div className="text-error font-bold text-sm mb-1">紅隊</div>
        <div className="text-2xl font-bold text-error">{redScore}</div>
        <div className="text-xs text-base-content/70">分</div>
      </div>

      {/* VS Divider */}
      <div className="text-lg font-bold text-base-content/60 bg-base-300 px-2 py-1 rounded-full">VS</div>

      {/* Blue Team */}
      <div
        className={`card bg-base-200 shadow-lg text-center p-3 transition-all ${
          currentTeam === 'blue'
            ? 'ring-2 ring-primary bg-primary/10'
            : ''
        }`}
      >
        <div className="text-primary font-bold text-sm mb-1">藍隊</div>
        <div className="text-2xl font-bold text-primary">{blueScore}</div>
        <div className="text-xs text-base-content/70">分</div>
      </div>
    </div>
  )
}
