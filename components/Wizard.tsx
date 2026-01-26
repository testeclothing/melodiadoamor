import React, { useState } from 'react';
import { 
  Music, 
  PenTool, 
  Truck, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Lock,
  CreditCard,
  Gift
} from 'lucide-react';
import { Button } from './Button';
import { FormData } from '../types';

interface WizardProps {
  onBack: () => void;
}

const STEPS = [
  { id: 1, label: 'Estilo', icon: Music },
  { id: 2, label: 'História', icon: PenTool },
  { id: 3, label: 'Pedido', icon: Truck },
];

const SelectionButton = ({ 
  selected, 
  onClick, 
  label, 
  emoji 
}: { selected: boolean; onClick: () => void; label: string; emoji?: string }) => (
  <button
    onClick={onClick}
    className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 h-24 sm:h-28 relative overflow-hidden ${
      selected 
        ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-md transform scale-[1.02]' 
        : 'border-gray-100 bg-white text-gray-600 hover:border-brand-200 hover:bg-gray-50'
    }`}
  >
    {selected && (
      <div className="absolute top-2 right-2 w-5 h-5 bg-brand-500 rounded-full flex items-center justify-center text-white">
        <Check size={12} strokeWidth={4} />
      </div>
    )}
    <span className="text-2xl md:text-3xl">{emoji}</span>
    <span className="font-bold text-sm md:text-base leading-tight">{label}</span>
  </button>
);

export const Wizard: React.FC<WizardProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    recipient: '',
    genre: '',
    mood: '',
    vocal: '',
    occasion: '',
    storyMeet: '',
    storyMemory: '',
    storyLove: '',
    extraPhrase: '',
    includeVideo: false,
    email: ''
  });

  const handleChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    if (currentStep === 1) {
      onBack();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentStep(prev => Math.max(prev - 1, 1));
    }
  };

  const renderProgressBar = () => (
    <div className="w-full max-w-2xl mx-auto mb-8 px-4">
      <div className="relative flex justify-between items-center">
        {/* Line background */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 rounded-full"></div>
        {/* Progress line */}
        <div 
          className="absolute top-1/2 left-0 h-1 bg-brand-500 -z-10 rounded-full transition-all duration-500"
          style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
        ></div>

        {STEPS.map((step) => {
          const isActive = step.id <= currentStep;
          const isCurrent = step.id === currentStep;
          return (
            <div key={step.id} className="flex flex-col items-center bg-white px-2">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isActive 
                    ? 'bg-brand-500 border-brand-500 text-white shadow-lg shadow-brand-500/30' 
                    : 'bg-white border-gray-300 text-gray-400'
                }`}
              >
                <step.icon size={18} />
              </div>
              <span className={`text-xs font-bold mt-2 uppercase tracking-wide ${isCurrent ? 'text-brand-600' : 'text-gray-400'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 md:py-20 animate-fade-in">
      <div className="container mx-auto px-4 max-w-3xl">
        
        {renderProgressBar()}

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          
          {/* STEP 1: STYLE */}
          {currentStep === 1 && (
            <div className="p-6 md:p-10 space-y-10">
              
              <div className="space-y-4 text-center">
                <h2 className="text-3xl font-serif font-bold text-gray-900">Vamos começar!</h2>
                <p className="text-gray-500">Conta-nos o básico para criarmos a base perfeita.</p>
              </div>

              {/* Who is it for */}
              <div className="space-y-3">
                <label className="block font-bold text-gray-800 text-lg">Para quem é esta música?</label>
                <input 
                  type="text" 
                  placeholder="Ex: Sara, João, O meu Amor..."
                  className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all"
                  value={formData.recipient}
                  onChange={(e) => handleChange('recipient', e.target.value)}
                />
              </div>

              {/* Genre */}
              <div className="space-y-3">
                <label className="block font-bold text-gray-800 text-lg">Estilo Musical</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { l: 'Pop', e: '🎤' }, { l: 'Rock', e: '🎸' }, 
                    { l: 'Country', e: '🤠' }, { l: 'R&B', e: '🎷' },
                    { l: 'Soul', e: '💜' }, { l: 'Folk', e: '🪕' }, 
                    { l: 'Jazz', e: '🎺' }, { l: 'Surpresa', e: '🎲' }
                  ].map((opt) => (
                    <SelectionButton
                      key={opt.l}
                      label={opt.l}
                      emoji={opt.e}
                      selected={formData.genre === opt.l}
                      onClick={() => handleChange('genre', opt.l)}
                    />
                  ))}
                </div>
              </div>

              {/* Mood */}
              <div className="space-y-3">
                <label className="block font-bold text-gray-800 text-lg">Vibe / Mood</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { l: 'Romântica', e: '💘' }, 
                    { l: 'Sentida', e: '🥹' }, 
                    { l: 'Feliz', e: '😄' }
                  ].map((opt) => (
                    <SelectionButton
                      key={opt.l}
                      label={opt.l}
                      emoji={opt.e}
                      selected={formData.mood === opt.l}
                      onClick={() => handleChange('mood', opt.l)}
                    />
                  ))}
                </div>
              </div>

               {/* Vocals */}
               <div className="space-y-3">
                <label className="block font-bold text-gray-800 text-lg">Voz</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { l: 'Masculina', e: '👨' }, 
                    { l: 'Feminina', e: '👩' }, 
                    { l: 'Dueto', e: '👫' }
                  ].map((opt) => (
                    <SelectionButton
                      key={opt.l}
                      label={opt.l}
                      emoji={opt.e}
                      selected={formData.vocal === opt.l}
                      onClick={() => handleChange('vocal', opt.l)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: STORY */}
          {currentStep === 2 && (
            <div className="p-6 md:p-10 space-y-10">
              <div className="space-y-4 text-center">
                <h2 className="text-3xl font-serif font-bold text-gray-900">A Vossa História</h2>
                <p className="text-gray-500">Os detalhes que tornam a música única.</p>
              </div>

               {/* Occasion */}
               <div className="space-y-3">
                <label className="block font-bold text-gray-800 text-lg">Qual a ocasião?</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { l: 'Namorados', e: '❤️' }, 
                    { l: 'Aniversário', e: '🎂' }, 
                    { l: 'Pedido', e: '💍' },
                    { l: 'Anos de Namoro', e: '🥂' },
                    { l: 'Reconciliação', e: '🙏' },
                    { l: 'Just Because', e: '🎁' }
                  ].map((opt) => (
                    <SelectionButton
                      key={opt.l}
                      label={opt.l}
                      emoji={opt.e}
                      selected={formData.occasion === opt.l}
                      onClick={() => handleChange('occasion', opt.l)}
                    />
                  ))}
                </div>
              </div>

              {/* Story Questions */}
              {[
                { label: 'Onde se conheceram?', field: 'storyMeet', placeholder: 'Ex: Na faculdade, num café em Lisboa, online...' },
                { label: 'Qual a vossa memória favorita?', field: 'storyMemory', placeholder: 'Ex: A viagem aos Açores, o dia em que adotamos o cão...' },
                { label: 'O que mais amas nele(a)?', field: 'storyLove', placeholder: 'Ex: O sorriso, a forma como me acalma, o sentido de humor...' }
              ].map((q, idx) => (
                <div key={idx} className="space-y-3">
                   <div className="flex items-center justify-between">
                     <label className="block font-bold text-gray-800 text-lg">{q.label}</label>
                     <span className="text-xs font-bold text-brand-500 bg-brand-50 px-2 py-1 rounded-full">Pergunta {idx + 1}/3</span>
                   </div>
                   <textarea
                    rows={2}
                    placeholder={q.placeholder}
                    className="w-full p-4 text-base border-2 border-gray-200 rounded-xl focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all resize-none"
                    value={formData[q.field as keyof FormData] as string}
                    onChange={(e) => handleChange(q.field as keyof FormData, e.target.value)}
                  />
                </div>
              ))}

              {/* Extra Phrase */}
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <input 
                      type="checkbox" 
                      id="extraPhraseCheck"
                      className="w-5 h-5 text-brand-600 rounded focus:ring-brand-500"
                      checked={!!formData.extraPhrase}
                      onChange={(e) => handleChange('extraPhrase', e.target.checked ? ' ' : '')}
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <label htmlFor="extraPhraseCheck" className="font-bold text-gray-800 cursor-pointer">
                      Mencionar uma frase específica?
                    </label>
                    <p className="text-sm text-gray-500">Uma piada interna ou algo que dizem sempre um ao outro.</p>
                    
                    {formData.extraPhrase !== '' && (
                       <input 
                       type="text" 
                       placeholder="Escreve a frase aqui..."
                       className="w-full p-3 mt-2 text-base bg-white border border-blue-200 rounded-lg focus:border-brand-500 outline-none"
                       value={formData.extraPhrase === ' ' ? '' : formData.extraPhrase}
                       onChange={(e) => handleChange('extraPhrase', e.target.value)}
                       autoFocus
                     />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: CHECKOUT */}
          {currentStep === 3 && (
            <div className="p-6 md:p-10 space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-serif font-bold text-gray-900">Finalizar Pedido</h2>
                <p className="text-green-600 font-bold flex items-center justify-center gap-2">
                  <Check size={18} />
                  Informação guardada com sucesso!
                </p>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-4">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Gift size={20} className="text-brand-500" />
                  Resumo do Pedido
                </h3>
                <div className="flex justify-between items-center text-gray-600">
                  <span>Música Personalizada (Dia dos Namorados)</span>
                  <span className="font-bold text-gray-900">29,99€</span>
                </div>
                
                {/* UPSELL */}
                <div className="bg-white p-4 rounded-lg border-2 border-brand-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] px-2 py-0.5 font-bold rounded-bl-lg">
                    RECOMENDADO
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div className="relative flex items-center">
                      <input 
                        type="checkbox" 
                        className="w-6 h-6 text-brand-600 rounded border-gray-300 focus:ring-brand-500"
                        checked={formData.includeVideo}
                        onChange={(e) => handleChange('includeVideo', e.target.checked)}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-900">Adicionar Vídeo Lyric</span>
                        <span className="font-bold text-brand-600">+9,99€</span>
                      </div>
                      <p className="text-sm text-gray-500 leading-snug mt-1">
                        Recebe um vídeo MP4 com a letra a passar e fotos vossas. Ideal para partilhar nas redes sociais!
                      </p>
                    </div>
                  </label>
                </div>

                <div className="border-t border-gray-200 pt-4 flex justify-between items-center text-xl">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-brand-600">
                    {formData.includeVideo ? '39,98€' : '29,99€'}
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-3">
                <label className="block font-bold text-gray-800">Onde devemos enviar a música?</label>
                <input 
                  type="email" 
                  placeholder="O teu melhor e-mail"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
                <p className="text-xs text-gray-400">
                  Enviaremos também uma cópia por WhatsApp se forneceres o número no checkout.
                </p>
              </div>

              {/* Payment Mockup */}
              <div className="space-y-4 pt-4">
                 <Button fullWidth pulse className="text-lg">
                   <CreditCard className="mr-2" />
                   Pagar com Segurança
                 </Button>
                 
                 <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
                   <Lock size={12} />
                   <span>Pagamento encriptado SSL 256-bit</span>
                 </div>

                 <div className="flex justify-center gap-3 opacity-60">
                   {['MB WAY', 'Multibanco', 'Visa', 'Mastercard'].map(m => (
                     <div key={m} className="bg-gray-100 px-2 py-1 rounded text-[10px] font-bold text-gray-600 border border-gray-200">
                       {m}
                     </div>
                   ))}
                 </div>
              </div>
            </div>
          )}

          {/* FOOTER ACTIONS */}
          <div className="bg-gray-50 p-6 border-t border-gray-200 flex items-center justify-between">
            <button 
              onClick={prevStep}
              className="flex items-center gap-1 text-gray-500 font-bold hover:text-gray-800 transition-colors px-4 py-2"
            >
              <ChevronLeft size={20} />
              Voltar
            </button>

            {currentStep < 3 && (
              <Button 
                onClick={nextStep} 
                className="py-3 px-8 text-base shadow-brand-500/20"
                disabled={
                  (currentStep === 1 && (!formData.recipient || !formData.genre || !formData.mood || !formData.vocal)) ||
                  (currentStep === 2 && (!formData.occasion || !formData.storyMeet))
                }
              >
                Continuar
                <ChevronRight size={20} />
              </Button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};