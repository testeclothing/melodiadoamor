import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, Clock, Check, Sparkles, Lightbulb, MessageCircleHeart, MessageCircle, Mail } from 'lucide-react';

interface WizardProps {
  onBack: () => void;
}

const MUSIC_STYLES = [
  {
    id: 'soul',
    name: 'Alma & Intensidade',
    description: 'Vibe Teddy Swims. Voz rasgada e profunda. Para impactar.',
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
    meeting: '',      // Pergunta 1
    memory: '',       // Pergunta 2
    loveMost: '',     // Pergunta 3
    hobbies: '',      // Pergunta 4
    loveLanguage: '', // Pergunta 5
    privateJoke: '', 
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
        <h2 className="text-2xl font-bold text-slate-800 font-serif italic">Quem são os protagonistas?</h2>
        <p className="text-slate-500 text-sm mt-1">Diz-nos os nomes que vão entrar na música.</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-2 uppercase tracking-wider text-xs">Os vossos nomes</label>
        <input 
          type="text" 
          className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none transition-all font-medium"
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
        Continuar para a História
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-5 animate-fadeIn max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-bold text-slate-800 font-serif italic">A Vossa História</h2>
        <p className="text-slate-500 text-sm mt-1">Responde brevemente para criarmos a letra perfeita.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Onde ou quando se conheceram?</label>
          <input 
            type="text"
            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none text-sm"
            placeholder="Ex: Escola básica / Ginásio em 2018"
            value={formData.meeting}
            onChange={(e) => setFormData({...formData, meeting: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Qual a vossa memória favorita?</label>
          <textarea 
            className="w-full p-3 border border-slate-200 rounded-xl h-20 focus:ring-2 focus:ring-rose-500 outline-none text-sm resize-none"
            placeholder="Ex: O festival RFM Somni na Figueira da Foz"
            value={formData.memory}
            onChange={(e) => setFormData({...formData, memory: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">O que amas mais nele(a)?</label>
          <input 
            type="text"
            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none text-sm"
            placeholder="Ex: O facto de ser um poço de vida e alegria"
            value={formData.loveMost}
            onChange={(e) => setFormData({...formData, loveMost: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
            <div>
                <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Hobbies dele(a)?</label>
                <input 
                    type="text"
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none text-sm"
                    placeholder="Ex: Body Pump, Viajar"
                    value={formData.hobbies}
                    onChange={(e) => setFormData({...formData, hobbies: e.target.value})}
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Linguagem de Amor?</label>
                <input 
                    type="text"
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none text-sm"
                    placeholder="Ex: Toque físico, Abraços"
                    value={formData.loveLanguage}
                    onChange={(e) => setFormData({...formData, loveLanguage: e.target.value})}
                />
            </div>
        </div>

        {/* PIADA INTERNA - SECUNDÁRIA */}
        <div className="pt-2 border-t border-slate-100">
            <label className="flex items-center gap-2 text-[10px] font-bold text-slate-400 mb-1 uppercase">
                <MessageCircleHeart size={12} />
                Piada Interna ou Frase Especial (Opcional)
            </label>
            <input 
              type="text"
              className="w-full p-2 border border-slate-100 rounded-lg focus:ring-1 focus:ring-slate-300 outline-none text-xs bg-slate-50/50"
              placeholder="Ex: 'Brincar é no parque'"
              value={formData.privateJoke}
              onChange={(e) => setFormData({...formData, privateJoke: e.target.value})}
            />
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button onClick={() => setStep(1)} className="px-6 text-slate-400 font-bold hover:text-slate-600 transition-colors">Voltar</button>
        <button 
          onClick={() => setStep(3)}
          disabled={!formData.meeting || !formData.memory}
          className="flex-1 bg-slate-900 hover:bg-black text-white p-4 rounded-xl font-bold disabled:opacity-50 shadow-lg"
        >
          Escolher Estilo
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-bold text-slate-800 font-serif italic">Escolhe a Vibe</h2>
        <p className="text-slate-500 text-sm mt-1">Ouve os exemplos e escolhe o teu favorito.</p>
      </div>
      <div className="grid gap-4">
        {MUSIC_STYLES.map((style) => (
          <div 
            key={style.id}
            onClick={() => setFormData({...formData, style: style.id})}
            className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
              formData.style === style.id ? 'border-rose-500 bg-rose-50 shadow-md' : 'border-slate-100 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-900">{style.name}</h3>
              {formData.style === style.id && <Check className="text-rose-500 w-5 h-5" />}
            </div>
            <p className="text-xs text-slate-600 mb-3">{style.description}</p>
            <div className="flex items-center gap-3 bg-white p-2 rounded-lg border border-slate-100 shadow-sm" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => toggleAudio(style.id, style.previewUrl)} className="bg-rose-100 text-rose-600 p-2 rounded-full hover:bg-rose-200 transition-colors">
                {playing === style.id ? <Pause size={14} /> : <Play size={14} />}
              </button>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Ouvir Exemplo</span>
              <audio id={`audio-${style.id}`} src={style.previewUrl} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <button onClick={() => setStep(2)} className="px-6 text-slate-500 font-medium">Voltar</button>
        <button 
          onClick={() => { if(playing) toggleAudio(playing, ''); setStep(4); }}
          disabled={!formData.style}
          className="flex-1 bg-slate-900 hover:bg-black text-white p-4 rounded-xl font-bold disabled:opacity-50 shadow-lg"
        >
          Ver Resumo
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-bold text-slate-800 font-serif italic text-shadow-sm">Resumo do Pedido</h2>
        <p className="text-slate-500 text-sm mt-1">Confirma os detalhes antes do veredito final.</p>
      </div>
      <div className="bg-slate-50 p-6 rounded-2xl space-y-4 border border-slate-100 shadow-inner">
        <div className="flex justify-between border-b border-slate-200 pb-3">
          <span className="text-slate-500 italic text-xs">Recebes via WhatsApp e E-mail</span>
          <div className="flex gap-2 text-slate-400"><MessageCircle size={16} /><Mail size={16} /></div>
        </div>
        <div className="flex justify-between border-b border-slate-200 pb-3">
          <span className="text-slate-500 text-sm">Música Personalizada</span>
          <span className="font-bold text-slate-800">€24,99</span>
        </div>
        <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.fastDelivery ? 'border-amber-400 bg-amber-50' : 'border-slate-200 bg-white'}`}>
          <input type="checkbox" checked={formData.fastDelivery} onChange={(e) => setFormData({...formData, fastDelivery: e.target.checked})} className="mt-1" />
          <div className="flex-1">
            <div className="flex justify-between font-bold text-sm">
                <span><Sparkles size={14} className="inline mr-1 text-amber-500" />Entrega em 24 Horas</span>
                <span className="text-amber-600">+€4,99</span>
            </div>
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Pedido prioritário na fila de produção.</p>
          </div>
        </label>
        <div className="flex justify-between items-center pt-2">
          <span className="font-bold text-slate-400 uppercase text-xs tracking-[0.2em]">Total</span>
          <span className="font-bold text-rose-600 text-2xl">€{finalPrice.toFixed(2)}</span>
        </div>
      </div>
      <div className="flex gap-4">
        <button onClick={() => setStep(3)} className="px-6 text-slate-500 font-medium">Voltar</button>
        <button onClick={handleStripeRedirect} className="flex-1 bg-green-600 hover:bg-green-700 text-white p-5 rounded-2xl font-bold shadow-xl transform transition-transform active:scale-95">
          Selar o Pacto • €{finalPrice.toFixed(2)}
        </button>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="text-center space-y-6 py-10 animate-fadeIn px-4">
      <div className="bg-green-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-white shadow-lg shadow-green-200">
        <Check size={40} strokeWidth={3} />
      </div>
      <h2 className="text-3xl font-bold font-serif italic">Veredito Selado!</h2>
      <p className="text-slate-500 font-medium">A vossa história já está na mão dos nossos artistas.</p>
      <div className="bg-white p-6 rounded-3xl text-sm space-y-3 border border-slate-100 shadow-sm">
        <p className="text-slate-600">Receberás o hino no <strong>WhatsApp e E-mail</strong>.</p>
        <div className="bg-slate-900 text-white p-3 rounded-xl">
            <p className="text-[10px] uppercase opacity-60 font-bold tracking-widest mb-1">Prazo Máximo</p>
            <p className="text-xl font-bold">{formData.fastDelivery ? '24 Horas' : '72 Horas'}</p>
        </div>
      </div>
      <button onClick={onBack} className="text-slate-400 font-bold hover:text-slate-900 transition-colors uppercase text-[10px] tracking-widest">Voltar ao início</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4 selection:bg-brand-100">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100">
        {step < 5 && (
          <div className="bg-slate-900 p-5 flex items-center text-white">
            <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-full transition-colors"><ArrowLeft size={20} /></button>
            <div className="flex-1 text-center font-bold text-xs uppercase tracking-[0.2em]">Passo {step} de 4</div>
            <div className="w-10"></div>
          </div>
        )}
        <div className="p-7 md:p-10">
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
