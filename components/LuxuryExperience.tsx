import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Heart, Download, Music } from 'lucide-react';

// --- IMPORTAÇÃO DAS IMAGENS LOCAIS ---
// Certifica-te que os ficheiros estão na pasta src/assets/ com estes nomes exatos
import imgCaixaFechada from '../assets/caixa.jpg';
import imgCaixaAberta from '../assets/caixaaberta.jpg';
import imgDisco from '../assets/disco.jpg';

const LuxuryExperience = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // --- DADOS DINÂMICOS DA URL ---
  const params = new URLSearchParams(window.location.search);
  const nomePai = params.get('nome') || "Meu Herói";
  const audioUrl = params.get('musica') || ""; // Link do MP3 do Suno

  const handleOpen = () => {
    setIsOpen(true);
    // Inicia a música suavemente após a animação de abertura
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.volume = 0.5;
        audioRef.current.play().catch(e => console.log("Autoplay prevent:", e));
        setIsPlaying(true);
        // Fade in volume
        let vol = 0.5;
        const interval = setInterval(() => {
          if (vol < 1.0) {
            vol += 0.1;
            if(audioRef.current) audioRef.current.volume = Math.min(vol, 1);
          } else clearInterval(interval);
        }, 200);
      }
    }, 1200);
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F6F1] flex flex-col items-center justify-center relative overflow-hidden font-sans">
      
      {/* --- BACKGROUND PARTICLES (Efeito de Luxo) --- */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -10, opacity: 0 }}
            animate={{ 
              y: ['0vh', '100vh'], 
              opacity: [0, 0.5, 0],
              x: Math.random() * 50 - 25
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity, 
              delay: Math.random() * 5 
            }}
            className="absolute w-1 h-1 bg-[#D4AF37] rounded-full blur-[1px]"
            style={{ left: `${Math.random() * 100}%` }}
          />
        ))}
      </div>

      <audio ref={audioRef} src={audioUrl} loop />

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <div className="z-10 w-full max-w-md px-6 flex flex-col items-center">
        
        {/* TÍTULO (SÓ APARECE NO INÍCIO) */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center mb-8"
            >
              <p className="text-[#D4AF37] text-[10px] font-bold tracking-[0.3em] uppercase mb-2">Edição Especial</p>
              <h1 className="text-3xl font-serif italic text-[#0F172A]">Para o {nomePai}</h1>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- A CAIXA MÁGICA --- */}
        <div className="relative w-full aspect-[9/16] max-h-[550px]">
          
          {/* ESTADO 1: CAIXA FECHADA */}
          {!isOpen && (
            <motion.div
              onClick={handleOpen}
              initial={{ scale: 0.95 }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center cursor-pointer z-50"
            >
              <img 
                src={imgCaixaFechada} 
                className="w-full h-auto drop-shadow-2xl rounded-sm object-contain max-h-full" 
                alt="Abrir Presente" 
              />
              <div className="absolute bottom-[10%] text-[#D4AF37] text-xs tracking-widest animate-pulse font-bold bg-white/80 px-4 py-2 rounded-full backdrop-blur-sm">
                TOQUE PARA ABRIR
              </div>
            </motion.div>
          )}

          {/* ESTADO 2: CAIXA ABERTA + DISCO */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {/* 1. FUNDO DA CAIXA ABERTA */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <img src={imgCaixaAberta} className="w-full h-auto drop-shadow-2xl relative z-10 object-contain" alt="Caixa Aberta" />
                  
                  {/* 2. O DISCO (GIRA DENTRO DA CAIXA) */}
                  {/* AJUSTES DE POSIÇÃO: Mexe no 'top' para alinhar com o buraco da tua imagem */}
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0, rotate: 0 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1,
                      rotate: isPlaying ? 360 : 0 
                    }}
                    transition={{ 
                      scale: { type: "spring", stiffness: 60, delay: 0.2 },
                      opacity: { duration: 0.5 },
                      rotate: { duration: 8, repeat: Infinity, ease: "linear" }
                    }}
                    className="absolute z-20 left-0 right-0 mx-auto"
                    style={{ 
                      top: '42%',  // <--- SOBE OU DESCE O DISCO AQUI
                      width: '68%' // <--- AUMENTA OU DIMINUI O TAMANHO DO DISCO AQUI
                    }}
                  >
                    <img src={imgDisco} className="w-full h-full" alt="Disco" />
                    
                    {/* Brilho no disco */}
                    {isPlaying && (
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent rounded-full animate-pulse pointer-events-none" />
                    )}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* --- CONTROLOS (SÓ APARECEM NO FIM) --- */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="fixed bottom-8 flex flex-col items-center gap-6 w-full px-8 z-50"
            >
              <div className="text-center bg-[#F9F6F1]/80 p-2 rounded-xl backdrop-blur-md">
                <h2 className="text-2xl font-serif text-[#0F172A]">{nomePai}</h2>
                <p className="text-[#D4AF37] text-[10px] tracking-[0.2em] uppercase mt-1 font-bold">Disco de Ouro Oficial</p>
              </div>

              <div className="flex items-center gap-6">
                <button className="p-3 rounded-full border border-[#D4AF37]/50 text-[#D4AF37] bg-white shadow-lg hover:scale-110 transition-transform">
                  <Heart size={20} />
                </button>

                <button 
                  onClick={togglePlay}
                  className="w-16 h-16 rounded-full bg-[#0F172A] text-[#D4AF37] flex items-center justify-center shadow-2xl shadow-[#D4AF37]/30 hover:scale-105 transition-transform border-2 border-[#D4AF37]"
                >
                  {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1"/>}
                </button>

                <a href={audioUrl} download className="p-3 rounded-full border border-[#D4AF37]/50 text-[#D4AF37] bg-white shadow-lg hover:scale-110 transition-transform">
                  <Download size={20} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default LuxuryExperience;
