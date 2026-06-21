import { AnimatePresence } from 'framer-motion';
import { useAgeCalculator } from './hooks/useAgeCalculator';
import IntroScreen from './components/IntroScreen';
import CardScreen from './components/CardScreen';
import ProgressBar from './components/ProgressBar';
import RevealScreen from './components/RevealScreen';
import ResultScreen from './components/ResultScreen';
import SettingsModal from './components/SettingsModal';

export default function App() {
  const {
    screen,
    currentCard,
    currentCardIndex,
    totalCards,
    progress,
    calculatedAge,
    settings,
    settingsOpen,
    screens,
    startGame,
    answerCard,
    startReveal,
    revealResult,
    restart,
    updateSettings,
    toggleSettings,
  } = useAgeCalculator();

  return (
    <div className="h-full bg-dark-bg relative overflow-hidden flex flex-col">
      {screen === screens.PLAYING && (
        <ProgressBar
          current={currentCardIndex}
          total={totalCards}
          progress={progress}
        />
      )}

      <div className="flex-1 min-h-0 relative">
        <AnimatePresence mode="wait">
          {screen === screens.INTRO && (
            <IntroScreen
              key="intro"
              onStart={startGame}
              onSettings={toggleSettings}
            />
          )}

          {screen === screens.PLAYING && (
            <CardScreen
              key={`card-${currentCardIndex}`}
              card={currentCard}
              cardIndex={currentCardIndex}
              totalCards={totalCards}
              onAnswer={answerCard}
            />
          )}

          {screen === screens.FINISHED && (
            <RevealScreen
              key="reveal"
              onReveal={startReveal}
              stageMode={settings.stageMode}
              darkReveal={settings.darkReveal}
            />
          )}

          {screen === screens.REVEALING && (
            <ResultScreen
              key="result"
              age={calculatedAge}
              stageMode={false}
              onRestart={restart}
            />
          )}

          {screen === screens.RESULT && (
            <ResultScreen
              key="final"
              age={calculatedAge}
              stageMode={false}
              onRestart={restart}
            />
          )}
        </AnimatePresence>
      </div>

      <SettingsModal
        isOpen={settingsOpen}
        onClose={toggleSettings}
        settings={settings}
        onUpdate={updateSettings}
      />
    </div>
  );
}
