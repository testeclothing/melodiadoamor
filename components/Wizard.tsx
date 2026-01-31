import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Play, Pause, Check, Sparkles, Lightbulb, 
  MessageCircleHeart, MessageCircle, Mail, MapPin, 
  Heart, Stars, Coffee, Music, ShieldCheck, RotateCcw
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

  const BASE_PRICE = 24.99;
  const RUSH_FEE = 4.99;
  const finalPrice = formData.fastDelivery ? BASE_PRICE + RUSH_FEE : BASE_PRICE;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('status') === 'success') {
      setStep(5);
      const amount = urlParams.get('amt') || '24.99';
      if (window.ttq) window.ttq.track('CompletePayment', { value: parseFloat(amount), currency: 'EUR' });
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleStripe = () => {
    const L_STD = "https://buy.stripe.com/test_5kQbJ30KG8kg7NUeVofUQ00";
    const L_FAST = "https://buy.stripe.com/test_8x24gB0KGaso7NU00ufUQ01";
    if (window.ttq) window.ttq.track('InitiateCheckout', { value: finalPrice, currency: 'EUR' });
    window.location.href = formData.fastDelivery ? L_FAST : L_STD;
  };

  const toggleAudio = (id: string) => {
    const audios = document.getElementsByTagName('audio');
    for (let i = 0; i < audios.length; i++) if (audios[i].id !== `audio-${id}`) { audios[i].pause(); audios[i].currentTime = 0; }
    const current = document.getElementById(`audio-${id}`) as HTMLAudioElement;
    if (current) { if (playing === id) { current.pause(); setPlaying(null); } else { current.play(); setPlaying(id); } }
  };

  const renderStep1 = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-3xl font-serif font-bold text-slate-900 italic">Identidade</h2>
        <p className="text-slate-400 text-sm mt-2">Quem são os protagonistas deste hino?</p>
      </div>
      <div className="relative group">
        <input 
          type="text" 
          className="w-full bg-transparent border-b-2 border-slate-200 py-4 text-2xl text-center focus:border-brand-500 outline-none transition-all font-serif italic text-slate-800"
          placeholder="Ex: Carlos & Carla"
          value={formData.names}
          onChange={(e) => setFormData({...formData, names: e.target.value})}
        />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-brand-500 group-focus-within:w-full transition-all duration-500"></div>
      </div>
      <button onClick={() => setStep(2)} disabled={!formData.names} className="w-full bg-slate-900 text-white p-5 rounded-full font-bold shadow-2xl disabled:opacity-30 transition-all hover:bg-black uppercase tracking-widest text-xs">Começar a Composição</button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-fadeIn max-h-[70vh] overflow-y-auto px-1 custom-scrollbar">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-serif font-bold text-slate-900 italic">Mapear o Destino</h2>
        <p className="text-slate-400 text-xs mt-1 uppercase tracking-widest">Responde ao essencial. Nós tratamos do impacto.</p>
      </div>

      <div className="grid gap-6">
        {[
          { key: 'meeting', label: 'Origem', icon: <MapPin size={16}/>, placeholder: 'Onde tudo começou...' },
          { key: 'memory', label: 'O Marco', icon: <Stars size={16}/>, placeholder: 'A vossa memória favorita...' },
          { key: 'loveMost', label: 'A Essência', icon: <Heart size={16}/>, placeholder: 'O que mais amas nele(a)...' }
        ].map((item) => (
          <div key={item.key} className="bg-slate-50 p-5 rounded-[2rem] border border-slate-100 focus-within:bg-white focus-within:shadow-lg transition-all">
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
              {item.icon} {item.label}
            </label>
            <input 
              type="text"
              className="w-full bg-transparent outline-none text-sm font-medium text-slate-800 placeholder:text-slate-300"
              placeholder={item.placeholder}
              value={(formData as any)[item.key]}
              onChange={(e) => setFormData({...formData, [item.key]: e.target.value})}
            />
          </div>
        ))}

        <div className="grid grid-cols-2 gap-4">
          {[
            { key: 'hobbies', label: 'Hobbies', icon: <Coffee size={14}/> },
            { key: 'loveLanguage', label: 'Linguagem', icon: <MessageCircleHeart size={14}/> }
          ].map((item) => (
            <div key={item.key} className="bg-slate-50 p-4 rounded-[1.5rem] border border-slate-100 focus-within:bg-white transition-all">
              <label className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">{item.icon} {item.label}</label>
              <input type="text" className="w-full bg-transparent outline-none text-xs font-medium" placeholder="..." value={(formData as any)[item.key]} onChange={(e) => setFormData({...formData, [item.key]: e.target.value})} />
            </div>
          ))}
        </div>

        <div className="pt-2">
          <label className="block text-[9px] font-bold text-slate-300 uppercase tracking-[0.3em] mb-3 text-center italic">Observações Opcionais</label>
          <textarea 
            className="w-full p-4 bg-white border-2 border-dashed border-slate-100 rounded-2xl h-24 focus:border-slate-200 outline-none text-xs resize-none italic text-slate-500"
            placeholder="Piadas internas, frases vossas ou outros detalhes..."
            value={formData.extra}
            onChange={(e) => setFormData({...formData, extra: e.target.value})}
          />
        </div>
      </div>

      <div className="flex gap-4 pt-6">
        <button onClick={() => setStep(1)} className="px-6 text-slate-300 font-black uppercase text-[10px] tracking-widest">Voltar</button>
        <button onClick={() => setStep(3)} disabled={!formData.meeting || !formData.memory} className="flex-1 bg-slate-900 text-white p-5 rounded-full font-bold shadow-xl disabled:opacity-20 uppercase tracking-widest text-[10px]">Escolher Estilo</button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-serif font-bold text-slate-900 italic">Frequência</h2>
        <p className="text-slate-400 text-xs mt-1 uppercase tracking-widest text-shadow-sm">A vibe que vai selar o vosso pacto.</p>
      </div>
      <div className="grid gap-4">
        {MUSIC_STYLES.map((s) => (
          <div key={s.id} onClick={() => setFormData({...formData, style: s.id})} className={`group p-5 rounded-[2rem] border-2 cursor-pointer transition-all relative overflow-hidden ${formData.style === s.id ? 'border-brand-500 bg-brand-50 shadow-xl scale-[1.02]' : 'border-slate-50 bg-slate-50 hover:border-slate-200'}`}>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-slate-900 text-sm tracking-tight">{s.name}</h3>
                <p className="text-[10px] text-slate-400 font-medium">{s.desc}</p>
              </div>
              {formData.style === s.id && <Check className="text-brand-500" size={20}/>}
            </div>
            <button onClick={(e) => { e.stopPropagation(); toggleAudio(s.id); }} className="mt-4 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-brand-600 bg-white px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all">
              {playing === s.id ? <Pause size={12} fill="currentColor"/> : <Play size={12} fill="currentColor"/>}
              {playing === s.id ? 'Parar' : 'Ouvir Exemplo'}
              <audio id={`audio-${s.id}`} src={s.url} />
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <button onClick={() => setStep(2)} className="px-6 text-slate-300 font-black uppercase text-[10px] tracking-widest">Voltar</button>
        <button onClick={() => { if(playing) toggleAudio(playing); setStep(4); }} disabled={!formData.style} className="flex-1 bg-slate-900 text-white p-5 rounded-full font-bold shadow-xl uppercase tracking-widest text-[10px]">Ver Veredito</button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-serif font-bold text-slate-900 italic italic">O Veredito Final</h2>
        <p className="text-slate-400 text-xs mt-1 uppercase tracking-widest">Garantias de um clássico instantâneo.</p>
      </div>
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-5 rotate-12"><Music size={100}/></div>
        <div className="space-y-4 relative">
          <div className="flex items-center gap-4 text-xs font-bold text-slate-600">
            <div className="bg-green-100 p-2 rounded-xl text-green-600"><MessageCircle size={16}/></div>
            <span>Entrega via <strong>WhatsApp e E-mail</strong></span>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold text-slate-600">
            <div className="bg-blue-100 p-2 rounded-xl text-blue-600"><ShieldCheck size={16}/></div>
            <span><strong>Ajustes de Letra Incluídos</strong></span>
          </div>
        </div>
        <div onClick={() => setFormData({...formData, fastDelivery: !formData.fastDelivery})} className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${formData.fastDelivery ? 'border-amber-400 bg-amber-50' : 'border-slate-50 bg-slate-50'}`}>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[11px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-2"><Sparkles size={14} className="text-amber-500"/> Prioridade 24h</span>
            <span className="text-amber-600 font-bold text-sm">+4,99€</span>
          </div>
          <p className="text-[9px] text-slate-400 uppercase font-bold">Topo da fila de produção.</p>
        </div>
        <div className="flex justify-between items-center pt-6 border-t border-slate-50">
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Investimento</span>
          <span className="text-4xl font-serif font-bold text-brand-600">{finalPrice.toFixed(2)}€</span>
        </div>
      </div>
      <button onClick={handleStripe} className="w-full bg-slate-900 text-white p-6 rounded-full font-bold shadow-2xl transition-all transform active:scale-95 uppercase tracking-widest text-xs">Selar o Pacto</button>
    </div>
  );

  const renderStep5 = () => (
    <div className="text-center space-y-8 py-12 animate-fadeIn px-4">
      <div className="relative inline-block">
        <div className="bg-green-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto text-white shadow-2xl">
          <Check size={48} strokeWidth={3} />
        </div>
        <div className="absolute -top-2 -right-2 text-amber-400 animate-bounce"><Sparkles size={24}/></div>
      </div>
      <div className="space-y-3">
        <h2 className="text-4xl font-serif font-bold text-slate-900 italic">Pacto Selado.</h2>
        <p className="text-slate-400 font-medium text-sm">A vossa história entrou em estúdio oficial.</p>
      </div>
      <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-3xl overflow-hidden relative">
        <p className="text-[10px] uppercase opacity-40 font-black tracking-[0.4em] mb-4">Entrega Estimada</p>
        <p className="text-3xl font-bold font-sans tracking-tighter">{formData.fastDelivery ? 'Menos de 24 Horas' : 'Até 72 Horas'}</p>
        <div className="mt-6 flex justify-center gap-6 opacity-50">
            <MessageCircle size={20}/> <Mail size={20}/> <RotateCcw size={20}/>
        </div>
      </div>
      <button onClick={onBack} className="text-slate-300 font-black uppercase text-[10px] tracking-[0.3em] hover:text-slate-900 transition-colors">Voltar ao início</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4 font-sans selection:bg-brand-200">
      <div className="bg-white w-full max-w-lg rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden border border-slate-50 relative">
        {step < 5 && (
          <div className="absolute top-0 left-0 w-full h-1 bg-slate-50">
            <div className="h-full bg-brand-500 transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(244,63,94,0.5)]" style={{ width: `${(step / 4) * 100}%` }}></div>
          </div>
        )}
        <div className="p-10 md:p-14">
          {step === 1 && renderStep1()} {step === 2 && renderStep2()}
          {step === 3 && renderStep3()} {step === 4 && renderStep4()}
          {step === 5 && renderStep5()}
        </div>
      </div>
    </div>
  );
};
