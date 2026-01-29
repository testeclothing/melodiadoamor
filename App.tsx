import React, { useState, useRef, useEffect } from 'react';
import { 
  Heart, 
  CheckCircle2, 
  Music, 
  Clock, 
  ShieldCheck, 
  Play,
  Pause,
  Trophy,
  Sparkles,
  Gift,
  X,
  MapPin,
  Stamp
} from 'lucide-react';

import { Button } from './components/Button';
import { Countdown } from './components/Countdown';
import { AudioPlayer } from './components/AudioPlayer';
import { Faq } from './components/Faq';
import { Wizard } from './components/Wizard';
import { SongSample, FaqItem } from './types';

// Imagens e Áudio
import heroBg from './assets/12qwq.jpeg';
import heroAudio from './assets/demo.mp3'; 

// --- CONFIGURAÇÃO DO CONCURSO ---
const VENDAS_ATUAIS = 28; 
const OBJETIVO_VENDAS = 100;
const PERCENTAGEM = Math.min((VENDAS_ATUAIS / OBJETIVO_VENDAS) * 100, 100);

const SAMPLES: SongSample[] = [
  { id: 1, title: "A Nossa Viagem a Paris", genre: "Pop Acústico Romântico", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { id: 2, title: "5 Anos de Amor", genre: "Piano & Voz Emocional", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { id: 3, title: "O Primeiro Beijo no Cais", genre: "Indie Folk Fofinho", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
];

const FAQS: FaqItem[] = [
  { 
    question: "Como funciona o Concurso Paris?", 
    answer: "É automático! As primeiras 100 encomendas ficam habilitadas. A nossa equipa vai ler todas as histórias e a mais emocionante ganha uma viagem a Paris para dois." 
  },
  { 
    question: "Quanto tempo demora a entrega?", 
    answer: "A entrega standard é 72h. Se tiveres pressa, temos a opção 'Urgente 24h' disponível no final da compra." 
  },
  { 
    question: "Posso pedir alterações?", 
    answer: "Sim! A tua satisfação é prioridade. Tens direito a uma revisão gratuita na letra ou melodia." 
  },
  { 
    question: "O que recebo exatamente?", 
    answer: "Recebes a música completa em MP3 (qualidade de estúdio) e o texto da letra personalizada por e-mail." 
  },
];

const REVIEWS = [
  { name: "João Silva", text: "A Maria chorou assim que ouviu os primeiros versos. Foi a melhor prenda que já lhe dei!", stars: 5 },
  { name: "Ana Martins", text: "Incrivelmente rápido e a qualidade parece de rádio. Recomendo muito!", stars: 5 },
  { name: "Pedro Costa", text: "Fiquei com receio que fosse genérico, mas captaram todos os detalhes da nossa história.", stars: 5 },
];

function App() {
  const [view, setView] = useState<'landing' | 'wizard'>('landing');
  const [heroIsPlaying, setHeroIsPlaying] = useState(false);
  
  // ESTADO DO POPUP
  const [showPopup, setShowPopup] = useState(false);
  const heroAudioRef = useRef<HTMLAudioElement>(null);

  // Efeito para mostrar o Popup após 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      // Só mostra se ainda estiver na landing page
      if (view === 'landing') {
        setShowPopup(true);
      }
    }, 5000); // 5000ms = 5 segundos

    return () => clearTimeout(timer);
  }, [view]);

  const toggleHeroAudio = () => {
    if (heroAudioRef.current) {
      if (heroIsPlaying) {
        heroAudioRef.current.pause();
      } else {
        heroAudioRef.current.play();
      }
      setHeroIsPlaying(!heroIsPlaying);
    }
  };

  const scrollToPricing = () => {
    const el = document.getElementById('pricing');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const startWizard = () => {
    if(heroAudioRef.current) {
      heroAudioRef.current.pause();
      setHeroIsPlaying(false);
    }
    setShowPopup(false); // Fecha o popup se iniciar o wizard
    window.scrollTo(0, 0);
    setView('wizard');
  };

  if (view === 'wizard') {
    return <Wizard onBack={() => setView('landing')} />;
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-rose-200 selection:text-rose-900">
      
      <audio ref={heroAudioRef} src={heroAudio} onEnded={() => setHeroIsPlaying(false)} />

      {/* --- POPUP (POSTAL PARIS) --- */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 px-4 animate-fade-in">
          {/* Fundo Escuro com Blur */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setShowPopup(false)}
          ></div>
          
          {/* O Postal */}
          <div className="relative w-full max-w-lg bg-[#fffbf0] rounded-xl shadow-2xl transform rotate-1 transition-all animate-slide-up overflow-hidden border-4 border-white">
            
            {/* Botão Fechar */}
            <button 
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 z-20 bg-black/10 hover:bg-black/20 p-1 rounded-full transition-colors"
            >
              <X size={20} className="text-slate-600" />
            </button>

            {/* Design do Postal */}
            <div className="flex flex-col">
              {/* Imagem de Topo */}
              <div className="h-40 bg-slate-200 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000&auto=format&fit=crop" 
                  alt="Paris Eiffel Tower" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#fffbf0] to-transparent"></div>
                
                {/* Selo */}
                <div className="absolute top-4 right-12 bg-white p-2 shadow-md rotate-12 border-2 border-dotted border-slate-300">
                   <Stamp className="text-rose-400 opacity-80" size={32} />
                </div>
              </div>

              {/* Conteúdo */}
              <div className="px-8 pb-8 pt-2 text-center relative">
                
                <div className="flex justify-center mb-2">
                   <div className="bg-amber-100 text-amber-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-amber-200">
                      Concurso Exclusivo
                   </div>
                </div>

                <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2 leading-tight">
                  Ganha uma Viagem a <span className="text-rose-600 italic">Paris!</span>
                </h2>
                
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  A história de amor mais bonita das primeiras <strong className="text-slate-900">100 encomendas</strong> ganha voo + hotel para duas pessoas.
                </p>

                {/* Barra de Progresso no Popup */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6">
                   <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-rose-500 flex items-center gap-1"><Clock size={12}/> Quase a esgotar</span>
                      <span className="text-slate-700">{VENDAS_ATUAIS}/100 Vendidos</span>
                   </div>
                   <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-rose-500 to-amber-500" 
                        style={{ width: `${PERCENTAGEM}%` }}
                      ></div>
                   </div>
                </div>

                <Button 
                  onClick={startWizard} 
                  pulse 
                  fullWidth
                  className="bg-slate-900 hover:bg-slate-800 text-white shadow-xl py-4"
                >
                  Participar Agora
                </Button>
                
                <p className="text-[10px] text-slate-400 mt-3">
                  Ao clicar, começas a criar a tua música e habilitas-te automaticamente.
                </p>
              </div>
            </div>
            
            {/* Decoração Bordas "Air Mail" */}
            <div className="absolute bottom-0 left-0 w-full h-2 bg-[repeating-linear-gradient(45deg,#ef4444,#ef4444_10px,#fff_10px,#fff_20px,#3b82f6,#3b82f6_30px,#fff_30px,#fff_40px)]"></div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-sm transition-all">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setView('landing')}>
            <div className="bg-gradient-to-br from-rose-500 to-pink-600 p-2 rounded-xl text-white shadow-lg shadow-rose-500/30 group-hover:scale-105 transition-transform">
              <Music size={20} fill="currentColor" />
            </div>
            <span className="font-serif font-bold text-xl tracking-tight text-slate-800 group-hover:text-rose-600 transition-colors">Melodia do Amor</span>
          </div>
          <div className="hidden md:flex">
             <Countdown />
          </div>
          <button 
            onClick={scrollToPricing} 
            className="md:hidden bg-gradient-to-r from-rose-600 to-pink-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-rose-500/30"
          >
            Começar
          </button>
        </div>
        <div className="md:hidden bg-rose-50/50 py-2 flex justify-center border-b border-rose-100 backdrop-blur-sm">
          <Countdown />
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden min-h-screen flex items-center">
        
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gradient-to-b from-rose-100 to-transparent rounded-full blur-3xl -z-10 opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-gradient-to-t from-blue-100 to-transparent rounded-full blur-3xl -z-10 opacity-60"></div>

        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
            
            {/* TEXTO HERO */}
            <div className="flex-1 text-center lg:text-left space-y-8">
              
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-rose-100 shadow-sm text-rose-600 text-sm font-bold animate-fade-in-up">
                <Gift size={16} />
                <span>O presente mais original de 2024</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-serif font-bold leading-[1.1] text-slate-900 tracking-tight">
                A vossa história, <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600">uma música eterna.</span>
              </h1>
              
              <p className="text-xl text-slate-600 leading-relaxed max-w-lg mx-auto lg:mx-0 font-light">
                Transformamos as vossas memórias, datas e piadas internas numa canção profissional. <strong className="text-slate-800">Emociona quem amas.</strong>
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start pt-4">
                <Button 
                    onClick={startWizard} 
                    pulse 
                    className="w-full sm:w-auto px-10 py-5 text-lg rounded-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 shadow-xl shadow-rose-500/30 border-0 transform hover:-translate-y-1 transition-all"
                >
                  Criar a Minha Canção 🎵
                </Button>
                
                {/* Social Proof Pequeno */}
                <div className="flex items-center gap-2 text-xs text-slate-500">
                    <div className="flex -space-x-2">
                       {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-slate-200 border border-white"></div>)}
                    </div>
                    <p>+2500 casais felizes</p>
                </div>
              </div>
            </div>
            
            {/* IMAGEM / PLAYER HERO */}
            <div className="flex-1 w-full max-w-[500px] relative mt-8 lg:mt-0 perspective-1000">
              <div className="relative group">
                <div className={`absolute -right-4 top-1/2 -translate-y-1/2 w-64 h-64 bg-slate-900 rounded-full border-4 border-slate-800 shadow-xl transition-all duration-1000 -z-10 ${heroIsPlaying ? 'translate-x-12 rotate-[360deg]' : 'translate-x-0'}`}>
                    <div className="absolute inset-0 m-auto w-24 h-24 bg-rose-500 rounded-full border-4 border-white"></div>
                </div>

                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white bg-white rotate-2 group-hover:rotate-0 transition-transform duration-500">
                    <img 
                      src={heroBg} 
                      alt="Casal" 
                      className={`w-full aspect-[4/5] object-cover transition-transform duration-[10s] ease-linear ${heroIsPlaying ? 'scale-110' : 'scale-100'}`}
                    />
                    
                    {/* Player Control */}
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-20">
                         <button 
                            onClick={toggleHeroAudio}
                            className="w-full bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-center gap-4 hover:bg-white/20 transition-all group/btn"
                         >
                            <div className="w-12 h-12 bg-white text-rose-600 rounded-full flex items-center justify-center shadow-lg group-hover/btn:scale-110 transition-transform">
                                {heroIsPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                            </div>
                            <div className="text-left text-white flex-1">
                                <p className="font-bold text-sm">Ouvir Exemplo</p>
                                <div className="flex items-center gap-2 text-xs text-white/70">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                    Piano & Voz Emocional
                                </div>
                            </div>
                         </button>
                    </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SAMPLES SECTION */}
      <section className="bg-[#0f172a] text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-600/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"></div>

        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1 w-full">
               <div className="bg-white/5 p-2 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-sm">
                  <AudioPlayer samples={SAMPLES} />
               </div>
            </div>
            
            <div className="flex-1 space-y-8">
              <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight">
                Emoção que se ouve, <br/>
                <span className="text-rose-400">memória que fica.</span>
              </h2>
              
              <div className="grid gap-6">
                {[
                  { icon: Clock, title: "Entrega em 72h", desc: "Recebe no teu email pronta a oferecer." },
                  { icon: Music, title: "Qualidade de Estúdio", desc: "Vozes profissionais, melodia envolvente." },
                  { icon: Trophy, title: "Concurso Paris", desc: "Habilita-te à viagem dos teus sonhos." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="bg-rose-500/10 group-hover:bg-rose-500/20 p-4 rounded-2xl h-fit text-rose-400 border border-rose-500/20 transition-colors">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-1 text-white group-hover:text-rose-300 transition-colors">{item.title}</h4>
                      <p className="text-slate-400 leading-relaxed text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-6">
                <Button onClick={startWizard} className="w-full md:w-auto bg-white text-slate-900 hover:bg-slate-100 font-bold py-4 px-8 rounded-full">
                  Começar a Minha Música
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-24 bg-slate-50 relative">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-rose-900/10 overflow-hidden border border-white flex flex-col md:flex-row transform hover:scale-[1.01] transition-transform duration-500">
            
            <div className="flex-1 p-10 md:p-16 flex flex-col justify-center bg-gradient-to-br from-rose-600 to-pink-700 text-white relative overflow-hidden">
               <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
               <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl"></div>
               
               <div className="relative z-10">
                 <div className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/20">
                    Oferta Especial
                 </div>
                 <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Dia dos Namorados</h2>
                 <p className="text-rose-100 mb-8 text-lg leading-relaxed">
                    O preço vai subir em breve. Aproveita o valor de lançamento e surpreende quem mais amas.
                 </p>
                 <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                   <div className="flex items-center gap-4">
                     <div className="bg-white p-3 rounded-full text-rose-600">
                        <Clock size={24} />
                     </div>
                     <div>
                       <p className="text-xs text-rose-200 uppercase font-bold tracking-wider">Entrega Standard</p>
                       <p className="font-bold text-xl">Em 72 Horas</p>
                     </div>
                   </div>
                 </div>
               </div>
            </div>

            <div className="flex-1 p-10 md:p-16 bg-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 line-through text-xl">€99,00</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">70% OFF</span>
              </div>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-6xl font-bold text-slate-900 tracking-tight">29,99€</span>
                <span className="text-slate-500 font-medium">/ música</span>
              </div>
              
              <ul className="space-y-4 mb-10">
                {[
                  "Música MP3 Completa (3-4 min)",
                  "Letra 100% Personalizada",
                  "Revisão Gratuita Incluída",
                  "Habilita-te à viagem a Paris"
                ].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 text-lg">
                    <div className="bg-rose-100 rounded-full p-1">
                      <CheckCircle2 size={16} className="text-rose-600 shrink-0" />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <Button fullWidth pulse onClick={startWizard} className="py-4 text-lg bg-slate-900 hover:bg-slate-800 shadow-xl">
                Criar Música Agora
              </Button>
              
              <p className="text-center text-xs text-slate-400 mt-6 flex justify-center gap-2 items-center">
                <ShieldCheck size={14} /> Pagamento 100% Seguro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-slate-900">Dúvidas Frequentes</h2>
          </div>
          <Faq items={FAQS} />
        </div>
      </section>

      {/* FOOTER SIMPLE */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="container mx-auto px-4 max-w-6xl text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="bg-rose-600 p-1.5 rounded-lg text-white">
                <Music size={18} fill="currentColor" />
              </div>
              <span className="font-serif font-bold text-lg text-slate-900">Melodia do Amor</span>
            </div>
            <div className="text-xs text-slate-400">
              © {new Date().getFullYear()} Feito com amor em Portugal.
            </div>
        </div>
      </footer>
      
      {/* MOBILE FLOATING CTA */}
      <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden animate-bounce-in-up">
         <Button fullWidth className="shadow-2xl shadow-rose-900/40 border border-white/20 py-4 text-lg bg-gradient-to-r from-rose-600 to-pink-600" onClick={startWizard}>
           Criar Música (29,99€)
         </Button>
      </div>

    </div>
  );
}

export default App;
