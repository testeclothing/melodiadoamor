import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Heart, Download, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';

// --- IMAGENS ---
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

  // --- EFEITO DE CONFETI DOURADO ---
  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#D4AF37', '#F9F6F1', '#FFFFFF'] // Dourado e Branco
      });
      confetti({
        particleCount: 3,
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

  // --- ABERTURA DA CAIXA ---
  const handleOpen = () => {
    // 1. Vibração Tátil (Haptic Feedback)
    if (navigator.vibrate) navigator.vibrate(50);
    
    setIsOpen(true);
    triggerConfetti(); // 2. Explosão visual

    // 3. Áudio com Fade In
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

      {/* --- PARTICULAS AMBIENTE --- */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
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
            className="absolute w-[2px] h-[2px] bg-[#D4AF37] rounded-full"
            style={{ left: `${Math.random() * 100}%` }}
          />
        ))}
      </div>

      {/* --- MENSAGEM INICIAL --- */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            exit={{ opacity: 0, y: -50 }}
            className="absolute top-[10%] text-center z-50 w-full px-4"
          >
            <h3 className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-2">Presente Exclusivo</h3>
            <h1 className="text-3xl font-serif text-[#0F172A] italic">Uma Homenagem para Ti</h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- ÁREA DA CAIXA (CENTRAL) --- */}
      <div className="relative w-full max-w-[400px] px-6 aspect-square flex items-center justify-center">
        
        {/* ESTADO 1: CAIXA FECHADA COM BRILHO */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              onClick={handleOpen}
              initial={{ scale: 0.9, y: 0 }}
              animate={{ y: [0, -10, 0] }}
              exit={{ scale: 1.2, opacity: 0, rotateX: 90 }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full cursor-pointer z-50 group"
            >
              <img src={imgFechada} className="w-full h-auto shadow-2xl rounded-lg" alt="Caixa Fechada" />
              
              {/* Efeito de Brilho (Sheen) a passar */}
              <motion.div 
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none"
              />

              <div className="absolute -bottom-12 left-0 right-0 text-center">
                 <span className="text-[#D4AF37] text-xs font-bold tracking-widest bg-white/80 px-6 py-3 rounded-full shadow-sm animate-pulse">
                   TOQUE PARA ABRIR
                 </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ESTADO 2: CAIXA ABERTA + DISCO */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              className="relative w-full flex items-center justify-center"
            >
              {/* Fundo (Caixa) */}
              <img src={imgAberta} className="w-full h-auto relative z-10" alt="Caixa Aberta" />

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
                  scale: { duration: 0.6, delay: 0.2 },
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" }
                }}
                className="absolute z-20 overflow-hidden rounded-full shadow-lg"
                style={{ 
                  top: '43.5%',   // <--- AJUSTA A POSIÇÃO VERTICAL AQUI
                  width: '63%',   // <--- AJUSTA O TAMANHO DO DISCO AQUI
                  aspectRatio: '1/1'
                }}
              >
                <img src={imgDisco} className="w-full h-full object-cover" alt="Disco" />
                
                {/* Reflexo Metálico no Disco */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/20 pointer-events-none" />
                <motion.div 
                   animate={{ rotate: isPlaying ? -360 : 0 }} // Contrarotação para o brilho parecer real
                   transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent pointer-events-none"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- CONTROLOS E NOME (Abaixo) --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="fixed bottom-0 w-full bg-white/80 backdrop-blur-xl border-t border-[#D4AF37]/20 p-6 pb-8 z-50 rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]"
          >
            <div className="flex flex-col items-center gap-6">
              
              <div className="text-center">
                <h2 className="text-3xl font-serif text-[#0F172A] leading-none mb-1">{nomePai}</h2>
                <div className="flex items-center justify-center gap-2">
                  <div className="h-[1px] w-8 bg-[#D4AF37]"></div>
                  <p className="text-[#D4AF37] text-[10px] tracking-[0.3em] uppercase font-bold">Disco de Ouro</p>
                  <div className="h-[1px] w-8 bg-[#D4AF37]"></div>
                </div>
              </div>

              {/* Visualizador de Áudio Simulado */}
              {isPlaying && (
                <div className="flex items-end justify-center gap-1 h-6">
                  {[...Array(8)].map((_, i) => (
                    <motion.div 
                      key={i}
                      animate={{ height: [5, 20, 5] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                      className="w-1 bg-[#D4AF37] rounded-full"
                    />
                  ))}
                </div>
              )}

              <div className="flex items-center gap-6">
                <button className="flex flex-col items-center gap-1 text-[#0F172A]/60 hover:text-[#D4AF37]">
                  <div className="p-3 rounded-full border border-current"><Heart size={20} /></div>
                  <span className="text-[10px] font-bold">LETRA</span>
                </button>

                <button 
                  onClick={togglePlay}
                  className="w-20 h-20 -mt-8 bg-[#0F172A] text-[#D4AF37] flex items-center justify-center rounded-full shadow-2xl shadow-[#D4AF37]/40 border-4 border-white hover:scale-105 transition-transform"
                >
                  {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1"/>}
                </button>

                <a href={audioUrl} download className="flex flex-col items-center gap-1 text-[#0F172A]/60 hover:text-[#D4AF37]">
                  <div className="p-3 rounded-full border border-current"><Download size={20} /></div>
                  <span className="text-[10px] font-bold">BAIXAR</span>
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
