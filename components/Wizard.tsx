import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronRight, Check, Sparkles, Volume2, MessageCircle, Mail, ShieldCheck } from 'lucide-react';

interface WizardProps {
  onBack: () => void;
}

export const Wizard: React.FC<WizardProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 11;
  const progress = Math.round((step / totalSteps) * 100);

  const [formData, setFormData] = useState({
    voice: '',
    senderName: '',
    recipientName: '',
    relationship: '',
    style: '',
    mood: '',
    pace: '',
    howMet: '',
    moments: '',
    insideJokes: '',
    mainMessage: '',
    deliverySpeed: 'standard'
  });

  // Lógica de Retorno do Stripe
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('status') === 'success') {
      setStep(12); // Ecrã de Sucesso Final
      const amt = urlParams.get('amt') || '24.99';
      if ((window as any).ttq) (window as any).ttq.track('CompletePayment', { value: parseFloat(amt), currency: 'EUR' });
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleNext = () => setStep(s => Math.min(s + 1, totalSteps));
  const handleBack = () => step === 1 ? onBack() : setStep(s => s - 1);

  const handleFinalCheckout = () => {
    const L_STD = "https://buy.stripe.com/test_5kQbJ30KG8kg7NUeVofUQ00";
    const L_FAST = "https://buy.stripe.com/test_8x24gB0KGaso7NU00ufUQ01";
    const target = formData.deliverySpeed === 'fast' ? L_FAST : L_STD;
    
    if ((window as any).ttq) (window as any).ttq.track('InitiateCheckout', { value: formData.deliverySpeed === 'fast' ? 29.98 : 24.99, currency: 'EUR' });
    window.location.href = target;
  };

  // --- COMPONENTES DE OPÇÃO (ESTILO TRUE LOVE SONG) ---
  const OptionCard = ({ label, selected, onClick }: any) => (
    <button 
      onClick={onClick}
      className={`w-full p-5 rounded-xl border-2 text-left transition-all flex items-center justify-between ${
        selected ? 'border-rose-500 bg-rose-500/10 text-white' : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700'
      }`}
    >
      <span className="font-medium">{label}</span>
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selected ? 'border-rose-500 bg-rose-500' : 'border-zinc-700'}`}>
        {selected && <Check size={12} className="text-white" />}
      </div>
    </button>
  );

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">
      
      {/* HEADER / PROGRESS BAR */}
      {step < 12 && (
        <div className="p-4 md:p-8 max-w-4xl mx-auto w-full">
          <div className="flex items-center justify-between mb-4">
            <button onClick={handleBack} className="p-2 hover:bg-zinc-900 rounded-full transition-colors">
              <ArrowLeft size={24} />
            </button>
            <div className="text-rose-500 font-bold text-sm tracking-tighter italic">Melodia do Amor</div>
            <div className="relative w-10 h-10 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                    <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-zinc-800" />
                    <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-rose-500" strokeDasharray={113} strokeDashoffset={113 - (113 * progress) / 100} strokeLinecap="round" />
                </svg>
                <span className="absolute text-[10px] font-bold">{progress}%</span>
            </div>
          </div>
          <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
            <div className="h-full bg-rose-500 transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}

      {/* CONTEÚDO PRINCIPAL (CENTRADO) */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="max-w-xl w-full space-y-8 animate-fadeIn">
          
          {/* STEP 1: VOZ */}
          {step === 1 && (
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 tracking-tight">Em que voz deve ser a canção?</h2>
              <div className="space-y-3">
                {['Voz Masculina', 'Voz Feminina', 'Prefiro não escolher'].map(v => (
                  <OptionCard key={v} label={v} selected={formData.voice === v} onClick={() => { setFormData({...formData, voice: v}); handleNext(); }} />
                ))}
              </div>
            </>
          )}

          {/* STEP 2: NOME DO UTILIZADOR */}
          {step === 2 && (
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 tracking-tight">Insere o teu nome</h2>
              <input 
                autoFocus
                type="text"
                className="w-full bg-zinc-900 border-2 border-zinc-800 p-5 rounded-xl text-xl text-center focus:border-rose-500 outline-none transition-all"
                placeholder="O teu nome"
                value={formData.senderName}
                onChange={(e) => setFormData({...formData, senderName: e.target.value})}
              />
              <button onClick={handleNext} disabled={!formData.senderName} className="w-full bg-rose-600 hover:bg-rose-700 p-5 rounded-xl font-bold transition-all disabled:opacity-30">Próximo</button>
            </>
          )}

          {/* STEP 3: NOME DO DESTINATÁRIO */}
          {step === 3 && (
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 tracking-tight">Para quem é a canção?</h2>
              <p className="text-zinc-500 text-center mb-10">O nome da tua cara-metade que aparecerá na letra.</p>
              <input 
                autoFocus
                type="text"
                className="w-full bg-zinc-900 border-2 border-zinc-800 p-5 rounded-xl text-xl text-center focus:border-rose-500 outline-none"
                placeholder="Nome dela ou dele"
                value={formData.recipientName}
                onChange={(e) => setFormData({...formData, recipientName: e.target.value})}
              />
              <button onClick={handleNext} disabled={!formData.recipientName} className="w-full bg-rose-600 p-5 rounded-xl font-bold mt-4">Próximo</button>
            </>
          )}

          {/* STEP 4: RELAÇÃO */}
          {step === 4 && (
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Qual é a vossa relação?</h2>
              <div className="grid grid-cols-2 gap-3">
                {['Esposa', 'Marido', 'Namorada', 'Namorado', 'Noiva', 'Outro'].map(r => (
                  <button 
                    key={r}
                    onClick={() => { setFormData({...formData, relationship: r}); handleNext(); }}
                    className={`p-4 rounded-xl border-2 font-medium transition-all ${formData.relationship === r ? 'border-rose-500 bg-rose-500/20' : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-600'}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* STEP 5: ESTILO MUSICAL */}
          {step === 5 && (
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Escolhe o estilo musical</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {['Soul Intenso', 'Rock Eterno', 'Pop Cinema', 'Acústico', 'R&B Moderno'].map(s => (
                  <button 
                    key={s}
                    onClick={() => { setFormData({...formData, style: s}); handleNext(); }}
                    className={`px-6 py-3 rounded-full border-2 transition-all ${formData.style === s ? 'border-rose-500 bg-rose-500 text-white' : 'border-zinc-800 text-zinc-400'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* STEP 6: MOOD */}
          {step === 6 && (
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Qual deve ser o "feeling"?</h2>
              <div className="grid grid-cols-2 gap-4">
                {['Romântico', 'Alegre', 'Nostálgico', 'Profundo'].map(m => (
                  <OptionCard key={m} label={m} selected={formData.mood === m} onClick={() => { setFormData({...formData, mood: m}); handleNext(); }} />
                ))}
              </div>
            </>
          )}

          {/* STEP 7: RITMO */}
          {step === 7 && (
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Velocidade da música</h2>
              <div className="space-y-3">
                {['Lenta (Emocional)', 'Normal (Rádio)', 'Rápida (Energética)'].map(p => (
                  <OptionCard key={p} label={p} selected={formData.pace === p} onClick={() => { setFormData({...formData, pace: p}); handleNext(); }} />
                ))}
              </div>
            </>
          )}

          {/* STEP 8: HISTÓRIA (COMO SE CONHECERAM) */}
          {step === 8 && (
            <>
              <h2 className="text-3xl font-bold mb-4">Onde tudo começou?</h2>
              <p className="text-zinc-500 mb-6 font-medium">Onde ou quando é que se conheceram?</p>
              <textarea 
                autoFocus
                className="w-full bg-zinc-900 border-2 border-zinc-800 p-5 rounded-xl h-32 focus:border-rose-500 outline-none"
                placeholder="Ex: No ginásio em 2018..."
                value={formData.howMet}
                onChange={(e) => setFormData({...formData, howMet: e.target.value})}
              />
              <button onClick={handleNext} disabled={!formData.howMet} className="w-full bg-rose-600 p-5 rounded-xl font-bold">Próximo</button>
            </>
          )}

          {/* STEP 9: MEMÓRIAS/DETALHES */}
          {step === 9 && (
            <>
              <h2 className="text-3xl font-bold mb-4">Marcos e Detalhes</h2>
              <p className="text-zinc-500 mb-6 font-medium">Qual a vossa melhor memória ou o que mais amas nele/a?</p>
              <textarea 
                autoFocus
                className="w-full bg-zinc-900 border-2 border-zinc-800 p-5 rounded-xl h-40 focus:border-rose-500 outline-none"
                placeholder="Ex: A viagem à Figueira, o facto de ela ser um poço de vida..."
                value={formData.moments}
                onChange={(e) => setFormData({...formData, moments: e.target.value})}
              />
              <button onClick={handleNext} disabled={!formData.moments} className="w-full bg-rose-600 p-5 rounded-xl font-bold">Próximo</button>
            </>
          )}

          {/* STEP 10: PIADA INTERNA */}
          {step === 10 && (
            <>
              <h2 className="text-3xl font-bold mb-4">Alguma piada interna?</h2>
              <p className="text-zinc-500 mb-6 font-medium">Frases ou expressões que só vocês entendem (Opcional).</p>
              <input 
                autoFocus
                type="text"
                className="w-full bg-zinc-900 border-2 border-zinc-800 p-5 rounded-xl focus:border-rose-500 outline-none"
                placeholder="Ex: 'Brincar é no parque'..."
                value={formData.insideJokes}
                onChange={(e) => setFormData({...formData, insideJokes: e.target.value})}
              />
              <button onClick={handleNext} className="w-full bg-rose-600 p-5 rounded-xl font-bold mt-4">Próximo</button>
            </>
          )}

          {/* STEP 11: UPSELL & CHECKOUT */}
          {step === 11 && (
            <>
              <h2 className="text-4xl font-bold text-center mb-4 italic">Tudo pronto.</h2>
              <p className="text-zinc-500 text-center mb-10">Escolhe a velocidade de entrega para selarmos o pacto.</p>
              
              <div className="space-y-4">
                <div 
                  onClick={() => setFormData({...formData, deliverySpeed: 'standard'})}
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${formData.deliverySpeed === 'standard' ? 'border-rose-500 bg-rose-500/10' : 'border-zinc-800 bg-zinc-900'}`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-lg text-white">Entrega Standard (72h)</span>
                    <span className="text-green-500 font-bold">€24,99</span>
                  </div>
                  <p className="text-xs text-zinc-500 italic">Recebe no WhatsApp e E-mail com qualidade de estúdio.</p>
                </div>

                <div 
                  onClick={() => setFormData({...formData, deliverySpeed: 'fast'})}
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${formData.deliverySpeed === 'fast' ? 'border-amber-500 bg-amber-500/10' : 'border-zinc-800 bg-zinc-900'}`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-lg text-white flex items-center gap-2"><Sparkles size={18} className="text-amber-500" /> Prioridade Máxima (24h)</span>
                    <span className="text-amber-500 font-bold">€29,98</span>
                  </div>
                  <p className="text-xs text-zinc-500 italic">O teu pedido passa para o topo da nossa fila de produção.</p>
                </div>
              </div>

              <button 
                onClick={handleFinalCheckout}
                className="w-full bg-rose-600 hover:bg-rose-700 p-6 rounded-2xl font-black text-xl shadow-2xl shadow-rose-500/20 transform transition-transform active:scale-95 mt-8 uppercase tracking-widest"
              >
                Imortalizar Agora
              </button>
              <div className="flex items-center justify-center gap-4 mt-6 opacity-30">
                <ShieldCheck size={16} /> <span className="text-[10px] font-bold uppercase tracking-widest">Pagamento Seguro via Stripe</span>
              </div>
            </>
          )}

          {/* STEP 12: SUCESSO FINAL */}
          {step === 12 && (
            <div className="text-center space-y-8 py-10">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <Check size={48} strokeWidth={3} />
              </div>
              <h2 className="text-4xl font-serif font-bold italic">Veredito Selado.</h2>
              <p className="text-zinc-400">A vossa história já está na mão dos nossos artistas.</p>
              <div className="bg-zinc-900 p-8 rounded-3xl space-y-4">
                 <p className="text-xs uppercase tracking-[0.2em] opacity-40">O que acontece agora?</p>
                 <div className="flex justify-center gap-4">
                    <MessageCircle className="text-green-500" /> <Mail className="text-rose-500" />
                 </div>
                 <p className="text-sm font-medium">Receberás o link de download no WhatsApp e no teu E-mail em menos de {formData.deliverySpeed === 'fast' ? '24' : '72'} horas.</p>
              </div>
              <button onClick={onBack} className="text-zinc-500 hover:text-white transition-colors text-sm font-bold">Voltar ao Início</button>
            </div>
          )}

        </div>
      </div>

      {/* FOOTER NAVIGATION */}
      {step < 11 && (
        <div className="p-6 bg-black/80 backdrop-blur-md border-t border-zinc-900">
           <div className="max-w-xl mx-auto flex gap-4">
             <button onClick={handleBack} className="flex-1 p-4 rounded-xl font-bold text-zinc-500 hover:text-white transition-colors">Voltar</button>
             {/* O botão "Próximo" só aparece se não for um passo de clique direto */}
             {![1, 4, 5, 6, 7].includes(step) && (
               <button onClick={handleNext} className="flex-1 bg-zinc-800 hover:bg-zinc-700 p-4 rounded-xl font-bold">Próximo</button>
             )}
           </div>
        </div>
      )}

    </div>
  );
};
