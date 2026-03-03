import React, { useState, useRef, useEffect } from 'react';
import { 
  Heart, Star, CheckCircle2, Music, Clock, ShieldCheck, Gift, 
  Play, Pause, Sparkles
} from 'lucide-react';

import { Button } from './components/Button';
import { AudioPlayer } from './components/AudioPlayer';
import { Faq } from './components/Faq';
import { Wizard } from './components/Wizard';
import { ContactPage, TermsPage, PrivacyPage } from './components/LegalPages';
import { SongSample, FaqItem } from './types';

// --- IMPORTAÇÃO DE IMAGENS E ÁUDIO HERO ---
import heroBg from './assets/12qwq.jpeg'; // Podes querer mudar esta imagem para uma de Pai/Filha se tiveres
import heroAudio from './assets/sofia2.mp3'; 

// --- IMPORTAÇÃO DOS SAMPLES (LOCAIS) ---
import sofiaAudio from './assets/sofia2.mp3';     
import ivandroAudio from './assets/ivandro.mp3'; 
import vitorAudio from './assets/vitor.mp3';     

// --- DADOS DOS SAMPLES ---
const SAMPLES: SongSample[] = [
  { id: 1, title: "O Meu Herói", genre: "Pop Acústico", url: vitorAudio },
  { id: 2, title: "O Melhor Pai do Mundo", genre: "Alma & Emoção", url: sofiaAudio },
  { id: 3, title: "Lugar Seguro", genre: "R&B Romântico", url: ivandroAudio },
];

// --- FAQS (FOCADAS NO DIA DO PAI) ---
const FAQS: FaqItem[] = [
  { 
    question: "Como funciona a personalização?", 
    answer: "É muito simples! Clicas em 'Criar Música', contas-nos a história do teu pai (as manias, as piadas, o que mais gostas nele) e nós tratamos do resto." 
  },
  { 
    question: "Quanto tempo demora a entrega?", 
    answer: "A entrega normal é feita em 48h (Grátis). Se tiveres pressa para o Dia do Pai, temos uma opção Super Urgente (12h) no checkout." 
  },
  { 
    question: "Posso pedir alterações?", 
    answer: "Sim! Queremos que fiques 100% satisfeito. Tens direito a uma revisão gratuita na letra ou melodia." 
  },
  { 
    question: "Em que formato recebo a música?", 
    answer: "Recebes um ficheiro MP3 de alta qualidade e a letra completa da canção no teu email e WhatsApp." 
  },
];

const REVIEWS = [
  { name: "Maria Santos", text: "O meu pai chorou baba e ranho quando ouviu a música sobre a oficina dele. Foi a melhor prenda de sempre!", stars: 5 },
  { name: "Tiago Gomes", text: "Nunca sei o que dar ao meu pai, mas isto superou tudo. A reação dele foi impagável.", stars: 5 },
  { name: "Ana Costa", text: "Fiquei com receio que fosse genérico, mas captaram todos os detalhes das piadas secas dele!", stars: 5 },
];

