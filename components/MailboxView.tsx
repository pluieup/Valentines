import React from 'react';

interface Props {
  isOpen: boolean;
  onClick: () => void;
  onLetterClick: () => void;
  showText: boolean;
}

const MailboxView: React.FC<Props> = ({ isOpen, onClick, onLetterClick, showText }) => {
  return (
    <div className="flex flex-col items-center cursor-pointer perspective-1000" onClick={!isOpen ? onClick : undefined}>
       {showText && !isOpen && (
         <h2 className="text-5xl sm:text-7xl font-romantic text-[#6b1317] mb-12 animate-pulse whitespace-nowrap">
          What's that?
        </h2>
       )}

       {showText && isOpen && (
         <h2 className="text-4xl sm:text-5xl font-romantic text-[#6b1317] mb-12 animate-fade-in whitespace-nowrap">
          There's something inside...
        </h2>
       )}
      
      <div className="relative group w-64 h-80 flex flex-col items-center">
        {/* Mailbox Body */}
        <div className="relative w-56 h-36 bg-[#6b1317] rounded-t-full border-4 border-[#4a0d10] shadow-2xl transition-transform duration-[1000ms] ease-in-out group-hover:scale-105">
           
           {/* Items inside the mailbox (Using Real Images) */}
           <div className={`absolute inset-0 flex items-center justify-around px-4 transition-all duration-[1200ms] ease-in-out delay-500 overflow-visible ${isOpen ? 'opacity-100 translate-y-[-10px]' : 'opacity-0 translate-y-0'}`}>
              
              {/* 1. Bouquet of Lilies */}
              <div className={`transition-all duration-[1200ms] ease-in-out delay-700 absolute top-0 left-0 ${isOpen ? 'translate-x-[-45px] -translate-y-16 rotate-[-15deg]' : 'opacity-0'}`}>
                <img 
                  src="/flowers.png" 
                  alt="Bouquet of Lilies" 
                  className="w-24 h-auto object-contain drop-shadow-lg"
                />
              </div>
              
              {/* 2. Sealed Letter - STEP B TRIGGER */}
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  onLetterClick();
                }}
                className={`cursor-pointer hover:scale-110 active:scale-95 transition-all duration-[1200ms] ease-in-out delay-[1000ms] absolute top-0 left-1/2 -translate-x-1/2 z-30 ${isOpen ? '-translate-y-24 scale-125' : 'opacity-0 pointer-events-none'}`}
              >
                <img 
                  src="/letter.png" 
                  alt="Sealed Letter" 
                  className="w-28 h-auto object-contain drop-shadow-2xl"
                />
                {isOpen && (
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#6b1317] text-white text-[10px] px-2 py-1 rounded-full whitespace-nowrap animate-bounce font-bold shadow-lg border border-white/20">
                    READ ME
                  </div>
                )}
              </div>

              {/* 3. Hirono Figurine Box */}
              <div className={`transition-all duration-[1200ms] ease-in-out delay-800 absolute top-0 right-0 ${isOpen ? 'translate-x-[45px] -translate-y-16 rotate-[15deg]' : 'opacity-0'}`}>
                <img 
                  src="/hirono.png" 
                  alt="Hirono Figurine" 
                  className="w-24 h-auto object-contain drop-shadow-lg"
                />
              </div>
           </div>

           {/* Mailbox Door (Animated) */}
           <div className={`
             absolute left-0 top-0 w-full h-full bg-[#6b1317] border-2 border-[#4a0d10] rounded-t-full
             transition-transform duration-[1500ms] ease-in-out origin-bottom z-20
             ${isOpen ? 'rotate-x-open' : 'rotate-x-0'}
           `}>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-yellow-600 border border-yellow-800 shadow-sm" />
           </div>
        </div>

        {/* The Flag */}
        <div className={`absolute -right-2 top-10 w-2 h-24 bg-gray-400 origin-bottom transition-transform duration-[1200ms] ease-in-out ${isOpen ? 'rotate-0' : '-rotate-90'}`}>
          <div className="absolute -top-4 -left-3 w-8 h-8 bg-[#6b1317] rounded-sm shadow-sm" />
        </div>

        {/* The Post */}
        <div className="w-8 h-48 bg-gray-700 shadow-inner" />
        
        {/* Interaction Hint */}
        {showText && !isOpen && (
          <div className="absolute bottom-44 text-[#6b1317] font-semibold bg-white/95 px-8 py-3 rounded-full shadow-2xl animate-bounce-slow opacity-100 group-hover:bg-white transition-all whitespace-nowrap z-30 border-2 border-[#6b1317]/20">
            Open your mail
          </div>
        )}
      </div>
    </div>
  );
};

export default MailboxView;