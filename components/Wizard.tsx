import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Check, Sparkles, Clock, Lightbulb, 
  MessageCircle, Mail, RotateCcw, Play, Pause, 
  User, Users, Calendar, Heart, MapPin, Star, PenTool
} from 'lucide-react';

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
    senderName: '',
    recipientName: '',
    nicknames: '',
    specialDate: '',
    // Novos campos da história
    meetingStory: '',
    favoriteMemory: '',
    loveTraits: '',
    hobbies: '',
    loveLanguage: '',
    extraDetails: '', // Campo opcional
    
    style: '',
    fastDelivery: false
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
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-bold text-slate-900 font-serif italic">Definição de Identidade</h2>
        <p className="text-slate-500 text-sm mt-1">Estabelece os pilares do vosso hino personalizado.</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                   <User size={12} /> O Teu Nome
                </label>
                <input 
                    type="text" 
                    className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none transition-all font-medium"
                    placeholder="Ex: Carlos"
                    value={formData.senderName}
                    onChange={(e) => setFormData({...formData, senderName: e.target.value})}
                />
            </div>
            <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                    <Heart size={12} className="text-rose-500" /> Nome Dela/Dele
                </label>
                <input 
                    type="text" 
                    className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none transition-all font-medium"
                    placeholder="Ex: Carla"
                    value={formData.recipientName}
                    onChange={(e) => setFormData({...formData, recipientName: e.target.value})}
                />
            </div>
        </div>

        <div className="pt-4 border-t border-slate-50 space-y-4">
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] text-center">Detalhes de Carácter Opcional</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                        <Users size={12} /> Alcunhas ou Nomes Especiais
                    </label>
                    <input 
                        type="text" 
                        className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white outline-none text-sm"
                        placeholder="Ex: Pinguim, Batatinha..."
                        value={formData.nicknames}
                        onChange={(e) => setFormData({...formData, nicknames: e.target.value})}
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                        <Calendar size={12} /> Data Marcante
                    </label>
                    <input 
                        type="text" 
                        className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white outline-none text-sm"
                        placeholder="Ex: 07 de Julho de 2018"
                        value={formData.specialDate}
                        onChange={(e) => setFormData({...formData, specialDate: e.target.value})}
                    />
                </div>
            </div>
        </div>
      </div>

      <button 
        onClick={() => setStep(2)} 
        disabled={!formData.senderName || !formData.recipientName} 
        className="w-full bg-rose-500 hover:bg-rose-600 text-white p-5 rounded-2xl font-bold shadow-xl shadow-rose-500/20 disabled:opacity-30 transition-all uppercase tracking-widest text-xs"
      >
        Prosseguir para a Composição
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-bold text-slate-900 font-serif italic">Mapear a Vossa História</h2>
        <p className="text-slate-500 text-sm mt-1">Preenche os detalhes para criarmos a alma da música.</p>
      </div>

      {/* Grid de Perguntas */}
      <div className="space-y-4">
        
        {/* Pergunta 1 */}
        <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
               <MapPin size={12} /> Quando ou onde se conheceram?
            </label>
            <input 
                type="text" 
                className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none transition-all font-medium"
                placeholder="Ex: No verão de 2019, na praia..."
                value={formData.meetingStory}
                onChange={(e) => setFormData({...formData, meetingStory: e.target.value})}
            />
        </div>

        {/* Pergunta 2 */}
        <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
               <Sparkles size={12} className="text-amber-400" /> Qual a tua memória juntos favorita?
            </label>
            <input 
                type="text" 
                className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none transition-all font-medium"
                placeholder="Ex: A viagem a Itália..."
                value={formData.favoriteMemory}
                onChange={(e) => setFormData({...formData, favoriteMemory: e.target.value})}
            />
        </div>

        {/* Pergunta 3 */}
        <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
               <Heart size={12} className="text-rose-500" /> O que amas mais nele (a)?
            </label>
            <input 
                type="text" 
                className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none transition-all font-medium"
                placeholder="Ex: A forma como me faz rir..."
                value={formData.loveTraits}
                onChange={(e) => setFormData({...formData, loveTraits: e.target.value})}
            />
        </div>

        {/* Pergunta 4 e 5 Lado a Lado (Mobile stack) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                    <Star size={12} /> Hobbies ou Interesses
                </label>
                <input 
                    type="text" 
                    className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none transition-all font-medium"
                    placeholder="Ex: Surf, Cozinhar..."
                    value={formData.hobbies}
                    onChange={(e) => setFormData({...formData, hobbies: e.target.value})}
                />
            </div>
            <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                    <MessageCircle size={12} /> Linguagem de Amor
                </label>
                <input 
                    type="text" 
                    className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none transition-all font-medium"
                    placeholder="Ex: Toque físico..."
                    value={formData.loveLanguage}
                    onChange={(e) => setFormData({...formData, loveLanguage: e.target.value})}
                />
            </div>
        </div>

        {/* Caixa Opcional - Design do Preço/Step 1 Footer */}
        <div className="pt-6 border-t border-slate-100 space-y-4 mt-6">
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] text-center">
                Detalhes Adicionais (Opcional)
            </p>
            <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                    <PenTool size={12} /> Queres escrever mais?
                </label>
                <textarea 
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none transition-all font-medium h-24 resize-none text-sm leading-relaxed"
                    placeholder="Conta-nos qualquer outro detalhe importante aqui..."
                    value={formData.extraDetails}
                    onChange={(e) => setFormData({...formData, extraDetails: e.target.value})}
                />
            </div>
        </div>

      </div>

      <div className="flex gap-4 pt-4">
        <button onClick={() => setStep(1)} className="px-6 text-slate-400 font-bold text-sm">Voltar</button>
        <button 
            onClick={() => setStep(3)} 
            disabled={
                !formData.meetingStory || 
                !formData.favoriteMemory || 
                !formData.loveTraits || 
                !formData.hobbies || 
                !formData.loveLanguage
            } 
            className="flex-1 bg-rose-500 text-white p-5 rounded-2xl font-bold shadow-lg disabled:opacity-30 uppercase tracking-widest text-xs"
        >
            Escolher Estilo
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-bold text-slate-900 font-serif italic">Escolha de Frequência</h2>
        <p className="text-slate-500 text-sm mt-1">O tom que vai selar o vosso pacto.</p>
      </div>
      <div className="space-y-3">
        {MUSIC_STYLES.map((s) => (
          <div key={s.id} onClick={() => setFormData({...formData, style: s.id})} className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.style === s.id ? 'border-rose-500 bg-rose-50 shadow-md' : 'border-slate-100 hover:border-slate-200 bg-white'}`}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-slate-900">{s.name}</h3>
              {formData.style === s.id && <Check className="text-rose-500" size={20} />}
            </div>
            <p className="text-[11px] text-slate-500 mb-3 font-medium">{s.desc}</p>
            <button onClick={(e) => { e.stopPropagation(); toggleAudio(s.id); }} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-rose-600 bg-white border border-rose-100 px-4 py-2 rounded-full shadow-sm">
              {playing === s.id ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
              {playing === s.id ? 'Parar' : 'Ouvir Exemplo'}
              <audio id={`audio-${s.id}`} src={s.url} />
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <button onClick={() => setStep(2)} className="px-6 text-slate-400 font-bold text-sm">Voltar</button>
        <button onClick={() => setStep(4)} disabled={!formData.style} className="flex-1 bg-rose-500 text-white p-5 rounded-2xl font-bold shadow-lg disabled:opacity-30 uppercase tracking-widest text-xs">Ver Veredito</button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-bold text-slate-800 italic font-serif">O Vosso Veredito</h2>
        <p className="text-slate-500 text-sm mt-1 text-balance">Confirma as garantias de um hino imortal.</p>
      </div>
      <div className="bg-slate-50 p-6 rounded-3xl space-y-5 border border-slate-100 shadow-inner">
        <div className="space-y-2">
            <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                <Check className="text-green-500" size={18} /> Entrega via <strong>WhatsApp e E-mail</strong>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                <RotateCcw className="text-rose-500" size={18} /> Ajustes de letra incluídos
            </div>
        </div>

        <label className={`flex items-start gap-3 p-5 rounded-2xl border-2 cursor-pointer transition-all ${formData.fastDelivery ? 'border-amber-400 bg-amber-50 shadow-md' : 'border-slate-200 bg-white'}`}>
          <input type="checkbox" checked={formData.fastDelivery} onChange={(e) => setFormData({...formData, fastDelivery: e.target.checked})} className="mt-1 w-5 h-5 accent-amber-500" />
          <div className="flex-1">
            <div className="flex justify-between font-bold text-sm">
                <span className="flex items-center gap-1"><Sparkles size={16} className="text-amber-500" />Prioridade 24 Horas</span>
                <span className="text-amber-600">+4,99€</span>
            </div>
            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1">Topo da fila de produção.</p>
          </div>
        </label>
        
        <div className="flex justify-between items-center pt-4 border-t border-slate-200">
          <span className="font-bold text-slate-400 uppercase text-xs tracking-[0.2em]">Investimento</span>
          <span className="font-bold text-rose-600 text-3xl font-serif tracking-tighter">{finalPrice.toFixed(2)}€</span>
        </div>
      </div>
      
      <button onClick={handleStripe} className="w-full bg-slate-900 hover:bg-black text-white p-6 rounded-2xl font-bold shadow-2xl transition-all transform active:scale-95 text-lg uppercase tracking-widest">Selar o Pacto</button>
      <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest opacity-40">A produção profissional começa após o pagamento.</p>
    </div>
  );

  const renderStep5 = () => (
    <div className="text-center space-y-8 py-12 animate-fadeIn">
      <div className="bg-green-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto text-white shadow-xl shadow-green-100">
        <Check size={48} strokeWidth={3} />
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-serif font-bold italic text-slate-900">Veredito Selado.</h2>
        <p className="text-slate-400 font-medium">A vossa história entrou em estúdio oficial.</p>
      </div>
      <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-3xl">
         <div className="flex justify-center gap-6 mb-6">
            <div className="flex flex-col items-center gap-1 opacity-60"><MessageCircle size={24} /><span className="text-[8px] uppercase tracking-widest">WhatsApp</span></div>
            <div className="flex flex-col items-center gap-1 opacity-60"><Mail size={24} /><span className="text-[8px] uppercase tracking-widest">E-mail</span></div>
         </div>
         <p className="text-xs uppercase tracking-[0.3em] opacity-40 mb-2 font-black">Entrega Estimada</p>
         <p className="text-3xl font-bold font-sans tracking-tighter">{formData.fastDelivery ? 'Menos de 24h' : 'Até 72h'}</p>
      </div>
      <button onClick={onBack} className="text-slate-400 hover:text-slate-900 transition-colors text-[10px] font-black uppercase tracking-[0.3em]">Voltar ao Início</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans selection:bg-rose-100">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-100 relative">
        {step < 5 && (
          <div className="bg-slate-900 p-5 flex items-center text-white">
            <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-full transition-colors"><ArrowLeft size={20} /></button>
            <div className="flex-1 text-center font-bold text-[10px] uppercase tracking-[0.3em]">Sessão {step} de 4</div>
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
    </div>
  );
};
