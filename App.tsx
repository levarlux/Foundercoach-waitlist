
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { WaitlistForm } from './components/WaitlistForm';
import { ValidationSurvey } from './components/ValidationSurvey';
import { WaitlistEntry, SurveyResponse } from './types';

const App: React.FC = () => {
  const [currentEntry, setCurrentEntry] = useState<WaitlistEntry | null>(null);
  const [showSurvey, setShowSurvey] = useState(false);

  // Typewriter logic: fear, anxiety, paralysis, guilt, drift
  const words = ["fear", "anxiety", "paralysis", "guilt", "drift"];
  const [wordIndex, setWordIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const currentFullWord = words[wordIndex];
      if (!isDeleting && subIndex < currentFullWord.length) {
        setSubIndex(prev => prev + 1);
        setTypingSpeed(120 + Math.random() * 80);
      } else if (isDeleting && subIndex > 0) {
        setSubIndex(prev => prev - 1);
        setTypingSpeed(60);
      } else if (!isDeleting && subIndex === currentFullWord.length) {
        setTypingSpeed(2500);
        setIsDeleting(true);
      } else if (isDeleting && subIndex === 0) {
        setIsDeleting(false);
        setWordIndex(prev => (prev + 1) % words.length);
        setTypingSpeed(500);
      }
    };
    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [subIndex, isDeleting, wordIndex, typingSpeed, words]);

  const handleJoinSuccess = (entry: WaitlistEntry) => {
    setCurrentEntry(entry);
    setShowSurvey(true);
    setTimeout(() => {
      document.getElementById('post-signup')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSurveySubmit = (survey: SurveyResponse) => {
    if (!currentEntry) return;
    setCurrentEntry({ ...currentEntry, surveyResponses: survey });
    setShowSurvey(false);
  };

  return (
    <Layout>
      <div className="flex flex-col">
        {/* HERO SECTION */}
        <section className="relative flex flex-col items-center justify-center px-6 pt-24 pb-32 overflow-hidden border-b border-gray-50">
          <div className="max-w-5xl w-full text-center z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-50 text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em] rounded-full mb-12 animate-in fade-in slide-in-from-top-4 duration-1000">
              <span className="w-1.5 h-1.5 bg-orange rounded-full animate-pulse"></span>
              Private Beta Waitlist Open
            </div>
            
            <h1 className="text-5xl md:text-[6.5rem] font-serif tracking-tighter text-black leading-[1.1] mb-12">
              <span>Turn your </span>
              <span className="text-orange italic relative inline-block whitespace-nowrap">
                {words[wordIndex].substring(0, subIndex)}
                <span className="inline-block w-[4px] h-[0.8em] bg-orange ml-2 translate-y-[0.1em] animate-pulse"></span>
              </span>
              <br />
              <span>into focused action.</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-16 font-light">
              The first AI execution coach that bridges the gap between your quarterly OKRs and your messy Tuesday morning.
            </p>

            {!currentEntry ? (
              <div className="animate-in fade-in zoom-in duration-1000 delay-300">
                <WaitlistForm onSuccess={handleJoinSuccess} />
              </div>
            ) : (
              <div id="status" className="animate-in fade-in zoom-in duration-500 max-w-2xl mx-auto">
                <div className="bg-white rounded-[3rem] p-12 md:p-16 text-center shadow-2xl border border-gray-100">
                  <h2 className="text-4xl font-serif mb-4">You're #{currentEntry.position}</h2>
                  <p className="text-gray-400 mb-10 text-sm">Onboarding founders in cohorts of 10. Refer a friend to jump 25 spots.</p>
                  <div className="bg-gray-50 p-4 rounded-2xl flex flex-col md:flex-row items-center gap-4 border border-gray-100">
                    <code className="text-orange font-mono text-xs flex-grow">foundercoach.xyz/?ref={currentEntry.referralCode}</code>
                    <button onClick={() => navigator.clipboard.writeText(`https://foundercoach.xyz/?ref=${currentEntry.referralCode}`)} className="whitespace-nowrap bg-black text-white px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">Copy Link</button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-[600px] bg-orange/5 blur-[140px] rounded-full -z-10"></div>
        </section>

        {/* VALIDATION SURVEY (Appears after signup) */}
        <div id="post-signup">
          {currentEntry && showSurvey && (
            <section className="py-24 px-6 bg-gray-50">
              <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
                <ValidationSurvey onSubmit={handleSurveySubmit} />
              </div>
            </section>
          )}
        </div>

        {/* EXECUTION SYSTEM - OKRs & IMPACT */}
        <section className="py-32 px-6 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-8">
              <span className="text-[10px] font-bold text-orange uppercase tracking-[0.4em]">Feature: /okrs</span>
              <h2 className="text-4xl md:text-6xl font-serif leading-tight">Your mission, <br/>quantified.</h2>
              <div className="space-y-6 text-gray-500 text-lg leading-relaxed">
                <p>Quarterly OKRs shouldn't sit in a forgotten Notion page. We turn them into an active execution engine.</p>
                <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-black text-sm uppercase tracking-widest">Grow MRR 2x</span>
                      <span className="text-orange font-bold">62%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-black h-full w-[62%] transition-all duration-1000"></div>
                    </div>
                    <div className="flex gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                      <span>• MRR: $6.2k/$10k</span>
                      <span>• Churn: 12%/8% ⚠️</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative group">
              {/* Liquid background shapes for glassmorphism */}
              <div className="absolute top-0 -left-10 w-48 h-48 bg-orange/30 blur-[60px] rounded-full animate-pulse"></div>
              <div className="absolute bottom-10 -right-10 w-64 h-64 bg-pink-400/20 blur-[80px] rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              
              {/* Apple-style Glassmorphism Card */}
              <div className="relative bg-white/40 backdrop-blur-3xl border border-white/60 p-12 rounded-[3.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] transition-transform duration-500 hover:scale-[1.02]">
                 <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 bg-orange text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg shadow-orange/30">AI</div>
                    <h4 className="font-instrument italic text-3xl text-black">Task Impact Scoring</h4>
                 </div>
                 
                 <div className="space-y-6">
                    <div className="p-8 bg-white/40 backdrop-blur-md border border-white/80 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">PRICING PAGE COPY</span>
                        <span className="text-orange font-mono text-2xl font-bold">92/100</span>
                      </div>
                      <p className="text-xs leading-relaxed text-gray-600 font-medium">Why high impact: Directly blocks MRR KR #1. Three founders mentioned pricing in churn survey.</p>
                    </div>
                    
                    <div className="p-8 bg-white/20 backdrop-blur-sm border border-white/40 rounded-3xl opacity-60">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">WRITE BLOG POST</span>
                        <span className="text-gray-400 font-mono text-2xl font-bold">12/100</span>
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* DAILY FOCUS & MOBILE EXPERIENCE */}
        <section className="py-32 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <span className="text-[10px] font-bold text-orange uppercase tracking-[0.4em] mb-4 block">Feature: /daily</span>
              <h2 className="text-4xl md:text-7xl font-serif">Today's Focus, <br/>delivered at 6AM.</h2>
              <p className="text-gray-500 text-xl max-w-2xl mx-auto mt-6">Generated from your lagging KRs. Three tasks. No more sprawl.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 flex flex-col items-center text-center">
                 <div className="text-3xl mb-6">📧</div>
                 <h4 className="font-bold text-sm uppercase tracking-widest mb-4">Resend Integration</h4>
                 <p className="text-xs text-gray-400 leading-relaxed">Daily 6AM focus emails and 8PM check-ins to keep you accountable without opening the app.</p>
              </div>
              <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 flex flex-col items-center text-center scale-110 z-10 shadow-xl">
                 <div className="text-3xl mb-6">📱</div>
                 <h4 className="font-bold text-sm uppercase tracking-widest mb-4">Mobile Primary</h4>
                 <p className="text-xs text-gray-400 leading-relaxed">Designed for quick status updates. Reply "DONE #1" to your email to update your mission status instantly.</p>
              </div>
              <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 flex flex-col items-center text-center">
                 <div className="text-3xl mb-6">🔄</div>
                 <h4 className="font-bold text-sm uppercase tracking-widest mb-4">Habit Linking</h4>
                 <p className="text-xs text-gray-400 leading-relaxed">Connect personal habits (like Morning Deep Work) directly to your business OKR success.</p>
              </div>
            </div>
          </div>
        </section>

        {/* OUTCOME SIMULATOR */}
        <section className="py-32 px-6 bg-white overflow-hidden relative">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-orange/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gray-50 rounded-[4rem] p-12 border border-gray-100">
                <h4 className="font-serif italic text-2xl mb-8">OKR Outcome Simulator</h4>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
                      <span>Projected Q1 MRR</span>
                      <span className="text-emerald-500">$9.8k (98%)</span>
                    </div>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                       <div className="bg-emerald-500 h-full w-[98%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
                      <span>Onboarding Target</span>
                      <span className="text-orange">68% (91%)</span>
                    </div>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                       <div className="bg-orange h-full w-[91%]"></div>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-gray-200">
                    <p className="text-xs italic text-gray-500">"If you maintain current velocity, you'll miss MRR target by $200. Prioritize Pricing Page (92 impact) to close the gap."</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <span className="text-[10px] font-bold text-orange uppercase tracking-[0.4em]">Feature: /simulations</span>
              <h2 className="text-4xl md:text-6xl font-serif leading-tight">See the future of your company.</h2>
              <p className="text-gray-500 text-lg leading-relaxed">Our simulation engine runs 1,000+ scenarios based on your task completion rate, impact scores, and historical velocity to predict exactly where you'll be at the end of the quarter.</p>
              <ul className="space-y-4 pt-4">
                 <li className="flex gap-3 text-sm font-bold text-black items-center">
                    <span className="text-orange">✦</span> Risk Detection
                 </li>
                 <li className="flex gap-3 text-sm font-bold text-black items-center">
                    <span className="text-orange">✦</span> Velocity Analysis
                 </li>
                 <li className="flex gap-3 text-sm font-bold text-black items-center">
                    <span className="text-orange">✦</span> Stretch Goal Recommendations
                 </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-32 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-serif text-center mb-24">Frequently asked.</h2>
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-1">
                  <h4 className="font-bold text-sm uppercase tracking-widest text-orange">Why choice this tool?</h4>
                </div>
                <div className="col-span-2 text-gray-500 text-sm leading-relaxed">
                  Traditional tools like Trello or Notion are flat databases. FounderCoach is an active participant in your business. It calculates impact, predicts outcomes, and coaches you back to your mission when life gets in the way.
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-gray-100">
                <div className="col-span-1">
                  <h4 className="font-bold text-sm uppercase tracking-widest text-orange">Is my data secure?</h4>
                </div>
                <div className="col-span-2 text-gray-500 text-sm leading-relaxed">
                  Yes. We use Clerk for secure authentication and Paddle for billing. Your strategy data is encrypted and only processed by AI to give you feedback—it's never used to train public models.
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-gray-100">
                <div className="col-span-1">
                  <h4 className="font-bold text-sm uppercase tracking-widest text-orange">Who is this for?</h4>
                </div>
                <div className="col-span-2 text-gray-500 text-sm leading-relaxed">
                  Solo founders, indie hackers, and small team leads who are overwhelmed by their own ambition. If you've ever felt "busy but not productive," this is for you.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-32 px-6 bg-white overflow-hidden relative">
          <div className="max-w-4xl mx-auto text-center z-10 relative">
            <h2 className="text-5xl md:text-7xl font-serif mb-12">Built for those who build alone.</h2>
            <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="bg-black text-white px-12 py-6 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
              Join the Private Beta
            </button>
          </div>
          <div className="absolute bottom-0 left-0 w-full select-none pointer-events-none opacity-[0.02]">
            <h2 className="text-[30vw] font-bold leading-none text-black whitespace-nowrap translate-y-1/2 uppercase tracking-tighter">Founder</h2>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default App;
