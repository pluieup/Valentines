
import React, { useState } from 'react';

interface Props {
  onSubmit: (name: string) => void;
}

const NameInputView: React.FC<Props> = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value.trim());
    }
  };

  return (
    <div className="text-center animate-fade-in w-full">
      <h2 className="text-5xl sm:text-7xl font-romantic text-[#6b1317] mb-8">
        What's your name?
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6">
        <div className="relative group">
          <input 
            autoFocus
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="I'm..."
            className="px-8 py-4 bg-white/80 border-2 border-[#6b1317] rounded-full text-2xl text-[#6b1317] placeholder:text-[#6b1317]/40 outline-none w-64 sm:w-80 shadow-inner focus:ring-4 focus:ring-[#6b1317]/20 transition-all text-center font-semibold"
          />
        </div>
        <button 
          type="submit"
          className="px-12 py-3 bg-[#6b1317] text-white rounded-full font-semibold hover:bg-[#8b1a1f] transform hover:scale-105 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!value.trim()}
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default NameInputView;
