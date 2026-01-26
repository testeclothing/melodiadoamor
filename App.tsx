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
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
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

      {/* HERO SECTION COMPACTA (FULL VIEWPORT) */}
      <section className="relative min-h-screen flex items-center pt-20 pb-10 overflow-hidden">
        
        {/* Background blobs mais subtis */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-brand-100 rounded-full blur-3xl opacity-40 z-0"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-48 h-48 bg-pink-100 rounded-full blur-3xl opacity-40 z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            
            {/* TEXTO - Mais compacto */}
            <div className="flex-1 text-center lg:text-left space-y-6 max-w-xl mx-auto lg:mx-0 pt-4 lg:pt-0">
              
              <div className="inline-flex items-center gap-2 bg-red-50 text-brand-600 px-3 py-1 rounded-full text-xs font-bold border border-red-100 uppercase tracking-wide">
                <Heart size={12} fill="currentColor" />
                <span>Oferta Dia dos Namorados</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-serif font-bold leading-tight text-gray-900 tracking-tight">
                A vossa história merece uma <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-rose-500">banda sonora única.</span>
              </h1>
              
              <p className="text-base lg:text-lg text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0">
                Surpreende a tua cara-metade com uma música personalizada. Entrega em 24h.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Button onClick={startWizard} pulse className="w-full sm:w-auto px-8 py-3 shadow-lg">
                  Quero Emocionar
                </Button>
                
                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <img key={i} src={`https://picsum.photos/30/30?random=${i}`} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" alt="User" />
                    ))}
                  </div>
                  <span>+2500 casais</span>
                </div>
              </div>
            </div>
            
            {/* IMAGEM - Limitada em altura para não ocupar o ecrã todo */}
            <div className="flex-1 w-full max-w-md lg:max-w-lg relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform rotate-1 hover:rotate-0 transition-all duration-500 border-4 border-white">
                
                {/* AQUI ESTÁ O TRUQUE: max-h-[500px] impede que fique gigante */}
                <img 
                  src="12qwq.jpeg" 
                  alt="Casal feliz a ouvir música" 
                  className="w-full h-auto max-h-[450px] lg:max-h-[550px] object-cover"
                />
                
                {/* Player Flutuante Compacto */}
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <div className="bg-white/95 backdrop-blur-md rounded-lg p-3 flex items-center gap-3 shadow-lg border border-white/50">
                    <div className="bg-brand-100 p-2 rounded-full text-brand-600 animate-pulse">
                      <Music size={20} />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="font-bold text-sm text-gray-900 truncate">A Nossa História</p>
                      <p className="text-[10px] text-gray-500">Música Personalizada • 03:42</p>
                    </div>
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-500 text-white shadow-md">
                         <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-0.5"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Elemento Decorativo */}
              <div className="absolute -inset-3 bg-brand-500/10 rounded-2xl -z-10 transform -rotate-2 scale-105"></div>
            </div>

          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="bg-gray-50 py-10 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">
            Avaliado com 4.9/5 estrelas por casais em Portugal
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {REVIEWS.map((review, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex gap-1 text-yellow-400 mb-3">
                  {[...Array(review.stars)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-700 italic mb-4">"{review.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center text-brand-700 font-bold text-xs">
                    {review.name.charAt(0)}
                  </div>
                  <span className="font-bold text-sm text-gray-900">{review.name}</span>
                  <CheckCircle2 size={14} className="text-blue-500 ml-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Como criamos a magia?</h2>
            <p className="text-gray-600 text-lg">Tu contas a história, nós transformamos em melodia. O processo é simples e rápido.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
             {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-100 -z-10"></div>

            <div className="bg-white p-8 rounded-2xl text-center border border-gray-100 shadow-lg relative">
              <div className="w-24 h-24 mx-auto bg-brand-50 rounded-full flex items-center justify-center text-brand-600 mb-6 border-4 border-white shadow-sm">
                <Heart size={40} />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Partilha a História</h3>
              <p className="text-gray-600">Preenche um formulário simples com os vossos nomes, memórias e o estilo musical que mais gostam.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl text-center border border-gray-100 shadow-lg relative">
              <div className="w-24 h-24 mx-auto bg-brand-50 rounded-full flex items-center justify-center text-brand-600 mb-6 border-4 border-white shadow-sm">
                <Clock size={40} />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Produção Profissional</h3>
              <p className="text-gray-600">Os nossos artistas e IA compõem uma letra emocionante e uma melodia única baseada nos teus detalhes.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl text-center border border-gray-100 shadow-lg relative">
              <div className="w-24 h-24 mx-auto bg-brand-50 rounded-full flex items-center justify-center text-brand-600 mb-6 border-4 border-white shadow-sm">
                <Gift size={40} />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Recebe em 24h</h3>
              <p className="text-gray-600">Recebe o ficheiro MP3 e o cartão digital com QR Code no teu e-mail e WhatsApp. Pronta a oferecer!</p>
            </div>
          </div>
        </div>
      </section>

      {/* AUDIO SAMPLES & BENEFITS */}
      <section className="bg-gray-900 text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 w-full">
              <AudioPlayer samples={SAMPLES} />
            </div>
            
            <div className="flex-1 space-y-8">
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Mais do que uma música, uma memória eterna.</h2>
              
              <ul className="space-y-6">
                {[
                  { icon: Clock, title: "Entrega Ultra-Rápida", desc: "Perfeito se deixaste a prenda para a última hora. Recebe em menos de 24h." },
                  { icon: Music, title: "Qualidade de Estúdio", desc: "Produção profissional com vozes claras e instrumentos envolventes." },
                  { icon: CheckCircle2, title: "100% Personalizado", desc: "A letra fala sobre VÓS. Os vossos nomes, o vosso lugar especial, a vossa data." },
                  { icon: ShieldCheck, title: "Garantia de Emoção", desc: "Desenhado para criar impacto emocional. Prepara os lenços!" }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="bg-brand-600/20 p-3 rounded-lg h-fit text-brand-400">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-1">{item.title}</h4>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="pt-4">
                <Button onClick={startWizard} variant="primary" className="shadow-brand-500/50">
                  Ouvir a Minha História
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION - CARTÃO VERMELHO */}
      <section id="pricing" className="py-24 bg-gradient-to-b from-white to-brand-50/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-brand-100 flex flex-col md:flex-row">
            
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center bg-brand-600 text-white relative overflow-hidden">
               <div className="absolute inset-0 bg-black/10"></div>
               <div className="relative z-10">
                 <h3 className="text-2xl font-bold mb-2 text-brand-100">Oferta Limitada</h3>
                 <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Dia dos Namorados</h2>
                 <p className="text-brand-100 mb-8 text-lg">O preço vai subir assim que o contador chegar a zero. Aproveita agora!</p>
                 <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                   <div className="flex items-center gap-3">
                     <Clock className="text-brand-200" />
                     <div>
                       <p className="text-xs text-brand-200 uppercase font-bold">Entrega Garantida</p>
                       <p className="font-bold">Em menos de 24 Horas</p>
                     </div>
                   </div>
                 </div>
               </div>
            </div>

            <div className="flex-1 p-8 md:p-12">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500 line-through text-xl">€99,00</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">70% Desconto</span>
              </div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-5xl font-bold text-brand-600">29,99€</span>
                <span className="text-gray-500">/ música</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Música MP3 Completa (3-4 min)",
                  "Letra 100% Personalizada",
                  "Cartão Digital com QR Code",
                  "Revisão Gratuita",
                  "Entrega Prioritária (24h)"
                ].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle2 size={18} className="text-brand-500 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <Button fullWidth pulse onClick={startWizard}>
                Criar Música Agora
              </Button>
              
              <p className="text-center text-xs text-gray-500 mt-4">
                Pagamento 100% Seguro. Satisfação Garantida.
              </p>
              
              <div className="mt-6 flex justify-center gap-4 opacity-60 grayscale hover:grayscale-0 transition-all">
                 <div className="h-8 bg-gray-100 px-2 rounded flex items-center font-bold text-xs text-gray-600 border border-gray-300">MB WAY</div>
                 <div className="h-8 bg-gray-100 px-2 rounded flex items-center font-bold text-xs text-gray-600 border border-gray-300">MULTIBANCO</div>
                 <div className="h-8 bg-gray-100 px-2 rounded flex items-center font-bold text-xs text-gray-600 border border-gray-300">VISA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900">Perguntas Frequentes</h2>
          </div>
          <Faq items={FAQS} />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="bg-brand-600 p-1.5 rounded-lg text-white">
                <Music size={16} fill="currentColor" />
              </div>
              <span className="font-serif font-bold text-lg text-gray-900">Melodia do Amor</span>
            </div>
            
            <div className="text-sm text-gray-500 flex flex-wrap justify-center gap-6">
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
         <Button fullWidth className="shadow-xl border border-white/20" onClick={startWizard}>
           Criar Música (29,99€)
         </Button>
      </div>

    </div>
  );
}

export default App;
