import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Play, Pause, Check, Sparkles, Lightbulb, 
  MessageCircleHeart, MessageCircle, Mail, RotateCcw, 
  ChevronRight, Volume2, ShieldCheck
} from 'lucide-react';

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

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('status') === 'success') {
      setStep(5);
      const amount = urlParams.get('amt') || '24.99';
      if ((window as any).ttq) (window as any).ttq.track('CompletePayment', { value: parseFloat(amount), currency: 'EUR' });
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

  // --- RENDERS ---

  const renderStep1 = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-serif font-bold text-slate-900 italic tracking-tight">Primeiro, os nomes.</h2>
        <p className="text-slate-400 text-sm">Quem são os protagonistas desta história?</p>
      </div>
      <div className="bg-slate-50 p-1 rounded-2xl border border-slate-100">
        <input 
          type="text" 
          className="w-full bg-white p-5 rounded-xl text-xl text-center focus:ring-2 focus:ring-brand-500 outline-none transition-all font-medium text-slate-800 shadow-sm"
          placeholder="Ex: Carlos e Carla"
          value={formData.names}
          onChange={(e) => setFormData({...formData, names: e.target.value})}
        />
      </div>
      <button 
        onClick={() => setStep(2)} 
        disabled={!formData.names} 
        className="w-full bg-slate-900 text-white p-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all shadow-xl disabled:opacity-20"
      >
        Continuar <ChevronRight size={20} />
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8 animate-fadeIn max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
      <div className="text-center">
        <h2 className="text-2xl font-serif font-bold text-slate-900 italic">Mapear o Vosso Legado</h2>
        <p className="text-slate-400 text-xs mt-1 uppercase tracking-widest font-bold">Responde ao essencial. Nós tratamos do impacto.</p>
      </div>

      <div className="space-y-6">
        {[
          { key: 'meeting', label: 'Onde ou quando se conheceram?', placeholder: 'Ex: No ginásio em 2018...' },
          { key: 'memory', label: 'Qual a vossa memória favorita?', placeholder: 'Ex: O dia na Figueira da Foz...' },
          { key: 'loveMost', label: 'O que mais amas nele(a)?', placeholder: 'Ex: O poço de alegria que ela é...' },
          { key: 'hobbies', label: 'Quais são os hobbies dele(a)?', placeholder: 'Ex: Body Pump e Viajar...' },
          { key: 'loveLanguage', label: 'Qual a linguagem de amor?', placeholder: 'Ex: Toque físico e tempo juntos...' }
        ].map((q) => (
          <div key={q.key} className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{q.label}</label>
            <input 
              type="text"
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none text-sm font-medium text-slate-800 transition-all"
              placeholder={q.placeholder}
              value={(formData as any)[q.key]}
              onChange={(e) => setFormData({...formData, [q.key]: e.target.value})}
            />
          </div>
        ))}

        <div className="pt-4 border-t border-slate-100">
          <label className="flex items-center gap-2 text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-2 italic">
            <MessageCircleHeart size={12} /> Algum detalhe extra? (Opcional)
          </label>
          <textarea 
            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl h-24 focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none text-xs resize-none font-medium"
            placeholder="Piadas internas, frases vossas..."
            value={formData.extra}
            onChange={(e) => setFormData({...formData, extra: e.target.value})}
          />
        </div>
      </div>

      <div className="flex gap-4 sticky bottom-0 bg-white pt-4 pb-2">
        <button onClick={() => setStep(1)} className="px-6 text-slate-400 font-bold text-sm">Voltar</button>
        <button 
          onClick={() => setStep(3)} 
          disabled={!formData.meeting || !formData.memory || !formData.loveMost} 
          className="flex-1 bg-slate-900 text-white p-5 rounded-2xl font-bold shadow-xl disabled:opacity-20 transition-all"
        >
          Avançar
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-serif font-bold text-slate-900 italic">A Vossa Frequência</h2>
        <p className="text-slate-400 text-xs mt-1 uppercase tracking-widest font-bold">Escolhe o tom que vai selar o vosso pacto.</p>
      </div>
      <div className="space-y-4">
        {MUSIC_STYLES.map((s) => (
          <div 
            key={s.id} 
            onClick={() => setFormData({...formData, style: s.id})} 
            className={`group p-5 rounded-2xl border-2 cursor-pointer transition-all relative ${formData.style === s.id ? 'border-brand-500 bg-brand-50' : 'border-slate-100 hover:border-brand-200'}`}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-slate-900">{s.name}</h3>
              {formData.style === s.id && <div className="bg-brand-500 p-1 rounded-full text-white"><Check size={14} /></div>}
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={(e) => { e.stopPropagation(); toggleAudio(s.id); }} 
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-600 bg-white border border-brand-100 px-4 py-2 rounded-full shadow-sm"
              >
                {playing === id ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
                {playing === id ? 'Parar' : 'Ouvir Exemplo'}
                <audio id={`audio-${s.id}`} src={s.url} />
              </button>
              <p className="text-[11px] text-slate-500 italic">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <button onClick={() => setStep(2)} className="px-6 text-slate-400 font-bold text-sm">Voltar</button>
        <button 
          onClick={() => { if(playing) toggleAudio(playing); setStep(4); }} 
          disabled={!formData.style} 
          className="flex-1 bg-slate-900 text-white p-5 rounded-2xl font-bold shadow-xl transition-all"
        >
          Ver Resumo
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-serif font-bold text-slate-900 italic">Veredito Final</h2>
        <p className="text-slate-400 text-xs mt-1 uppercase tracking-widest font-bold">Garantias de um hino imortal.</p>
      </div>
      <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-2xl space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
            <div className="bg-green-100 p-2 rounded-xl text-green-600"><MessageCircle size={18} /></div>
            <span>Entrega via <strong>WhatsApp e E-mail</strong></span>
          </div>
          <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
            <div className="bg-brand-100 p-2 rounded-xl text-brand-600"><RotateCcw size={18} /></div>
            <span><strong>Ajustes de Letra Incluídos</strong></span>
          </div>
        </div>

        <div 
          onClick={() => setFormData({...formData, fastDelivery: !formData.fastDelivery})} 
          className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${formData.fastDelivery ? 'border-amber-400 bg-amber-50' : 'border-slate-50 bg-slate-50'}`}
        >
          <div className="flex justify-between items-center">
            <span className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
              <Sparkles size={16} className="text-amber-500" /> Entrega em 24h
            </span>
            <span className="text-amber-600 font-bold">+4,99€</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-slate-100">
          <span className="font-bold text-slate-300 uppercase tracking-widest text-[10px]">Investimento Total</span>
          <span className="text-3xl font-serif font-bold text-brand-600">{finalPrice.toFixed(2)}€</span>
        </div>
      </div>
      <button 
        onClick={handleStripe} 
        className="w-full bg-slate-900 text-white p-6 rounded-2xl font-bold shadow-2xl transition-all transform active:scale-95 uppercase tracking-[0.2em] text-xs"
      >
        Selar o Pacto Agora
      </button>
      <p className="text-center text-[10px] text-slate-400 flex items-center justify-center gap-2">
        <ShieldCheck size={12} /> Pagamento Seguro via Stripe
      </p>
    </div>
  );

  const renderStep5 = () => (
    <div className="text-center space-y-8 py-10 animate-fadeIn px-4">
      <div className="bg-green-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto text-white shadow-2xl">
        <Check size={48} strokeWidth={3} />
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-serif font-bold text-slate-900 italic">Veredito Selado.</h2>
        <p className="text-slate-400 font-medium">A vossa história entrou em estúdio oficial.</p>
      </div>
      <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-3xl text-center">
        <p className="text-[10px] uppercase opacity-40 font-black tracking-[0.3em] mb-4">Prazo de Entrega</p>
        <p className="text-3xl font-bold font-sans tracking-tighter">
          {formData.fastDelivery ? 'Menos de 24 Horas' : 'Até 72 Horas'}
        </p>
        <div className="mt-6 flex justify-center gap-4 opacity-50">
            <MessageCircle size={20} /> <Mail size={20} />
        </div>
      </div>
      <button onClick={onBack} className="text-slate-400 font-bold hover:text-slate-900 transition-colors uppercase text-[10px] tracking-widest">Voltar ao início</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4 font-sans selection:bg-brand-100">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden border border-slate-50 relative">
        {step < 5 && (
          <div className="absolute top-0 left-0 w-full h-1 bg-slate-50">
            <div className="h-full bg-brand-500 transition-all duration-1000 ease-out" style={{ width: `${(step / 4) * 100}%` }}></div>
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
