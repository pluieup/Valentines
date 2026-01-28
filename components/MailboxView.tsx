
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
           
           {/* Items inside the mailbox (Coded with CSS/SVG) */}
           <div className={`absolute inset-0 flex items-center justify-around px-4 transition-all duration-[1200ms] ease-in-out delay-500 overflow-visible ${isOpen ? 'opacity-100 translate-y-[-10px]' : 'opacity-0 translate-y-0'}`}>
              
              {/* Bouquet of Lilies (SVG) */}
              <div className={`transition-all duration-[1200ms] ease-in-out delay-700 ${isOpen ? 'translate-x-[-45px] -translate-y-16 rotate-[-15deg]' : ''}`}>
                <svg width="80" height="80" viewBox="0 0 100 100" className="drop-shadow-lg">
                  <g transform="translate(50, 80)">
                    {/* Stems */}
                    <path d="M0,0 Q-10,-40 -20,-60" stroke="#2d5a27" strokeWidth="2" fill="none" />
                    <path d="M0,0 Q0,-45 10,-65" stroke="#2d5a27" strokeWidth="2" fill="none" />
                    <path d="M0,0 Q15,-35 25,-55" stroke="#2d5a27" strokeWidth="2" fill="none" />
                    {/* Lily Flowers */}
                    <g transform="translate(-20, -60)">
                      <path d="M0,0 C-8,-8 -4,-16 0,-20 C4,-16 8,-8 0,0" fill="white" />
                      <path d="M0,0 C-12,-4 -16,-12 -12,-16 C-8,-20 -4,-16 0,0" fill="white" />
                      <path d="M0,0 C12,-4 16,-12 12,-16 C8,-20 4,-16 0,0" fill="white" />
                      <circle cx="0" cy="-8" r="1.5" fill="#e8d800" />
                    </g>
                    <g transform="translate(10, -65) rotate(15)">
                      <path d="M0,0 C-8,-8 -4,-16 0,-20 C4,-16 8,-8 0,0" fill="white" />
                      <path d="M0,0 C-12,-4 -16,-12 -12,-16 C-8,-20 -4,-16 0,0" fill="white" />
                      <path d="M0,0 C12,-4 16,-12 12,-16 C8,-20 4,-16 0,0" fill="white" />
                      <circle cx="0" cy="-8" r="1.5" fill="#e8d800" />
                    </g>
                  </g>
                </svg>
              </div>
              
              {/* Sealed Letter (CSS Art) - STEP B TRIGGER */}
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  onLetterClick();
                }}
                className={`cursor-pointer hover:scale-110 active:scale-95 transition-all duration-[1200ms] ease-in-out delay-[1000ms] ${isOpen ? '-translate-y-24 scale-125 z-30' : 'z-0'}`}
              >
                <div className="relative w-24 h-16 bg-[#fffaf0] border border-gray-300 rounded-sm shadow-xl flex items-center justify-center overflow-hidden">
                  {/* Envelope folds */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 66">
                    <path d="M0,0 L50,33 L100,0" fill="none" stroke="#e5e7eb" strokeWidth="1" />
                    <path d="M0,66 L40,30" fill="none" stroke="#e5e7eb" strokeWidth="1" />
                    <path d="M100,66 L60,30" fill="none" stroke="#e5e7eb" strokeWidth="1" />
                  </svg>
                  {/* Wax Seal */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#6b1317] shadow-lg border-2 border-[#8b1a1f] flex items-center justify-center">
                    <span className="text-white text-[8px] font-romantic">♥</span>
                  </div>
                </div>
                {isOpen && (
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[#6b1317] text-white text-[10px] px-2 py-1 rounded-full whitespace-nowrap animate-bounce font-bold shadow-lg">
                    READ ME
                  </div>
                )}
              </div>

              {/* Hirono Figurine Box (CSS Art) */}
              <div className={`transition-all duration-[1200ms] ease-in-out delay-800 ${isOpen ? 'translate-x-[45px] -translate-y-16 rotate-[15deg]' : ''}`}>
                <div className="relative w-20 h-24 bg-[#333] border border-gray-600 rounded shadow-2xl flex flex-col items-center justify-between p-2 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                  {/* Box Label / Brand */}
                  <div className="text-[6px] text-gray-400 font-bold uppercase tracking-widest mt-1">Hirono</div>
                  {/* The Rose Icon */}
                  <div className="relative w-10 h-10 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-[#6b1317] shadow-inner flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#8b1a1f] animate-pulse" />
                    </div>
                    {/* Stylized Rose Petals around */}
                    <div className="absolute inset-0 border border-[#6b1317]/30 rounded-full scale-110" />
                    <div className="absolute inset-0 border border-[#6b1317]/20 rounded-full scale-125" />
                  </div>
                  {/* Bottom Info */}
                  <div className="text-[5px] text-gray-500 mb-1">Little Rose Edition</div>
                </div>
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
