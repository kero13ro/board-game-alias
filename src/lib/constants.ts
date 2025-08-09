import type { Team } from '../types'

// Team constants
export const TEAM_NAMES: Record<Team, string> = {
  red: '紅隊',
  blue: '藍隊',
} as const

// Game settings
export const WINNING_SCORE = 30
export const ROUND_DURATION = 30 // seconds

// Team color utilities
export const getTeamColorClass = (team: Team, type: 'text' | 'bg' | 'border' | 'btn') => {
  const colorMap = {
    red: {
      text: 'text-error',
      bg: 'bg-error/10',
      border: 'ring-error',
      btn: 'btn-error',
    },
    blue: {
      text: 'text-primary',
      bg: 'bg-primary/10', 
      border: 'ring-primary',
      btn: 'btn-primary',
    },
  }
  
  return colorMap[team][type]
}