function App() {
  const [view, setView] = useState<'landing' | 'wizard' | 'terms' | 'privacy' | 'contact'>('landing');
  const [heroIsPlaying, setHeroIsPlaying] = useState(false);
  const heroAudioRef = useRef<HTMLAudioElement>(null);

  // --- BARRA DE TOPO (Dia do Pai) ---
  const [textoTopo, setTextoTopo] = useState("");

  useEffect(() => {
    setTextoTopo("✨ O PRESENTE MAIS EMOCIONANTE PARA O DIA DO PAI (19 DE MARÇO) ✨");
  }, []);

  // --- LÓGICA DE RETORNO DO STRIPE ---
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('status') === 'success') {
      setView('wizard');
    }
  }, []);

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

      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-rose-100 shadow-sm h-16">
        <div className="container mx-auto px-4 h-full flex items-center justify-between max-w-7xl">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('landing')}>
            <div className="bg-rose-500 p-1.5 rounded-lg text-white"><Music size={20} fill="currentColor" /></div>
            <span className="font-serif font-bold text-xl tracking-tight text-slate-800">Melodia do Amor</span>
          </div>
          
          {/* BARRA DE ANÚNCIO DESKTOP */}
          <div className="hidden md:flex items-center gap-2 bg-rose-50 px-4 py-1.5 rounded-full border border-rose-100">
            <Sparkles size={14} className="text-rose-600" />
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">{textoTopo}</span>
          </div>

          <button onClick={startWizard} className="bg-rose-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg hover:bg-rose-700 transition-colors">Criar Agora</button>
        </div>
      </header>

      {/* BARRA DE ANÚNCIO MOBILE */}
      <div className="md:hidden mt-16 bg-rose-50 py-2 flex justify-center border-b border-rose-100 px-4 text-center">
        <div className="flex items-center gap-2">
          <Sparkles size={12} className="text-rose-600" />
          <span className="text-[10px] font-bold text-rose-600 uppercase tracking-widest">{textoTopo}</span>
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
                <Heart size={14} fill="currentColor" /><span>PARA O MELHOR PAI</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-serif font-bold leading-[1.1] text-gray-900 tracking-tight">
                A história do teu herói merece uma <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-amber-500">banda sonora única.</span>
              </h1>
              <p className="text-base lg:text-lg text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Este Dia do Pai, oferece mais do que meias ou perfumes. Oferece uma música personalizada com as histórias e memórias dele.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-2">
                <Button onClick={startWizard} pulse className="w-full sm:w-auto px-8 py-4 text-lg shadow-xl shadow-rose-500/20 bg-rose-600 hover:bg-rose-700 text-white shadow-xl">
                  Criar Música do Pai
                </Button>
                <div className="flex items-center gap-3 text-sm text-gray-500 font-medium bg-white/50 px-3 py-2 rounded-xl border border-white/50 backdrop-blur-sm">
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (<img key={i} src={`https://picsum.photos/40/40?random=${i}`} className="w-9 h-9 rounded-full border-2 border-white shadow-sm" alt="User" />))}
                  </div>
                  <div className="flex flex-col leading-none text-left"><span className="font-bold text-gray-900">+550 pais</span><span className="text-xs">surpreendidos</span></div>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full max-w-[450px] lg:max-w-[550px] relative">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-700 border-[6px] border-white group">
                <img src={heroBg} alt="Pai feliz" className="w-full h-auto object-cover aspect-[4/5] lg:aspect-[3/4] transition-transform duration-[20s] ease-linear group-hover:scale-110"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <button onClick={toggleHeroAudio} className="w-full bg-white/95 backdrop-blur-xl rounded-2xl p-3 flex items-center gap-4 shadow-xl border border-white/40 hover:bg-white transition-all cursor-pointer group/player text-left">
                    <div className={`relative w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 ${heroIsPlaying ? 'bg-rose-500 scale-105' : 'bg-rose-600 group-hover/player:scale-110'}`}>
                      {heroIsPlaying ? (<Pause size={18} fill="currentColor" />) : (<Play size={18} fill="currentColor" className="ml-0.5" />)}
                      {heroIsPlaying && (<span className="absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75 animate-ping"></span>)}
                    </div>
                    <div className="flex-1 min-w-0">
                         <p className="font-bold text-sm text-gray-900 truncate">Exemplo: O Melhor Pai</p>
                         <p className="text-[10px] text-gray-500 font-mono">{heroIsPlaying ? 'A Tocar...' : 'Ouvir Exemplo'}</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="bg-gray-50 py-12 border-y border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-8">AVALIADO COM 4.9/5 ESTRELAS POR FAMÍLIAS EM PORTUGAL</p>
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

      {/* COMO FUNCIONA */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-6xl text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Como criamos a magia?</h2>
            <p className="text-gray-600 text-lg mb-16 max-w-xl mx-auto leading-relaxed">Tu contas a história dele, nós transformamos em melodia. O processo é simples e rápido.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-100 -z-10"></div>
                <div className="bg-white p-8 rounded-[2rem] text-center border border-gray-100 shadow-lg relative group hover:-translate-y-1 transition-all duration-300">
                    <div className="w-20 h-20 mx-auto bg-rose-50 rounded-full flex items-center justify-center text-rose-600 mb-6 border-4 border-white shadow-sm group-hover:scale-110 transition-transform"><Heart size={32} /></div>
                    <h3 className="text-xl font-bold mb-3">1. Partilha a História</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Preenche um formulário simples com o nome dele, as manias engraçadas e o estilo musical que ele gosta.</p>
                </div>
                <div className="bg-white p-8 rounded-[2rem] text-center border border-gray-100 shadow-lg relative group hover:-translate-y-1 transition-all duration-300">
                    <div className="w-20 h-20 mx-auto bg-rose-50 rounded-full flex items-center justify-center text-rose-600 mb-6 border-4 border-white shadow-sm group-hover:scale-110 transition-transform"><Music size={32} /></div>
                    <h3 className="text-xl font-bold mb-3">2. Produção Profissional</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Compomos uma letra emocionante e aliamos tecnologia avançada para criar uma melodia única.</p>
                </div>
                <div className="bg-white p-8 rounded-[2rem] text-center border border-gray-100 shadow-lg relative group hover:-translate-y-1 transition-all duration-300">
                    <div className="w-20 h-20 mx-auto bg-rose-50 rounded-full flex items-center justify-center text-rose-600 mb-6 border-4 border-white shadow-sm group-hover:scale-110 transition-transform"><Gift size={32} /></div>
                    <h3 className="text-xl font-bold mb-3">3. Recebe em 48h</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Recebe o ficheiro MP3 e a letra no teu e-mail em até 48h (ou 12h se escolheres a opção urgente). Pronta a oferecer!</p>
                </div>
            </div>
        </div>
      </section>

      {/* AUDIO SAMPLES */}
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
                  { icon: Clock, title: "Entrega em 48 Horas", desc: "Recebe a tua música pronta e masterizada no teu email." },
                  { icon: Music, title: "Qualidade de Estúdio", desc: "Produção profissional com vozes claras e instrumentos envolventes." },
                  { icon: CheckCircle2, title: "100% Personalizado", desc: "A letra fala sobre ELE. O nome, as piadas, a oficina, o clube." },
                  { icon: ShieldCheck, title: "Satisfação Garantida", desc: "Se não adorares a primeira versão, revemos a letra contigo." }
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

      {/* PRICING SECTION */}
      <section id="pricing" className="py-24 bg-gradient-to-b from-white to-rose-50/50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-rose-100 flex flex-col md:flex-row transform hover:scale-[1.01] transition-all duration-500">
            
            {/* LADO ESQUERDO */}
            <div className="flex-1 p-8 md:p-16 flex flex-col justify-center bg-rose-600 text-white relative overflow-hidden text-center md:text-left">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-rose-500 to-rose-700"></div>
               <div className="relative z-10">
                 <h3 className="text-lg font-bold mb-2 text-rose-100 uppercase tracking-widest opacity-90">Prenda Inesquecível</h3>
                 <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 italic">Dia do Pai</h2>
                 <p className="text-rose-50 mb-8 text-base lg:text-lg leading-relaxed">
                   Surpreende no Dia do Pai. O presente perfeito para marcar uma data inesquecível.
                 </p>
                 <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/20 inline-block md:block mx-auto md:mx-0">
                   <div className="flex items-center gap-4">
                     <div className="bg-white/20 p-2 rounded-full hidden sm:block animate-pulse"><Sparkles className="text-white" size={20} /></div>
                     <div>
                       <p className="text-[10px] md:text-xs text-rose-100 uppercase font-bold tracking-wider">OFERTA ATUAL:</p>
                       <p className="font-bold text-sm md:text-xl uppercase tracking-tight">19,99€ (48H)</p>
                     </div>
                   </div>
                 </div>
               </div>
            </div>

            {/* LADO DIREITO (PREÇO) */}
            <div className="flex-1 p-8 md:p-16">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 line-through text-xl">59,99€</span>
                <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border border-green-100">60% DESCONTO</span>
              </div>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-6xl font-bold text-rose-600 tracking-tight">19,99€</span>
                <span className="text-gray-500 font-medium">/ música</span>
              </div>
              <ul className="space-y-3 mb-10 text-gray-700">
                {["Música MP3 Completa (3-4 min)", "Letra 100% Personalizada", "Revisão Gratuita", "Entrega em 48h (Opção 12h no checkout)", "Suporte Dedicado"].map((feat, i) => (
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
      
      {/* STICKY MOBILE CTA - 19.99€ */}
      <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden">
         <Button fullWidth className="shadow-2xl border border-white/20 py-4 text-lg bg-rose-600 hover:bg-rose-700 text-white" onClick={startWizard}>Criar Música (19,99€)</Button>
      </div>

    </div>
  );
}

export default App;
