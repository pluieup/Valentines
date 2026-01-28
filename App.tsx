
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
        // Clicking the general mailbox area opens the door
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

  // Handle manual trigger from clicking the letter inside the mailbox
  const handleLetterClicked = () => {
    if (isMailboxOpen) {
      setCurrentState(AppState.LETTER_REVEAL);
    }
  };

  // Automatic transition from Welcome to Mailbox center stage
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
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6b1317', '#ff69b4', '#ffffff']
      });
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
    <div className="relative w-screen h-screen overflow-hidden flex items-center justify-center font-sans bg-v-bg">
      <Background />
      <ScallopedFrame />
      
      {/* Centered Content Layer */}
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
            isBlurred={currentState === AppState.LETTER_REVEAL}
            isAccepted={currentState === AppState.ACCEPTED}
            onRead={() => currentState === AppState.LETTER_REVEAL && nextState()}
            onAccept={handleProposalAccept}
            onRestart={handleRestart}
          />
        )}
      </div>

      {/* Persistent Mailbox Layer */}
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
