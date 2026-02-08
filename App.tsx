import React, { useState, useRef, useEffect } from 'react';
import { 
  Heart, Star, CheckCircle2, Music, Clock, ShieldCheck, Gift, 
  Play, Pause, X, Stamp, Trophy
} from 'lucide-react';

import { Button } from './components/Button';
import { AudioPlayer } from './components/AudioPlayer';
import { Faq } from './components/Faq';
import { Wizard } from './components/Wizard';
import { ContactPage, TermsPage, PrivacyPage } from './components/LegalPages';
import { SongSample, FaqItem } from './types';

// --- IMPORTAÇÃO DE IMAGENS E ÁUDIO HERO ---
import heroBg from './assets/12qwq.jpeg';
import heroAudio from './assets/sofia2.mp3'; 

// --- IMPORTAÇÃO DOS SAMPLES (LOCAIS) ---
import sofiaAudio from './assets/sofia2.mp3';     
import ivandroAudio from './assets/ivandro.mp3'; 
import vitorAudio from './assets/vitor.mp3';     

// --- CONFIGURAÇÃO DO CONCURSO PARIS ---
const VENDAS_ATUAIS = 87; 
const OBJETIVO_VENDAS = 100;
const PERCENTAGEM = Math.min((VENDAS_ATUAIS / OBJETIVO_VENDAS) * 100, 100);

// --- DADOS DOS SAMPLES ATUALIZADOS ---
const SAMPLES: SongSample[] = [
  { id: 1, title: "Margarida", genre: "Pop Acústico", url: vitorAudio },
  { id: 2, title: "Sabia quem eras", genre: "Alma & Emoção", url: sofiaAudio },
  { id: 3, title: "Lugar Seguro", genre: "R&B Romântico", url: ivandroAudio },
];

const FAQS: FaqItem[] = [
  { 
    question: "Como funciona a personalização?", 
    answer: "É muito simples! Clicas em 'Criar Música', respondes a algumas perguntas sobre a vossa história e nós tratamos do resto." 
  },
  { 
    question: "Quanto tempo demora a entrega?", 
    answer: "A entrega standard é feita em 72h. Se precisares com urgência, podes selecionar a opção 'Entrega em 24h' no final do pedido." 
  },
  { 
    question: "Posso pedir alterações?", 
    answer: "Sim! Queremos que fiques 100% satisfeito. Tens direito a uma revisão gratuita na letra ou melodia." 
  },
  { 
    question: "Em que formato recebo a música?", 
    answer: "Recebes um ficheiro MP3 de alta qualidade e a letra completa da canção." 
  },
];

const REVIEWS = [
  { name: "João Silva", text: "A Maria chorou assim que ouviu os primeiros versos. Foi a melhor prenda que já lhe dei!", stars: 5 },
  { name: "Ana Martins", text: "Incrivelmente rápido e a qualidade parece de rádio. Recomendo muito!", stars: 5 },
  { name: "Pedro Costa", text: "Fiquei com receio que fosse genérico, mas captaram todos os detalhes da nossa história.", stars: 5 },
];

