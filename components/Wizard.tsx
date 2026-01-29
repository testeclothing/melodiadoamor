import React, { useState } from 'react';
import { ArrowLeft, Play, Pause, Clock, Check, Sparkles } from 'lucide-react';

interface WizardProps {
  onBack: () => void;
}

// CONFIGURAÇÃO DOS 3 ESTILOS MUSICAIS
// NOTA: Podes alterar os 'previewUrl' para ficheiros locais se tiveres (ex: '/assets/piano.mp3')
const MUSIC_STYLES = [
  {
    id: 'pop',
    name: 'Pop Acústico Romântico',
    description: 'Leve, feliz e contagiante. Perfeito para histórias divertidas.',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' 
  },
  {
    id: 'piano',
    name: 'Piano & Voz Emocional',
    description: 'Profundo e tocante. Para fazer chorar de emoção.',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  },
  {
    id: 'folk',
    name: 'Indie Folk Fofinho',
    description: 'Descontraído, com violão e vibe de viagem.',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3'
  }
];

export const Wizard: React.FC<WizardProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [playing, setPlaying] = useState<string | null>(null); // Controla qual audio toca
  
  // Dados do Formulário
  const [formData, setFormData] = useState({
    names: '',
    story: '',
    style: '',
    fastDelivery: false // UPSELL: Entrega em 24h
  });

  // Preços
  const BASE_PRICE = 29.99;
  const RUSH_FEE = 10.00;
  const finalPrice = formData.fastDelivery ? BASE_PRICE + RUSH_FEE : BASE_PRICE;

  // Função para tocar/parar áudio
  const toggleAudio = (id: string, url: string) => {
    const audioElements = document.getElementsByTagName('audio');
    
    // Parar todos os outros sons
    for (let i = 0; i < audioElements.length; i++) {
      if (audioElements[i].id !== `audio-${id}`) {
        audioElements[i].pause();
        audioElements[i].currentTime = 0;
      }
    }

    const currentAudio = document.getElementById(`audio-${id}`) as HTMLAudioElement;
    if (currentAudio) {
      if (playing === id) {
        currentAudio.pause();
        setPlaying(null);
      } else {
        currentAudio.play();
        setPlaying(id);
      }
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-bold text-slate-800">Quem são os protagonistas?</h2>
        <p className="text-slate-500 text-sm mt-1">Diz-nos os nomes que vão entrar na música.</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-2">Os vossos nomes</label>
        <input 
          type="text" 
          className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none transition-all"
          placeholder="Ex: Ana e João"
          value={formData.names}
          onChange={(e) => setFormData({...formData, names: e.target.value})}
        />
      </div>
      <button 
        onClick={() => setStep(2)}
        disabled={!formData.names}
        className="w-full bg-rose-500 hover:bg-rose-600 text-white p-4 rounded-xl font-bold disabled:opacity-50 transition-all transform active:scale-95 shadow-lg shadow-rose-500/30"
      >
        Continuar
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-bold text-slate-800">Conta-nos a vossa história</h2>
        <p className="text-slate-500 text-sm mt-1">Quanto mais detalhes deres, mais única será a música.</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-2">Detalhes importantes</label>
        <textarea 
          className="w-full p-4 border border-slate-200 rounded-xl h-40 focus:ring-2 focus:ring-rose-500 outline-none resize-none"
          placeholder="Como se conheceram? Qual o vosso lugar especial? Têm alguma piada interna? O que mais amas nele/a?..."
          value={formData.story}
          onChange={(e) => setFormData({...formData, story: e.target.value})}
        />
      </div>
      <div className="flex gap-4">
        <button onClick={() => setStep(1)} className="px-6 text-slate-500 font-medium hover:text-slate-800">Voltar</button>
        <button 
          onClick={() => setStep(3)}
          disabled={!formData.story}
          className="flex-1 bg-rose-500 hover:bg-rose-600 text-white p-4 rounded-xl font-bold disabled:opacity-50 transition-all shadow-lg shadow-rose-500/30"
        >
          Escolher Estilo
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-bold text-slate-800">Escolhe a Vibe da Música</h2>
        <p className="text-slate-500 text-sm mt-1">Ouve os exemplos e escolhe o teu favorito.</p>
      </div>
      
      <div className="grid gap-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
        {MUSIC_STYLES.map((style) => (
          <div 
            key={style.id}
            onClick={() => setFormData({...formData, style: style.id})}
            className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
              formData.style === style.id 
                ? 'border-rose-500 bg-rose-50 ring-1 ring-rose-500' 
                : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-800">{style.name}</h3>
              {formData.style === style.id && <Check className="text-rose-500 w-5 h-5" />}
            </div>
            <p className="text-sm text-slate-600 mb-3">{style.description}</p>
            
            {/* Audio Player Integrado */}
            <div className="flex items-center gap-3 bg-white p-2 rounded-lg border border-slate-100 shadow-sm" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => toggleAudio(style.id, style.previewUrl)}
                className="w-8 h-8 flex items-center justify-center bg-rose-100 text-rose-600 rounded-full hover:bg-rose-200 transition-colors"
              >
                {playing === style.id ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="ml-0.5" />}
              </button>
              
              <div className="flex-1 flex flex-col justify-center gap-1">
                 <div className="h-1 bg-slate-100 rounded-full w-full overflow-hidden">
                    <div className={`h-full bg-rose-400 rounded-full transition-all duration-300 ${playing === style.id ? 'animate-pulse w-2/3' : 'w-0'}`}></div>
                 </div>
              </div>
              
              <span className="text-xs text-slate-400 font-medium">Preview</span>
              <audio id={`audio-${style.id}`} src={style.previewUrl} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 pt-2">
        <button onClick={() => setStep(2)} className="px-6 text-slate-500 font-medium hover:text-slate-800">Voltar</button>
        <button 
          onClick={() => {
             // Parar música ao avançar
             if(playing) toggleAudio(playing, ''); 
             setStep(4)
          }}
          disabled={!formData.style}
          className="flex-1 bg-rose-500 hover:bg-rose-600 text-white p-4 rounded-xl font-bold disabled:opacity-50 transition-all shadow-lg shadow-rose-500/30"
        >
          Ver Resumo
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-bold text-slate-800">Resumo do Pedido</h2>
        <p className="text-slate-500 text-sm mt-1">Confirma os detalhes antes de finalizar.</p>
      </div>
      
      <div className="bg-slate-50 p-6 rounded-xl space-y-4 text-sm border border-slate-100">
        <div className="flex justify-between border-b border-slate-200 pb-3">
          <span className="text-slate-500">Música Personalizada</span>
          <span className="font-bold text-slate-800">€{BASE_PRICE}</span>
        </div>
        
        {/* Lógica de Exibição do Preço Base */}
        {!formData.fastDelivery && (
          <div className="flex justify-between border-b border-slate-200 pb-3">
            <span className="text-slate-500">Entrega Standard (72h)</span>
            <span className="font-bold text-green-600">Grátis</span>
          </div>
        )}

        {/* UPSELL SECTION (ENTREGA 24H) */}
        <label 
          className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all relative overflow-hidden group ${
            formData.fastDelivery 
            ? 'border-amber-400 bg-amber-50' 
            : 'border-slate-200 hover:border-amber-200 bg-white'
          }`}
        >
          <div className="mt-1">
            <input 
              type="checkbox" 
              checked={formData.fastDelivery}
              onChange={(e) => setFormData({...formData, fastDelivery: e.target.checked})}
              className="w-5 h-5 text-amber-500 rounded focus:ring-amber-500 border-gray-300"
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-slate-800 flex items-center gap-2">
                <Sparkles size={16} className="text-amber-500" /> Quero em 24 Horas
              </span>
              <span className="font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded text-xs">+€{RUSH_FEE.toFixed(2)}</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Vamos passar o teu pedido para a frente da fila. Recebes a música amanhã.
            </p>
          </div>
        </label>

        <div className="flex justify-between text-xl pt-2 items-center">
          <span className="font-bold text-slate-800">Total</span>
          <div className="text-right">
             <span className="font-bold text-rose-600 text-2xl">€{finalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button onClick={() => setStep(3)} className="px-6 text-slate-500 font-medium hover:text-slate-800">Voltar</button>
        <button 
          onClick={() => alert(`A Redirecionar para Pagamento Stripe... Valor: €${finalPrice}`)}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white p-4 rounded-xl font-bold shadow-lg shadow-green-500/20 flex items-center justify-center gap-2 transition-transform hover:-translate-y-1"
        >
          Pagar €{finalPrice.toFixed(2)}
        </button>
      </div>
      
      <p className="text-xs text-center text-slate-400 flex items-center justify-center gap-1">
         <Clock size={12} /> A produção começa imediatamente após o pagamento.
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Header do Wizard */}
        <div className="bg-slate-900 p-4 flex items-center gap-4 text-white">
          <button onClick={onBack} className="hover:bg-slate-700 p-2 rounded-full transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1 text-center font-bold">Passo {step} de 4</div>
          <div className="w-9"></div> {/* Spacer para centralizar o texto */}
        </div>
        
        {/* Barra de Progresso */}
        <div className="h-1.5 bg-slate-100 w-full">
          <div 
            className="h-full bg-rose-500 transition-all duration-500 ease-out"
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>

        {/* Conteúdo Dinâmico */}
        <div className="p-6 md:p-8">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
        </div>
      </div>
    </div>
  );
};
