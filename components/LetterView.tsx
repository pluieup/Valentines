
import React, { useState, useRef } from 'react';

interface Props {
  name: string;
  isBlurred: boolean;
  isAccepted: boolean;
  onRead: () => void;
  onAccept: () => void;
  onRestart: () => void;
}

const LetterView: React.FC<Props> = ({ name, isBlurred, isAccepted, onRead, onAccept, onRestart }) => {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [isQuestionVisible, setIsQuestionVisible] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);

  const handleNoHover = () => {
    if (isAccepted || !letterRef.current || !isQuestionVisible) return;
    
    // Calculate a random position relative to the current position
    const range = 250;
    const newX = (Math.random() - 0.5) * range;
    const newY = (Math.random() - 0.5) * range;
    
    setNoPos({ x: newX, y: newY });
  };

  const handleRevealQuestion = (e: React.MouseEvent) => {
    if (!isQuestionVisible && !isBlurred) {
      e.stopPropagation();
      setIsQuestionVisible(true);
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center w-full transition-all duration-[1000ms] ease-in-out ${isBlurred ? 'scale-75 translate-y-20' : 'scale-100 translate-y-0'}`}>
      
      <div 
        ref={letterRef}
        onClick={isBlurred ? onRead : undefined}
        className={`
          relative paper-texture w-full max-w-md p-10 sm:p-14 rounded shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-t-8 border-[#6b1317]
          transition-all duration-[1000ms] ease-in-out transform
          ${isBlurred ? 'blur-[12px] cursor-pointer hover:scale-105' : 'blur-0'}
          ${isAccepted ? 'bg-pink-50' : ''}
        `}
      >
        {/* Decorative SVG Flowers */}
        <div className="absolute -top-12 -right-12 w-32 h-32 rotate-12 opacity-80 pointer-events-none">
          <svg viewBox="0 0 100 100" width="120" height="120">
            <path d="M50,50 Q60,20 70,50 Q95,60 70,70 Q60,95 50,70 Q20,60 50,50" fill="#6b1317" opacity="0.1" />
            <circle cx="50" cy="50" r="10" fill="#6b1317" opacity="0.2" />
          </svg>
        </div>
        <div className="absolute -bottom-10 -left-10 w-24 h-24 -rotate-12 opacity-80 pointer-events-none">
          <svg viewBox="0 0 100 100" width="100" height="100">
            <path d="M50,50 Q60,20 70,50 Q95,60 70,70 Q60,95 50,70 Q20,60 50,50" fill="#6b1317" opacity="0.1" />
          </svg>
        </div>

        <div className="font-romantic text-[#6b1317] text-3xl sm:text-4xl leading-relaxed select-none">
          <p className="mb-6">Dear {name},</p>
          
          {isAccepted ? (
            <div className="text-center animate-fade-in py-8">
              <p className="text-6xl mb-6 font-romantic">Yay ♥</p>
              <p className="text-2xl sm:text-3xl font-sans font-semibold">I can't wait to spend the day with you!</p>
            </div>
          ) : (
            <>
              <p className="mb-6 text-xl sm:text-2xl font-sans font-light italic text-[#4a0d10]">
                I know I can’t be there to ask you this in person right now, and a text message just didn't feel like enough. So I built this little space for us instead, to ask you one thing...
              </p>
              
              {/* Proposal Section with selective blur */}
              <div 
                onClick={handleRevealQuestion}
                className={`transition-all duration-700 relative group ${!isQuestionVisible && !isBlurred ? 'cursor-pointer' : ''}`}
              >
                <div className={`${!isQuestionVisible && !isBlurred ? 'blur-[10px] scale-95 opacity-60' : 'blur-0 scale-100 opacity-100'} transition-all duration-700`}>
                  <p className="text-center text-4xl sm:text-5xl mt-8 font-romantic">
                    Will you be my valentine?
                  </p>

                  <div className="flex gap-6 justify-center mt-12 relative h-20">
                    <button 
                      onClick={onAccept}
                      disabled={!isQuestionVisible}
                      className="px-10 py-3 bg-[#6b1317] text-white rounded-full font-bold text-lg hover:bg-[#8b1a1f] shadow-xl transform active:scale-95 transition-all z-10"
                    >
                      Yes!
                    </button>
                    <button 
                      onMouseOver={handleNoHover}
                      disabled={!isQuestionVisible}
                      style={{ transform: `translate(${noPos.x}px, ${noPos.y}px)` }}
                      className="px-10 py-3 bg-gray-200 text-gray-700 rounded-full font-bold text-lg shadow-lg transition-all duration-150 absolute"
                    >
                      No...
                    </button>
                  </div>
                </div>

                {!isQuestionVisible && !isBlurred && (
                  <div className="absolute inset-0 flex items-center justify-center">
                     <span className="bg-[#6b1317] text-white text-xs font-sans px-4 py-2 rounded-full uppercase tracking-widest font-bold shadow-lg animate-pulse group-hover:scale-110 transition-transform">
                       Click to reveal question
                     </span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {isBlurred && (
        <p className="mt-12 text-3xl font-romantic text-[#6b1317] animate-bounce-slow">
          Click to read your letter
        </p>
      )}

      {isAccepted && (
        <button 
          onClick={() => {
            setIsQuestionVisible(false);
            onRestart();
          }}
          className="mt-16 text-[#6b1317] underline font-semibold opacity-60 hover:opacity-100 transition-opacity text-lg"
        >
          Restart Surprise
        </button>
      )}
    </div>
  );
};

export default LetterView;
