import React, { useState, useEffect } from 'react';
import { 
  Heart, Music, ArrowRight, ArrowLeft, CheckCircle2, 
  Sparkles, Clock, Lock, ShieldCheck, Mail, MessageCircle 
} from 'lucide-react';
import { Button } from './Button';

interface WizardProps {
  onBack: () => void;
}

const STYLES = [
  { id: 'pop', label: 'Pop Romântico', emoji: '🎸', desc: 'Estilo Ed Sheeran / Calema' },
  { id: 'acoustic', label: 'Acústico & Voz', emoji: '🎹', desc: 'Piano ou Guitarra suave' },
  { id: 'rb', label: 'R&B / Soul', emoji: '🎷', desc: 'Vibe Weeknd / Slow J' },
  { id: 'kizomba', label: 'Kizomba Lenta', emoji: '💃', desc: 'Ritmo envolvente e quente' },
];

export function Wizard({ onBack }: WizardProps) {
  const [step, setStep] = useState(1);
  const [shippingOption, setShippingOption] = useState<'standard' | 'urgent'>('standard');
  const [loading, setLoading] = useState(false);
  const [tomorrowLabel, setTomorrowLabel] = useState('');

  // --- CÁLCULO AUTOMÁTICO DO DIA DE ENTREGA ---
  useEffect(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1); // Amanhã
    const diaSemana = date.toLocaleDateString('pt-PT', { weekday: 'long' });
    // Capitalizar a primeira letra (ex: "segunda-feira" -> "Segunda-feira")
    setTomorrowLabel(diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1).split('-')[0]); 
  }, []);

  const [formData, setFormData] = useState({
    name1: '',
    name2: '',
    story: '',
    style: '',
    email: '',
  });

  const basePrice = 24.99;
  const urgentPrice = 4.99;
  const total = shippingOption === 'urgent' ? basePrice + urgentPrice : basePrice;

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleCheckout = () => {
    setLoading(true);
    // SIMULAÇÃO: Redirecionar para Stripe
    setTimeout(() => {
      alert("A redirecionar para pagamento seguro...");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Header Simples */}
      <div className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-2 text-gray-500 hover:text-rose-600 font-medium cursor-pointer transition-colors" onClick={onBack}>
          <ArrowLeft size={18} />
          <span>Voltar</span>
        </div>
        <div className="text-xs font-bold uppercase tracking-widest text-gray-400">
          Passo {step} de 4
        </div>
      </div>

      <div className="flex-1 container mx-auto px-4 py-8 max-w-xl">
        
        {/* PROGRESS BAR */}
        <div className="w-full bg-gray-200 h-1.5 rounded-full mb-8 overflow-hidden">
          <div 
            className="bg-green-500 h-full transition-all duration-500 ease-out" 
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>

        <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 p-6 md:p-10 border border-gray-100 relative overflow-hidden">
          
          {/* PASSO 1: OS NOMES */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center mb-8">
                <div className="bg-rose-50 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-500 shadow-sm">
                  <Heart size={28} fill="currentColor" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-gray-900">Para quem é a música?</h2>
                <p className="text-gray-500 text-sm mt-2">Os protagonistas da vossa história.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wide ml-1">O teu nome</label>
                  <input 
                    type="text" 
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                    placeholder="Ex: João"
                    value={formData.name1}
                    onChange={e => setFormData({...formData, name1: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wide ml-1">Nome dele(a)</label>
                  <input 
                    type="text" 
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                    placeholder="Ex: Maria"
                    value={formData.name2}
                    onChange={e => setFormData({...formData, name2: e.target.value})}
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  fullWidth 
                  onClick={handleNext} 
                  disabled={!formData.name1 || !formData.name2}
                  className="bg-rose-600 hover:bg-rose-700 text-lg py-4 shadow-lg shadow-rose-500/20"
                >
                  Continuar <ArrowRight size={20} className="ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* PASSO 2: A HISTÓRIA */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-serif font-bold text-gray-900">A vossa história</h2>
                <p className="text-gray-500 text-sm mt-2">Onde se conheceram? Momentos especiais?</p>
              </div>

              <textarea 
                className="w-full h-40 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all resize-none text-gray-700 placeholder:text-gray-400"
                placeholder="Ex: Conhecemo-nos em Lisboa. Adoro o sorriso dela. O nosso sonho é viajar o mundo..."
                value={formData.story}
                onChange={e => setFormData({...formData, story: e.target.value})}
              ></textarea>
              
              <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl flex gap-3 items-start">
                <Sparkles className="text-amber-500 shrink-0 mt-0.5" size={16} />
                <p className="text-xs text-amber-800 leading-relaxed font-medium">
                  Quanto mais detalhes deres, mais única será a letra!
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="outline" onClick={handleBack} className="px-6 border-gray-200 text-gray-600">Voltar</Button>
                <Button 
                  fullWidth 
                  onClick={handleNext} 
                  disabled={formData.story.length < 5}
                  className="bg-rose-600 hover:bg-rose-700 flex-1 shadow-lg shadow-rose-500/20"
                >
                  Continuar
                </Button>
              </div>
            </div>
          )}

          {/* PASSO 3: O ESTILO */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-serif font-bold text-gray-900">O estilo musical</h2>
                <p className="text-gray-500 text-sm mt-2">Qual a vibe que mais combina convosco?</p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {STYLES.map((style) => (
                  <div 
                    key={style.id}
                    onClick={() => setFormData({...formData, style: style.id})}
                    className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center gap-4 transition-all duration-200 ${
                      formData.style === style.id 
                        ? 'border-rose-500 bg-rose-50/50 shadow-md ring-1 ring-rose-500/20' 
                        : 'border-gray-100 hover:border-rose-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-2xl bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm border border-gray-100">{style.emoji}</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-sm">{style.label}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">{style.desc}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      formData.style === style.id ? 'border-rose-500 bg-rose-500' : 'border-gray-300'
                    }`}>
                      {formData.style === style.id && <CheckCircle2 size={12} className="text-white" />}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={handleBack} className="px-6 border-gray-200 text-gray-600">Voltar</Button>
                <Button 
                  fullWidth 
                  onClick={handleNext} 
                  disabled={!formData.style}
                  className="bg-rose-600 hover:bg-rose-700 flex-1 shadow-lg shadow-rose-500/20"
                >
                  Continuar
                </Button>
              </div>
            </div>
          )}

          {/* PASSO 4: RESUMO (DESIGN DA IMAGEM) */}
          {step === 4 && (
            <div className="animate-fadeIn">
              
              <div className="text-center mb-6">
                <h2 className="text-2xl font-serif font-bold text-slate-800 italic">Resumo do Pedido</h2>
                <p className="text-gray-500 text-xs mt-1 font-medium">Confirma os detalhes antes de finalizar.</p>
              </div>

              {/* CARD DE RESUMO */}
              <div className="border border-gray-100 rounded-3xl p-1 shadow-sm mb-8">
                <div className="bg-white rounded-[1.3rem] p-5 border border-gray-100 shadow-sm">
                  
                  {/* Produto Principal */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-gray-800 text-sm">Música Personalizada</h3>
                      <div className="flex gap-2 mt-2">
                        <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-[10px] font-bold px-2 py-1 rounded-md border border-green-100">
                          <MessageCircle size={10} /> WhatsApp
                        </span>
                        <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-md border border-blue-100">
                          <Mail size={10} /> E-mail
                        </span>
                      </div>
                    </div>
                    <span className="font-bold text-gray-900">24,99€</span>
                  </div>

                  <hr className="border-gray-100 my-4" />

                  {/* URGÊNCIA (SELEÇÃO) */}
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Urgência da Entrega</p>
                  
                  <div className="space-y-3">
                    {/* OPÇÃO 1: NORMAL */}
                    <div 
                      onClick={() => setShippingOption('standard')}
                      className={`relative flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        shippingOption === 'standard' 
                        ? 'border-green-500 bg-green-50/30' 
                        : 'border-gray-100 bg-white hover:border-gray-200'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        shippingOption === 'standard' ? 'border-green-500' : 'border-gray-300'
                      }`}>
                         {shippingOption === 'standard' && <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-900 flex items-center gap-2">
                          <Clock size={14} className="text-green-600" /> Entrega em 24h ({tomorrowLabel})
                        </p>
                        <p className="text-[10px] text-gray-500 leading-tight mt-0.5">Chega a tempo de emocionar.</p>
                      </div>
                      <span className="font-bold text-gray-900 text-sm">0,00€</span>
                    </div>

                    {/* OPÇÃO 2: URGENTE */}
                    <div 
                      onClick={() => setShippingOption('urgent')}
                      className={`relative flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        shippingOption === 'urgent' 
                        ? 'border-rose-500 bg-rose-50/30' 
                        : 'border-gray-100 bg-white hover:border-gray-200'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        shippingOption === 'urgent' ? 'border-rose-500' : 'border-gray-300'
                      }`}>
                         {shippingOption === 'urgent' && <div className="w-2.5 h-2.5 bg-rose-500 rounded-full" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-900 flex items-center gap-2">
                           Super Urgente (12h) ⚡
                        </p>
                        <p className="text-[10px] text-gray-500 leading-tight mt-0.5">Prioridade máxima na fila de produção.</p>
                      </div>
                      <span className="font-bold text-rose-600 text-sm">+4,99€</span>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between items-end">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total a Pagar</span>
                    <span className="text-3xl font-serif font-bold text-rose-600">{total.toFixed(2)}€</span>
                  </div>

                </div>
              </div>

              {/* Botão Final */}
              <Button 
                fullWidth 
                pulse={false}
                onClick={handleCheckout} 
                className="bg-green-600 hover:bg-green-700 text-white text-sm font-bold uppercase tracking-widest py-4 rounded-xl shadow-xl shadow-green-600/20 flex items-center justify-center gap-2"
              >
                Finalizar Pedido <ShieldCheck size={18} />
              </Button>

              <button onClick={handleBack} className="w-full text-center mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-colors">
                Voltar
              </button>

              <div className="text-center mt-8">
                <p className="text-[10px] text-gray-300 flex items-center justify-center gap-1">
                  <Sparkles size={10} /> Ajustes incluídos até a letra ficar perfeita.
                </p>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
