
import React from 'react';

const Cloud: React.FC<{ className?: string, delay?: string }> = ({ className, delay }) => (
  <div className={`absolute pointer-events-none ${className}`} style={{ animationDelay: delay }}>
    <div className="relative w-32 h-12 bg-white rounded-full floating-cloud">
      <div className="absolute -top-6 left-4 w-16 h-16 bg-white rounded-full shadow-sm" />
      <div className="absolute -top-8 left-12 w-20 h-20 bg-white rounded-full shadow-sm" />
      <div className="absolute -top-4 left-24 w-14 h-14 bg-white rounded-full shadow-sm" />
    </div>
  </div>
);

const Background: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <Cloud className="top-[10%] left-[10%] opacity-60 scale-150" delay="0s" />
      <Cloud className="top-[40%] right-[15%] opacity-40 scale-125" delay="2s" />
      <Cloud className="bottom-[20%] left-[20%] opacity-50 scale-110" delay="4s" />
      <Cloud className="top-[70%] right-[5%] opacity-30 scale-100" delay="1s" />
      <Cloud className="bottom-[10%] right-[25%] opacity-45 scale-150" delay="3s" />
      
      {/* Soft Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#ffdada]/50" />
    </div>
  );
};

export default Background;
