
import React from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-orange/20 selection:text-orange">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md px-6 py-6 border-b border-gray-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
             <div className="w-6 h-6 flex flex-wrap gap-0.5 group-hover:rotate-90 transition-transform duration-500">
                <div className="w-2.5 h-2.5 bg-black rounded-sm"></div>
                <div className="w-2.5 h-2.5 bg-black rounded-sm"></div>
                <div className="w-2.5 h-2.5 bg-black rounded-sm"></div>
                <div className="w-2.5 h-2.5 bg-orange rounded-sm"></div>
             </div>
            <span className="font-bold text-xl tracking-tight text-black">FounderCoach</span>
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Mission-Driven Execution</span>
          </div>
        </div>
      </nav>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-white text-gray-400 py-16 px-6 border-t border-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-black rounded-sm"></div>
              <span className="font-bold text-black tracking-tighter">FounderCoach</span>
            </div>
            <p className="text-xs max-w-sm leading-relaxed">Designed for the messy, anxious reality of building a company alone. We bridge the gap between vision and daily work.</p>
          </div>
          <div className="flex flex-col md:items-end gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-black">Batch #014 Onboarding</span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.3em]">© 2024. NO AI WAS HARMED IN THE MAKING.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