function App() {
  const [view, setView] = useState<'landing' | 'wizard' | 'terms' | 'privacy' | 'contact'>('landing');
  const [showPopup, setShowPopup] = useState(false);
  const [heroIsPlaying, setHeroIsPlaying] = useState(false);
  const heroAudioRef = useRef<HTMLAudioElement>(null);

  // --- LÓGICA DINÂMICA: TEMPO PARA O DIA DOS NAMORADOS ---
  const [tempoValentine, setTempoValentine] = useState("");
  const [diasFaltam, setDiasFaltam] = useState(0);

  useEffect(() => {
    const calcular = () => {
      const agora = new Date();
      const alvo = new Date('2026-02-14T00:00:00');
      const diff = alvo.getTime() - agora.getTime();
      
      const d = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
      setDiasFaltam(d);

      if (diff <= 0) {
        setTempoValentine("É hoje o Dia dos Namorados!");
        return;
      }

      const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      setTempoValentine(`Faltam ${dias} dias e ${horas}h para o Dia dos Namorados`);
    };
    calcular();
    const timer = setInterval(calcular, 60000);
    return () => clearInterval(timer);
  }, []);

  // --- LÓGICA DE RETORNO DO STRIPE ---
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('status') === 'success') {
      setView('wizard');
      setShowPopup(false);
    }
  }, []);

  // --- LÓGICA DO POPUP ---
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (view === 'landing' && urlParams.get('status') !== 'success') {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 5000); 
      return () => clearTimeout(timer);
    }
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

  const startWizard = () => {
    if(heroAudioRef.current) {
      heroAudioRef.current.pause();
      setHeroIsPlaying(false);
    }
    setShowPopup(false);
    window.scrollTo(0, 0);
    setView('wizard');
  };

  const scrollToPricing = () => {
    const el = document.getElementById('pricing');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  // --- ROTEAMENTO ---
  if (view === 'wizard') return <Wizard onBack={() => setView('landing')} />;
  if (view === 'contact') return <ContactPage onBack={() => setView('landing')} />;
  if (view === 'terms') return <TermsPage onBack={() => setView('landing')} />;
  if (view === 'privacy') return <PrivacyPage onBack={() => setView('landing')} />;

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-rose-100 selection:text-rose-900">
      
      <audio ref={heroAudioRef} src={heroAudio} onEnded={() => setHeroIsPlaying(false)} />

      {/* --- POPUP DE PARIS --- */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setShowPopup(false)}></div>
          <div className="relative w-full max-w-lg bg-[#fffbf0] rounded-xl shadow-2xl transform rotate-1 transition-all animate-slide-up overflow-hidden border-4 border-white">
            <button onClick={() => setShowPopup(false)} className="absolute top-2 right-2 z-20 bg-black/10 hover:bg-black/20 p-1 rounded-full transition-colors"><X size={20} className="text-slate-600" /></button>
            <div className="flex flex-col">
              <div className="h-40 bg-slate-200 relative overflow-hidden">
                <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000&auto=format&fit=crop" alt="Paris" className="w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-t from-[#fffbf0] to-transparent"></div>
                <div className="absolute top-4 right-12 bg-white p-2 shadow-md rotate-12 border-2 border-dotted border-slate-300"><Stamp className="text-rose-400 opacity-80" size={32} /></div>
              </div>
              <div className="px-8 pb-8 pt-2 text-center relative">
                <div className="flex justify-center mb-2">
                   <div className="bg-amber-100 text-amber-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-amber-200">Concurso Exclusivo</div>
                </div>
                <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2 leading-tight">Ganha uma Viagem a <span className="text-rose-600 italic">Paris!</span></h2>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">A história de amor mais bonita das primeiras <strong className="text-slate-900">100 encomendas</strong> ganha voo + hotel para duas pessoas.</p>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6">
                   <div className="flex justify-between text-xs font-bold mb-2"><span className="text-rose-500 flex items-center gap-1"><Clock size={12}/> Quase a esgotar</span><span className="text-slate-700">{VENDAS_ATUAIS}/100 Vendidos</span></div>
                   <div className="h-3 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-rose-500 to-amber-500" style={{ width: `${PERCENTAGEM}%` }}></div></div>
                </div>
                <Button onClick={startWizard} pulse fullWidth className="bg-slate-900 hover:bg-slate-800 text-white shadow-xl py-4">Participar Agora</Button>
                <p className="text-[10px] text-slate-400 mt-3">Ao clicar, começas a criar a tua música e habilitas-te automaticamente.</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-[repeating-linear-gradient(45deg,#ef4444,#ef4444_10px,#fff_10px,#fff_20px,#3b82f6,#3b82f6_30px,#fff_30px,#fff_40px)]"></div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-rose-100 shadow-sm h-16">
        <div className="container mx-auto px-4 h-full flex items-center justify-between max-w-7xl">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('landing')}>
            <div className="bg-rose-500 p-1.5 rounded-lg text-white"><Music size={20} fill="currentColor" /></div>
            <span className="font-serif font-bold text-xl tracking-tight text-slate-800">Melodia do Amor</span>
          </div>
          
          {/* BARRA DE ANÚNCIO DESKTOP */}
          <div className="hidden md:flex items-center gap-2 bg-rose-50 px-4 py-1.5 rounded-full border border-rose-100">
            <Clock size={14} className="text-rose-600" />
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">{tempoValentine}</span>
          </div>

          <button onClick={startWizard} className="bg-rose-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg hover:bg-rose-700 transition-colors">Criar Agora</button>
        </div>
      </header>

      {/* BARRA DE ANÚNCIO MOBILE */}
      <div className="md:hidden mt-16 bg-rose-50 py-2 flex justify-center border-b border-rose-100 px-4 text-center">
        <div className="flex items-center gap-2">
          <Clock size={12} className="text-rose-600" />
          <span className="text-[10px] font-bold text-rose-600 uppercase tracking-widest">{tempoValentine}</span>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] lg:min-h-screen flex items-center pt-8 pb-12 lg:pt-24 lg:pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[30rem] h-[30rem] bg-rose-100/50 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[20rem] h-[20rem] bg-blue-100/50 rounded-full blur-3xl -z-10"></div>
        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-20">
            <div className="flex-1 text-center lg:text-left space-y-4 lg:space-y-8 max-w-xl">
              <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 px-4 py-1.5 rounded-full text-sm font-bold border border-rose-100 uppercase tracking-wide shadow-sm hover:scale-105 transition-transform">
                <Heart size={14} fill="currentColor" /><span>OFERTA DIA DOS NAMORADOS</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-serif font-bold leading-[1.1] text-gray-900 tracking-tight">
                A vossa história merece uma <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-amber-500">banda sonora única.</span>
              </h1>
              <p className="text-base lg:text-lg text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Surpreende a tua cara-metade com uma música personalizada feita à medida. Tu dás-nos as memórias, nós criamos a emoção.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-2">
                <Button onClick={startWizard} pulse className="w-full sm:w-auto px-8 py-4 text-lg shadow-xl shadow-rose-500/20 bg-rose-600 hover:bg-rose-700 text-white shadow-xl">
                  Criar a Minha Canção
                </Button>
                <div className="flex items-center gap-3 text-sm text-gray-500 font-medium bg-white/50 px-3 py-2 rounded-xl border border-white/50 backdrop-blur-sm">
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (<img key={i} src={`https://picsum.photos/40/40?random=${i}`} className="w-9 h-9 rounded-full border-2 border-white shadow-sm" alt="User" />))}
                  </div>
                  <div className="flex flex-col leading-none text-left"><span className="font-bold text-gray-900">+550 casais</span><span className="text-xs">felizes</span></div>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full max-w-[450px] lg:max-w-[550px] relative">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-700 border-[6px] border-white group">
                <img src={heroBg} alt="Casal feliz" className="w-full h-auto object-cover aspect-[4/5] lg:aspect-[3/4] transition-transform duration-[20s] ease-linear group-hover:scale-110"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <button onClick={toggleHeroAudio} className="w-full bg-white/95 backdrop-blur-xl rounded-2xl p-3 flex items-center gap-4 shadow-xl border border-white/40 hover:bg-white transition-all cursor-pointer group/player text-left">
                    <div className={`relative w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 ${heroIsPlaying ? 'bg-rose-500 scale-105' : 'bg-rose-600 group-hover/player:scale-110'}`}>
                      {heroIsPlaying ? (<Pause size={18} fill="currentColor" />) : (<Play size={18} fill="currentColor" className="ml-0.5" />)}
                      {heroIsPlaying && (<span className="absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75 animate-ping"></span>)}
                    </div>
                    <div className="flex-1 min-w-0">
                         <p className="font-bold text-sm text-gray-900 truncate">Exemplo: A Nossa História</p>
                         <p className="text-[10px] text-gray-500 font-mono">{heroIsPlaying ? 'A Tocar...' : 'Ouvir Exemplo'}</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF (IMAGEM 29) */}
      <section className="bg-gray-50 py-12 border-y border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-8">AVALIADO COM 4.9/5 ESTRELAS POR CASAIS EM PORTUGAL</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((review, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-left">
                <div className="flex gap-1 text-yellow-400 mb-3">{[...Array(review.stars)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}</div>
                <p className="text-gray-700 italic mb-4 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center text-rose-700 font-bold text-sm">{review.name.charAt(0)}</div>
                  <span className="font-bold text-sm text-gray-900">{review.name}</span>
                  <CheckCircle2 size={16} className="text-blue-500 ml-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA (IMAGEM 30) */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-6xl text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Como criamos a magia?</h2>
            <p className="text-gray-600 text-lg mb-16 max-w-xl mx-auto leading-relaxed">Tu contas a história, nós transformamos em melodia. O processo é simples e rápido.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-100 -z-10"></div>
                <div className="bg-white p-8 rounded-[2rem] text-center border border-gray-100 shadow-lg relative group hover:-translate-y-1 transition-all duration-300">
                    <div className="w-20 h-20 mx-auto bg-rose-50 rounded-full flex items-center justify-center text-rose-600 mb-6 border-4 border-white shadow-sm group-hover:scale-110 transition-transform"><Heart size={32} /></div>
                    <h3 className="text-xl font-bold mb-3">1. Partilha a História</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Preenche um formulário simples com os vossos nomes, memórias e o estilo musical que mais gostam.</p>
                </div>
                <div className="bg-white p-8 rounded-[2rem] text-center border border-gray-100 shadow-lg relative group hover:-translate-y-1 transition-all duration-300">
                    <div className="w-20 h-20 mx-auto bg-rose-50 rounded-full flex items-center justify-center text-rose-600 mb-6 border-4 border-white shadow-sm group-hover:scale-110 transition-transform"><Music size={32} /></div>
                    <h3 className="text-xl font-bold mb-3">2. Produção Profissional</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Compomos uma letra emocionante e aliamos tecnologia avançada para criar uma melodia única.</p>
                </div>
                <div className="bg-white p-8 rounded-[2rem] text-center border border-gray-100 shadow-lg relative group hover:-translate-y-1 transition-all duration-300">
                    <div className="w-20 h-20 mx-auto bg-rose-50 rounded-full flex items-center justify-center text-rose-600 mb-6 border-4 border-white shadow-sm group-hover:scale-110 transition-transform"><Gift size={32} /></div>
                    <h3 className="text-xl font-bold mb-3">3. Recebe em 72h</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Recebe o ficheiro MP3 e a letra no teu e-mail. Pronta a oferecer e a emocionar!</p>
                </div>
            </div>
        </div>
      </section>

      {/* AUDIO SAMPLES (IMAGEM 31) */}
      <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1 w-full">
              <div className="bg-white rounded-[2.5rem] p-8 md:p-12 text-slate-900 shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                <AudioPlayer samples={SAMPLES} />
              </div>
            </div>
            <div className="flex-1 space-y-8 text-left">
              <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight">Mais do que uma música, <span className="text-rose-400">uma memória eterna.</span></h2>
              <ul className="space-y-6">
                {[
                  { icon: Clock, title: "Entrega em 72 Horas", desc: "Recebe a tua música pronta e masterizada no teu email em 3 dias." },
                  { icon: Music, title: "Qualidade de Estúdio", desc: "Produção profissional com vozes claras e instrumentos envolventes." },
                  { icon: CheckCircle2, title: "100% Personalizado", desc: "A letra fala sobre VÓS. Os vossos nomes, o vosso lugar especial, a vossa data." },
                  { icon: Trophy, title: "Habilita-te a Paris", desc: "A tua história entra automaticamente no concurso para a viagem de sonho." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-5 group">
                    <div className="bg-rose-600/20 p-3 rounded-xl h-fit text-rose-400 border border-rose-500/20 group-hover:scale-110 transition-transform"><item.icon size={24} /></div>
                    <div><h4 className="font-bold text-xl mb-1 text-white">{item.title}</h4><p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p></div>
                  </li>
                ))}
              </ul>
              <div className="pt-6"><Button onClick={startWizard} variant="primary" className="shadow-rose-500/50 py-4 px-8 text-lg bg-rose-600 hover:bg-rose-700 shadow-xl transition-all">Começar a Minha Música</Button></div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION - Otimizada Hierarquia */}
      <section id="pricing" className="py-24 bg-gradient-to-b from-white to-rose-50/50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-rose-100 flex flex-col md:flex-row transform hover:scale-[1.01] transition-all duration-500">
            
            {/* LADO ESQUERDO (VERMELHO) */}
            <div className="flex-1 p-8 md:p-16 flex flex-col justify-center bg-rose-600 text-white relative overflow-hidden text-center md:text-left">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-rose-500 to-rose-700"></div>
               <div className="relative z-10">
                 <h3 className="text-lg font-bold mb-2 text-rose-100 uppercase tracking-widest opacity-90">Oferta Limitada</h3>
                 <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 italic">Dia dos Namorados</h2>
                 <p className="text-rose-50 mb-8 text-base lg:text-lg leading-relaxed">
                   Faltam apenas <span className="font-bold text-white underline">{diasFaltam} dias</span> para o Dia dos Namorados. Aproveita agora o preço promocional de lançamento!
                 </p>
                 <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/20 inline-block md:block mx-auto md:mx-0">
                   <div className="flex items-center gap-4">
                     <div className="bg-white/20 p-2 rounded-full hidden sm:block animate-pulse"><Clock className="text-white" size={20} /></div>
                     <div>
                       <p className="text-[10px] md:text-xs text-rose-100 uppercase font-bold tracking-wider">APROVEITA JÁ:</p>
                       <p className="font-bold text-sm md:text-xl uppercase tracking-tight">{tempoValentine}</p>
                     </div>
                   </div>
                 </div>
               </div>
            </div>

            {/* LADO DIREITO (PREÇO - 60% DESCONTO) */}
            <div className="flex-1 p-8 md:p-16">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 line-through text-xl">59,99€</span>
                <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border border-green-100">60% DESCONTO</span>
              </div>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-6xl font-bold text-rose-600 tracking-tight">24,99€</span>
                <span className="text-gray-500 font-medium">/ música</span>
              </div>
              <ul className="space-y-3 mb-10 text-gray-700">
                {["Música MP3 Completa (3-4 min)", "Letra 100% Personalizada", "Revisão Gratuita", "Entrega Standard (72h)", "Participação Concurso Paris"].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-base">
                    <div className="bg-rose-50 rounded-full p-1"><CheckCircle2 size={16} className="text-rose-600 shrink-0" /></div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <Button fullWidth pulse onClick={startWizard} className="py-4 text-lg bg-rose-600 hover:bg-rose-700 shadow-xl shadow-rose-500/20 transition-all">Criar Música Agora</Button>
              <p className="text-center text-[10px] text-gray-400 mt-6 uppercase font-bold tracking-widest">Pagamento 100% Seguro via Stripe. Satisfação Garantida.</p>
              <div className="mt-8 flex justify-center gap-3 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                 <div className="h-8 bg-gray-100 px-3 rounded flex items-center font-bold text-[10px] text-gray-600 border border-gray-200">MB WAY</div>
                 <div className="h-8 bg-gray-100 px-3 rounded flex items-center font-bold text-[10px] text-gray-600 border border-gray-200">MULTIBANCO</div>
                 <div className="h-8 bg-gray-100 px-3 rounded flex items-center font-bold text-[10px] text-gray-600 border border-gray-200">VISA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16"><h2 className="text-3xl font-serif font-bold text-gray-900">Perguntas Frequentes</h2></div>
          <Faq items={FAQS} />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-50 border-t border-gray-200 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="bg-rose-600 p-2 rounded-xl text-white shadow-lg shadow-rose-500/20"><Music size={20} fill="currentColor" /></div>
              <span className="font-serif font-bold text-xl text-gray-900">Melodia do Amor</span>
            </div>
            <div className="text-sm text-gray-500 flex gap-8 font-medium cursor-pointer">
              <span onClick={() => { window.scrollTo(0,0); setView('terms'); }} className="hover:text-rose-600 transition-colors">Termos</span>
              <span onClick={() => { window.scrollTo(0,0); setView('privacy'); }} className="hover:text-rose-600 transition-colors">Privacidade</span>
              <span onClick={() => { window.scrollTo(0,0); setView('contact'); }} className="hover:text-rose-600 transition-colors">Contactos</span>
            </div>
            <div className="text-xs text-gray-400">© {new Date().getFullYear()} Melodia do Amor Portugal.</div>
          </div>
        </div>
      </footer>
      
      {/* STICKY MOBILE CTA */}
      <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden">
         <Button fullWidth className="shadow-2xl border border-white/20 py-4 text-lg bg-rose-600 hover:bg-rose-700 text-white" onClick={startWizard}>Criar Música (24,99€)</Button>
      </div>

    </div>
  );
}

export default App;
