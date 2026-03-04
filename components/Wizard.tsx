import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Check, Sparkles, MessageCircle, Mail, RotateCcw, 
  Play, Pause, MapPin, Heart, Star, Smile, User, ShieldCheck, ChevronRight, PenLine, Clock, Zap
} from 'lucide-react';

// --- IMPORTAÇÃO DOS ÁUDIOS ---
import almaAudio from '../assets/almapai.mp3';     
import rockAudio from '../assets/rock.mp3'; 
import pimbaAudio from '../assets/pimba.mp3';     

interface WizardProps {
  onBack: () => void;
}

// CONFIGURAÇÃO DOS ESTILOS
const MUSIC_STYLES = [
  { 
    id: 'alma', 
    name: 'Alma & Emoção', 
    desc: 'Voz forte e com muito sentimento.', 
    url: almaAudio 
  },
  { 
    id: 'rock', 
    name: 'ROCK', 
    desc: 'Energia, guitarras e força.', 
    url: rockAudio 
  },
  { 
    id: 'pimba', 
    name: 'Pimba / Popular', 
    desc: 'Alegre, divertido e brincalhão.', 
    url: pimbaAudio 
  }
];

export const Wizard: React.FC<WizardProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [playing, setPlaying] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); 
  
  // ESTADO DO FORMULÁRIO
  const [formData, setFormData] = useState({
    senderName: '',    
    recipientName: '', 
    
    // Novas Perguntas
    meeting: '',       
    loveMost: '',      
    hobbies: '',       
    memory: '',        
    extraDetails: '',  

    styleBase: '',        
    // customStyle removido da UI, mas mantido no state para não quebrar lógica antiga
    customStyle: '',      
    deliveryOption: '48h' 
  });

  // --- CÁLCULO DE PREÇO ---
  const finalPrice = formData.deliveryOption === '12h' ? 29.98 : 19.99;

  // --- 1. SEGURANÇA DE DOMÍNIO ---
  useEffect(() => {
    if (window.location.hostname.startsWith('www.')) {
      window.location.href = window.location.href.replace('www.', '');
    }
  }, []);

  // --- 2. LÓGICA DE SUCESSO ---
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const amt = urlParams.get('amt') || '19.99'; 
    
    if (status === 'success') {
      setStep(5);
      
      const pendingData = localStorage.getItem('pendingOrder');
      if (pendingData) {
        const data = JSON.parse(pendingData);
        
        const formDataToSend = new FormData();
        formDataToSend.append("Nome Cliente", data.senderName);
        formDataToSend.append("Para Quem", data.recipientName);
        
        // Estilo selecionado
        const estiloFinal = MUSIC_STYLES.find((s: any) => s.id === data.styleBase)?.name || "N/A";

        formDataToSend.append("Estilo", estiloFinal);
        
        const priceStr = data.deliveryOption === '12h' ? "29.98€" : "19.99€";
        const deliveryStr = data.deliveryOption === '12h' ? "12 Horas (URGENTE)" : "48 Horas (Normal)";

        formDataToSend.append("Preco", priceStr);
        formDataToSend.append("Entrega Rapida", deliveryStr);
        
        // Perguntas
        formDataToSend.append("3 Palavras", data.meeting);
        formDataToSend.append("Frase de Pai", data.loveMost);
        formDataToSend.append("Licao de Vida", data.hobbies);
        formDataToSend.append("Memoria", data.memory);
        formDataToSend.append("Detalhes Extra", data.extraDetails);

        // URL DO SCRIPT
        const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzmzgu7QrPEf067vfrzY9QZ-obnVNba-NyM6fDLEqzAexABu2PWXeL7MszzIVsWvZm6CQ/exec";

        fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          body: formDataToSend,
          mode: "no-cors" 
        })
        .then(() => {
          console.log("Sucesso: Pedido guardado no Excel!");
          localStorage.removeItem('pendingOrder'); 
        })
        .catch(err => console.error("Erro Excel:", err));
      }

      // TRACKING
      const lastSaleTime = localStorage.getItem('last_sale_timestamp');
      const now = new Date().getTime();
      const isDuplicate = lastSaleTime && (now - parseInt(lastSaleTime) < 300000); 

      if (!isDuplicate && (window as any).ttq) {
        const uniqueEventId = `order_${now}_${Math.random().toString(36).substr(2, 9)}`;
        (window as any).ttq.track('CompletePayment', { 
            value: parseFloat(amt), 
            currency: 'EUR',
            event_id: uniqueEventId 
        });
        localStorage.setItem('last_sale_timestamp', now.toString());
      }
      
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleStripe = () => {
    setIsSubmitting(true);

    const is12h = formData.deliveryOption === '12h';

    // --- LINKS REAIS ---
    const L_NORMAL_19 = "https://buy.stripe.com/aFa4gz80Y8ZD54D2eD7EQ04";
    const L_URGENTE_29 = "https://buy.stripe.com/5kQ9ATgxugs540zg5t7EQ05";

    // Seleção de Link
    const paymentLink = is12h ? L_URGENTE_29 : L_NORMAL_19;

    localStorage.setItem('pendingOrder', JSON.stringify({
      ...formData,
      styleBase: formData.styleBase,
      customStyle: formData.customStyle, // Vai vazio
      deliveryOption: formData.deliveryOption,
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

  // --- RENDERIZAÇÃO ---

  const renderStep1 = () => (
    <div className="space-y-8 animate-fadeIn relative">
      <button onClick={onBack} className="absolute -top-4 -left-2 flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-rose-500 transition-colors">
        <ArrowLeft size={12} /> Voltar ao Início
      </button>
      <div className="text-center space-y-2 pt-4">
        <h2 className="text-3xl font-serif font-bold text-slate-900 italic">Vamos começar</h2>
        <p className="text-slate-500 text-sm">Identifica quem oferece e quem recebe.</p>
      </div>
      <div className="space-y-5">
        <div className="group">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">O Teu Nome</label>
          <input type="text" className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-lg focus:bg-white focus:border-rose-500 outline-none font-medium text-slate-800"
            placeholder="Ex: João" value={formData.senderName} onChange={(e) => setFormData({...formData, senderName: e.target.value})} />
        </div>
        <div className="group">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Nome Dele(a)</label>
          <input type="text" className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-lg focus:bg-white focus:border-rose-500 outline-none font-medium text-slate-800"
            placeholder="Ex: Carlos (O Melhor Pai)" value={formData.recipientName} onChange={(e) => setFormData({...formData, recipientName: e.target.value})} />
        </div>
      </div>
      <button onClick={() => setStep(2)} disabled={!formData.senderName || !formData.recipientName} className="w-full bg-rose-600 hover:bg-rose-700 text-white p-5 rounded-2xl font-bold shadow-xl disabled:opacity-30 uppercase tracking-widest text-xs flex items-center justify-center gap-2">
        Continuar <ChevronRight size={16} />
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-serif font-bold text-slate-900 italic">A História</h2>
        <p className="text-slate-500 text-sm">Conta-nos os detalhes para a letra.</p>
      </div>
      <div className="space-y-5">
        
        {/* PERGUNTAS */}
        <div className="group">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">3 Palavras que o descrevem</label>
          <input type="text" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-rose-500 outline-none"
            placeholder="Ex: Trabalhador, Engraçado, Protetor" value={formData.meeting} onChange={(e) => setFormData({...formData, meeting: e.target.value})} />
        </div>

        <div className="group">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Frase que ele mais repete</label>
          <input type="text" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-rose-500 outline-none"
            placeholder='Ex: "Juízo nessa cabeça!"' value={formData.loveMost} onChange={(e) => setFormData({...formData, loveMost: e.target.value})} />
        </div>

        <div className="group">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Uma lição que aprendeste com ele</label>
          <input type="text" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-rose-500 outline-none"
            placeholder="Ex: Nunca desistir dos sonhos." value={formData.hobbies} onChange={(e) => setFormData({...formData, hobbies: e.target.value})} />
        </div>

        <div className="group">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Memória Favorita Juntos</label>
          <textarea className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:border-rose-500 outline-none"
            placeholder="Aquele dia na praia, o primeiro jogo de futebol..." value={formData.memory} onChange={(e) => setFormData({...formData, memory: e.target.value})} />
        </div>

        <div className="group">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Outros detalhes / Piadas internas</label>
          <textarea className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm h-24 resize-none focus:border-rose-500 outline-none"
            placeholder="Conta-nos mais para tornarmos a letra única..." value={formData.extraDetails} onChange={(e) => setFormData({...formData, extraDetails: e.target.value})} />
        </div>

      </div>
      <div className="flex gap-4 pt-4 sticky bottom-0 bg-white pb-2">
        <button onClick={() => setStep(1)} className="px-4 text-slate-400 font-bold text-xs uppercase tracking-widest">Voltar</button>
        <button onClick={() => setStep(3)} className="flex-1 bg-rose-600 hover:bg-rose-700 text-white p-4 rounded-xl font-bold shadow-lg uppercase tracking-widest text-xs">Próximo Passo</button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-serif font-bold text-slate-900 italic">Estilo Musical</h2>
        <p className="text-slate-500 text-sm">Escolhe a sonoridade da tua música.</p>
      </div>
      
      {/* OPÇÕES BASE */}
      <div className="grid gap-3">
        {MUSIC_STYLES.map((s) => (
          <div key={s.id} 
            onClick={() => setFormData({...formData, styleBase: s.id, customStyle: ''})} 
            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
              formData.styleBase === s.id ? 'border-rose-500 bg-rose-50 ring-1 ring-rose-200' : 'border-slate-100 bg-white'
            }`}
          >
            <div>
              <h3 className="font-bold text-slate-800 text-sm">{s.name}</h3>
              <p className="text-[10px] text-slate-500">{s.desc}</p>
            </div>
            <div className="flex items-center gap-2">
               <button onClick={(e) => { e.stopPropagation(); toggleAudio(s.id); }} className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                {playing === s.id ? <Pause size={12}/> : <Play size={12}/>}
              </button>
              <audio id={`audio-${s.id}`} src={s.url} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 pt-4">
        <button onClick={() => setStep(2)} className="px-4 text-slate-400 font-bold text-xs uppercase tracking-widest">Voltar</button>
        <button onClick={() => { if(playing) toggleAudio(playing); setStep(4); }} 
          disabled={!formData.styleBase} 
          className="flex-1 bg-rose-600 hover:bg-rose-700 text-white p-4 rounded-xl font-bold shadow-lg disabled:opacity-30 uppercase tracking-widest text-xs">
          Ver Resumo
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-serif font-bold text-slate-900 italic">Resumo Final</h2>
        <p className="text-slate-500 text-sm">Confirma os detalhes.</p>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl space-y-4">
        <div className="flex justify-between items-center text-sm pb-2 border-b border-slate-50">
          <span className="text-slate-500 font-medium">Música Personalizada</span>
          <span className="font-bold text-slate-900">19,99€</span>
        </div>

        {/* MOSTRA O ESTILO ESCOLHIDO */}
        <div className="flex justify-between items-center text-sm pb-2 border-b border-slate-50">
           <span className="text-slate-500 font-medium">Estilo</span>
           <span className="font-bold text-slate-800 text-xs uppercase">
             {MUSIC_STYLES.find(s => s.id === formData.styleBase)?.name}
           </span>
        </div>

        <div className="space-y-3 pt-2">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Urgência de Entrega</p>
          
          <div onClick={() => setFormData({...formData, deliveryOption: '48h'})}
            className={`p-3 rounded-xl border cursor-pointer flex justify-between items-center ${
              formData.deliveryOption === '48h' ? 'border-green-500 bg-green-50' : 'border-slate-200'
            }`}>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-green-600"/>
              <div>
                <p className="text-sm font-bold text-slate-800">Normal (48h)</p>
                <p className="text-[10px] text-slate-500">Entrega garantida em 2 dias.</p>
              </div>
            </div>
            <span className="text-xs font-bold text-green-700">Grátis</span>
          </div>

          <div onClick={() => setFormData({...formData, deliveryOption: '12h'})}
            className={`p-3 rounded-xl border-2 cursor-pointer flex justify-between items-center ${
              formData.deliveryOption === '12h' ? 'border-rose-500 bg-rose-50' : 'border-slate-200'
            }`}>
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-rose-600"/>
              <div>
                <p className="text-sm font-bold text-slate-800">Prioridade VIP (12h)</p>
                <p className="text-[10px] text-slate-500">Passa à frente da fila. Entrega urgente.</p>
              </div>
            </div>
            <span className="text-sm font-bold text-rose-600">+9,99€</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total a Pagar</span>
          <span className="text-4xl font-serif font-bold text-rose-600">{finalPrice.toFixed(2)}€</span>
        </div>
      </div>

      <div className="space-y-4">
        <button onClick={handleStripe} disabled={isSubmitting} className="w-full bg-green-600 hover:bg-green-700 text-white p-5 rounded-2xl font-bold shadow-xl flex items-center justify-center gap-2 uppercase tracking-widest text-xs disabled:opacity-70">
          {isSubmitting ? 'A Processar...' : 'Pagar Agora com Segurança'} {!isSubmitting && <ShieldCheck size={16} />}
        </button>
        <button onClick={() => setStep(3)} disabled={isSubmitting} className="w-full text-slate-400 text-xs font-bold uppercase tracking-widest">Voltar</button>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="text-center space-y-8 py-10 animate-fadeIn px-4">
      <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto text-green-600 shadow-xl">
        <Check size={48} strokeWidth={3} />
      </div>
      <h2 className="text-3xl font-serif font-bold text-slate-900 italic">Pagamento Confirmado!</h2>
      <p className="text-slate-500 text-sm">A tua música já entrou em produção.</p>
      
      <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm">
         <p className="text-[10px] font-bold text-slate-400 uppercase mb-3 tracking-widest">Entrega Estimada</p>
         <p className="text-2xl font-bold text-slate-900 mb-6">
            {formData.deliveryOption === '12h' ? 'Menos de 12 Horas' : 'Até 48 Horas'}
         </p>
      </div>
      <button onClick={onBack} className="text-rose-500 font-bold text-xs uppercase tracking-widest hover:underline">Voltar ao Início</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-900">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 relative flex flex-col overflow-hidden">
        {step < 5 && (
          <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-50 z-20">
            <div className="h-full bg-rose-500 transition-all duration-700 ease-out" style={{ width: `${(step / 4) * 100}%` }}></div>
          </div>
        )}
        <div className="p-6 md:p-12 max-h-[85vh] overflow-y-auto custom-scrollbar">
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
