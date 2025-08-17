import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { GameState, GameActions, Team, GamePhase } from './types'
import { getCurrentQuestion, getTotalQuestions } from './lib/questions'
import { WINNING_SCORE, ROUND_DURATION } from './lib/constants'

interface GameStore extends GameState, GameActions {}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      // Initial state
      currentPhase: 'preparation',
      redTeamScore: 0,
      blueTeamScore: 0,
      currentTeam: 'red',
      currentRound: 1,
      timeLeft: ROUND_DURATION,
      isTimerActive: false,
      currentQuestionIndex: 0,
      correctAnswers: 0,
      skippedQuestions: [],
      successQuestions: [],
      wrongQuestions: [],
      usedQuestions: new Set(),
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
        blueTeamScore: Math.max(0, state.blueTeamScore + points),
      }))
    }
    get().checkVictory()
  },

  adjustScore: (team: Team, adjustment: number) => {
    get().updateScore(team, adjustment)
  },

  switchTeam: () => {
    set((state) => ({
      currentTeam: state.currentTeam === 'red' ? 'blue' : 'red',
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
  getRandomUnusedQuestion: () => {
    const { usedQuestions } = get()
    const totalQuestions = getTotalQuestions()
    
    if (usedQuestions.size >= totalQuestions) {
      // Reset if all questions are used
      set({ usedQuestions: new Set() })
      return 0
    }

    let randomIndex
    do {
      randomIndex = Math.floor(Math.random() * totalQuestions)
    } while (usedQuestions.has(randomIndex))

    set((state) => ({
      usedQuestions: new Set([...state.usedQuestions, randomIndex])
    }))

    return randomIndex
  },

  handleCorrectAnswer: () => {
    const { currentTeam, correctAnswers, currentQuestionIndex } = get()

    const currentQuestion = getCurrentQuestion(currentQuestionIndex)

    set((state) => ({
      correctAnswers: correctAnswers + 1,
      currentQuestionIndex: get().getRandomUnusedQuestion(),
      successQuestions: [...state.successQuestions, currentQuestion],
    }))
    get().updateScore(currentTeam, 1)
  },

  handleSkipQuestion: () => {
    const { currentQuestionIndex } = get()

    const currentQuestion = getCurrentQuestion(currentQuestionIndex)

    set((state) => ({
      skippedQuestions: [...state.skippedQuestions, currentQuestion],
      currentQuestionIndex: get().getRandomUnusedQuestion(),
    }))
  },

  nextQuestion: () => {
    set({ currentQuestionIndex: get().getRandomUnusedQuestion() })
  },

  // Round management
  startRound: () => {
    set({
      correctAnswers: 0,
      skippedQuestions: [],
      successQuestions: [],
      wrongQuestions: [],
      currentQuestionIndex: get().getRandomUnusedQuestion(),
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
      successQuestions: [],
      wrongQuestions: [],
      currentQuestionIndex: get().getRandomUnusedQuestion(),
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
      blueTeamScore: 0,
      currentTeam: 'red',
      currentRound: 1,
      timeLeft: ROUND_DURATION,
      isTimerActive: false,
      currentQuestionIndex: 0,
      correctAnswers: 0,
      skippedQuestions: [],
      successQuestions: [],
      wrongQuestions: [],
      usedQuestions: new Set(),
      showRulesModal: false,
      countdownValue: 3,
      winner: null,
    })
  },

  checkVictory: () => {
    const { redTeamScore, blueTeamScore } = get()
    if (redTeamScore >= WINNING_SCORE) {
      set({ winner: 'red' })
    } else if (blueTeamScore >= WINNING_SCORE) {
      set({ winner: 'blue' })
    }
  },
    }),
    {
      name: 'alias-game-storage',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name)
          if (!str) return null
          const data = JSON.parse(str)
          // Convert usedQuestions array back to Set
          if (data.state && data.state.usedQuestions) {
            data.state.usedQuestions = new Set(data.state.usedQuestions)
          }
          return data
        },
        setItem: (name, value) => {
          // Convert usedQuestions Set to array for serialization
          const serialized = {
            ...value,
            state: {
              ...value.state,
              usedQuestions: Array.from(value.state.usedQuestions || new Set())
            }
          }
          localStorage.setItem(name, JSON.stringify(serialized))
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
)
