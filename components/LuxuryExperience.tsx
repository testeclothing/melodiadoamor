import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Heart, Download, Share2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

// --- IMAGENS (Certifica-te que os nomes estão iguais na pasta assets) ---
import imgFechada from '../assets/caixa.jpg';
import imgAberta from '../assets/caixaaberta.jpg';
import imgDisco from '../assets/disco.jpg';

const LuxuryExperience = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Dados da URL
  const params = new URLSearchParams(window.location.search);
  const nomePai = params.get('nome') || "Meu Herói";
  const audioUrl = params.get('musica') || "";

  // --- EFEITO: CONFETIS DOURADOS ---
  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      // Confetis da esquerda
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#D4AF37', '#F9F6F1', '#FFFFFF'] 
      });
      // Confetis da direita
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#D4AF37', '#F9F6F1', '#FFFFFF']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  // --- AÇÃO DE ABRIR ---
  const handleOpen = () => {
    // 1. Vibração (Haptic Feedback) se o telemóvel permitir
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    setIsOpen(true);
    triggerConfetti(); // Explosão!

    // 2. Tocar música com Fade In
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.volume = 0;
        audioRef.current.play().catch(e => console.log("Autoplay:", e));
        setIsPlaying(true);
        
        let vol = 0;
        const interval = setInterval(() => {
          if (vol < 1.0) {
            vol += 0.05;
            if(audioRef.current) audioRef.current.volume = Math.min(vol, 1);
          } else clearInterval(interval);
        }, 100);
      }
    }, 800);
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#F9F6F1] flex flex-col items-center justify-center overflow-hidden font-sans">
      <audio ref={audioRef} src={audioUrl} loop />

      {/* --- BACKGROUND COM PARTICULAS FLUTUANTES --- */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -10, opacity: 0 }}
            animate={{ 
              y: ['0vh', '100vh'], 
              opacity: [0, 0.4, 0],
              x: Math.random() * 50 - 25
            }}
            transition={{ 
              duration: Math.random() * 15 + 10, 
              repeat: Infinity, 
              delay: Math.random() * 5 
            }}
            className="absolute w-[3px] h-[3px] bg-[#D4AF37] rounded-full blur-[0.5px]"
            style={{ left: `${Math.random() * 100}%` }}
          />
        ))}
      </div>

      {/* --- TÍTULO (SÓ NO INÍCIO) --- */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            exit={{ opacity: 0, y: -50 }}
            className="absolute top-[12%] text-center z-50 w-full px-4"
          >
            <div className="flex justify-center mb-2">
              <Sparkles className="text-[#D4AF37] w-6 h-6 animate-pulse" />
            </div>
            <h3 className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-2">Presente Exclusivo</h3>
            <h1 className="text-4xl font-serif text-[#0F172A] italic">Para o {nomePai}</h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- ÁREA CENTRAL (CAIXA) --- */}
      <div className="relative w-full max-w-[400px] px-6 aspect-square flex items-center justify-center">
        
        {/* CAIXA FECHADA */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              onClick={handleOpen}
              initial={{ scale: 0.9, y: 0 }}
              animate={{ y: [0, -12, 0] }}
              exit={{ scale: 1.1, opacity: 0, rotateX: 90 }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full cursor-pointer z-50 group"
            >
              <img src={imgFechada} className="w-full h-auto shadow-2xl rounded-lg" alt="Caixa Fechada" />
              
              {/* Brilho Metálico a passar (Sheen) */}
              <motion.div 
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none"
              />

              <div className="absolute -bottom-14 left-0 right-0 text-center">
                 <span className="text-[#F9F6F1] bg-[#D4AF37] text-xs font-bold tracking-widest px-8 py-3 rounded-full shadow-lg shadow-[#D4AF37]/30 animate-pulse">
                   ABRIR AGORA
                 </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CAIXA ABERTA + DISCO */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              className="relative w-full flex items-center justify-center"
            >
              {/* Fundo (Caixa Aberta) */}
              <img src={imgAberta} className="w-full h-auto relative z-10 drop-shadow-2xl" alt="Caixa Aberta" />

              {/* O Disco (Gira por cima) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotate: isPlaying ? 360 : 0 
                }}
                transition={{ 
                  opacity: { duration: 0.5 },
                  scale: { duration: 0.7, delay: 0.1, type: "spring" },
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" }
                }}
                className="absolute z-20 overflow-hidden rounded-full shadow-xl"
                style={{ 
                  top: '43.2%',   // AJUSTE FINO VERTICAL
                  width: '63%',   // AJUSTE FINO TAMANHO
                  aspectRatio: '1/1'
                }}
              >
                <img src={imgDisco} className="w-full h-full object-cover" alt="Disco" />
                
                {/* Reflexo no Disco (Gira ao contrário para realismo) */}
                <motion.div 
                   animate={{ rotate: isPlaying ? -360 : 0 }} 
                   transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent pointer-events-none"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- PAINEL DE CONTROLO (BOTTOM) --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, type: "spring", damping: 20 }}
            className="fixed bottom-0 w-full bg-white/90 backdrop-blur-xl border-t border-[#D4AF37]/30 p-6 pb-10 z-50 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(212,175,55,0.15)]"
          >
            <div className="flex flex-col items-center gap-6">
              
              <div className="text-center">
                <h2 className="text-3xl font-serif text-[#0F172A] leading-none mb-2">{nomePai}</h2>
                <div className="flex items-center justify-center gap-2">
                  <div className="h-[1px] w-6 bg-[#D4AF37]"></div>
                  <p className="text-[#D4AF37] text-[10px] tracking-[0.25em] uppercase font-bold">Disco de Ouro Oficial</p>
                  <div className="h-[1px] w-6 bg-[#D4AF37]"></div>
                </div>
              </div>

              {/* Visualizador de Áudio (Barrinhas a dançar) */}
              {isPlaying && (
                <div className="flex items-end justify-center gap-1 h-8 mb-2">
                  {[...Array(12)].map((_, i) => (
                    <motion.div 
                      key={i}
                      animate={{ height: [4, Math.random() * 24 + 4, 4] }}
                      transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.05 }}
                      className="w-1 bg-[#D4AF37] rounded-full"
                    />
                  ))}
                </div>
              )}

              {/* Botões de Ação */}
              <div className="flex items-center gap-8">
                <button className="flex flex-col items-center gap-1 text-[#0F172A]/50 hover:text-[#D4AF37] transition-colors group">
                  <div className="p-3 rounded-full border border-current group-hover:bg-[#D4AF37]/10"><Heart size={22} /></div>
                  <span className="text-[9px] font-bold tracking-widest">LETRA</span>
                </button>

                <button 
                  onClick={togglePlay}
                  className="w-20 h-20 -mt-10 bg-[#0F172A] text-[#D4AF37] flex items-center justify-center rounded-full shadow-2xl shadow-[#D4AF37]/40 border-[3px] border-[#F9F6F1] hover:scale-105 transition-transform active:scale-95"
                >
                  {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1"/>}
                </button>

                <a href={audioUrl} download className="flex flex-col items-center gap-1 text-[#0F172A]/50 hover:text-[#D4AF37] transition-colors group">
                  <div className="p-3 rounded-full border border-current group-hover:bg-[#D4AF37]/10"><Download size={22} /></div>
                  <span className="text-[9px] font-bold tracking-widest">BAIXAR</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LuxuryExperience;
