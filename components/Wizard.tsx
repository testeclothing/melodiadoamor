import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Check, Sparkles, MessageCircle, Mail, RotateCcw, 
  Play, Pause, MapPin, Heart, Star, Smile, Mic, ShieldCheck 
} from 'lucide-react';

interface WizardProps {
  onBack: () => void;
}

const MUSIC_STYLES = [
  { id: 'soul', name: 'Alma & Intensidade', desc: 'Vibe Teddy Swims. Voz rasgada e profunda.', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'rock', name: 'Eterno Rock', desc: 'Vibe Bryan Adams. Clássica e leal.', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: 'pop', name: 'Cinema & Romance', desc: 'Vibe Lady Gaga. Épica e grandiosa.', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' }
];

export const Wizard: React.FC<WizardProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [playing, setPlaying] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    names: '',
    // As tuas 5 perguntas obrigatórias
    q1_meeting: '',
    q2_memory: '',
    q3_loveMost: '',
    q4_hobbies: '',
    q5_loveLanguage: '',
    // Caixa opcional
    extraDetails: '', 
    style: '',
    fastDelivery: false
  });

  const finalPrice = formData.fastDelivery ? 29.98 : 24.99;

  // --- LÓGICA DE STRIPE & PIXEL ---
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
    const L_STD = "https://buy.stripe.com/test_5kQbJ30KG8kg7NUeVofUQ00"; // Teus links
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

  // --- COMPONENTES VISUAIS (DESIGN TRUELOVESONG) ---

  const renderStep1 = () => (
    <div className="space-y-8 animate-fadeIn max-w-md mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">Identidade</h2>
        <p className="text-zinc-400 text-sm">Quem são os protagonistas desta história?</p>
      </div>
      
      <div className="space-y-4">
        <div className="group relative">
          <input 
            type="text" 
            className="w-full bg-zinc-900 border-2 border-zinc-800 p-6 rounded-2xl text-xl text-center focus:border-rose-500 outline-none transition-all text-white placeholder:text-zinc-600 font-medium"
            placeholder="Ex: Carlos e Carla"
            value={formData.names}
            onChange={(e) => setFormData({...formData, names: e.target.value})}
            autoFocus
          />
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent opacity-0 group-focus-within:opacity-50 transition-opacity rounded-b-2xl"></div>
        </div>
        
        <button 
          onClick={() => setStep(2)} 
          disabled={!formData.names} 
          className="w-full bg-rose-600 hover:bg-rose-700 text-white p-5 rounded-full font-bold shadow-[0_0_30px_-5px_rgba(225,29,72,0.4)] disabled:opacity-30 disabled:shadow-none transition-all uppercase tracking-widest text-xs"
        >
          Começar a História
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-fadeIn max-w-lg mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-white">O Vosso Legado</h2>
        <p className="text-zinc-400 text-xs uppercase tracking-widest mt-2">Responde ao essencial. Nós criamos a poesia.</p>
      </div>

      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
        {/* PERGUNTA 1 */}
        <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800 focus-within:border-rose-500/50 transition-colors">
          <label className="flex items-center gap-2 text-[10px] font-bold text-rose-400 uppercase tracking-widest mb-2">
            <MapPin size={12} /> Quando ou onde se conheceram?
          </label>
          <input 
            type="text" 
            className="w-full bg-transparent text-white placeholder:text-zinc-600 outline-none text-sm font-medium"
            placeholder="Ex: No ginásio em 2018..."
            value={formData.q1_meeting}
            onChange={(e) => setFormData({...formData, q1_meeting: e.target.value})}
          />
        </div>

        {/* PERGUNTA 2 */}
        <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800 focus-within:border-rose-500/50 transition-colors">
          <label className="flex items-center gap-2 text-[10px] font-bold text-rose-400 uppercase tracking-widest mb-2">
            <Star size={12} /> Qual a tua memória juntos favorita?
          </label>
          <textarea 
            className="w-full bg-transparent text-white placeholder:text-zinc-600 outline-none text-sm font-medium resize-none h-16"
            placeholder="Ex: A viagem à Figueira da Foz..."
            value={formData.q2_memory}
            onChange={(e) => setFormData({...formData, q2_memory: e.target.value})}
          />
        </div>

        {/* PERGUNTA 3 */}
        <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800 focus-within:border-rose-500/50 transition-colors">
          <label className="flex items-center gap-2 text-[10px] font-bold text-rose-400 uppercase tracking-widest mb-2">
            <Heart size={12} /> O que amas mais nele(a)?
          </label>
          <input 
            type="text" 
            className="w-full bg-transparent text-white placeholder:text-zinc-600 outline-none text-sm font-medium"
            placeholder="Ex: A alegria contagiante..."
            value={formData.q3_loveMost}
            onChange={(e) => setFormData({...formData, q3_loveMost: e.target.value})}
          />
        </div>

        {/* PERGUNTA 4 & 5 (Grid) */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800 focus-within:border-rose-500/50 transition-colors">
            <label className="flex items-center gap-2 text-[9px] font-bold text-rose-400 uppercase tracking-widest mb-2">
              <Smile size={12} /> Hobbies?
            </label>
            <input 
              type="text" 
              className="w-full bg-transparent text-white placeholder:text-zinc-600 outline-none text-sm font-medium"
              placeholder="Ex: Body Pump"
              value={formData.q4_hobbies}
              onChange={(e) => setFormData({...formData, q4_hobbies: e.target.value})}
            />
          </div>
          <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800 focus-within:border-rose-500/50 transition-colors">
            <label className="flex items-center gap-2 text-[9px] font-bold text-rose-400 uppercase tracking-widest mb-2">
              <MessageCircle size={12} /> Linguagem Amor?
            </label>
            <input 
              type="text" 
              className="w-full bg-transparent text-white placeholder:text-zinc-600 outline-none text-sm font-medium"
              placeholder="Ex: Toque físico"
              value={formData.q5_loveLanguage}
              onChange={(e) => setFormData({...formData, q5_loveLanguage: e.target.value})}
            />
          </div>
        </div>

        {/* BOX OPCIONAL */}
        <div className="mt-6 pt-4 border-t border-zinc-800">
          <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 text-center">
            Queres acrescentar mais detalhes? (Opcional)
          </label>
          <textarea 
            className="w-full bg-black border border-zinc-800 p-4 rounded-xl text-white placeholder:text-zinc-700 outline-none text-xs focus:border-zinc-600 transition-colors h-20 resize-none"
            placeholder="Piadas internas, frases especiais, ou qualquer outra coisa..."
            value={formData.extraDetails}
            onChange={(e) => setFormData({...formData, extraDetails: e.target.value})}
          />
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button onClick={() => setStep(1)} className="px-6 text-zinc-500 font-bold text-xs uppercase tracking-widest hover:text-white transition-colors">Voltar</button>
        <button 
          onClick={() => setStep(3)} 
          disabled={!formData.q1_meeting || !formData.q2_memory} 
          className="flex-1 bg-rose-600 hover:bg-rose-700 text-white p-4 rounded-full font-bold shadow-lg disabled:opacity-30 uppercase tracking-widest text-xs transition-all"
        >
          Escolher Estilo
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8 animate-fadeIn max-w-md mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-white">A Frequência</h2>
        <p className="text-zinc-400 text-xs uppercase tracking-widest">O tom que vai selar o vosso pacto.</p>
      </div>
      
      <div className="space-y-4">
        {MUSIC_STYLES.map((s) => (
          <div 
            key={s.id} 
            onClick={() => setFormData({...formData, style: s.id})}
            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between group ${
              formData.style === s.id 
                ? 'border-rose-500 bg-rose-500/10' 
                : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
            }`}
          >
            <div>
              <h3 className={`font-bold text-sm ${formData.style === s.id ? 'text-white' : 'text-zinc-300'}`}>{s.name}</h3>
              <p className="text-[10px] text-zinc-500 mt-1 font-medium">{s.desc}</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={(e) => { e.stopPropagation(); toggleAudio(s.id); }}
                className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-rose-500 hover:bg-zinc-700 transition-colors"
              >
                {playing === s.id ? <Pause size={12} fill="currentColor"/> : <Play size={12} fill="currentColor"/>}
              </button>
              {formData.style === s.id && <div className="bg-rose-500 p-1 rounded-full"><Check size={12} className="text-white"/></div>}
            </div>
            <audio id={`audio-${s.id}`} src={s.url} />
          </div>
        ))}
      </div>

      <div className="flex gap-4 pt-4">
        <button onClick={() => setStep(2)} className="px-6 text-zinc-500 font-bold text-xs uppercase tracking-widest hover:text-white transition-colors">Voltar</button>
        <button 
          onClick={() => { if(playing) toggleAudio(playing); setStep(4); }} 
          disabled={!formData.style} 
          className="flex-1 bg-rose-600 hover:bg-rose-700 text-white p-4 rounded-full font-bold shadow-lg disabled:opacity-30 uppercase tracking-widest text-xs transition-all"
        >
          Ver Veredito
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-8 animate-fadeIn max-w-md mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-white italic">O Vosso Veredito</h2>
        <p className="text-zinc-400 text-xs uppercase tracking-widest">Confirma o pacto final.</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-xs text-zinc-300 font-medium">
            <div className="bg-green-500/20 p-1.5 rounded-lg text-green-500"><MessageCircle size={14} /></div>
            <span>Entrega via <strong>WhatsApp e E-mail</strong></span>
          </div>
          <div className="flex items-center gap-3 text-xs text-zinc-300 font-medium">
            <div className="bg-rose-500/20 p-1.5 rounded-lg text-rose-500"><RotateCcw size={14} /></div>
            <span><strong>Ajustes Incluídos</strong> na letra</span>
          </div>
        </div>

        <div 
          onClick={() => setFormData({...formData, fastDelivery: !formData.fastDelivery})}
          className={`p-5 rounded-2xl border cursor-pointer transition-all relative overflow-hidden ${
            formData.fastDelivery 
              ? 'border-amber-500/50 bg-amber-500/10' 
              : 'border-zinc-800 bg-black hover:border-zinc-700'
          }`}
        >
          <div className="flex justify-between items-center relative z-10">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <Sparkles size={14} className={formData.fastDelivery ? "text-amber-400" : "text-zinc-600"} /> 
              Prioridade 24 Horas
            </span>
            <span className="text-amber-500 font-bold text-sm">+4,99€</span>
          </div>
          {formData.fastDelivery && <div className="absolute inset-0 bg-amber-500/5 blur-xl"></div>}
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-zinc-800">
          <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Investimento</span>
          <span className="text-3xl font-serif font-bold text-white">{finalPrice.toFixed(2)}€</span>
        </div>
      </div>

      <div className="space-y-4">
        <button 
          onClick={handleStripe} 
          className="w-full bg-white text-black p-5 rounded-full font-bold text-sm shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:bg-zinc-200 transition-all transform active:scale-95 uppercase tracking-widest flex items-center justify-center gap-2"
        >
          Selar o Pacto <ShieldCheck size={16} />
        </button>
        <button onClick={() => setStep(3)} className="w-full text-zinc-600 text-xs font-bold hover:text-white transition-colors uppercase tracking-widest">Voltar</button>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="text-center space-y-8 py-12 animate-fadeIn px-4 max-w-md mx-auto">
      <div className="inline-block relative">
        <div className="bg-green-500 w-20 h-20 rounded-full flex items-center justify-center text-black shadow-[0_0_50px_-10px_rgba(34,197,94,0.6)]">
          <Check size={40} strokeWidth={3} />
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-serif font-bold text-white italic">Pacto Selado.</h2>
        <p className="text-zinc-400 text-sm">A vossa história entrou em estúdio.</p>
      </div>
      <div className="bg-zinc-900 border border-zinc-800 text-white p-8 rounded-[2rem]">
         <div className="flex justify-center gap-6 mb-6 opacity-80">
            <MessageCircle className="text-green-500" /> <Mail className="text-rose-500" />
         </div>
         <p className="text-[10px] uppercase opacity-40 font-black tracking-[0.3em] mb-2">Entrega Estimada</p>
         <p className="text-2xl font-bold font-sans tracking-tighter">{formData.fastDelivery ? 'Menos de 24h' : 'Até 72h'}</p>
      </div>
      <button onClick={onBack} className="text-zinc-600 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.3em]">Voltar ao Início</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 font-sans text-white">
      <div className="w-full max-w-2xl relative">
        
        {/* Barra de Progresso (Estilo Minimalista Topo) */}
        {step < 5 && (
          <div className="absolute -top-12 left-0 w-full flex items-center justify-between px-2">
             <div className="text-rose-600 font-black italic tracking-tighter text-sm">Melodia do Amor</div>
             <div className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">Passo {step}/4</div>
          </div>
        )}

        {/* Card Principal */}
        <div className="bg-zinc-950 p-6 md:p-10 rounded-[2.5rem] border border-zinc-900 shadow-[0_0_100px_-30px_rgba(225,29,72,0.1)] relative overflow-hidden">
          
          {/* Noise Texture (Opcional para dar textura 'film') */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

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
