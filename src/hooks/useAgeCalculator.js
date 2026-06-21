import { useState, useCallback } from 'react';
import { CARDS } from '../data/cards';

/**
 * Hook personalizado que gerencia a lógica do jogo de adivinhação de idade.
 *
 * Estados:
 * - intro: tela inicial
 * - playing: mostrando cartões
 * - finished: todos os cartões respondidos
 * - revealing: sequência de suspense
 * - result: exibindo o resultado
 *
 * settings:
 * - hideResult: ocultar resultado até toque longo
 * - stageMode: modo palco (requer segurar para revelar)
 * - darkReveal: tela escura durante revelação
 * - sounds: sons de suspense (opcional)
 */

const SCREENS = {
  INTRO: 'intro',
  PLAYING: 'playing',
  FINISHED: 'finished',
  REVEALING: 'revealing',
  RESULT: 'result',
};

const DEFAULT_SETTINGS = {
  hideResult: false,
  stageMode: false,
  darkReveal: false,
  sounds: false,
};

export function useAgeCalculator() {
  const [screen, setScreen] = useState(SCREENS.INTRO);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [calculatedAge, setCalculatedAge] = useState(null);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const totalCards = CARDS.length;
  const currentCard = CARDS[currentCardIndex];
  const progress = ((currentCardIndex) / totalCards) * 100;

  const startGame = useCallback(() => {
    setScreen(SCREENS.PLAYING);
    setCurrentCardIndex(0);
    setAnswers([]);
    setCalculatedAge(null);
  }, []);

  const answerCard = useCallback((isYes) => {
    const cardValue = CARDS[currentCardIndex].value;
    const newAnswers = [...answers, { cardIndex: currentCardIndex, isYes, value: cardValue }];
    setAnswers(newAnswers);

    if (currentCardIndex < totalCards - 1) {
      setCurrentCardIndex(prev => prev + 1);
    } else {
      const age = newAnswers
        .filter(a => a.isYes)
        .reduce((sum, a) => sum + a.value, 0);

      setCalculatedAge(age);
      setScreen(SCREENS.FINISHED);
    }
  }, [currentCardIndex, answers, totalCards]);

  const startReveal = useCallback(() => {
    setScreen(SCREENS.REVEALING);
  }, []);

  const showResult = useCallback(() => {
    if (settings.stageMode) {
      setScreen(SCREENS.FINISHED);
    } else {
      setScreen(SCREENS.RESULT);
    }
  }, [settings.stageMode]);

  const revealResult = useCallback(() => {
    setScreen(SCREENS.RESULT);
  }, []);

  const restart = useCallback(() => {
    setScreen(SCREENS.INTRO);
    setCurrentCardIndex(0);
    setAnswers([]);
    setCalculatedAge(null);
  }, []);

  const updateSettings = useCallback((key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  const toggleSettings = useCallback(() => {
    setSettingsOpen(prev => !prev);
  }, []);

  return {
    screen,
    currentCard,
    currentCardIndex,
    totalCards,
    progress,
    calculatedAge,
    settings,
    settingsOpen,
    screens: SCREENS,
    startGame,
    answerCard,
    startReveal,
    showResult,
    revealResult,
    restart,
    updateSettings,
    toggleSettings,
  };
}
