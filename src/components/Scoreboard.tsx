import { motion } from 'motion/react'
import type { Team } from '../types'

interface ScoreboardProps {
  redScore: number
  blueScore: number
  currentTeam?: Team
  className?: string
}

const CELLS: Record<
  Team,
  { name: string; solid: string; text: string; soft: string; shadow: string }
> = {
  red: {
    name: '紅隊',
    solid: 'bg-error text-error-content border-transparent',
    text: 'text-error',
    soft: 'bg-base-100 border-error/25',
    shadow: 'shadow-error/40',
  },
  blue: {
    name: '藍隊',
    solid: 'bg-primary text-primary-content border-transparent',
    text: 'text-primary',
    soft: 'bg-base-100 border-primary/25',
    shadow: 'shadow-primary/40',
  },
}

const Cell = ({
  team,
  score,
  active,
}: {
  team: Team
  score: number
  active: boolean
}) => {
  const c = CELLS[team]
  return (
    <motion.div
      animate={{ scale: active ? 1.04 : 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`card flex-1 border-2 px-3 py-3 text-center ${
        active ? `${c.solid} shadow-xl ${c.shadow}` : c.soft
      }`}
    >
      <div className={`text-sm font-bold tracking-wide ${active ? '' : c.text}`}>
        {c.name}
      </div>
      <motion.div
        key={score}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 18 }}
        className="font-num mt-1 text-4xl font-bold leading-none"
      >
        {score}
      </motion.div>
      <div className={`mt-0.5 text-[11px] ${active ? 'opacity-90' : 'opacity-60'}`}>
        / 30 分
      </div>
      {active && (
        <div className="bg-base-100/25 mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold">
          這回合
        </div>
      )}
    </motion.div>
  )
}

export const Scoreboard = ({
  redScore,
  blueScore,
  currentTeam,
  className = '',
}: ScoreboardProps) => {
  return (
    <div className={`flex items-stretch gap-2.5 ${className}`}>
      <Cell team="red" score={redScore} active={currentTeam === 'red'} />
      <div className="font-num text-base-content/35 flex items-center text-lg font-bold">
        VS
      </div>
      <Cell team="blue" score={blueScore} active={currentTeam === 'blue'} />
    </div>
  )
}
