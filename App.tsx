import React, { useState, useEffect, useCallback } from 'react';
import { AppState } from './types';
import GreetingView from './components/GreetingView';
import NameInputView from './components/NameInputView';
import WelcomeView from './components/WelcomeView';
import MailboxView from './components/MailboxView';
import LetterView from './components/LetterView';
import Background from './components/Background';
import ScallopedFrame from './components/ScallopedFrame';

const App: React.FC = () => {
  const [currentState, setCurrentState] = useState<AppState>(AppState.GREETING);
  const [userName, setUserName] = useState<string>('');
  const [isMailboxOpen, setIsMailboxOpen] = useState(false);
  const [personalizedPoem, setPersonalizedPoem] = useState<string>('');
  const [isLoadingPoem, setIsLoadingPoem] = useState(false);

  // Transition helper
  const nextState = useCallback(() => {
    switch (currentState) {
      case AppState.GREETING:
        setCurrentState(AppState.NAME_INPUT);
        break;
      case AppState.NAME_INPUT:
        setCurrentState(AppState.WELCOME);
        break;
      case AppState.WELCOME:
        setCurrentState(AppState.MAILBOX);
        break;
      case AppState.MAILBOX:
        if (!isMailboxOpen) {
          setIsMailboxOpen(true);
        }
        break;
      case AppState.LETTER_REVEAL:
        setCurrentState(AppState.PROPOSAL);
        break;
      default:
        break;
    }
  }, [currentState, isMailboxOpen]);

  const fetchPoem = async (name: string) => {
    setIsLoadingPoem(true);
    try {
      const response = await fetch('/api/ai/poem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (response.ok) {
        const data = await response.json();
        setPersonalizedPoem(data.poem);
      }
    } catch (error) {
      console.error('Error fetching poem:', error);
    } finally {
      setIsLoadingPoem(false);
    }
  };

  const handleLetterClicked = () => {
    if (isMailboxOpen) {
      setCurrentState(AppState.LETTER_REVEAL);
    }
  };

  useEffect(() => {
    if (currentState === AppState.WELCOME) {
      const timer = setTimeout(() => {
        setCurrentState(AppState.MAILBOX);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentState]);

  const handleNameSubmit = (name: string) => {
    setUserName(name);
    fetchPoem(name); // Kick off the AI poem generation in background
    nextState();
  };

  const handleProposalAccept = () => {
    setCurrentState(AppState.ACCEPTED);
    // @ts-ignore
    if (window.confetti) {
       // @ts-ignore
      window.confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6b1317', '#ff69b4', '#ffffff']
      });
    }
  };

  const handleRestart = () => {
    setUserName('');
    setIsMailboxOpen(false);
    setPersonalizedPoem('');
    setCurrentState(AppState.GREETING);
  };

  const isInOpeningStates = currentState === AppState.GREETING || currentState === AppState.NAME_INPUT;
  const isWelcomeActive = currentState === AppState.WELCOME;
  const isMailboxViewActive = currentState === AppState.MAILBOX;
  const isLetterActive = currentState === AppState.LETTER_REVEAL || currentState === AppState.PROPOSAL || currentState === AppState.ACCEPTED;

  return (
    <div className="relative w-screen h-screen overflow-hidden flex items-center justify-center font-sans bg-v-bg">
      <Background />
      <ScallopedFrame />
      
      <div className="z-10 w-full max-w-2xl px-8 flex flex-col items-center justify-center transition-all duration-1000">
        {currentState === AppState.GREETING && (
          <GreetingView onNext={nextState} />
        )}

        {currentState === AppState.NAME_INPUT && (
          <NameInputView onSubmit={handleNameSubmit} />
        )}

        {isWelcomeActive && (
          <WelcomeView name={userName} />
        )}

        {isLetterActive && (
          <LetterView 
            name={userName} 
            poem={personalizedPoem}
            isLoadingPoem={isLoadingPoem}
            isBlurred={currentState === AppState.LETTER_REVEAL}
            isAccepted={currentState === AppState.ACCEPTED}
            onRead={() => currentState === AppState.LETTER_REVEAL && nextState()}
            onAccept={handleProposalAccept}
            onRestart={handleRestart}
          />
        )}
      </div>

      <div className={`z-20 transition-all duration-1000 fixed ${
        isInOpeningStates 
          ? 'bottom-16 right-16 scale-50 opacity-40 pointer-events-none' 
          : isMailboxViewActive
            ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-100 opacity-100 pointer-events-auto'
            : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-125 opacity-0 pointer-events-none'
      }`}>
        <MailboxView 
          isOpen={isMailboxOpen} 
          onClick={nextState} 
          onLetterClick={handleLetterClicked}
          showText={isMailboxViewActive}
        />
      </div>
    </div>
  );
};

export default App;