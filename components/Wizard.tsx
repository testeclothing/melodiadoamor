import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, Clock, Check, Sparkles, Lightbulb, MessageCircleHeart, MessageCircle, Mail } from 'lucide-react';

interface WizardProps {
  onBack: () => void;
}

// CONFIGURAÇÃO DOS 3 ESTILOS MUSICAIS (ORIGINAL)
const MUSIC_STYLES = [
  {
    id: 'pop',
    name: 'Pop Acústico Romântico',
    description: 'Leve, feliz e contagiante. Perfeito para histórias divertidas.',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' 
  },
  {
    id: 'piano',
    name: 'Piano & Voz Emocional',
    description: 'Profundo e tocante. Para fazer chorar de emoção.',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  },
  {
    id: 'folk',
    name: 'Indie Folk Fofinho',
    description: 'Descontraído, com violão e vibe de viagem.',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3'
  }
];

export const Wizard: React.FC<WizardProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [playing, setPlaying] = useState<string | null>(null);
  
  // Dados do Formulário
  const [formData, setFormData] = useState({
    names: '',
    story: '',
    privateJoke: '',
    style: '',
    fastDelivery: false
  });

  // PREÇOS ATUALIZADOS
  const BASE_PRICE = 24.99;
  const RUSH_FEE = 4.99;
  const finalPrice = formData.fastDelivery ? BASE_PRICE + RUSH_FEE : BASE_PRICE;

  // LÓGICA DE RETORNO DO STRIPE E PIXEL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('status') === 'success') {
      setStep(5); // Vai para ecrã de sucesso
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
        <h2 className="text-2xl font-bold text-slate-800">Quem são os protagonistas?</h2>
        <p className="text-slate-500 text-sm mt-1">Diz-nos os nomes que vão entrar na música.</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-2">Os vossos nomes</label>
        <input 
          type="text" 
          className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none transition-all"
          placeholder="Ex: Ana e João"
          value={formData.names}
          onChange={(e) => setFormData({...formData, names: e.target.value})}
        />
      </div>
      <button 
        onClick={() => setStep(2)}
        disabled={!formData.names}
        className="w-full bg-rose-500 hover:bg-rose-600 text-white p-4 rounded-xl font-bold disabled:opacity-50 transition-all shadow-lg"
      >
        Continuar
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-5 animate-fadeIn">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-bold text-slate-800">A Vossa História</h2>
        <p className="text-slate-500 text-sm mt-1">Partilha os detalhes que tornam a vossa relação única.</p>
      </div>
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
        <Lightbulb className="text-blue-500 w-5 h-5 flex-shrink-0" />
        <div>
            <h4 className="font-bold text-blue-800 text-sm mb-1">Não sabes o que escrever? Tenta isto:</h4>
            <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                <li>Onde foi o vosso primeiro encontro?</li>
                <li>Qual foi a viagem mais marcante?</li>
            </ul>
        </div>
      </div>
      <textarea 
        className="w-full p-4 border border-slate-200 rounded-xl h-32 focus:ring-2 focus:ring-rose-500 outline-none resize-none text-sm"
        placeholder="Conta-nos tudo aqui..."
        value={formData.story}
        onChange={(e) => setFormData({...formData, story: e.target.value})}
      />
      <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-100">
        <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
            <MessageCircleHeart size={16} className="text-rose-500" />
            Piada Interna ou Frase Especial (Opcional)
        </label>
        <input 
          type="text"
          className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none text-sm"
          placeholder="Ex: 'És o meu pinguim'..."
          value={formData.privateJoke}
          onChange={(e) => setFormData({...formData, privateJoke: e.target.value})}
        />
      </div>
      <div className="flex gap-4">
        <button onClick={() => setStep(1)} className="px-6 text-slate-500 font-medium">Voltar</button>
        <button 
          onClick={() => setStep(3)}
          disabled={!formData.story}
          className="flex-1 bg-rose-500 hover:bg-rose-600 text-white p-4 rounded-xl font-bold disabled:opacity-50 shadow-lg"
        >
          Escolher Estilo
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-bold text-slate-800">Escolhe a Vibe</h2>
        <p className="text-slate-500 text-sm mt-1">Ouve os exemplos e escolhe o teu favorito.</p>
      </div>
      <div className="grid gap-4">
        {MUSIC_STYLES.map((style) => (
          <div 
            key={style.id}
            onClick={() => setFormData({...formData, style: style.id})}
            className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
              formData.style === style.id ? 'border-rose-500 bg-rose-50' : 'border-slate-100 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-800">{style.name}</h3>
              {formData.style === style.id && <Check className="text-rose-500 w-5 h-5" />}
            </div>
            <p className="text-sm text-slate-600 mb-3">{style.description}</p>
            <div className="flex items-center gap-3 bg-white p-2 rounded-lg" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => toggleAudio(style.id, style.previewUrl)} className="bg-rose-100 text-rose-600 p-2 rounded-full">
                {playing === style.id ? <Pause size={14} /> : <Play size={14} />}
              </button>
              <span className="text-xs text-slate-400">Preview</span>
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
          className="flex-1 bg-rose-500 hover:bg-rose-600 text-white p-4 rounded-xl font-bold disabled:opacity-50 shadow-lg"
        >
          Ver Resumo
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-bold text-slate-800">Resumo do Pedido</h2>
        <p className="text-slate-500 text-sm mt-1">Confirma os detalhes antes de finalizar.</p>
      </div>
      <div className="bg-slate-50 p-6 rounded-xl space-y-4 border border-slate-100">
        <div className="flex justify-between border-b pb-3">
          <span className="text-slate-500 italic">Recebes via WhatsApp e E-mail</span>
          <div className="flex gap-2 text-slate-400"><MessageCircle size={16} /><Mail size={16} /></div>
        </div>
        <div className="flex justify-between border-b pb-3">
          <span className="text-slate-500">Música Personalizada</span>
          <span className="font-bold text-slate-800">€24,99</span>
        </div>
        <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer ${formData.fastDelivery ? 'border-amber-400 bg-amber-50' : 'border-slate-200 bg-white'}`}>
          <input type="checkbox" checked={formData.fastDelivery} onChange={(e) => setFormData({...formData, fastDelivery: e.target.checked})} className="mt-1" />
          <div className="flex-1">
            <div className="flex justify-between font-bold text-sm">
                <span><Sparkles size={14} className="inline mr-1 text-amber-500" />Entrega em 24 Horas</span>
                <span className="text-amber-600">+€4,99</span>
            </div>
            <p className="text-[10px] text-slate-500">Passamos o teu pedido para a frente da fila.</p>
          </div>
        </label>
        <div className="flex justify-between text-xl pt-2">
          <span className="font-bold">Total</span>
          <span className="font-bold text-rose-600">€{finalPrice.toFixed(2)}</span>
        </div>
      </div>
      <div className="flex gap-4">
        <button onClick={() => setStep(3)} className="px-6 text-slate-500 font-medium">Voltar</button>
        <button onClick={handleStripeRedirect} className="flex-1 bg-green-500 hover:bg-green-600 text-white p-4 rounded-xl font-bold shadow-lg">
          Pagar €{finalPrice.toFixed(2)}
        </button>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="text-center space-y-6 py-8 animate-fadeIn">
      <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-green-600">
        <Check size={40} />
      </div>
      <h2 className="text-2xl font-bold">Pagamento Confirmado!</h2>
      <p className="text-slate-500">A vossa música entrou em produção.</p>
      <div className="bg-slate-50 p-4 rounded-xl text-sm space-y-2">
        <p>Receberás o ficheiro no <strong>WhatsApp e E-mail</strong>.</p>
        <p className="font-bold">Prazo: {formData.fastDelivery ? '24h' : '72h'}</p>
      </div>
      <button onClick={onBack} className="text-rose-500 font-bold hover:underline">Voltar ao início</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
        {step < 5 && (
          <div className="bg-slate-900 p-4 flex items-center text-white">
            <button onClick={onBack} className="p-2"><ArrowLeft size={20} /></button>
            <div className="flex-1 text-center font-bold">Passo {step} de 4</div>
            <div className="w-9"></div>
          </div>
        )}
        <div className="p-6 md:p-8">
          {step === 1 && renderStep1()} {step === 2 && renderStep2()}
          {step === 3 && renderStep3()} {step === 4 && renderStep4()}
          {step === 5 && renderStep5()}
        </div>
      </div>
    </div>
  );
};
