
import React from 'react';

const ScallopedFrame: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
      {/* The main red frame */}
      <div className="absolute inset-0 border-[20px] sm:border-[30px] border-[#6b1317]" />
      
      {/* Top scallops */}
      <div className="absolute top-0 left-0 w-full h-10 sm:h-14 flex overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="min-w-[40px] h-10 sm:min-w-[50px] sm:h-14 bg-[#6b1317] rounded-b-full shrink-0 -mt-1" />
        ))}
      </div>

      {/* Bottom scallops */}
      <div className="absolute bottom-0 left-0 w-full h-10 sm:h-14 flex overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="min-w-[40px] h-10 sm:min-w-[50px] sm:h-14 bg-[#6b1317] rounded-t-full shrink-0 -mb-1" />
        ))}
      </div>

      {/* Left scallops */}
      <div className="absolute left-0 top-0 h-full w-10 sm:w-14 flex flex-col overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="min-h-[40px] w-10 sm:min-h-[50px] sm:w-14 bg-[#6b1317] rounded-r-full shrink-0 -ml-1" />
        ))}
      </div>

      {/* Right scallops */}
      <div className="absolute right-0 top-0 h-full w-10 sm:w-14 flex flex-col overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="min-h-[40px] w-10 sm:min-h-[50px] sm:w-14 bg-[#6b1317] rounded-l-full shrink-0 -mr-1" />
        ))}
      </div>
    </div>
  );
};

export default ScallopedFrame;
