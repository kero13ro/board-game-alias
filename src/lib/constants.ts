import type { Team } from '../types'

// Team constants
export const TEAM_NAMES: Record<Team, string> = {
  red: '紅隊',
  blue: '藍隊',
} as const

// Game settings
export const WINNING_SCORE = 30
export const ROUND_DURATION = 30 // seconds

/**
 * 一次拿到某隊伍的整組 daisyUI 語意 class。
 * 紅隊 = error，藍隊 = primary。全部走語意色，方便換主題。
 */
export interface TeamClasses {
  name: string
  /** 文字色 */
  text: string
  /** 實心背景（大面積染色）*/
  solid: string
  /** 實心背景上的文字色 */
  solidText: string
  /** 10% 淡底（整頁背景）*/
  tint: string
  /** 15% 稍深底 */
  soft: string
  /** 邊框色 */
  border: string
  /** ring 色 */
  ring: string
  /** daisyUI 按鈕 */
  btn: string
  /** 帶顏色陰影 */
  shadow: string
  /** 招牌「3D 糖果按鈕」實心厚陰影（主要動作）*/
  shadow3d: string
  /** 次要按鈕（規則）用的淺色 3D 陰影 */
  softShadow3d: string
  /** 次要按鈕用的淺色邊框 */
  softBorder: string
}

export const getTeamClasses = (team: Team): TeamClasses =>
  team === 'red'
    ? {
        name: '紅隊',
        text: 'text-error',
        solid: 'bg-error',
        solidText: 'text-error-content',
        tint: 'bg-error/10',
        soft: 'bg-error/15',
        border: 'border-error',
        ring: 'ring-error',
        btn: 'btn-error',
        shadow: 'shadow-error/40',
        shadow3d: 'shadow-[0_6px_0_0_#b22b42]',
        softShadow3d: 'shadow-[0_4px_0_0_#ffe7eb]',
        softBorder: 'border-[#ffe7eb]',
      }
    : {
        name: '藍隊',
        text: 'text-primary',
        solid: 'bg-primary',
        solidText: 'text-primary-content',
        tint: 'bg-primary/10',
        soft: 'bg-primary/15',
        border: 'border-primary',
        ring: 'ring-primary',
        btn: 'btn-primary',
        shadow: 'shadow-primary/40',
        shadow3d: 'shadow-[0_6px_0_0_#1f4bb2]',
        softShadow3d: 'shadow-[0_4px_0_0_#e4ecff]',
        softBorder: 'border-[#e4ecff]',
      }

// 舊版相容：保留原本的 getTeamColorClass（若其他地方還在用）
export const getTeamColorClass = (
  team: Team,
  type: 'text' | 'bg' | 'border' | 'btn',
) => {
  const colorMap = {
    red: { text: 'text-error', bg: 'bg-error/10', border: 'ring-error', btn: 'btn-error' },
    blue: { text: 'text-primary', bg: 'bg-primary/10', border: 'ring-primary', btn: 'btn-primary' },
  }
  return colorMap[team][type]
}
