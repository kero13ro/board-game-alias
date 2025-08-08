export type GamePhase = 'preparation' | 'countdown' | 'answer' | 'scoring'

export type Team = 'red' | 'white'

export interface Question {
  id: number
  text: string
  category?: string
}

export interface GameState {
  // Game phase management
  currentPhase: GamePhase

  // Team and scoring
  redTeamScore: number
  whiteTeamScore: number
  currentTeam: Team

  // Round management
  currentRound: number
  timeLeft: number
  isTimerActive: boolean

  // Question tracking
  currentQuestionIndex: number
  correctAnswers: number
  skippedQuestions: Question[]
  wrongQuestions: Question[]

  // UI state
  showRulesModal: boolean
  countdownValue: number

  // Victory
  winner: Team | null
}

export interface GameActions {
  // Phase management
  setPhase: (phase: GamePhase) => void
  nextPhase: () => void

  // Team and scoring
  updateScore: (team: Team, points: number) => void
  switchTeam: () => void
  adjustScore: (team: Team, adjustment: number) => void

  // Timer management
  startTimer: () => void
  stopTimer: () => void
  updateTimer: (time: number) => void

  // Question handling
  handleCorrectAnswer: () => void
  handleSkipQuestion: () => void
  nextQuestion: () => void

  // Round management
  startRound: () => void
  endRound: () => void
  resetRound: () => void

  // UI actions
  toggleRulesModal: () => void
  startCountdown: () => void

  // Game reset
  resetGame: () => void
  checkVictory: () => void
}
