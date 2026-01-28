
import React from 'react';

interface Props {
  onNext: () => void;
}

const GreetingView: React.FC<Props> = ({ onNext }) => {
  return (
    <div className="text-center animate-fade-in">
      <h1 className="text-7xl sm:text-9xl font-romantic text-[#6b1317] mb-12 drop-shadow-sm">
        Hello!
      </h1>
      <div className="flex gap-6 justify-center">
        <button 
          onClick={onNext}
          className="px-10 py-3 bg-[#6b1317] text-white rounded-full font-semibold hover:bg-[#8b1a1f] transform hover:scale-105 transition-all shadow-lg active:scale-95"
        >
          Hi
        </button>
        <button 
          onClick={onNext}
          className="px-10 py-3 bg-[#6b1317] text-white rounded-full font-semibold hover:bg-[#8b1a1f] transform hover:scale-105 transition-all shadow-lg active:scale-95"
        >
          Hey!
        </button>
      </div>
    </div>
  );
};

export default GreetingView;
