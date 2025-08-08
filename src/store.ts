import { create } from 'zustand'
import type { GameState, GameActions, Team, GamePhase } from './types'

const WINNING_SCORE = 30
const ROUND_DURATION = 60 // 60 seconds

interface GameStore extends GameState, GameActions {}

export const useGameStore = create<GameStore>((set, get) => ({
  // Initial state
  currentPhase: 'preparation',
  redTeamScore: 0,
  whiteTeamScore: 0,
  currentTeam: 'red',
  currentRound: 1,
  timeLeft: ROUND_DURATION,
  isTimerActive: false,
  currentQuestionIndex: 0,
  correctAnswers: 0,
  skippedQuestions: [],
  wrongQuestions: [],
  showRulesModal: false,
  countdownValue: 3,
  winner: null,

  // Phase management
  setPhase: (phase: GamePhase) => {
    set({ currentPhase: phase })
  },

  nextPhase: () => {
    const { currentPhase } = get()
    const phaseFlow: Record<GamePhase, GamePhase> = {
      preparation: 'countdown',
      countdown: 'answer',
      answer: 'scoring',
      scoring: 'preparation',
    }
    set({ currentPhase: phaseFlow[currentPhase] })
  },

  // Team and scoring
  updateScore: (team: Team, points: number) => {
    if (team === 'red') {
      set((state) => ({
        redTeamScore: Math.max(0, state.redTeamScore + points),
      }))
    } else {
      set((state) => ({
        whiteTeamScore: Math.max(0, state.whiteTeamScore + points),
      }))
    }
    get().checkVictory()
  },

  adjustScore: (team: Team, adjustment: number) => {
    get().updateScore(team, adjustment)
  },

  switchTeam: () => {
    set((state) => ({
      currentTeam: state.currentTeam === 'red' ? 'white' : 'red',
      currentRound: state.currentRound + 1,
    }))
  },

  // Timer management
  startTimer: () => {
    set({ timeLeft: ROUND_DURATION, isTimerActive: true })
  },

  stopTimer: () => {
    set({ isTimerActive: false })
  },

  updateTimer: (time: number) => {
    set({ timeLeft: Math.max(0, time) })
    if (time <= 0) {
      get().stopTimer()
      get().endRound()
    }
  },

  // Question handling
  handleCorrectAnswer: () => {
    const { currentTeam, correctAnswers } = get()
    set({
      correctAnswers: correctAnswers + 1,
      currentQuestionIndex: get().currentQuestionIndex + 1,
    })
    get().updateScore(currentTeam, 1)
  },

  handleSkipQuestion: () => {
    const currentQuestion = {
      id: get().currentQuestionIndex,
      text: `Question ${get().currentQuestionIndex + 1}`,
    }
    set((state) => ({
      skippedQuestions: [...state.skippedQuestions, currentQuestion],
      currentQuestionIndex: state.currentQuestionIndex + 1,
    }))
  },

  nextQuestion: () => {
    set((state) => ({ currentQuestionIndex: state.currentQuestionIndex + 1 }))
  },

  // Round management
  startRound: () => {
    set({
      correctAnswers: 0,
      skippedQuestions: [],
      wrongQuestions: [],
      currentQuestionIndex: 0,
      timeLeft: ROUND_DURATION,
    })
    get().startTimer()
    get().setPhase('answer')
  },

  endRound: () => {
    get().stopTimer()
    get().setPhase('scoring')
  },

  resetRound: () => {
    set({
      correctAnswers: 0,
      skippedQuestions: [],
      wrongQuestions: [],
      currentQuestionIndex: 0,
      timeLeft: ROUND_DURATION,
      isTimerActive: false,
    })
  },

  // UI actions
  toggleRulesModal: () => {
    set((state) => ({ showRulesModal: !state.showRulesModal }))
  },

  startCountdown: () => {
    set({ countdownValue: 3 })
    get().setPhase('countdown')
  },

  // Game reset
  resetGame: () => {
    set({
      currentPhase: 'preparation',
      redTeamScore: 0,
      whiteTeamScore: 0,
      currentTeam: 'red',
      currentRound: 1,
      timeLeft: ROUND_DURATION,
      isTimerActive: false,
      currentQuestionIndex: 0,
      correctAnswers: 0,
      skippedQuestions: [],
      wrongQuestions: [],
      showRulesModal: false,
      countdownValue: 3,
      winner: null,
    })
  },

  checkVictory: () => {
    const { redTeamScore, whiteTeamScore } = get()
    if (redTeamScore >= WINNING_SCORE) {
      set({ winner: 'red' })
    } else if (whiteTeamScore >= WINNING_SCORE) {
      set({ winner: 'white' })
    }
  },
}))
