import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Check, Sparkles, Clock, Lightbulb, 
  MessageCircleHeart, Play, Pause, MessageCircle, 
  Mail, RotateCcw 
} from 'lucide-react';

interface WizardProps {
  onBack: () => void;
}

// CONFIGURAÇÃO DOS ESTILOS MUSICAIS (VIBE ALPHA/PREMIUM)
const MUSIC_STYLES = [
  { 
    id: 'soul', 
    name: 'Alma & Intensidade', 
    description: 'Vibe Teddy Swims. Voz rasgada, visceral e profunda. Para impactar.', 
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' 
  },
  { 
    id: 'rock', 
    name: 'Eterno Rock', 
    description: 'Vibe Bryan Adams. Guitarras, honra e lealdade de uma vida.', 
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' 
  },
  { 
    id: 'pop', 
    name: 'Cinema & Romance', 
    description: 'Vibe Lady Gaga & Bruno Mars. Épico, grandioso e inesquecível.', 
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' 
  }
];

export const Wizard: React.FC<WizardProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [playing, setPlaying] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    names: '',
    story: '',
    privateJoke: '',
    style: '',
    fastDelivery: false
  });

  const BASE_PRICE = 24.99;
  const RUSH_FEE = 4.99;
  const finalPrice = formData.fastDelivery ? (BASE_PRICE + RUSH_FEE) : BASE_PRICE;

  // --- LÓGICA DE RETORNO DO STRIPE E TIKTOK PIXEL ---
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const amountPaid = urlParams.get('amt');

    if (status === 'success') {
      setStep(5); // Ativa ecrã de sucesso imbatível
      
      if (typeof window !== 'undefined' && (window as any).ttq) {
        (window as any).ttq.track('CompletePayment', {
          content_type: 'product',
          value: amountPaid ? parseFloat(amountPaid) : 24.99,
          currency: 'EUR',
          content_name: 'Hino de Amor Personalizado',
          content_id: 'vday_2026_hit'
        });
      }
      // Limpa os parâmetros do URL para segurança e estética
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const toggleAudio = (id: string) => {
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

  const handlePaymentRedirect = () => {
    // LINKS REAIS DO TEU STRIPE
    const STRIPE_STANDARD = "https://buy.stripe.com/test_5kQbJ30KG8kg7NUeVofUQ00";
    const STRIPE_FAST = "https://buy.stripe.com/test_8x24gB0KGaso7NU00ufUQ01";

    const targetUrl = formData.fastDelivery ? STRIPE_FAST : STRIPE_STANDARD;

    if ((window as any).ttq) {
      (window as any).ttq.track('InitiateCheckout', { 
        value: finalPrice, 
        currency: 'EUR' 
      });
    }
    window.location.href = targetUrl;
  };

  const renderStep1 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-serif font-bold text-slate-900 italic text-shadow-sm">Quem são os protagonistas?</h2>
        <p className="text-slate-500 text-sm mt-1">Diz-nos os nomes que vão imortalizar esta canção.</p>
      </div>
      <div>
        <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Os vossos nomes</label>
        <input 
          type="text" 
          className="w-full p-4 border-2 border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none transition-all font-medium text-slate-800"
          placeholder="Ex: Carlos e Carla"
          value={formData.names}
          onChange={(e) => setFormData({...formData, names: e.target.value})}
        />
      </div>
      <button 
        onClick={() => setStep(2)}
        disabled={!formData.names}
        className="w-full bg-slate-900 hover:bg-black text-white p-5 rounded-2xl font-bold disabled:opacity-50 transition-all shadow-xl shadow-slate-200"
      >
        Continuar para a História
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-5 animate-fadeIn">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-serif font-bold text-slate-900 italic">O Vosso Legado</h2>
        <p className="text-slate-500 text-sm mt-1">Tu dás os detalhes, nós criamos a alma.</p>
      </div>
      <div className="bg-brand-50 border border-brand-100 rounded-2xl p-4 flex gap-3">
        <Lightbulb className="text-brand-500 w-6 h-6 flex-shrink-0" />
        <p className="text-sm text-brand-900 italic">Dica: Inclui o primeiro encontro, piadas vossas ou aquela frase que vos define.</p>
      </div>
      <textarea 
        className="w-full p-5 border-2 border-slate-100 rounded-2xl h-40 focus:ring-2 focus:ring-brand-500 outline-none resize-none text-sm leading-relaxed font-medium text-slate-700"
        placeholder="Conta-nos a vossa história sem filtros..."
        value={formData.story}
        onChange={(e) => setFormData({...formData, story: e.target.value})}
      />
      <div className="flex gap-4 pt-2">
        <button onClick={() => setStep(1)} className="px-6 text-slate-400 font-bold hover:text-slate-600 transition-colors">Voltar</button>
        <button 
          onClick={() => setStep(3)}
          disabled={!formData.story}
          className="flex-1 bg-slate-900 hover:bg-black text-white p-5 rounded-2xl font-bold disabled:opacity-50 shadow-xl"
        >
          Escolher Estilo
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
              formData.style === style.id ? 'border-brand-500 bg-brand-50 shadow-md' : 'border-slate-100 hover:border-brand-200 bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-slate-900">{style.name}</h3>
              {formData.style === style.id && <Check className="text-brand-600 w-5 h-5" />}
            </div>
            <p className="text-xs text-slate-500 mb-3">{style.description}</p>
            <button 
              onClick={(e) => { e.stopPropagation(); toggleAudio(style.id); }}
              className="flex items-center gap-2 text-xs font-bold text-brand-600 bg-white border border-brand-100 px-3 py-2 rounded-full hover:bg-brand-50 transition-colors"
            >
              {playing === style.id ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
              {playing === style.id ? 'Parar Exemplo' : 'Ouvir Exemplo'}
              <audio id={`audio-${style.id}`} src={style.previewUrl} />
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <button onClick={() => setStep(2)} className="px-6 text-slate-400 font-bold">Voltar</button>
        <button 
          onClick={() => { if(playing) toggleAudio(playing); setStep(4); }}
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
        <p className="text-slate-500 text-sm mt-1">Confirma as garantias antes de selarmos a história.</p>
      </div>
      <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-sm space-y-5">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-slate-700">
            <div className="bg-green-100 p-2 rounded-lg text-green-600"><MessageCircle size={18} /></div>
            <span>Entrega via <strong>WhatsApp e E-mail</strong></span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-700">
            <div className="bg-amber-100 p-2 rounded-lg text-amber-600"><RotateCcw size={18} /></div>
            <span><strong>Ajustes Incluídos:</strong> Só paramos quando for perfeita</span>
          </div>
        </div>

        <div 
          onClick={() => setFormData({...formData, fastDelivery: !formData.fastDelivery})}
          className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
            formData.fastDelivery ? 'border-brand-500 bg-brand-50' : 'border-slate-100 bg-slate-50'
          }`}
        >
          <div className="flex justify-between items-center mb-1">
            <span className="font-bold text-slate-800 flex items-center gap-2 text-sm">
              <Sparkles size={16} className="text-brand-500" /> Prioridade 24 Horas
            </span>
            <span className="text-brand-600 font-bold">+4,99€</span>
          </div>
          <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Passagem direta para o topo da produção.</p>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
          <span className="font-bold text-slate-900 text-lg opacity-40 uppercase tracking-tighter">Investimento</span>
          <span className="text-3xl font-bold text-brand-600 font-sans">{finalPrice.toFixed(2)}€</span>
        </div>
      </div>
      <button 
        onClick={handlePaymentRedirect}
        className="w-full bg-slate-900 hover:bg-black text-white p-5 rounded-2xl font-bold shadow-2xl transition-all transform active:scale-95 flex items-center justify-center gap-3"
      >
        Imortalizar a Nossa História • {finalPrice.toFixed(2)}€
      </button>
    </div>
  );

  const renderStep5 = () => (
    <div className="text-center space-y-6 animate-fadeIn py-10 px-4">
      <div className="flex justify-center">
        <div className="bg-green-500 p-5 rounded-full text-white shadow-xl shadow-green-200">
          <Check size={48} strokeWidth={3} />
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-serif font-bold text-slate-900 italic">Veredito Selado.</h2>
        <p className="font-medium text-slate-500">A vossa história entrou em produção oficial.</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col items-center gap-2 shadow-sm">
            <MessageCircle className="text-green-500" size={24} />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">WhatsApp</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col items-center gap-2 shadow-sm">
            <Mail className="text-blue-500" size={24} />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">E-mail</span>
        </div>
      </div>

      <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10"><Sparkles size={40}/></div>
        <p className="text-xs opacity-60 mb-2 font-black uppercase tracking-[0.2em]">Tempo de Entrega</p>
        <p className="text-2xl font-bold font-sans">{formData.fastDelivery ? 'Menos de 24 Horas' : 'Até 72 Horas'}</p>
      </div>

      <p className="text-slate-400 text-xs italic px-6 leading-relaxed">
        Fica atento aos teus canais. Se precisares de ajustar a letra, basta responderes à nossa mensagem.
      </p>
      <button onClick={onBack} className="text-slate-400 text-sm font-bold hover:text-slate-900 transition-colors pt-4">Voltar ao Início</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4 font-sans selection:bg-brand-100">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-100">
        
        {step < 5 && (
          <>
            <div className="bg-slate-900 p-5 flex items-center gap-4 text-white">
              <button onClick={onBack} className="hover:bg-slate-800 p-2 rounded-full transition-colors">
                <ArrowLeft size={20} />
              </button>
              <div className="flex-1 text-center font-bold text-sm tracking-tight">Passo {step} de 4</div>
              <div className="w-10"></div>
            </div>
            
            <div className="h-1.5 bg-slate-100 w-full">
              <div 
                className="h-full bg-brand-500 transition-all duration-700 ease-in-out"
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
          </>
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
