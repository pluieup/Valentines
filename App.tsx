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
    nextState();
  };

  const handleProposalAccept = () => {
    setCurrentState(AppState.ACCEPTED);
    // @ts-ignore
    if (window.confetti) {
       // @ts-ignore
      window.confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#6b1317', '#ff69b4', '#ffffff', '#ffd700']
      });
      setTimeout(() => {
        // @ts-ignore
        window.confetti({
          particleCount: 100,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#6b1317', '#ff69b4']
        });
        // @ts-ignore
        window.confetti({
          particleCount: 100,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#6b1317', '#ff69b4']
        });
      }, 300);
    }
  };

  const handleRestart = () => {
    setUserName('');
    setIsMailboxOpen(false);
    setCurrentState(AppState.GREETING);
  };

  const isInOpeningStates = currentState === AppState.GREETING || currentState === AppState.NAME_INPUT;
  const isWelcomeActive = currentState === AppState.WELCOME;
  const isMailboxViewActive = currentState === AppState.MAILBOX;
  const isLetterActive = currentState === AppState.LETTER_REVEAL || currentState === AppState.PROPOSAL || currentState === AppState.ACCEPTED;

  return (
    <div className="relative w-screen h-screen overflow-hidden flex items-center justify-center font-sans bg-v-bg selection:bg-v-red selection:text-white">
      <Background />
      <ScallopedFrame />
      
      {/* Global Scaling Wrapper: Added scale-90 and max-w-2xl mx-auto to zoom out and center */}
      <div className="z-10 w-full max-w-2xl mx-auto px-8 flex flex-col items-center justify-center transition-all duration-1000 transform scale-75 origin-center">
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
            isBlurred={currentState === AppState.LETTER_REVEAL}
            isAccepted={currentState === AppState.ACCEPTED}
            onRead={() => currentState === AppState.LETTER_REVEAL && nextState()}
            onAccept={handleProposalAccept}
            onRestart={handleRestart}
          />
        )}
      </div>

      {/* Mailbox View: Adjusted bottom position from fixed edges to more comfortable anchoring */}
      <div className={`z-20 transition-all duration-1000 fixed ${
        isInOpeningStates 
          ? 'bottom-[10%] right-[10%] scale-50 opacity-40 pointer-events-none' 
          : isMailboxViewActive
            ? 'top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 scale-75 opacity-100 pointer-events-auto'
            : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-110 opacity-0 pointer-events-none'
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