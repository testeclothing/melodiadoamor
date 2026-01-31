import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, Clock, Check, Sparkles, Lightbulb, MessageCircleHeart, MessageCircle, Mail } from 'lucide-react';

interface WizardProps {
  onBack: () => void;
}

const MUSIC_STYLES = [
  {
    id: 'soul',
    name: 'Alma & Intensidade',
    description: 'Vibe Teddy Swims. Voz rasgada e visceral. Para impactar.',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' 
  },
  {
    id: 'rock',
    name: 'Eterno Rock',
    description: 'Vibe Bryan Adams. Guitarras e lealdade de uma vida.',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  },
  {
    id: 'pop',
    name: 'Cinema & Romance',
    description: 'Vibe Lady Gaga & Bruno Mars. Épico e inesquecível.',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3'
  }
];

export const Wizard: React.FC<WizardProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [playing, setPlaying] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    names: '',
    meeting: '',
    memory: '',
    loveMost: '',
    hobbies: '',
    loveLanguage: '',
    extraDetails: '', // Opcional
    style: '',
    fastDelivery: false
  });

  const BASE_PRICE = 24.99;
  const RUSH_FEE = 4.99;
  const finalPrice = formData.fastDelivery ? BASE_PRICE + RUSH_FEE : BASE_PRICE;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('status') === 'success') {
      setStep(5);
      const amount = urlParams.get('amt') || '24.99';
      if (typeof window !== 'undefined' && (window as any).ttq) {
        (window as any).ttq.track('CompletePayment', {
          value: parseFloat(amount),
          currency: 'EUR',
          content_name: 'Musica Personalizada'
        });
      }
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleStripeRedirect = () => {
    const LINK_STANDARD = "https://buy.stripe.com/test_5kQbJ30KG8kg7NUeVofUQ00";
    const LINK_FAST = "https://buy.stripe.com/test_8x24gB0KGaso7NU00ufUQ01";
    if (typeof window !== 'undefined' && (window as any).ttq) {
      (window as any).ttq.track('InitiateCheckout', { value: finalPrice, currency: 'EUR' });
    }
    window.location.href = formData.fastDelivery ? LINK_FAST : LINK_STANDARD;
  };

  const toggleAudio = (id: string, url: string) => {
    const audioElements = document.getElementsByTagName('audio');
    for (let i = 0; i < audioElements.length; i++) {
      if (audioElements[i].id !== `audio-${id}`) {
        audioElements[i].pause();
        audioElements[i].currentTime = 0;
      }
    }
    const currentAudio = document.getElementById(`audio-${id}`) as HTMLAudioElement;
    if (currentAudio) {
      if (playing === id) {
        currentAudio.pause();
        setPlaying(null);
      } else {
        currentAudio.play();
        setPlaying(id);
      }
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-serif font-bold text-slate-900 italic">Identificação</h2>
        <p className="text-slate-500 text-sm mt-1">Quem são os protagonistas desta história?</p>
      </div>
      <div>
        <label className="block text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-[0.2em]">Os vossos nomes</label>
        <input 
          type="text" 
          className="w-full p-4 border-2 border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none transition-all font-medium"
          placeholder="Ex: Carlos e Carla"
          value={formData.names}
          onChange={(e) => setFormData({...formData, names: e.target.value})}
        />
      </div>
      <button 
        onClick={() => setStep(2)}
        disabled={!formData.names}
        className="w-full bg-slate-900 hover:bg-black text-white p-5 rounded-2xl font-bold disabled:opacity-50 transition-all shadow-xl"
      >
        Definir Legado
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-fadeIn max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-serif font-bold text-slate-900 italic">O Vosso Percurso</h2>
        <p className="text-slate-500 text-sm mt-1">Responde apenas ao essencial. Nós tratamos da poesia.</p>
      </div>

      <div className="space-y-4">
        {/* Pergunta 1 */}
        <div className="group">
          <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase group-focus-within:text-brand-500 transition-colors tracking-widest">1. Onde ou quando se conheceram?</label>
          <input 
            type="text"
            className="w-full p-3 bg-slate-50 border-b-2 border-slate-100 focus:border-brand-500 outline-none text-sm transition-all"
            placeholder="Ex: No ginásio / Escola secundária em 2015"
            value={formData.meeting}
            onChange={(e) => setFormData({...formData, meeting: e.target.value})}
          />
        </div>

        {/* Pergunta 2 */}
        <div className="group">
          <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest">2. Memória favorita juntos?</label>
          <input 
            type="text"
            className="w-full p-3 bg-slate-50 border-b-2 border-slate-100 focus:border-brand-500 outline-none text-sm transition-all"
            placeholder="Ex: A viagem a Itália / O festival na Figueira"
            value={formData.memory}
            onChange={(e) => setFormData({...formData, memory: e.target.value})}
          />
        </div>

        {/* Pergunta 3 */}
        <div className="group">
          <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest">3. O que mais amas nele(a)?</label>
          <input 
            type="text"
            className="w-full p-3 bg-slate-50 border-b-2 border-slate-100 focus:border-brand-500 outline-none text-sm transition-all"
            placeholder="Ex: A alegria contagiante e o apoio constante"
            value={formData.loveMost}
            onChange={(e) => setFormData({...formData, loveMost: e.target.value})}
          />
        </div>

        {/* Pergunta 4 e 5 Lado a Lado */}
        <div className="grid grid-cols-2 gap-4">
            <div className="group">
                <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest">4. Hobbies?</label>
                <input 
                    type="text"
                    className="w-full p-3 bg-slate-50 border-b-2 border-slate-100 focus:border-brand-500 outline-none text-sm"
                    placeholder="Ex: Ler, Body Pump"
                    value={formData.hobbies}
                    onChange={(e) => setFormData({...formData, hobbies: e.target.value})}
                />
            </div>
            <div className="group">
                <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest">5. Linguagem de Amor?</label>
                <input 
                    type="text"
                    className="w-full p-3 bg-slate-50 border-b-2 border-slate-100 focus:border-brand-500 outline-none text-sm"
                    placeholder="Ex: Tempo, Toque"
                    value={formData.loveLanguage}
                    onChange={(e) => setFormData({...formData, loveLanguage: e.target.value})}
                />
            </div>
        </div>

        {/* OPCIONAL: Quer escrever mais? */}
        <div className="pt-4">
            <label className="block text-[10px] font-bold text-slate-300 mb-2 uppercase italic tracking-widest">Algo mais a acrescentar? (Opcional)</label>
            <textarea 
              className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl h-24 focus:ring-1 focus:ring-slate-200 outline-none text-xs resize-none"
              placeholder="Outros detalhes, piadas internas ou frases especiais que queiras incluir..."
              value={formData.extraDetails}
              onChange={(e) => setFormData({...formData, extraDetails: e.target.value})}
            />
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button onClick={() => setStep(1)} className="px-6 text-slate-400 font-bold hover:text-slate-600 transition-colors">Voltar</button>
        <button 
          onClick={() => setStep(3)}
          disabled={!formData.meeting || !formData.memory || !formData.loveMost}
          className="flex-1 bg-slate-900 hover:bg-black text-white p-5 rounded-2xl font-bold disabled:opacity-50 shadow-xl"
        >
          Avançar
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-serif font-bold text-slate-900 italic">Escolhe a Frequência</h2>
        <p className="text-slate-500 text-sm mt-1">Ouve os exemplos e seleciona o tom do teu pacto.</p>
      </div>
      <div className="space-y-3">
        {MUSIC_STYLES.map((style) => (
          <div 
            key={style.id}
            onClick={() => setFormData({...formData, style: style.id})}
            className={`p-4 border-2 rounded-2xl cursor-pointer transition-all ${
              formData.style === style.id ? 'border-brand-500 bg-brand-50' : 'border-slate-100 hover:border-brand-200 bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-slate-900">{style.name}</h3>
              {formData.style === style.id && <Check className="text-brand-600 w-5 h-5" />}
            </div>
            <p className="text-[11px] text-slate-500 mb-3">{style.description}</p>
            <button 
              onClick={(e) => { e.stopPropagation(); toggleAudio(style.id, style.previewUrl); }}
              className="flex items-center gap-2 text-[10px] font-bold text-brand-600 bg-white border border-brand-100 px-3 py-2 rounded-full hover:bg-brand-50"
            >
              {playing === style.id ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
              {playing === style.id ? 'Parar' : 'Ouvir Exemplo'}
              <audio id={`audio-${style.id}`} src={style.previewUrl} />
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <button onClick={() => setStep(2)} className="px-6 text-slate-400 font-bold">Voltar</button>
        <button 
          onClick={() => { if(playing) toggleAudio(playing, ''); setStep(4); }}
          disabled={!formData.style}
          className="flex-1 bg-slate-900 hover:bg-black text-white p-5 rounded-2xl font-bold disabled:opacity-50 shadow-xl"
        >
          Ver Veredito
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-serif font-bold text-slate-800 italic">O Teu Veredito</h2>
        <p className="text-slate-500 text-sm mt-1">Confirma as garantias antes do pacto final.</p>
      </div>
      <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-sm space-y-5">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-slate-700">
            <MessageCircle className="text-green-500" size={18} />
            <span>Entrega via <strong>WhatsApp e E-mail</strong></span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-700">
            <Check className="text-blue-500" size={18} />
            <span><strong>Ajustes Incluídos:</strong> Só paramos quando estiver perfeita</span>
          </div>
        </div>

        <div 
          onClick={() => setFormData({...formData, fastDelivery: !formData.fastDelivery})}
          className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
            formData.fastDelivery ? 'border-amber-400 bg-amber-50' : 'border-slate-100 bg-slate-50'
          }`}
        >
          <div className="flex justify-between items-center mb-1">
            <span className="font-bold text-slate-800 flex items-center gap-2 text-sm">
              <Sparkles size={16} className="text-brand-500" /> Prioridade 24 Horas
            </span>
            <span className="text-brand-600 font-bold">+4,99€</span>
          </div>
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">O vosso pedido passa para o topo da produção.</p>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
          <span className="font-bold text-slate-900 text-lg opacity-40 uppercase tracking-tighter">Investimento</span>
          <span className="text-3xl font-bold text-brand-600">€{finalPrice.toFixed(2)}</span>
        </div>
      </div>
      <div className="flex gap-4">
        <button onClick={() => setStep(3)} className="px-6 text-slate-400 font-bold">Voltar</button>
        <button onClick={handleStripeRedirect} className="flex-1 bg-green-600 hover:bg-green-700 text-white p-5 rounded-2xl font-bold shadow-xl transition-all transform active:scale-95">
          Selar o Pacto • €{finalPrice.toFixed(2)}
        </button>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="text-center space-y-6 py-12 animate-fadeIn px-4">
      <div className="bg-green-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-white shadow-lg shadow-green-100">
        <Check size={48} strokeWidth={3} />
      </div>
      <h2 className="text-3xl font-serif font-bold text-slate-900 italic">Veredito Selado.</h2>
      <p className="text-slate-500 font-medium">A vossa história já está na mão dos nossos artistas.</p>
      <div className="bg-white p-6 rounded-3xl text-sm border border-slate-100 shadow-sm inline-block w-full">
        <p className="text-slate-600 mb-4">Receberás o hino no <strong>WhatsApp e E-mail</strong>.</p>
        <div className="bg-slate-900 text-white p-4 rounded-2xl inline-block w-full">
            <p className="text-[10px] uppercase opacity-60 font-bold tracking-[0.2em] mb-1">Entrega Estimada</p>
            <p className="text-2xl font-bold font-sans">{formData.fastDelivery ? 'Menos de 24 Horas' : 'Até 72 Horas'}</p>
        </div>
      </div>
      <button onClick={onBack} className="text-slate-400 font-bold hover:text-slate-900 transition-colors uppercase text-[10px] tracking-widest pt-4">Voltar ao início</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4 font-sans selection:bg-brand-100">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-100">
        {step < 5 && (
          <div className="bg-slate-900 p-5 flex items-center text-white">
            <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-full transition-colors"><ArrowLeft size={20} /></button>
            <div className="flex-1 text-center font-bold text-[10px] uppercase tracking-[0.3em]">Sessão {step} de 4</div>
            <div className="w-10"></div>
          </div>
        )}
        <div className="p-8 md:p-12">
          {step === 1 && renderStep1()} 
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()} 
          {step === 4 && renderStep4()}
          {step === 5 && renderStep5()}
        </div>
      </div>
    </div>
  );
};
