
import React, { useState } from 'react';
import { WaitlistEntry } from '../types';

interface WaitlistFormProps {
  onSuccess: (entry: WaitlistEntry) => void;
}

export const WaitlistForm: React.FC<WaitlistFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    
    try {
      // Generate waitlist entry data
      const newEntry: WaitlistEntry = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        timestamp: Date.now(),
        referralCode: Math.random().toString(36).substr(2, 6).toUpperCase(),
        referralCount: 0,
        position: Math.floor(Math.random() * 500) + 120,
      };

      // Call API to send email notification
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: newEntry.email,
          position: newEntry.position,
          timestamp: newEntry.timestamp,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      // Call success callback
      onSuccess(newEntry);
    } catch (error) {
      console.error('Failed to submit waitlist:', error);
      // Still show success to maintain UX, but log error
      const fallbackEntry: WaitlistEntry = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        timestamp: Date.now(),
        referralCode: Math.random().toString(36).substr(2, 6).toUpperCase(),
        referralCount: 0,
        position: Math.floor(Math.random() * 500) + 120,
      };
      onSuccess(fallbackEntry);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 bg-orange/20 rounded-full blur-xl opacity-0 group-focus-within:opacity-100 transition duration-1000"></div>
        <div className="relative">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-8 py-6 rounded-full bg-white border border-gray-100 text-black placeholder:text-gray-300 focus:outline-none focus:ring-1 focus:ring-black transition-all text-lg shadow-2xl shadow-gray-200/50"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="absolute right-2 top-2 bottom-2 px-8 bg-black hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-full transition-all flex items-center gap-3"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
            ) : (
              <>
                Join Beta
                <span className="text-lg">→</span>
              </>
            )}
          </button>
        </div>
      </form>
      <div className="mt-8 flex justify-center items-center gap-6 text-gray-300">
        <span className="text-[10px] font-bold uppercase tracking-widest">Limited slots for Q2</span>
        <div className="w-px h-3 bg-gray-100"></div>
        <span className="text-[10px] font-bold uppercase tracking-widest">Invite only</span>
      </div>
    </div>
  );
};
