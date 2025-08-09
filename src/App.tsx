import { useGameStore } from './store'
import { PreparationPhase } from './components/PreparationPhase'
import { CountdownOverlay } from './components/CountdownOverlay'
import { AnswerPhase } from './components/AnswerPhase'
import { ScoringPhase } from './components/ScoringPhase'

function App() {
  const { currentPhase } = useGameStore()

  const renderCurrentPhase = () => {
    switch (currentPhase) {
      case 'preparation':
        return <PreparationPhase />
      case 'countdown':
        return (
          <>
            <PreparationPhase />
            <CountdownOverlay />
          </>
        )
      case 'answer':
        return <AnswerPhase />
      case 'scoring':
        return <ScoringPhase />
      default:
        return <PreparationPhase />
    }
  }

  return <div >{renderCurrentPhase()}</div>
}

export default App
