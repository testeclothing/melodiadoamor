import React from 'react';
import { ArrowLeft, Mail, MessageCircle, ShieldCheck } from 'lucide-react';

interface PageProps {
  onBack: () => void;
}

// --- COMPONENTE DE CONTACTOS ---
export const ContactPage: React.FC<PageProps> = ({ onBack }) => (
  <div className="min-h-screen bg-slate-50 font-sans text-slate-900 py-12 px-4">
    <div className="max-w-2xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-rose-600 mb-8 transition-colors font-bold text-sm uppercase tracking-widest">
        <ArrowLeft size={16} /> Voltar
      </button>
      
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 text-center space-y-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 mb-4">Fala Connosco</h1>
          <p className="text-slate-500">Tens dúvidas sobre o teu pedido ou precisas de ajuda com a tua música? Estamos aqui.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center gap-3">
            <div className="bg-white p-3 rounded-full shadow-sm text-rose-500"><Mail size={24} /></div>
            <h3 className="font-bold text-slate-900">E-mail</h3>
            <p className="text-sm text-slate-500">apoio@melodiadoamor.pt</p>
            <p className="text-xs text-slate-400">Resposta em 24h</p>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center gap-3">
            <div className="bg-white p-3 rounded-full shadow-sm text-green-500"><MessageCircle size={24} /></div>
            <h3 className="font-bold text-slate-900">WhatsApp</h3>
            <p className="text-sm text-slate-500 text-center">Respondemos diretamente após a compra para ajustes na letra.</p>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-2xl">
          <h3 className="font-bold mb-2 flex items-center justify-center gap-2"><ShieldCheck size={18}/> Garantia de Satisfação</h3>
          <p className="text-sm text-slate-300">
            Se a letra tiver algum erro ou não corresponder à tua história, fazemos as revisões necessárias sem custo adicional.
          </p>
        </div>
      </div>
    </div>
  </div>
);

// --- COMPONENTE DE TERMOS E CONDIÇÕES ---
export const TermsPage: React.FC<PageProps> = ({ onBack }) => (
  <div className="min-h-screen bg-white font-sans text-slate-900 py-12 px-4">
    <div className="max-w-3xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-rose-600 mb-8 transition-colors font-bold text-sm uppercase tracking-widest">
        <ArrowLeft size={16} /> Voltar
      </button>
      
      <h1 className="text-3xl font-serif font-bold mb-8">Termos e Condições</h1>
      
      <div className="space-y-6 text-sm text-slate-600 leading-relaxed text-justify">
        <p><strong>Última atualização: Janeiro 2026</strong></p>
        
        <section>
          <h3 className="text-lg font-bold text-slate-900 mb-2">1. O Serviço</h3>
          <p>A "Melodia do Amor" fornece um serviço de composição e produção musical personalizada. O cliente fornece informações (histórias, nomes, preferências) e nós entregamos um ficheiro de áudio digital (MP3) original.</p>
        </section>

        <section>
          <h3 className="text-lg font-bold text-slate-900 mb-2">2. Entrega e Prazos</h3>
          <p>O prazo de entrega começa a contar após a confirmação do pagamento. O prazo standard é de até 72 horas. A opção "Prioridade 24h" garante a entrega em menos de 24 horas. A entrega é feita digitalmente via E-mail e/ou WhatsApp.</p>
        </section>

        <section>
          <h3 className="text-lg font-bold text-slate-900 mb-2">3. Política de Reembolso (Exceção de Direito de Livre Resolução)</h3>
          <p>De acordo com o Artigo 16.º da Diretiva 2011/83/UE e a legislação portuguesa aplicável, <strong>o direito de livre resolução (arrependimento de 14 dias) não se aplica a bens confecionados de acordo com especificações do consumidor ou manifestamente personalizados.</strong></p>
          <p>Uma vez que cada música é única e criada especificamente para o cliente, não efetuamos reembolsos monetários após o início da produção. No entanto, oferecemos <strong>revisões gratuitas</strong> caso existam erros factuais na letra ou problemas técnicos no áudio.</p>
        </section>

        <section>
          <h3 className="text-lg font-bold text-slate-900 mb-2">4. Direitos de Propriedade Intelectual</h3>
          <p>O cliente recebe uma licença de uso pessoal e perpétua sobre a música. Pode partilhar nas redes sociais, usar em vídeos de casamento ou oferecer. A "Melodia do Amor" retém os direitos de autor da composição para efeitos de portfólio, salvo acordo em contrário.</p>
        </section>
      </div>
    </div>
  </div>
);

// --- COMPONENTE DE POLÍTICA DE PRIVACIDADE ---
export const PrivacyPage: React.FC<PageProps> = ({ onBack }) => (
  <div className="min-h-screen bg-white font-sans text-slate-900 py-12 px-4">
    <div className="max-w-3xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-rose-600 mb-8 transition-colors font-bold text-sm uppercase tracking-widest">
        <ArrowLeft size={16} /> Voltar
      </button>
      
      <h1 className="text-3xl font-serif font-bold mb-8">Política de Privacidade</h1>
      
      <div className="space-y-6 text-sm text-slate-600 leading-relaxed text-justify">
        <section>
          <h3 className="text-lg font-bold text-slate-900 mb-2">1. Recolha de Dados</h3>
          <p>Recolhemos apenas os dados necessários para a prestação do serviço: Nome, E-mail, Número de Telefone (para envio via WhatsApp) e as histórias/memórias partilhadas para a criação da letra.</p>
        </section>

        <section>
          <h3 className="text-lg font-bold text-slate-900 mb-2">2. Uso dos Dados</h3>
          <p>As suas histórias são usadas exclusivamente pelos nossos compositores e sistemas de produção para gerar a letra da música. Não vendemos nem partilhamos os seus dados pessoais com terceiros para fins de marketing.</p>
        </section>

        <section>
          <h3 className="text-lg font-bold text-slate-900 mb-2">3. Pagamentos</h3>
          <p>Todos os pagamentos são processados de forma segura através da Stripe. A "Melodia do Amor" não tem acesso aos seus dados bancários ou números de cartão de crédito.</p>
        </section>

        <section>
          <h3 className="text-lg font-bold text-slate-900 mb-2">4. Segurança</h3>
          <p>Utilizamos encriptação SSL em todo o website para proteger a transmissão dos seus dados.</p>
        </section>
      </div>
    </div>
  </div>
);
