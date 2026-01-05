
import React, { useState, useEffect, useCallback } from 'react';
import { VERSICULOS } from './data/versiculos';
import { Verse } from './types';
import { RefreshIcon, ShareIcon, QuoteIcon } from './components/Icon';

const App: React.FC = () => {
  const [currentVerse, setCurrentVerse] = useState<Verse | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Function to get a random verse
  const getNewVerse = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      let nextVerse;
      do {
        const randomIndex = Math.floor(Math.random() * VERSICULOS.length);
        nextVerse = VERSICULOS[randomIndex];
      } while (VERSICULOS.length > 1 && nextVerse.texto === currentVerse?.texto);
      
      setCurrentVerse(nextVerse);
      setIsAnimating(false);
    }, 400);
  }, [currentVerse]);

  // Initial load
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * VERSICULOS.length);
    setCurrentVerse(VERSICULOS[randomIndex]);
  }, []);

  const handleShare = async () => {
    if (!currentVerse) return;
    const shareText = `"${currentVerse.texto}" — ${currentVerse.referencia}\n\nEnviado via Jean te ajuda.`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Versículo do Dia',
          text: shareText,
        });
      } catch (error) {
        console.debug('Share cancelled or failed');
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-slate-50 overflow-hidden select-none">
      
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-200/40 rounded-full blur-[120px] animate-float"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-rose-100/40 rounded-full blur-[120px] animate-float-delayed"></div>
        <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-amber-100/30 rounded-full blur-[100px] animate-float"></div>
      </div>

      {/* Header with Enhanced Emblem Logo */}
      <header className="relative z-10 pt-10 pb-4 px-6 flex flex-col items-center text-center">
        <div className="relative group cursor-pointer mb-6">
          {/* Animated Halo Rings */}
          <div className="absolute inset-0 scale-150 bg-indigo-200/30 rounded-full blur-2xl animate-pulse-glow"></div>
          <div className="absolute inset-0 scale-110 border border-indigo-100/50 rounded-full"></div>
          
          {/* Main Icon Container */}
          <div className="relative w-28 h-28 bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-200/50 flex items-center justify-center border border-indigo-50/50 overflow-hidden transform group-hover:scale-105 transition-transform duration-500">
            {/* Inner background pattern */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-50/50 via-transparent to-rose-50/50"></div>
            <span className="relative text-6xl drop-shadow-sm filter contrast-125">🕊️</span>
          </div>
          
          {/* Floating dots decoration */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-amber-400 rounded-full border-4 border-white shadow-sm"></div>
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-indigo-400 rounded-full border-2 border-white shadow-sm"></div>
        </div>

        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tighter text-slate-900 bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600">
            Jean te ajuda
          </h1>
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] w-4 bg-indigo-300"></span>
            <p className="text-indigo-500 font-bold text-[10px] uppercase tracking-[0.4em] translate-y-[1px]">
              Versículo do Dia
            </p>
            <span className="h-[1px] w-4 bg-indigo-300"></span>
          </div>
        </div>
      </header>

      {/* Main Devotion Card */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-2">
        <div 
          className={`w-full max-w-md glass p-10 rounded-[3.5rem] shadow-2xl shadow-indigo-200/20 transition-all duration-500 ease-out transform ${
            isAnimating ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'
          }`}
        >
          <div className="flex justify-center mb-6">
            <QuoteIcon className="text-indigo-600/10 w-12 h-12" />
          </div>
          
          {currentVerse ? (
            <div className="text-center space-y-8">
              <p className="font-serif text-3xl text-slate-800 leading-[1.3] italic font-medium">
                {currentVerse.texto}
              </p>
              
              <div className="flex flex-col items-center space-y-3 pt-2">
                <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-indigo-200 rounded-full"></div>
                <cite className="not-italic text-indigo-500 font-bold tracking-widest uppercase text-[10px]">
                  {currentVerse.referencia}
                </cite>
              </div>
            </div>
          ) : (
            <div className="h-48 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </main>

      {/* Footer Controls */}
      <footer className="relative z-10 px-6 pb-10 pt-4 flex flex-col items-center gap-4">
        <button
          onClick={getNewVerse}
          disabled={isAnimating}
          className="group w-full max-w-md bg-indigo-600 active:bg-indigo-800 text-white py-5 rounded-[2rem] font-bold flex items-center justify-center space-x-3 shadow-xl shadow-indigo-500/30 transition-all duration-200 hover:translate-y-[-2px] disabled:opacity-50"
        >
          <RefreshIcon className={`w-5 h-5 transition-transform duration-500 ${isAnimating ? 'rotate-180' : 'group-hover:rotate-45'}`} />
          <span className="text-lg">Próximo Versículo</span>
        </button>

        <button
          onClick={handleShare}
          className="w-full max-w-md bg-white/40 backdrop-blur-md border border-slate-200 text-slate-600 py-5 rounded-[2rem] font-bold flex items-center justify-center space-x-3 transition-all active:scale-95 hover:bg-white/60 shadow-sm"
        >
          <ShareIcon className="w-5 h-5" />
          <span className="text-lg">Compartilhar</span>
        </button>

        <div className="mt-4 flex flex-col items-center space-y-1 opacity-40">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-indigo-900">
            Jesus te ama
          </p>
          <div className="w-1 h-1 bg-indigo-500 rounded-full"></div>
        </div>
      </footer>

      {/* Toast Notification */}
      <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 transform ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <div className="bg-slate-900 text-white text-xs font-bold px-6 py-3 rounded-full shadow-2xl flex items-center gap-2">
          <span>✨</span>
          <span>Copiado para você!</span>
        </div>
      </div>
    </div>
  );
};

export default App;
