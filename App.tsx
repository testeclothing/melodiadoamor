import React, { useState, useRef } from 'react';
import { 
  Heart, 
  Star, 
  CheckCircle2, 
  Music, 
  Clock, 
  ShieldCheck, 
  Play,
  Pause,
  Plane, // Ícone de Avião Adicionado
  Trophy // Ícone de Troféu
} from 'lucide-react';

import { Button } from './components/Button';
import { Countdown } from './components/Countdown';
import { AudioPlayer } from './components/AudioPlayer';
import { Faq } from './components/Faq';
import { Wizard } from './components/Wizard';
import { SongSample, FaqItem } from './types';

// IMPORTAÇÃO DA IMAGEM E DO ÁUDIO
import heroBg from './assets/12qwq.jpeg';
import heroAudio from './assets/demo.mp3'; 

// --- CONFIGURAÇÃO DA CAMPANHA PARIS ---
// Altera este número manualmente conforme fores vendendo!
const VENDAS_ATUAIS = 27; 
const OBJETIVO_VENDAS = 100;
const PERCENTAGEM = Math.min((VENDAS_ATUAIS / OBJETIVO_VENDAS) * 100, 100);

// Dados de Exemplo
const SAMPLES: SongSample[] = [
  { id: 1, title: "A Nossa Viagem a Paris", genre: "Pop Acústico Romântico", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { id: 2, title: "5 Anos de Amor", genre: "Piano & Voz Emocional", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { id: 3, title: "O Primeiro Beijo no Cais", genre: "Indie Folk Fofinho", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
];

const FAQS: FaqItem[] = [
  { 
    question: "Como funciona o Concurso Paris?", 
    answer: "As primeiras 100 encomendas ficam habilitadas. A nossa equipa vai ler todas as histórias e a mais emocionante/original ganha uma viagem a Paris para dois." 
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
  const [view, setView] = useState<'landing' | 'wizard'>('landing');
  
  // ESTADOS PARA O PLAYER DO HERO
  const [heroIsPlaying, setHeroIsPlaying] = useState(false);
  const heroAudioRef = useRef<HTMLAudioElement>(null);

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
    window.scrollTo(0, 0);
    setView('wizard');
  };

  if (view === 'wizard') {
    return <Wizard onBack={() => setView('landing')} />;
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-rose-100 selection:text-rose-900">
      
      <audio 
        ref={heroAudioRef} 
        src={heroAudio} 
        onEnded={() => setHeroIsPlaying(false)} 
      />

      {/* HEADER / TOP BAR */}
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm h-16 transition-all">
        <div className="container mx-auto px-4 h-full flex items-center justify-between max-w-7xl">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('landing')}>
            <div className="bg-rose-500 p-1.5 rounded-lg text-white">
              <Music size={20} fill="currentColor" />
            </div>
            <span className="font-serif font-bold text-xl tracking-tight text-slate-800">Melodia do Amor</span>
          </div>
          <div className="hidden md:flex">
             <Countdown />
          </div>
          <button 
            onClick={scrollToPricing} 
            className="md:hidden bg-rose-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-rose-500/20"
          >
            Começar
          </button>
        </div>
        <div className="md:hidden bg-slate-50 py-2 flex justify-center border-b border-slate-100">
          <Countdown />
        </div>
      </header>

      {/* ESPAÇAMENTO PARA O HEADER */}
      <div className="h-24 md:h-16"></div>

      {/* --- BARRA DA CAMPANHA PARIS --- */}
      <div className="bg-slate-900 text-white py-4 border-b-4 border-rose-500 relative overflow-hidden">
        {/* Background Pattern subtil */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                
                {/* Texto Esquerda */}
                <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                        <span className="bg-amber-400 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Concurso</span>
                        <h3 className="font-bold text-lg flex items-center gap-2">
                             Ganha uma Viagem a Paris! <Plane className="text-rose-400 rotate-[-15deg]" size={20} />
                        </h3>
                    </div>
                    <p className="text-xs text-slate-300">
                        A história mais bonita das primeiras <span className="text-white font-bold">100 encomendas</span> ganha Voo + Hotel para 2 pessoas.
                    </p>
                </div>

                {/* Barra Direita */}
                <div className="w-full md:w-1/2">
                    <div className="flex justify-between text-xs font-bold mb-1.5">
                        <span className="text-rose-300 animate-pulse">Quase a esgotar!</span>
                        <span>{VENDAS_ATUAIS} / {OBJETIVO_VENDAS} vendidos</span>
                    </div>
                    <div className="h-4 bg-slate-700 rounded-full overflow-hidden border border-slate-600 shadow-inner relative">
                        {/* Fill da Barra */}
                        <div 
                            className="h-full bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 transition-all duration-1000 ease-out"
                            style={{ width: `${PERCENTAGEM}%` }}
                        >
                            {/* Efeito de brilho (Shimmer) */}
                            <div className="absolute top-0 right-0 h-full w-full bg-gradient-to-l from-transparent via-white/20 to-transparent skew-x-12"></div>
                        </div>
                    </div>
                    <p className="text-[10px] text-slate-500 text-right mt-1 italic">
                        Participação automática ao comprar a música.
                    </p>
                </div>
            </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative min-h-[calc(100vh-200px)] flex items-center py-16 overflow-hidden">
        
        {/* Background blobs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[30rem] h-[30rem] bg-rose-100/50 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[20rem] h-[20rem] bg-blue-100/50 rounded-full blur-3xl -z-10"></div>

        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
          
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
            
            {/* COLUNA DE TEXTO */}
            <div className="flex-1 text-center lg:text-left space-y-8 max-w-xl">
              
              <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 px-4 py-1.5 rounded-full text-sm font-bold border border-rose-100 uppercase tracking-wide shadow-sm hover:scale-105 transition-transform cursor-default">
                <Heart size={14} fill="currentColor" />
                <span>Oferta Dia dos Namorados</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-serif font-bold leading-[1.1] text-slate-900 tracking-tight">
                A vossa história merece uma <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-amber-500">banda sonora única.</span>
              </h1>
              
              <p className="text-lg text-slate-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Surpreende a tua cara-metade com uma música personalizada feita à medida. Tu dás-nos as memórias, nós criamos a emoção.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start pt-2">
                <Button onClick={startWizard} pulse className="w-full sm:w-auto px-8 py-4 text-lg shadow-xl shadow-rose-500/20 bg-rose-600 hover:bg-rose-700 text-white">
                  Criar a Minha Canção
                </Button>
                
                <div className="flex items-center gap-3 text-sm text-slate-500 font-medium bg-white/50 px-3 py-2 rounded-xl border border-white/50 backdrop-blur-sm">
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <img key={i} src={`https://picsum.photos/40/40?random=${i}`} className="w-9 h-9 rounded-full border-2 border-white shadow-sm" alt="User" />
                    ))}
                  </div>
                  <div className="flex flex-col leading-none gap-0.5">
                    <span className="font-bold text-slate-900">+2500 casais</span>
                    <span className="text-xs">felizes</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* COLUNA DA IMAGEM COM PLAYER FUNCIONAL */}
            <div className="flex-1 w-full max-w-[500px] lg:max-w-[550px] relative mt-8 lg:mt-0">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-700 border-[6px] border-white group">
                
                <img 
                  src={heroBg} 
                  alt="Casal feliz a ouvir música" 
                  className={`w-full h-auto object-cover aspect-[4/5] lg:aspect-[3/4] transition-transform duration-[20s] ease-linear ${heroIsPlaying ? 'scale-110' : 'scale-100 group-hover:scale-105'}`}
                />
                
                {/* Overlay Escuro */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

                {/* PLAYER FLUTUANTE INTERATIVO */}
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <button 
                    onClick={toggleHeroAudio}
                    className="w-full bg-white/95 backdrop-blur-xl rounded-2xl p-4 flex items-center gap-4 shadow-xl border border-white/40 hover:bg-white transition-all cursor-pointer group/player text-left"
                  >
                    {/* Botão Play/Pause */}
                    <div className={`relative w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 ${heroIsPlaying ? 'bg-rose-500 scale-105' : 'bg-slate-800 group-hover/player:scale-110'}`}>
                      {heroIsPlaying ? (
                         <Pause size={20} fill="currentColor" />
                      ) : (
                         <Play size={20} fill="currentColor" className="ml-1" />
                      )}
                      
                      {/* Onda de choque ao clicar */}
                      {heroIsPlaying && (
                        <span className="absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75 animate-ping"></span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                         <p className="font-bold text-base text-slate-900 truncate">Exemplo: A Nossa História</p>
                         
                         {/* ANIMAÇÃO DE EQUALIZADOR */}
                         {heroIsPlaying && (
                           <div className="flex items-end gap-1 h-4">
                             <span className="w-1 bg-rose-500 rounded-full animate-[bounce_1s_infinite]"></span>
                             <span className="w-1 bg-rose-500 rounded-full animate-[bounce_1.2s_infinite] h-3"></span>
                             <span className="w-1 bg-rose-500 rounded-full animate-[bounce_0.8s_infinite] h-2"></span>
                             <span className="w-1 bg-rose-500 rounded-full animate-[bounce_1.1s_infinite]"></span>
                           </div>
                         )}
                      </div>
                      
                      {/* Barra de progresso visual */}
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-slate-500 font-mono">{heroIsPlaying ? 'A Tocar...' : 'Ouvir Exemplo'}</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-1">
                          <div className={`bg-rose-500 h-1 rounded-full transition-all duration-1000 ${heroIsPlaying ? 'w-full opacity-100 animate-pulse' : 'w-0 opacity-0'}`}></div>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
              
              {/* Elementos Decorativos */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-rose-200 to-amber-200 rounded-[2.5rem] -z-10 transform -rotate-2 opacity-60"></div>
            </div>

          </div>
        </div>
      </section>

      {/* RESTANTE DO SITE - SOCIAL PROOF */}
      <section className="bg-slate-50 py-12 border-y border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">
            Avaliado com 4.9/5 estrelas por casais em Portugal
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((review, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex gap-1 text-amber-400 mb-3">
                  {[...Array(review.stars)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-slate-700 italic mb-4 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center text-rose-700 font-bold text-sm">
                    {review.name.charAt(0)}
                  </div>
                  <span className="font-bold text-sm text-slate-900">{review.name}</span>
                  <CheckCircle2 size={16} className="text-blue-500 ml-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUDIO SAMPLES SECTION */}
      <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1 w-full">
              <AudioPlayer samples={SAMPLES} />
            </div>
            
            <div className="flex-1 space-y-8">
              <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight">Mais do que uma música, <span className="text-rose-400">uma memória eterna.</span></h2>
              
              <ul className="space-y-6">
                {[
                  { icon: Clock, title: "Entrega em 72 Horas", desc: "Recebe a tua música pronta e masterizada no teu email em 3 dias." },
                  { icon: Music, title: "Qualidade de Estúdio", desc: "Produção profissional com vozes claras e instrumentos envolventes." },
                  { icon: CheckCircle2, title: "100% Personalizado", desc: "A letra fala sobre VÓS. Os vossos nomes, o vosso lugar especial, a vossa data." },
                  { icon: Trophy, title: "Habilita-te a Paris", desc: "A tua história entra automaticamente no concurso para a viagem de sonho." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-5">
                    <div className="bg-rose-600/20 p-3 rounded-xl h-fit text-rose-400 border border-rose-500/20">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-1 text-white">{item.title}</h4>
                      <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="pt-6">
                <Button onClick={startWizard} variant="primary" className="shadow-rose-500/50 py-4 px-8 text-lg bg-rose-600 hover:bg-rose-700">
                  Começar a Minha Música
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-24 bg-gradient-to-b from-white to-rose-50/50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-rose-100 flex flex-col md:flex-row transform hover:scale-[1.01] transition-transform duration-500">
            
            <div className="flex-1 p-10 md:p-16 flex flex-col justify-center bg-rose-600 text-white relative overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-rose-500 to-rose-700"></div>
               <div className="relative z-10">
                 <h3 className="text-2xl font-bold mb-2 text-rose-100">Oferta Limitada</h3>
                 <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Dia dos Namorados</h2>
                 <p className="text-rose-100 mb-8 text-lg leading-relaxed">O preço vai subir assim que o contador chegar a zero. Aproveita agora o preço promocional de lançamento!</p>
                 <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                   <div className="flex items-center gap-4">
                     <div className="bg-white/20 p-2 rounded-full">
                        <Clock className="text-white" size={24} />
                     </div>
                     <div>
                       <p className="text-xs text-rose-100 uppercase font-bold tracking-wider">Entrega Garantida</p>
                       <p className="font-bold text-xl">Em 72 Horas</p>
                     </div>
                   </div>
                 </div>
               </div>
            </div>

            <div className="flex-1 p-10 md:p-16">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 line-through text-xl">€99,00</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">70% Desconto</span>
              </div>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-6xl font-bold text-rose-600 tracking-tight">29,99€</span>
                <span className="text-slate-500 font-medium">/ música</span>
              </div>
              
              <ul className="space-y-4 mb-10">
                {[
                  "Música MP3 Completa (3-4 min)",
                  "Letra 100% Personalizada",
                  "Revisão Gratuita",
                  "Entrega Standard (72h)",
                  "Participação Concurso Paris"
                ].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 text-lg">
                    <div className="bg-rose-50 rounded-full p-1">
                      <CheckCircle2 size={16} className="text-rose-600 shrink-0" />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <Button fullWidth pulse onClick={startWizard} className="py-4 text-lg bg-rose-600 hover:bg-rose-700 shadow-xl shadow-rose-500/20">
                Criar Música Agora
              </Button>
              
              <p className="text-center text-xs text-slate-400 mt-6">
                Pagamento 100% Seguro via Stripe. Satisfação Garantida.
              </p>
              
              <div className="mt-8 flex justify-center gap-3 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
                 <div className="h-8 bg-slate-100 px-3 rounded flex items-center font-bold text-xs text-slate-600 border border-slate-200">MB WAY</div>
                 <div className="h-8 bg-slate-100 px-3 rounded flex items-center font-bold text-xs text-slate-600 border border-slate-200">MULTIBANCO</div>
                 <div className="h-8 bg-slate-100 px-3 rounded flex items-center font-bold text-xs text-slate-600 border border-slate-200">VISA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-slate-900">Perguntas Frequentes</h2>
          </div>
          <Faq items={FAQS} />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-50 border-t border-slate-200 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="bg-rose-600 p-2 rounded-xl text-white shadow-lg shadow-rose-500/20">
                <Music size={20} fill="currentColor" />
              </div>
              <span className="font-serif font-bold text-xl text-slate-900">Melodia do Amor</span>
            </div>
            
            <div className="text-sm text-slate-500 flex flex-wrap justify-center gap-8 font-medium">
              <a href="#" className="hover:text-rose-600 transition-colors">Termos e Condições</a>
              <a href="#" className="hover:text-rose-600 transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-rose-600 transition-colors">Contactos</a>
            </div>

            <div className="text-xs text-slate-400">
              © {new Date().getFullYear()} Melodia do Amor Portugal.
            </div>
          </div>
        </div>
      </footer>
      
      {/* STICKY MOBILE CTA */}
      <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden">
         <Button fullWidth className="shadow-2xl border border-white/20 py-4 text-lg bg-rose-600 hover:bg-rose-700" onClick={startWizard}>
           Criar Música (29,99€)
         </Button>
      </div>

    </div>
  );
}

export default App;
