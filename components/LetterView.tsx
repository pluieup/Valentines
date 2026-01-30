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
  const [noStyle, setNoStyle] = useState<React.CSSProperties>({
    position: 'absolute',
    left: '60%',
    top: '50%',
    transform: 'translateY(-50%)'
  });
  const [isQuestionVisible, setIsQuestionVisible] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);

  const handleNoHover = () => {
    if (isAccepted || !isQuestionVisible) return;
    
    // Set random position within roughly 80% of the container
    const newTop = Math.random() * 80 + '%';
    const newLeft = Math.random() * 80 + '%';
    
    setNoStyle({
      position: 'absolute',
      top: newTop,
      left: newLeft,
      transition: 'all 0.2s ease',
      zIndex: 50
    });
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
          relative paper-texture w-full max-w-[90vw] md:max-w-[500px] min-h-[70vh] max-h-none overflow-visible p-8 sm:p-16 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-t-8 border-[#6b1317]
          transition-all duration-[1000ms] ease-in-out transform
          ${isBlurred ? 'blur-[12px] cursor-pointer hover:scale-105' : 'blur-0'}
          ${isAccepted ? 'bg-pink-50 ring-4 ring-pink-200' : ''}
        `}
      >
        {!isBlurred && !isAccepted && (
          <>
            <div className="absolute top-4 right-4 w-4 h-4 text-v-red/20 animate-sparkle">✦</div>
            <div className="absolute bottom-10 left-6 w-3 h-3 text-v-red/30 animate-sparkle delay-700">✦</div>
          </>
        )}

        <div className="text-[#6b1317] leading-relaxed select-none">
          <p className="mb-4 font-romantic text-3xl sm:text-4xl">Dear {name},</p>
          
          {isAccepted ? (
            <div className="text-center animate-fade-in py-6 font-romantic">
              <p className="text-6xl mb-4 animate-bounce-slow">Yay ♥</p>
              <p className="text-xl sm:text-2xl font-semibold text-[#8b1a1f]">
                I can't wait to spend this Valentine's with you!
              </p>
            </div>
          ) : (
            <>
              {/* Reduced font size for better fit: text-lg instead of text-xl */}
              <p className="mb-6 text-lg sm:text-xl font-sans font-normal text-[#4a0d10]">
                I know I can’t be there to ask you this in person right now, and a text message didn't feel like enough. So, I built this little space for us instead to ask you one question...
              </p>
              
              <div 
                onClick={handleRevealQuestion}
                className={`transition-all duration-700 relative group ${!isQuestionVisible && !isBlurred ? 'cursor-pointer' : ''}`}
              >
                <div className={`${!isQuestionVisible && !isBlurred ? 'blur-[12px] scale-95 opacity-60' : 'blur-0 scale-100 opacity-100'} transition-all duration-1000`}>
                  <p className="text-center text-3xl sm:text-4xl mt-8 mb-2 font-romantic text-[#6b1317] border-t border-v-red/10 pt-6">
                    Will you be my valentine?
                  </p>

                  <div className="relative mt-10 h-24 w-full">
                    {/* Yes Button - Adjusted padding and text size */}
                    <button 
                      onClick={onAccept}
                      disabled={!isQuestionVisible}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-8 py-2.5 bg-[#6b1317] text-white rounded-full font-sans font-bold text-base hover:bg-[#8b1a1f] shadow-xl transform active:scale-95 transition-all z-10"
                      style={{ marginLeft: '-50px' }}
                    >
                      Yes!
                    </button>

                    {/* Runaway No Button */}
                    <button 
                      onMouseOver={handleNoHover}
                      disabled={!isQuestionVisible}
                      style={noStyle}
                      className="px-6 py-2.5 bg-gray-100 text-gray-500 rounded-full font-sans font-semibold text-base shadow-md opacity-90 whitespace-nowrap"
                    >
                      No...
                    </button>
                  </div>
                </div>

                {!isQuestionVisible && !isBlurred && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <span className="bg-[#6b1317] text-white text-[10px] font-sans px-4 py-2 rounded-full uppercase tracking-[0.2em] font-bold shadow-2xl animate-pulse group-hover:scale-110 transition-transform pointer-events-auto">
                       Reveal the question
                     </span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {isBlurred && (
        <p className="mt-8 text-2xl font-romantic text-[#6b1317] animate-bounce-slow drop-shadow-sm">
          Click to read your letter
        </p>
      )}

      {isAccepted && (
        <button 
          onClick={onRestart}
          className="mt-12 text-[#6b1317] underline font-semibold opacity-40 hover:opacity-100 transition-opacity text-xs uppercase tracking-widest"
        >
          Restart Surprise
        </button>
      )}
    </div>
  );
};

export default LetterView;