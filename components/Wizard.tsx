import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, Sparkles, Clock, Lightbulb, MessageCircleHeart, Play, Pause, MessageCircle, Mail, RotateCcw } from 'lucide-react';

interface WizardProps {
  onBack: () => void;
}

const MUSIC_STYLES = [
  { id: 'soul', name: 'Alma & Intensidade', desc: 'Vibe Teddy Swims. Visceral.', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'rock', name: 'Eterno Rock', desc: 'Vibe Bryan Adams. Lealdade.', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: 'pop', name: 'Cinema & Romance', desc: 'Vibe Lady Gaga. Épico.', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' }
];

export const Wizard: React.FC<WizardProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [playing, setPlaying] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    names: '', meeting: '', memory: '', loveMost: '', hobbies: '', loveLanguage: '', extra: '', style: '', fastDelivery: false
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

  // --- RENDERS DOS 4 PASSOS ---

  const renderStep1 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-bold text-slate-800">Quem são os protagonistas?</h2>
        <p className="text-slate-500 text-sm mt-1 text-balance">Diz-nos os nomes que vão imortalizar esta canção.</p>
      </div>
      <div className="space-y-4">
        <input 
          type="text" 
          className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none transition-all font-medium"
          placeholder="Ex: Carlos e Carla"
          value={formData.names}
          onChange={(e) => setFormData({...formData, names: e.target.value})}
        />
        <button onClick={() => setStep(2)} disabled={!formData.names} className="w-full bg-rose-500 hover:bg-rose-600 text-white p-4 rounded-xl font-bold disabled:opacity-50 transition-all shadow-lg shadow-rose-500/20">Continuar</button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-fadeIn max-h-[70vh] overflow-y-auto pr-1">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-bold text-slate-800">A Vossa História</h2>
        <p className="text-slate-500 text-sm mt-1">Tu dás os detalhes, nós criamos a alma.</p>
      </div>
      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Onde se conheceram?</label>
          <input type="text" className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:bg-white" placeholder="Ex: Escola básica / No ginásio" value={formData.meeting} onChange={(e) => setFormData({...formData, meeting: e.target.value})} />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Memória favorita?</label>
          <textarea className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm h-20 outline-none resize-none focus:bg-white" placeholder="Ex: A viagem à Figueira da Foz..." value={formData.memory} onChange={(e) => setFormData({...formData, memory: e.target.value})} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input type="text" className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none" placeholder="O que mais amas nele/a?" value={formData.loveMost} onChange={(e) => setFormData({...formData, loveMost: e.target.value})} />
          <input type="text" className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none" placeholder="Linguagem de amor?" value={formData.loveLanguage} onChange={(e) => setFormData({...formData, loveLanguage: e.target.value})} />
        </div>
        <input type="text" className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none" placeholder="Piada interna ou extra (Opcional)" value={formData.extra} onChange={(e) => setFormData({...formData, extra: e.target.value})} />
      </div>
      <div className="flex gap-4 pt-2">
        <button onClick={() => setStep(1)} className="px-4 text-slate-400 font-bold text-sm">Voltar</button>
        <button onClick={() => setStep(3)} disabled={!formData.meeting || !formData.memory} className="flex-1 bg-rose-500 text-white p-4 rounded-xl font-bold shadow-lg shadow-rose-500/20">Avançar</button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-bold text-slate-800">Escolhe a Vibe</h2>
        <p className="text-slate-500 text-sm mt-1 italic">Ouve os exemplos e escolhe o teu favorito.</p>
      </div>
      <div className="space-y-3">
        {MUSIC_STYLES.map((s) => (
          <div key={s.id} onClick={() => setFormData({...formData, style: s.id})} className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.style === s.id ? 'border-rose-500 bg-rose-50' : 'border-slate-100 hover:border-slate-200'}`}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-slate-900">{s.name}</h3>
              {formData.style === s.id && <Check className="text-rose-500" size={20} />}
            </div>
            <button onClick={(e) => { e.stopPropagation(); toggleAudio(s.id); }} className="flex items-center gap-2 text-[10px] font-bold text-rose-600 bg-white border border-rose-100 px-3 py-1.5 rounded-full shadow-sm">
              {playing === s.id ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
              {playing === s.id ? 'Parar Exemplo' : 'Ouvir Exemplo'}
              <audio id={`audio-${s.id}`} src={s.url} />
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <button onClick={() => setStep(2)} className="px-4 text-slate-400 font-bold text-sm">Voltar</button>
        <button onClick={() => setStep(4)} disabled={!formData.style} className="flex-1 bg-rose-500 text-white p-4 rounded-xl font-bold shadow-lg shadow-rose-500/20">Ver Resumo</button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-bold text-slate-800 italic font-serif">Resumo do Pedido</h2>
        <p className="text-slate-500 text-sm mt-1">Confirma os detalhes antes de selarmos o pacto.</p>
      </div>
      <div className="bg-slate-50 p-6 rounded-2xl space-y-4 border border-slate-100 shadow-inner">
        <div className="flex justify-between border-b pb-3 text-sm">
          <span className="text-slate-500 italic">WhatsApp + E-mail (MP3 HD)</span>
          <Check size={16} className="text-green-500" />
        </div>
        <div className="flex justify-between border-b pb-3">
          <span className="text-slate-500 text-sm">Música Personalizada</span>
          <span className="font-bold text-slate-800">24,99€</span>
        </div>
        <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.fastDelivery ? 'border-amber-400 bg-amber-50 shadow-md' : 'border-slate-200 bg-white'}`}>
          <input type="checkbox" checked={formData.fastDelivery} onChange={(e) => setFormData({...formData, fastDelivery: e.target.checked})} className="mt-1 w-4 h-4 accent-amber-500" />
          <div className="flex-1">
            <div className="flex justify-between font-bold text-sm">
                <span><Sparkles size={14} className="inline mr-1 text-amber-500" />Quero em 24 Horas</span>
                <span className="text-amber-600">+4,99€</span>
            </div>
            <p className="text-[10px] text-slate-400 uppercase tracking-tighter">O teu pedido passa para o topo da produção.</p>
          </div>
        </label>
        <div className="flex justify-between items-center pt-2">
          <span className="font-bold text-slate-400 uppercase text-xs tracking-widest">Total</span>
          <span className="font-bold text-rose-600 text-3xl italic font-serif tracking-tighter">{finalPrice.toFixed(2)}€</span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <button onClick={handleStripe} className="w-full bg-slate-900 hover:bg-black text-white p-5 rounded-2xl font-bold shadow-2xl transition-all transform active:scale-95 text-lg">Selar o Pacto Agora</button>
        <button onClick={() => setStep(3)} className="text-slate-400 text-sm hover:underline">Voltar</button>
      </div>
      <p className="text-[10px] text-center text-slate-400 flex items-center justify-center gap-1 opacity-60">
        <RotateCcw size={10} /> Ajustes de letra incluídos. Só paramos quando for perfeita.
      </p>
    </div>
  );

  const renderStep5 = () => (
    <div className="text-center space-y-8 py-12 animate-fadeIn">
      <div className="bg-green-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto text-white shadow-xl shadow-green-100 animate-bounce">
        <Check size={48} strokeWidth={3} />
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-serif font-bold italic text-slate-900">Veredito Selado!</h2>
        <p className="text-slate-400 font-medium">A vossa música entrou em produção oficial.</p>
      </div>
      <div className="bg-slate-900 text-white p-8 rounded-3xl space-y-4 shadow-3xl">
         <div className="flex justify-center gap-4">
            <MessageCircle className="text-green-500" /> <Mail className="text-rose-400" />
         </div>
         <p className="text-sm font-medium">Receberás o link de download em menos de {formData.fastDelivery ? '24' : '72'} horas.</p>
      </div>
      <button onClick={onBack} className="text-slate-400 hover:text-slate-900 transition-colors text-sm font-bold uppercase tracking-widest">Voltar ao Início</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans selection:bg-rose-100">
      <div className="bg-white w-full max-w-lg rounded-[2rem] shadow-[0_30px_70px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-100 relative">
        
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
