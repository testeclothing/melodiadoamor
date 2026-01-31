import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, Sparkles, Clock, Lightbulb, MessageCircle, Mail, RotateCcw, Play, Pause } from 'lucide-react';

interface WizardProps {
  onBack: () => void;
}

const MUSIC_STYLES = [
  { id: 'soul', name: 'Alma & Intensidade', desc: 'Vibe Teddy Swims. Visceral e profunda.', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'rock', name: 'Eterno Rock', desc: 'Vibe Bryan Adams. Clássica e leal.', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: 'pop', name: 'Cinema & Romance', desc: 'Vibe Lady Gaga. Épica e grandiosa.', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' }
];

export const Wizard: React.FC<WizardProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [playing, setPlaying] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    names: '', story: '', style: '', fastDelivery: false
  });

  const finalPrice = formData.fastDelivery ? 29.98 : 24.99;

  // Lógica de Retorno do Stripe & Pixel
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
    // LINKS REAIS QUE FORNECERSTE
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

  // --- PASSOS DO WIZARD ---

  const renderStep1 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-bold text-slate-900 font-serif italic">Os Protagonistas</h2>
        <p className="text-slate-500 text-sm mt-1">Insere os nomes que vão imortalizar esta melodia.</p>
      </div>
      <input 
        type="text" 
        className="w-full p-5 border-2 border-slate-100 rounded-2xl focus:ring-2 focus:ring-rose-500 outline-none transition-all font-medium text-lg"
        placeholder="Ex: Carlos e Carla"
        value={formData.names}
        onChange={(e) => setFormData({...formData, names: e.target.value})}
      />
      <button onClick={() => setStep(2)} disabled={!formData.names} className="w-full bg-rose-500 hover:bg-rose-600 text-white p-5 rounded-2xl font-bold shadow-xl shadow-rose-500/20 disabled:opacity-30 transition-all">Continuar</button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-bold text-slate-900 font-serif italic">A Vossa História</h2>
        <p className="text-slate-500 text-sm mt-1">Tu dás os factos, nós criamos a alma.</p>
      </div>

      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-widest">
            <Lightbulb size={14} /> Dicas para a Letra:
        </div>
        <ul className="text-xs text-slate-600 space-y-1 font-medium">
            <li>• Onde se conheceram? (Ex: Escola, Ginásio...)</li>
            <li>• Memória favorita? (Ex: Viagens, Concertos...)</li>
            <li>• O que mais amas nele/a? (Ex: Alegria, Apoio...)</li>
            <li>• Hobbies ou Piadas Internas?</li>
        </ul>
      </div>

      <textarea 
        className="w-full p-5 border-2 border-slate-100 rounded-2xl h-44 focus:ring-2 focus:ring-rose-500 outline-none resize-none text-sm font-medium leading-relaxed"
        placeholder="Escreve aqui a vossa jornada..."
        value={formData.story}
        onChange={(e) => setFormData({...formData, story: e.target.value})}
      />

      <div className="flex gap-4">
        <button onClick={() => setStep(1)} className="px-6 text-slate-400 font-bold">Voltar</button>
        <button onClick={() => setStep(3)} disabled={formData.story.length < 10} className="flex-1 bg-rose-500 text-white p-5 rounded-2xl font-bold shadow-lg disabled:opacity-30">Escolher Estilo</button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-bold text-slate-900 font-serif italic">A Frequência</h2>
        <p className="text-slate-500 text-sm mt-1">O tom que vai selar o vosso pacto.</p>
      </div>
      <div className="space-y-3">
        {MUSIC_STYLES.map((s) => (
          <div key={s.id} onClick={() => setFormData({...formData, style: s.id})} className={`p-4 border-2 rounded-2xl cursor-pointer transition-all ${formData.style === s.id ? 'border-rose-500 bg-rose-50 shadow-md' : 'border-slate-100 hover:border-slate-200'}`}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-slate-900">{s.name}</h3>
              {formData.style === s.id && <Check className="text-rose-500" size={20} />}
            </div>
            <button onClick={(e) => { e.stopPropagation(); toggleAudio(s.id); }} className="flex items-center gap-2 text-[10px] font-bold text-rose-600 bg-white border border-rose-100 px-3 py-1.5 rounded-full">
              {playing === s.id ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
              {playing === s.id ? 'Parar' : 'Ouvir Exemplo'}
              <audio id={`audio-${s.id}`} src={s.url} />
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <button onClick={() => setStep(2)} className="px-6 text-slate-400 font-bold">Voltar</button>
        <button onClick={() => setStep(4)} disabled={!formData.style} className="flex-1 bg-rose-500 text-white p-5 rounded-2xl font-bold shadow-lg disabled:opacity-30">Ver Veredito</button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-bold text-slate-900 font-serif italic">O Vosso Pacto</h2>
        <p className="text-slate-500 text-sm mt-1">Confirma o destino final da vossa história.</p>
      </div>
      <div className="bg-slate-50 p-6 rounded-3xl space-y-5 border border-slate-100 shadow-inner">
        <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                <Check className="text-green-500" size={16} /> Entrega via <strong>WhatsApp e E-mail</strong>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                <RotateCcw className="text-rose-500" size={16} /> Ajustes incluídos até estar perfeita
            </div>
        </div>

        <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.fastDelivery ? 'border-amber-400 bg-amber-50 shadow-md' : 'border-slate-200 bg-white'}`}>
          <input type="checkbox" checked={formData.fastDelivery} onChange={(e) => setFormData({...formData, fastDelivery: e.target.checked})} className="mt-1 w-4 h-4 accent-amber-500" />
          <div className="flex-1">
            <div className="flex justify-between font-bold text-sm">
                <span><Sparkles size={14} className="inline mr-1 text-amber-500" />Prioridade 24 Horas</span>
                <span className="text-amber-600">+4,99€</span>
            </div>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">O teu hino passa para a frente da fila.</p>
          </div>
        </label>
        
        <div className="flex justify-between items-center pt-4 border-t border-slate-200">
          <span className="font-bold text-slate-400 uppercase text-xs tracking-widest">Investimento</span>
          <span className="font-bold text-rose-600 text-3xl font-serif">{finalPrice.toFixed(2)}€</span>
        </div>
      </div>
      
      <button onClick={handleStripe} className="w-full bg-slate-900 hover:bg-black text-white p-5 rounded-2xl font-bold shadow-2xl transition-all transform active:scale-95 text-lg">Selar o Pacto Agora</button>
      <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest opacity-60">A produção começa após o pagamento.</p>
    </div>
  );

  const renderStep5 = () => (
    <div className="text-center space-y-8 py-12 animate-fadeIn">
      <div className="bg-green-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto text-white shadow-xl shadow-green-100">
        <Check size={48} strokeWidth={3} />
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-serif font-bold italic text-slate-900">Veredito Selado.</h2>
        <p className="text-slate-400 font-medium">A vossa história entrou em produção oficial.</p>
      </div>
      <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-3xl">
         <div className="flex justify-center gap-4 mb-4">
            <MessageCircle className="text-green-500" /> <Mail className="text-rose-400" />
         </div>
         <p className="text-sm font-medium">Receberás o link de download no WhatsApp e E-mail em menos de {formData.fastDelivery ? '24' : '72'} horas.</p>
      </div>
      <button onClick={onBack} className="text-slate-400 hover:text-slate-900 transition-colors text-sm font-bold uppercase tracking-widest">Voltar ao Início</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-100 relative">
        {step < 5 && (
          <div className="bg-slate-900 p-5 flex items-center text-white">
            <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-full transition-colors"><ArrowLeft size={20} /></button>
            <div className="flex-1 text-center font-bold text-xs uppercase tracking-[0.2em]">Passo {step} de 4</div>
            <div className="w-10"></div>
          </div>
        )}
        <div className="p-8 md:p-12">
          {step === 1 && renderStep1()} {step === 2 && renderStep2()}
          {step === 3 && renderStep3()} {step === 4 && renderStep4()}
          {step === 5 && renderStep5()}
        </div>
      </div>
    </div>
  );
};
