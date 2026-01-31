import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Check, Sparkles, MessageCircle, Mail, RotateCcw, 
  Play, Pause, MapPin, Heart, Star, Smile, User, ShieldCheck, ChevronRight, PenLine
} from 'lucide-react';

// --- IMPORTAÇÃO DOS ÁUDIOS ---
import sofiaAudio from '../assets/sofia.mp3';     
import ivandroAudio from '../assets/ivandro.mp3'; 
import vitorAudio from '../assets/vitor.mp3';     

interface WizardProps {
  onBack: () => void;
}

// CONFIGURAÇÃO DOS ESTILOS
const MUSIC_STYLES = [
  { 
    id: 'soul', 
    name: 'Alma & Emoção', 
    desc: 'Estilo Sofia. Voz forte e sentida.', 
    url: sofiaAudio 
  },
  { 
    id: 'rock', 
    name: 'R&B Romântico', 
    desc: 'Estilo Ivandro. Suave e envolvente.', 
    url: ivandroAudio 
  },
  { 
    id: 'pop', 
    name: 'Pop Acústico', 
    desc: 'Estilo Vitor Kley. Boa vibe e solar.', 
    url: vitorAudio 
  }
];

export const Wizard: React.FC<WizardProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [playing, setPlaying] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    senderName: '',    
    recipientName: '', 
    meeting: '',       
    memory: '',        
    loveMost: '',      
    hobbies: '',       
    extraDetails: '',  
    style: '',
    fastDelivery: false
  });

  const finalPrice = formData.fastDelivery ? 29.98 : 24.99;

  // --- 1. SEGURANÇA DE DOMÍNIO (EVITA O ERRO DO WWW) ---
  useEffect(() => {
    if (window.location.hostname.startsWith('www.')) {
      window.location.href = window.location.href.replace('www.', '');
    }
  }, []);

  // --- 2. LÓGICA DE SUCESSO E ENVIO PARA O GOOGLE SHEETS ---
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.get('status') === 'success') {
      setStep(5);
      
      const pendingData = localStorage.getItem('pendingOrder');
      
      if (pendingData) {
        const data = JSON.parse(pendingData);
        
        const formDataToSend = new FormData();
        formDataToSend.append("Nome Cliente", data.senderName);
        formDataToSend.append("Para Quem", data.recipientName);
        formDataToSend.append("Estilo", data.styleName);
        formDataToSend.append("Preco", data.fastDelivery ? "29.98€" : "24.99€");
        formDataToSend.append("Entrega Rapida", data.fastDelivery ? "SIM" : "NÃO");
        formDataToSend.append("Historia", data.meeting);
        formDataToSend.append("Memoria", data.memory);
        formDataToSend.append("O Que Ama", data.loveMost);
        formDataToSend.append("Hobbies", data.hobbies);
        formDataToSend.append("Detalhes Extra", data.extraDetails);

        // O TEU LINK DO GOOGLE ATUALIZADO
        const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxF4N-NK6sN_siTh0KIq-3ekk9tBSEsGixAb-P0Hbb5ZB0J8sN-BdlI7PTFOby3rDZNxw/exec";

        fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          body: formDataToSend,
          mode: "no-cors" // Crucial para não haver bloqueio de segurança do Google
        })
        .then(() => {
          console.log("Sucesso: Pedido guardado no Excel!");
          localStorage.removeItem('pendingOrder'); // Limpa para não duplicar se der refresh
        })
        .catch(err => console.error("Erro Excel:", err));
      }

      // Rastreio Pixel
      const amt = urlParams.get('amt') || '24.99';
      if ((window as any).ttq) (window as any).ttq.track('CompletePayment', { value: parseFloat(amt), currency: 'EUR' });
      
      // Limpa o URL para ficar limpo
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleStripe = () => {
    setIsSubmitting(true);

    // LINKS DO TEU STRIPE (Produção)
    const L_STD = "https://buy.stripe.com/4gM28tfFCgtX6f8bZn6c001";
    const L_FAST = "https://buy.stripe.com/aFabJ33WU3Hbbzs8Nb6c000";
    const paymentLink = formData.fastDelivery ? L_FAST : L_STD;

    // GUARDA NO BOLSO DO NAVEGADOR
    localStorage.setItem('pendingOrder', JSON.stringify({
      ...formData,
      styleName: MUSIC_STYLES.find(s => s.id === formData.style)?.name || formData.style,
      timestamp: new Date().toISOString()
    }));

    if ((window as any).ttq) (window as any).ttq.track('InitiateCheckout', { value: finalPrice, currency: 'EUR' });
    window.location.href = paymentLink;
  };

  const toggleAudio = (id: string) => {
    const audios = document.getElementsByTagName('audio');
    for (let i = 0; i < audios.length; i++) if (audios[i].id !== `audio-${id}`) { audios[i].pause(); audios[i].currentTime = 0; }
    const current = document.getElementById(`audio-${id}`) as HTMLAudioElement;
    if (current) { if (playing === id) { current.pause(); setPlaying(null); } else { current.play(); setPlaying(id); } }
  };

  // --- COMPONENTES VISUAIS (DESIGN ORIGINAL) ---

  const renderStep1 = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-serif font-bold text-slate-900 italic">Vamos começar</h2>
        <p className="text-slate-500 text-sm">Identifica quem oferece e quem recebe esta prenda.</p>
      </div>
      
      <div className="space-y-5">
        <div className="group">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
            <User size={14} /> O Teu Nome (Quem Oferece)
          </label>
          <input 
            type="text" 
            className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-lg focus:bg-white focus:border-rose-500 outline-none transition-all font-medium text-slate-800"
            placeholder="Ex: João"
            value={formData.senderName}
            onChange={(e) => setFormData({...formData, senderName: e.target.value})}
          />
        </div>

        <div className="group">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
            <Heart size={14} className="text-rose-500" /> Nome Dele(a) (Quem Recebe)
          </label>
          <input 
            type="text" 
            className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-lg focus:bg-white focus:border-rose-500 outline-none transition-all font-medium text-slate-800"
            placeholder="Ex: Ana"
            value={formData.recipientName}
            onChange={(e) => setFormData({...formData, recipientName: e.target.value})}
          />
        </div>
      </div>

      <button 
        onClick={() => setStep(2)} 
        disabled={!formData.senderName || !formData.recipientName} 
        className="w-full bg-rose-600 hover:bg-rose-700 text-white p-5 rounded-2xl font-bold shadow-xl disabled:opacity-30 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
      >
        Continuar <ChevronRight size={16} />
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-fadeIn max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-serif font-bold text-slate-900 italic">A Vossa História</h2>
        <p className="text-slate-500 text-sm">Responde ao que quiseres. Quanto mais detalhes, melhor.</p>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wide">
            <MapPin size={14} className="text-rose-500"/> Onde/Quando se conheceram?
          </label>
          <input 
            type="text" 
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-rose-500 outline-none transition-all"
            placeholder="Ex: Na escola secundária, em 2015..."
            value={formData.meeting}
            onChange={(e) => setFormData({...formData, meeting: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wide">
            <Star size={14} className="text-rose-500"/> Memória Favorita Juntos?
          </label>
          <textarea 
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:border-rose-500 outline-none transition-all"
            placeholder="Ex: A nossa viagem a Paris..."
            value={formData.memory}
            onChange={(e) => setFormData({...formData, memory: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wide">
            <Heart size={14} className="text-rose-500"/> O que mais amas nele(a)?
          </label>
          <input 
            type="text" 
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-rose-500 outline-none transition-all"
            placeholder="Ex: O sorriso, a forma como me apoia..."
            value={formData.loveMost}
            onChange={(e) => setFormData({...formData, loveMost: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wide">
            <Smile size={14} className="text-rose-500"/> Hobbies / Interesses?
          </label>
          <input 
            type="text" 
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-rose-500 outline-none transition-all"
            placeholder="Ex: Viajar, Body Pump, Cozinhar..."
            value={formData.hobbies}
            onChange={(e) => setFormData({...formData, hobbies: e.target.value})}
          />
        </div>

        <div className="pt-6 border-t border-slate-100">
            <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                    <PenLine size={12}/> Outros Detalhes (Opcional)
                </label>
                <textarea 
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm h-24 resize-none focus:border-rose-500 outline-none transition-colors"
                    placeholder="Piadas internas, frases especiais, linguagem de amor ou qualquer outra coisa..."
                    value={formData.extraDetails}
                    onChange={(e) => setFormData({...formData, extraDetails: e.target.value})}
                />
            </div>
        </div>
      </div>

      <div className="flex gap-4 pt-4 sticky bottom-0 bg-white pb-2">
        <button onClick={() => setStep(1)} className="px-4 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-slate-600">Voltar</button>
        <button 
          onClick={() => setStep(3)} 
          className="flex-1 bg-rose-600 hover:bg-rose-700 text-white p-4 rounded-xl font-bold shadow-lg uppercase tracking-widest text-xs hover:bg-black transition-all"
        >
          Próximo Passo
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-serif font-bold text-slate-900 italic">Estilo Musical</h2>
        <p className="text-slate-500 text-sm">Ouve os exemplos e escolhe o teu favorito.</p>
      </div>
      
      <div className="space-y-4">
        {MUSIC_STYLES.map((s) => (
          <div 
            key={s.id} 
            onClick={() => setFormData({...formData, style: s.id})}
            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between group ${
              formData.style === s.id 
                ? 'border-rose-500 bg-rose-50 shadow-md ring-1 ring-rose-200' 
                : 'border-slate-100 hover:border-slate-300 bg-white'
            }`}
          >
            <div>
              <h3 className="font-bold text-slate-800 text-sm">{s.name}</h3>
              <p className="text-[11px] text-slate-500 mt-1">{s.desc}</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={(e) => { e.stopPropagation(); toggleAudio(s.id); }}
                className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 hover:bg-rose-200 transition-colors"
              >
                {playing === s.id ? <Pause size={12} fill="currentColor"/> : <Play size={12} fill="currentColor"/>}
              </button>
              {formData.style === s.id && <div className="bg-rose-500 p-1 rounded-full"><Check size={10} className="text-white"/></div>}
            </div>
            <audio id={`audio-${s.id}`} src={s.url} />
          </div>
        ))}
      </div>

      <div className="flex gap-4 pt-4">
        <button onClick={() => setStep(2)} className="px-4 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-slate-600">Voltar</button>
        <button 
          onClick={() => { if(playing) toggleAudio(playing); setStep(4); }} 
          disabled={!formData.style} 
          className="flex-1 bg-rose-600 hover:bg-rose-700 text-white p-4 rounded-xl font-bold shadow-lg disabled:opacity-30 uppercase tracking-widest text-xs"
        >
          Ver Resumo
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-serif font-bold text-slate-900 italic">Resumo do Pedido</h2>
        <p className="text-slate-500 text-sm">Confirma os detalhes antes de finalizar.</p>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        <div className="space-y-3 pb-4 border-b border-slate-100">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500 font-medium">Música Personalizada</span>
            <span className="font-bold text-slate-900">24,99€</span>
          </div>
          <div className="flex gap-2">
             <span className="text-[10px] bg-green-50 text-green-700 px-2 py-1 rounded border border-green-100 flex items-center gap-1 font-bold"><MessageCircle size={10}/> WhatsApp</span>
             <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-100 flex items-center gap-1 font-bold"><Mail size={10}/> E-mail</span>
          </div>
        </div>

        <div 
          onClick={() => !isSubmitting && setFormData({...formData, fastDelivery: !formData.fastDelivery})}
          className={`p-4 rounded-2xl border-2 cursor-pointer transition-all relative overflow-hidden ${
            formData.fastDelivery 
              ? 'border-amber-400 bg-amber-50' 
              : 'border-slate-100 hover:border-slate-300 bg-slate-50'
          }`}
        >
          <div className="flex justify-between items-center z-10 relative">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-2">
              <Sparkles size={14} className={formData.fastDelivery ? "text-amber-500" : "text-slate-400"} /> 
              Quero em 24 Horas
            </span>
            <span className="text-amber-600 font-bold text-sm">+4,99€</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1 ml-6">Passamos o pedido para a frente da fila.</p>
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total a Pagar</span>
          <span className="text-3xl font-serif font-bold text-rose-600">{finalPrice.toFixed(2)}€</span>
        </div>
      </div>

      <div className="space-y-4">
        <button 
          onClick={handleStripe} 
          disabled={isSubmitting}
          className="w-full bg-green-600 hover:bg-green-700 text-white p-5 rounded-2xl font-bold shadow-xl shadow-green-100 transition-all transform active:scale-95 flex items-center justify-center gap-2 uppercase tracking-widest text-xs disabled:opacity-70 disabled:cursor-wait"
        >
          {isSubmitting ? 'A Processar...' : 'Finalizar Pedido'} 
          {!isSubmitting && <ShieldCheck size={16} />}
        </button>
        <button onClick={() => setStep(3)} disabled={isSubmitting} className="w-full text-slate-400 text-xs font-bold hover:text-slate-600 uppercase tracking-widest">Voltar</button>
      </div>
      
      <p className="text-[10px] text-center text-slate-400 flex items-center justify-center gap-1 opacity-60">
        <RotateCcw size={10} /> Ajustes incluídos até a letra ficar perfeita.
      </p>
    </div>
  );

  const renderStep5 = () => (
    <div className="text-center space-y-8 py-10 animate-fadeIn px-4">
      <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto text-green-600 shadow-xl">
        <Check size={48} strokeWidth={3} />
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-serif font-bold text-slate-900 italic">Pagamento Confirmado!</h2>
        <p className="text-slate-500 text-sm">A vossa história já está na nossa lista de produção.</p>
      </div>
      
      <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm">
         <p className="text-[10px] font-bold text-slate-400 uppercase mb-3 tracking-widest">Entrega Estimada</p>
         <p className="text-2xl font-bold text-slate-900 mb-6">{formData.fastDelivery ? 'Menos de 24 Horas' : 'Até 72 Horas'}</p>
         <div className="flex justify-center gap-3">
            <span className="flex items-center gap-1 bg-white px-3 py-2 rounded-lg border border-slate-100 text-xs font-bold text-slate-600 shadow-sm"><MessageCircle size={14} className="text-green-500"/> WhatsApp</span>
            <span className="flex items-center gap-1 bg-white px-3 py-2 rounded-lg border border-slate-100 text-xs font-bold text-slate-600 shadow-sm"><Mail size={14} className="text-blue-500"/> Email</span>
         </div>
      </div>
      
      <button onClick={onBack} className="text-rose-500 font-bold text-xs uppercase tracking-widest hover:underline">Voltar ao Início</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-900">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-100 relative">
        
        {/* Barra de Progresso */}
        {step < 5 && (
          <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-50">
            <div className="h-full bg-rose-500 transition-all duration-700 ease-out" style={{ width: `${(step / 4) * 100}%` }}></div>
          </div>
        )}

        <div className="p-8 md:p-12">
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
