import React, { useState } from 'react';
import { 
  Heart, 
  Star, 
  CheckCircle2, 
  Music, 
  Clock, 
  ShieldCheck, 
  Gift
} from 'lucide-react';

import { Button } from './components/Button';
import { Countdown } from './components/Countdown';
import { AudioPlayer } from './components/AudioPlayer';
import { Faq } from './components/Faq';
import { Wizard } from './components/Wizard';
import { SongSample, FaqItem } from './types';

// IMPORTAÇÃO DA NOVA IMAGEM
import heroBg from './assets/12qwq.jpeg';

// Dados
const SAMPLES: SongSample[] = [
  { id: 1, title: "A Nossa Viagem a Paris", genre: "Pop Acústico Romântico", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { id: 2, title: "5 Anos de Amor", genre: "Piano & Voz Emocional", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { id: 3, title: "O Primeiro Beijo no Cais", genre: "Indie Folk Fofinho", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
];

const FAQS: FaqItem[] = [
  { 
    question: "Como funciona a personalização?", 
    answer: "É muito simples! Clicas em 'Criar Música', respondes a algumas perguntas sobre a vossa história e nós tratamos do resto." 
  },
  { 
    question: "Quanto tempo demora a entrega?", 
    answer: "Garantimos a entrega em menos de 24 horas diretamente no teu e-mail e WhatsApp. Perfeito para prendas de última hora." 
  },
  { 
    question: "Posso pedir alterações?", 
    answer: "Sim! Queremos que fiques 100% satisfeito. Tens direito a uma revisão gratuita na letra ou melodia." 
  },
  { 
    question: "Em que formato recebo a música?", 
    answer: "Recebes um ficheiro MP3 de alta qualidade e um Cartão Digital (PDF) com a letra e um QR Code para ouvirem juntos." 
  },
];

const REVIEWS = [
  { name: "João Silva", text: "A Maria chorou assim que ouviu os primeiros versos. Foi a melhor prenda que já lhe dei!", stars: 5 },
  { name: "Ana Martins", text: "Incrivelmente rápido e a qualidade parece de rádio. Recomendo muito!", stars: 5 },
  { name: "Pedro Costa", text: "Fiquei com receio que fosse genérico, mas captaram todos os detalhes da nossa história.", stars: 5 },
];

function App() {
  const [view, setView] = useState<'landing' | 'wizard'>('landing');

  const scrollToPricing = () => {
    const el = document.getElementById('pricing');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const startWizard = () => {
    window.scrollTo(0, 0);
    setView('wizard');
  };

  if (view === 'wizard') {
    return <Wizard onBack={() => setView('landing')} />;
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-brand-100 selection:text-brand-900">
      
      {/* HEADER / TOP BAR */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-brand-100 shadow-sm h-16">
        <div className="container mx-auto px-4 h-full flex items-center justify-between max-w-7xl">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('landing')}>
            <div className="bg-brand-500 p-1.5 rounded-lg text-white">
              <Music size={20} fill="currentColor" />
            </div>
            <span className="font-serif font-bold text-xl tracking-tight text-brand-700">Melodia do Amor</span>
          </div>
          <div className="hidden md:flex">
             <Countdown />
          </div>
          <button 
            onClick={scrollToPricing} 
            className="md:hidden bg-brand-600 text-white px-4 py-2 rounded-full text-sm font-bold"
          >
            Criar Agora
          </button>
        </div>
        <div className="md:hidden bg-brand-50 py-2 flex justify-center border-b border-brand-100">
          <Countdown />
        </div>
      </header>

      {/* HERO SECTION - REESTRUTURADA PARA MELHOR HIERARQUIA */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
        
        {/* Background blobs (ajustados) */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[30rem] h-[30rem] bg-brand-100/50 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[20rem] h-[20rem] bg-pink-100/50 rounded-full blur-3xl -z-10"></div>

        {/* CONTAINER MAIS APERTADO (max-w-6xl) PARA CENTRAR O CONTEÚDO */}
        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
          
          {/* Layout alterado: justify-center + gap maior em vez de justify-between */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
            
            {/* COLUNA DE TEXTO - Ajustada para não ficar isolada à esquerda */}
            <div className="flex-1 text-center lg:text-left space-y-8 max-w-xl">
              
              <div className="inline-flex items-center gap-2 bg-red-50 text-brand-600 px-4 py-1.5 rounded-full text-sm font-bold border border-red-100 uppercase tracking-wide shadow-sm hover:scale-105 transition-transform">
                <Heart size={14} fill="currentColor" />
                <span>Oferta Dia dos Namorados</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-serif font-bold leading-[1.1] text-gray-900 tracking-tight">
                A vossa história merece uma <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-rose-500">banda sonora única.</span>
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Surpreende a tua cara-metade com uma música personalizada feita à medida. Tu dás-nos as memórias, nós criamos a emoção em 24h.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start pt-2">
                <Button onClick={startWizard} pulse className="w-full sm:w-auto px-8 py-4 text-lg shadow-xl shadow-brand-500/20">
                  Quero Emocionar
                </Button>
                
                <div className="flex items-center gap-3 text-sm text-gray-500 font-medium bg-white/50 px-3 py-2 rounded-xl border border-white/50 backdrop-blur-sm">
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <img key={i} src={`https://picsum.photos/40/40?random=${i}`} className="w-9 h-9 rounded-full border-2 border-white shadow-sm" alt="User" />
                    ))}
                  </div>
                  <div className="flex flex-col leading-none gap-0.5">
                    <span className="font-bold text-gray-900">+2500 casais</span>
                    <span className="text-xs">felizes</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* COLUNA DA IMAGEM - Mais equilibrada e integrada */}
            <div className="flex-1 w-full max-w-[500px] lg:max-w-[550px] relative mt-8 lg:mt-0">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-700 border-[6px] border-white group">
                
                {/* Imagem */}
                <img 
                  src={heroBg} 
                  alt="Casal feliz a ouvir música" 
                  className="w-full h-auto object-cover aspect-[4/5] lg:aspect-[3/4] scale-105 group-hover:scale-100 transition-transform duration-700"
                />
                
                {/* Overlay Gradiente subtil para texto legível */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

                {/* Player Flutuante - Agora dentro da imagem para poupar espaço visual */}
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 flex items-center gap-4 shadow-xl border border-white/40">
                    <div className="bg-brand-500 p-3 rounded-full text-white animate-pulse shadow-lg shadow-brand-500/40">
                      <Music size={22} />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="font-bold text-base text-gray-900 truncate">A Nossa História.mp3</p>
                      <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                        <div className="bg-brand-500 h-1 rounded-full w-2/3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Elementos Decorativos de Fundo */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-brand-200 to-pink-200 rounded-[2.5rem] -z-10 transform -rotate-2 opacity-60"></div>
              <div className="absolute -bottom-8 -right-8 text-brand-200 animate-bounce delay-700 hidden lg:block">
                 <Music size={64} strokeWidth={1} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SOCIAL PROOF - Mantido */}
      <section className="bg-gray-50 py-12 border-y border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-8">
            Avaliado com 4.9/5 estrelas por casais em Portugal
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((review, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex gap-1 text-yellow-400 mb-3">
                  {[...Array(review.stars)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-700 italic mb-4 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center text-brand-700 font-bold text-sm">
                    {review.name.charAt(0)}
                  </div>
                  <span className="font-bold text-sm text-gray-900">{review.name}</span>
                  <CheckCircle2 size={16} className="text-blue-500 ml-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Como criamos a magia?</h2>
            <p className="text-gray-600 text-lg">Tu contas a história, nós transformamos em melodia. O processo é simples e rápido.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
             {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-100 -z-10"></div>

            <div className="bg-white p-8 rounded-2xl text-center border border-gray-100 shadow-lg relative group hover:-translate-y-1 transition-transform duration-300">
              <div className="w-24 h-24 mx-auto bg-brand-50 rounded-full flex items-center justify-center text-brand-600 mb-6 border-4 border-white shadow-sm group-hover:scale-110 transition-transform">
                <Heart size={40} />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Partilha a História</h3>
              <p className="text-gray-600">Preenche um formulário simples com os vossos nomes, memórias e o estilo musical que mais gostam.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl text-center border border-gray-100 shadow-lg relative group hover:-translate-y-1 transition-transform duration-300">
              <div className="w-24 h-24 mx-auto bg-brand-50 rounded-full flex items-center justify-center text-brand-600 mb-6 border-4 border-white shadow-sm group-hover:scale-110 transition-transform">
                <Clock size={40} />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Produção Profissional</h3>
              <p className="text-gray-600">Os nossos artistas e IA compõem uma letra emocionante e uma melodia única baseada nos teus detalhes.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl text-center border border-gray-100 shadow-lg relative group hover:-translate-y-1 transition-transform duration-300">
              <div className="w-24 h-24 mx-auto bg-brand-50 rounded-full flex items-center justify-center text-brand-600 mb-6 border-4 border-white shadow-sm group-hover:scale-110 transition-transform">
                <Gift size={40} />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Recebe em 24h</h3>
              <p className="text-gray-600">Recebe o ficheiro MP3 e o cartão digital com QR Code no teu e-mail e WhatsApp. Pronta a oferecer!</p>
            </div>
          </div>
        </div>
      </section>

      {/* AUDIO SAMPLES & BENEFITS */}
      <section className="bg-gray-900 text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1 w-full">
              <AudioPlayer samples={SAMPLES} />
            </div>
            
            <div className="flex-1 space-y-8">
              <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight">Mais do que uma música, <span className="text-brand-400">uma memória eterna.</span></h2>
              
              <ul className="space-y-6">
                {[
                  { icon: Clock, title: "Entrega Ultra-Rápida", desc: "Perfeito se deixaste a prenda para a última hora. Recebe em menos de 24h." },
                  { icon: Music, title: "Qualidade de Estúdio", desc: "Produção profissional com vozes claras e instrumentos envolventes." },
                  { icon: CheckCircle2, title: "100% Personalizado", desc: "A letra fala sobre VÓS. Os vossos nomes, o vosso lugar especial, a vossa data." },
                  { icon: ShieldCheck, title: "Garantia de Emoção", desc: "Desenhado para criar impacto emocional. Prepara os lenços!" }
                ].map((item, i) => (
                  <li key={i} className="flex gap-5">
                    <div className="bg-brand-600/20 p-3 rounded-xl h-fit text-brand-400 border border-brand-500/20">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-1 text-white">{item.title}</h4>
                      <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="pt-6">
                <Button onClick={startWizard} variant="primary" className="shadow-brand-500/50 py-4 px-8 text-lg">
                  Ouvir a Minha História
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-24 bg-gradient-to-b from-white to-brand-50/50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-brand-100 flex flex-col md:flex-row transform hover:scale-[1.01] transition-transform duration-500">
            
            <div className="flex-1 p-10 md:p-16 flex flex-col justify-center bg-brand-600 text-white relative overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-500 to-brand-700"></div>
               <div className="relative z-10">
                 <h3 className="text-2xl font-bold mb-2 text-brand-100">Oferta Limitada</h3>
                 <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Dia dos Namorados</h2>
                 <p className="text-brand-100 mb-8 text-lg leading-relaxed">O preço vai subir assim que o contador chegar a zero. Aproveita agora o preço promocional de lançamento!</p>
                 <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                   <div className="flex items-center gap-4">
                     <div className="bg-white/20 p-2 rounded-full">
                        <Clock className="text-white" size={24} />
                     </div>
                     <div>
                       <p className="text-xs text-brand-100 uppercase font-bold tracking-wider">Entrega Garantida</p>
                       <p className="font-bold text-xl">Em menos de 24 Horas</p>
                     </div>
                   </div>
                 </div>
               </div>
            </div>

            <div className="flex-1 p-10 md:p-16">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 line-through text-xl">€99,00</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">70% Desconto</span>
              </div>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-6xl font-bold text-brand-600 tracking-tight">29,99€</span>
                <span className="text-gray-500 font-medium">/ música</span>
              </div>
              
              <ul className="space-y-4 mb-10">
                {[
                  "Música MP3 Completa (3-4 min)",
                  "Letra 100% Personalizada",
                  "Cartão Digital com QR Code",
                  "Revisão Gratuita",
                  "Entrega Prioritária (24h)"
                ].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 text-lg">
                    <div className="bg-brand-50 rounded-full p-1">
                      <CheckCircle2 size={16} className="text-brand-600 shrink-0" />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <Button fullWidth pulse onClick={startWizard} className="py-4 text-lg">
                Criar Música Agora
              </Button>
              
              <p className="text-center text-xs text-gray-400 mt-6">
                Pagamento 100% Seguro via Stripe. Satisfação Garantida.
              </p>
              
              <div className="mt-8 flex justify-center gap-3 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
                 <div className="h-8 bg-gray-100 px-3 rounded flex items-center font-bold text-xs text-gray-600 border border-gray-200">MB WAY</div>
                 <div className="h-8 bg-gray-100 px-3 rounded flex items-center font-bold text-xs text-gray-600 border border-gray-200">MULTIBANCO</div>
                 <div className="h-8 bg-gray-100 px-3 rounded flex items-center font-bold text-xs text-gray-600 border border-gray-200">VISA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-900">Perguntas Frequentes</h2>
          </div>
          <Faq items={FAQS} />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-50 border-t border-gray-200 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="bg-brand-600 p-2 rounded-xl text-white shadow-lg shadow-brand-500/20">
                <Music size={20} fill="currentColor" />
              </div>
              <span className="font-serif font-bold text-xl text-gray-900">Melodia do Amor</span>
            </div>
            
            <div className="text-sm text-gray-500 flex flex-wrap justify-center gap-8 font-medium">
              <a href="#" className="hover:text-brand-600 transition-colors">Termos e Condições</a>
              <a href="#" className="hover:text-brand-600 transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-brand-600 transition-colors">Contactos</a>
            </div>

            <div className="text-xs text-gray-400">
              © {new Date().getFullYear()} Melodia do Amor Portugal.
            </div>
          </div>
        </div>
      </footer>
      
      {/* STICKY MOBILE CTA */}
      <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden">
         <Button fullWidth className="shadow-2xl border border-white/20 py-4 text-lg" onClick={startWizard}>
           Criar Música (29,99€)
         </Button>
      </div>

    </div>
  );
}

export default App;
