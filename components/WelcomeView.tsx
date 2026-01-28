
import React from 'react';

interface Props {
  name: string;
}

const WelcomeView: React.FC<Props> = ({ name }) => {
  return (
    <div className="text-center animate-fade-in-out">
      <h2 className="text-6xl sm:text-8xl font-romantic text-[#6b1317] leading-tight px-4">
        Nice to meet you, <br/>
        <span className="text-[#8b1a1f]">{name}</span>!
      </h2>
      <style>{`
        .animate-fade-in-out {
          animation: fadeInOut 3s ease-in-out forwards;
        }
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(10px); }
          20% { opacity: 1; transform: translateY(0); }
          80% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default WelcomeView;
