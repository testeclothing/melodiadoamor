import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Heart, Download } from 'lucide-react';
import confetti from 'canvas-confetti';

// --- IMPORTANTE: AS IMAGENS TÊM DE SER VERTICAIS (TIPO STORY DE INSTAGRAM) ---
import imgFechada from '../assets/caixa.jpg';
import imgAberta from '../assets/caixaaberta.jpg';
import imgDisco from '../assets/disco.jpg';

const LuxuryExperience = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const params = new URLSearchParams(window.location.search);
  const nomePai = params.get('nome') || "Meu Herói";
  const audioUrl = params.get('musica') || "";

  // Confetis
  const triggerConfetti = () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#D4AF37', '#FFF'] });
  };

  const handleOpen = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(50);
    setIsOpen(true);
    triggerConfetti();
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.volume = 1;
        audioRef.current.play().catch(e => console.log("Autoplay:", e));
        setIsPlaying(true);
      }
    }, 1000);
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    // FUNDO FIXO (PREVINE SCROLL E ERROS DE LAYOUT)
    <div className="fixed inset-0 bg-[#F9F6F1] flex flex-col items-center justify-center overflow-hidden font-sans">
      <audio ref={audioRef} src={audioUrl} loop />

      {/* Título Fixo no Topo */}
      <div className="absolute top-[8%] z-50 text-center w-full">
        <p className="text-[#D4AF37] text-[10px] font-bold tracking-[0.3em] uppercase mb-2">Homenagem Especial</p>
        <h1 className="text-3xl font-serif text-[#0F172A] italic">Para o {nomePai}</h1>
      </div>

      {/* --- ÁREA DA CAIXA (CONTAINER FIXO) --- */}
      {/* Este é o segredo: definimos um tamanho fixo para nada sair do sítio */}
      <div className="relative w-[350px] h-[500px] flex items-center justify-center">
        
        {/* CAMADA 1: CAIXA FECHADA */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              onClick={handleOpen}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.1, rotateX: -10 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center cursor-pointer z-40"
            >
              <img src={imgFechada} className="w-full h-full object-contain drop-shadow-2xl" alt="Fechada" />
              <div className="absolute bottom-[15%] bg-white/90 px-6 py-2 rounded-full shadow-lg">
                <span className="text-[#D4AF37] text-xs font-bold tracking-widest animate-pulse">ABRIR</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CAMADA 2: CAIXA ABERTA + DISCO */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 flex items-center justify-center z-30"
            >
              {/* A IMAGEM DA CAIXA ABERTA (Fundo) */}
              <div className="relative w-full h-full flex items-center justify-center">
                <img src={imgAberta} className="w-full h-full object-contain drop-shadow-2xl relative z-10" alt="Aberta" />

                {/* O DISCO (Sobreposto) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
                  animate={{ opacity: 1, scale: 1, rotate: isPlaying ? 360 : 0 }}
                  transition={{ 
                    scale: { duration: 0.5, delay: 0.3 },
                    opacity: { duration: 0.5 },
                    rotate: { duration: 8, repeat: Infinity, ease: "linear" }
                  }}
                  // --- AQUI É ONDE AJUSTAS A POSIÇÃO DO DISCO ---
                  className="absolute z-20 rounded-full shadow-xl"
                  style={{
                    width: '62%',       // Tamanho do disco
                    top: '41%',         // Posição Vertical (Sobe/Desce)
                    left: '19%',        // Posição Horizontal (Esquerda/Direita)
                    aspectRatio: '1/1'  // Mantém o disco redondo
                  }}
                >
                  <img src={imgDisco} className="w-full h-full object-cover rounded-full" alt="Disco" />
                  
                  {/* Brilho no disco */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent rounded-full pointer-events-none" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- CONTROLOS (FIXOS EM BAIXO) --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ y: 100 }} animate={{ y: 0 }} transition={{ delay: 0.5 }}
            className="absolute bottom-0 w-full bg-white/80 backdrop-blur-md p-6 rounded-t-3xl z-50 flex flex-col items-center gap-4"
          >
            <div className="flex items-center gap-2">
              <div className="h-[1px] w-8 bg-[#D4AF37]"></div>
              <p className="text-[#D4AF37] text-[10px] tracking-[0.2em] uppercase font-bold">Disco de Ouro</p>
              <div className="h-[1px] w-8 bg-[#D4AF37]"></div>
            </div>

            <div className="flex items-center gap-8">
              <button className="text-[#0F172A]/50 hover:text-[#D4AF37]"><Heart size={24}/></button>
              <button 
                onClick={togglePlay}
                className="w-16 h-16 bg-[#0F172A] text-[#D4AF37] flex items-center justify-center rounded-full shadow-xl border-2 border-[#D4AF37]"
              >
                {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1"/>}
              </button>
              <a href={audioUrl} download className="text-[#0F172A]/50 hover:text-[#D4AF37]"><Download size={24}/></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LuxuryExperience;
