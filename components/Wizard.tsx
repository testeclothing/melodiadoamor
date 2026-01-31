import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Check, Sparkles, MessageCircle, Mail, RotateCcw, 
  Play, Pause, MapPin, Heart, Star, Smile, ShieldCheck, ChevronRight
} from 'lucide-react';

interface WizardProps {
  onBack: () => void;
}

const MUSIC_STYLES = [
  { id: 'soul', name: 'Alma & Emoção', desc: 'Estilo Teddy Swims. Voz forte e sentida.', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'rock', name: 'Pop Rock Romântico', desc: 'Estilo Bryan Adams. Clássico e intemporal.', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: 'pop', name: 'Pop Cinematic', desc: 'Estilo Lady Gaga. Grandioso e bonito.', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' }
];

export const Wizard: React.FC<WizardProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [playing, setPlaying] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    names: '',
    meeting: '',      // Obrigatório
    memory: '',       // Obrigatório
    loveMost: '',     // Obrigatório
    hobbies: '',      // Opcional
    extraDetails: '', // Opcional
    style: '',
    fastDelivery: false
  });

  const finalPrice = formData.fastDelivery ? 29.98 : 24.99;

  // Lógica de Retorno do Stripe
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('status') === 'success') {
      setStep(5);
      const amt = urlParams.get('amt') || '24.99';
      if ((window as any).ttq) (window as any).ttq.track('CompletePayment', { value: parseFloat(amt), currency: 'EUR' });
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleStripe = () => {
    // Teus links de teste
    const L_STD = "https://buy.stripe.com/test_5kQbJ30KG8kg7NUeVofUQ00";
    const L_FAST = "https://buy.stripe.com/test_8x24gB0KGaso7NU00ufUQ01";
    
    if ((window as any).ttq) (window as any).ttq.track('InitiateCheckout', { value: finalPrice, currency: 'EUR' });
    window.location.href = formData.fastDelivery ? L_FAST : L_STD;
  };

  const toggleAudio = (id: string) => {
    const audios = document.getElementsByTagName('audio');
    for (let i = 0; i < audios.length; i++) if (audios[i].id !== `audio-${id}`) { audios[i].pause(); audios[i].currentTime = 0; }
    const current = document.getElementById(`audio-${id}`) as HTMLAudioElement;
    if (current) { if (playing === id) { current.pause(); setPlaying(null); } else { current.play(); setPlaying(id); } }
  };

  // --- PASSOS DO FORMULÁRIO ---

  const renderStep1 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-bold text-slate-800">Vamos começar</h2>
        <p className="text-slate-500 text-sm mt-1">Como se chamam as pessoas da música?</p>
      </div>
      
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Nomes do Casal</label>
        <input 
          type="text" 
          className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none transition-all font-medium bg-white"
          placeholder="Ex: Ana e João"
          value={formData.names}
          onChange={(e) => setFormData({...formData, names: e.target.value})}
        />
      </div>
      
      <button 
        onClick={() => setStep(2)} 
        disabled={!formData.names} 
        className="w-full bg-rose-600 hover:bg-rose-700 text-white p-4 rounded-xl font-bold shadow-lg shadow-rose-100 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
      >
        Continuar <ChevronRight size={18} />
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-fadeIn max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-bold text-slate-800">A Vossa História</h2>
        <p className="text-slate-500 text-sm mt-1">Conta-nos um pouco sobre vocês para a letra ficar perfeita.</p>
      </div>

      <div className="space-y-4">
        {/* Perguntas Obrigatórias */}
        <div className="space-y-1">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase ml-1">
            <MapPin size={12} className="text-rose-500"/> Onde/Quando se conheceram? *
          </label>
          <input 
            type="text" 
            className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:border-rose-500 outline-none"
            placeholder="Ex: Na escola, no trabalho, em 2015..."
            value={formData.meeting}
            onChange={(e) => setFormData({...formData, meeting: e.target.value})}
          />
        </div>

        <div className="space-y-1">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase ml-1">
            <Star size={12} className="text-rose-500"/> Memória Favorita Juntos? *
          </label>
          <textarea 
            className="w-full p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:border-rose-500 outline-none"
            placeholder="Ex: A nossa viagem a Paris, o dia do pedido..."
            value={formData.memory}
            onChange={(e) => setFormData({...formData, memory: e.target.value})}
          />
        </div>

        <div className="space-y-1">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase ml-1">
            <Heart size={12} className="text-rose-500"/> O que mais amas nele(a)? *
          </label>
          <input 
            type="text" 
            className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:border-rose-500 outline-none"
            placeholder="Ex: O sorriso, a forma como me apoia..."
            value={formData.loveMost}
            onChange={(e) => setFormData({...formData, loveMost: e.target.value})}
          />
        </div>

        {/* Perguntas Opcionais */}
        <div className="pt-4 border-t border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase mb-3 text-center">Perguntas Opcionais</p>
            
            <div className="space-y-3">
                <div className="space-y-1">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-500 ml-1">
                        <Smile size={12}/> Hobbies ou Interesses?
                    </label>
                    <input 
                        type="text" 
                        className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:bg-white outline-none transition-colors"
                        placeholder="Ex: Viajar, Cozinhar, Body Pump..."
                        value={formData.hobbies}
                        onChange={(e) => setFormData({...formData, hobbies: e.target.value})}
                    />
                </div>
                
                <div className="space-y-1">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-500 ml-1">
                        <MessageCircle size={12}/> Detalhes Extra?
                    </label>
                    <textarea 
                        className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm h-16 resize-none focus:bg-white outline-none transition-colors"
                        placeholder="Piadas internas, frases especiais..."
                        value={formData.extraDetails}
                        onChange={(e) => setFormData({...formData, extraDetails: e.target.value})}
                    />
                </div>
            </div>
        </div>
      </div>

      <div className="flex gap-4 pt-2">
        <button onClick={() => setStep(1)} className="px-4 text-slate-400 font-bold text-sm hover:text-slate-600">Voltar</button>
        <button 
          onClick={() => setStep(3)} 
          disabled={!formData.meeting || !formData.memory || !formData.loveMost} 
          className="flex-1 bg-rose-600 text-white p-4 rounded-xl font-bold shadow-lg shadow-rose-100 disabled:opacity-50 transition-all"
        >
          Próximo Passo
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-bold text-slate-800">Estilo Musical</h2>
        <p className="text-slate-500 text-sm mt-1">Ouve os exemplos e escolhe o teu favorito.</p>
      </div>
      <div className="space-y-3">
        {MUSIC_STYLES.map((s) => (
          <div 
            key={s.id} 
            onClick={() => setFormData({...formData, style: s.id})}
            className={`p-4 border-2 rounded-xl cursor-pointer transition-all flex items-center justify-between ${
              formData.style === s.id 
                ? 'border-rose-500 bg-rose-50 ring-1 ring-rose-500' 
                : 'border-slate-100 hover:border-slate-300 bg-white'
            }`}
          >
            <div>
              <h3 className="font-bold text-slate-800 text-sm">{s.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{s.desc}</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={(e) => { e.stopPropagation(); toggleAudio(s.id); }}
                className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 hover:bg-rose-200 transition-colors"
              >
                {playing === s.id ? <Pause size={14} fill="currentColor"/> : <Play size={14} fill="currentColor"/>}
              </button>
              {formData.style === s.id && <div className="bg-rose-500 p-1 rounded-full"><Check size={12} className="text-white"/></div>}
            </div>
            <audio id={`audio-${s.id}`} src={s.url} />
          </div>
        ))}
      </div>

      <div className="flex gap-4 pt-2">
        <button onClick={() => setStep(2)} className="px-4 text-slate-400 font-bold text-sm hover:text-slate-600">Voltar</button>
        <button 
          onClick={() => { if(playing) toggleAudio(playing); setStep(4); }} 
          disabled={!formData.style} 
          className="flex-1 bg-rose-600 text-white p-4 rounded-xl font-bold shadow-lg shadow-rose-100 disabled:opacity-50 transition-all"
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

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="space-y-2 pb-4 border-b border-slate-100">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Música Personalizada</span>
            <span className="font-bold text-slate-900">24,99€</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 w-fit px-2 py-1 rounded">
            <MessageCircle size={12} /> Entrega WhatsApp + Email
          </div>
        </div>

        {/* Upsell 24h */}
        <div 
          onClick={() => setFormData({...formData, fastDelivery: !formData.fastDelivery})}
          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
            formData.fastDelivery 
              ? 'border-amber-400 bg-amber-50' 
              : 'border-slate-100 hover:border-slate-300'
          }`}
        >
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Sparkles size={16} className={formData.fastDelivery ? "text-amber-500" : "text-slate-400"} /> 
              Quero em 24 Horas
            </span>
            <span className="text-amber-600 font-bold text-sm">+4,99€</span>
          </div>
          <p className="text-xs text-slate-500 ml-6">Passamos o pedido para a frente da fila.</p>
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="font-bold text-slate-500 text-sm">Total a Pagar</span>
          <span className="text-2xl font-bold text-rose-600">{finalPrice.toFixed(2)}€</span>
        </div>
      </div>

      <div className="space-y-3">
        <button 
          onClick={handleStripe} 
          className="w-full bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl font-bold shadow-xl shadow-green-100 transition-all transform active:scale-95 flex items-center justify-center gap-2"
        >
          Finalizar Pedido <ShieldCheck size={18} />
        </button>
        <button onClick={() => setStep(3)} className="w-full text-slate-400 text-sm font-bold hover:text-slate-600">Voltar</button>
      </div>
      
      <p className="text-[10px] text-center text-slate-400 flex items-center justify-center gap-1">
        <RotateCcw size={10} /> Inclui revisões da letra se necessário.
      </p>
    </div>
  );

  const renderStep5 = () => (
    <div className="text-center space-y-6 py-10 animate-fadeIn px-4">
      <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-green-600">
        <Check size={40} strokeWidth={3} />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900">Pagamento Confirmado!</h2>
        <p className="text-slate-500 text-sm">A vossa história já está na nossa lista de produção.</p>
      </div>
      
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
         <p className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-widest">Entrega Estimada</p>
         <p className="text-xl font-bold text-slate-800 mb-4">{formData.fastDelivery ? 'Menos de 24 Horas' : 'Até 72 Horas'}</p>
         <div className="flex justify-center gap-2 text-xs text-slate-500">
            <span className="flex items-center gap-1 bg-white px-3 py-1 rounded border border-slate-200"><MessageCircle size={12}/> WhatsApp</span>
            <span className="flex items-center gap-1 bg-white px-3 py-1 rounded border border-slate-200"><Mail size={12}/> Email</span>
         </div>
      </div>
      
      <button onClick={onBack} className="text-rose-500 font-bold text-sm hover:underline">Voltar ao Início</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden border border-slate-100 relative">
        
        {/* Barra de Progresso Simples */}
        {step < 5 && (
          <div className="w-full bg-slate-100 h-1.5">
            <div className="bg-rose-500 h-full transition-all duration-500" style={{ width: `${(step / 4) * 100}%` }}></div>
          </div>
        )}

        <div className="p-6 md:p-8">
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
