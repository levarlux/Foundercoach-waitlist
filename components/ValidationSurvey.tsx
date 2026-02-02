
import React, { useState } from 'react';
import { SurveyResponse } from '../types';

interface ValidationSurveyProps {
  onSubmit: (response: SurveyResponse) => void;
}

export const ValidationSurvey: React.FC<ValidationSurveyProps> = ({ onSubmit }) => {
  const [response, setResponse] = useState<SurveyResponse>({
    painPoint: '',
    currentSolution: '',
    willingnessToPay: 'Medium'
  });
  const [mode, setMode] = useState<'FEATURE' | 'BUG'>('FEATURE');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(response);
  };

  return (
    <div className="bg-white border border-gray-50 rounded-[3rem] p-12 shadow-soft w-full">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-serif text-black mb-4">Help us shape the coach.</h3>
        <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">Suggest a feature or report a bug. We listen to every founder journey.</p>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <button 
          onClick={() => setMode('FEATURE')}
          className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${mode === 'FEATURE' ? 'bg-black text-white' : 'bg-gray-50 text-gray-300 hover:text-black'}`}
        >
          SUGGEST FEATURE
        </button>
        <button 
          onClick={() => setMode('BUG')}
          className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${mode === 'BUG' ? 'bg-black text-white' : 'bg-gray-50 text-gray-300 hover:text-black'}`}
        >
          REPORT BUG
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="relative">
          <textarea
            required
            value={response.painPoint}
            onChange={(e) => setResponse({ ...response, painPoint: e.target.value })}
            className="w-full bg-[#FBFBFB] border border-gray-100 rounded-3xl p-8 text-black focus:ring-1 focus:ring-orange focus:bg-white focus:outline-none min-h-[160px] text-sm leading-relaxed"
            placeholder="What would make your founder journey easier?"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Willingness to invest in your focus?</label>
          <div className="grid grid-cols-3 gap-3">
            {(['Low', 'Medium', 'High'] as const).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setResponse({ ...response, willingnessToPay: level })}
                className={`py-4 rounded-2xl border text-[10px] font-bold tracking-widest transition-all ${
                  response.willingnessToPay === level
                    ? 'bg-black border-black text-white shadow-lg'
                    : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                }`}
              >
                {level.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-5 bg-orange text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl shadow-orange/20 hover:brightness-110 active:scale-95"
        >
          SUBMIT TO FOUNDEROS
        </button>
      </form>
    </div>
  );
};
