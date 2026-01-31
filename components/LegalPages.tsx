import React, { useEffect } from 'react';
import { ArrowLeft, Mail, MessageCircle, FileText, Shield, Lock } from 'lucide-react';

interface PageProps {
  onBack: () => void;
}

// Hook para fazer scroll para o topo ao abrir a página
const useScrollTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
};

// --- PÁGINA DE CONTACTOS ---
export const ContactPage: React.FC<PageProps> = ({ onBack }) => {
  useScrollTop();
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <button onClick={onBack} className="group flex items-center gap-2 text-slate-500 hover:text-rose-600 mb-8 transition-colors font-bold text-xs uppercase tracking-widest">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/> Voltar
        </button>
        
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 text-center space-y-8">
          <div>
            <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4">Apoio ao Cliente</h1>
            <p className="text-slate-500 max-w-lg mx-auto">A nossa equipa está disponível para garantir que a tua experiência é perfeita. Tens dúvidas sobre o pedido ou precisas de uma revisão na letra?</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:border-rose-100 transition-colors flex flex-col items-center gap-4 group">
              <div className="bg-white p-4 rounded-full shadow-sm text-rose-500 group-hover:scale-110 transition-transform"><Mail size={28} /></div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">E-mail</h3>
                <a href="mailto:goalcouplesgift@gmail.com" className="text-rose-600 hover:underline">goalcouplesgift@gmail.com</a>
                <p className="text-xs text-slate-400 mt-2">Tempo médio de resposta: 2 a 4 horas</p>
              </div>
            </div>

            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:border-green-100 transition-colors flex flex-col items-center gap-4 group">
              <div className="bg-white p-4 rounded-full shadow-sm text-green-500 group-hover:scale-110 transition-transform"><MessageCircle size={28} /></div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">WhatsApp</h3>
                <a href="https://wa.me/351960188335" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">+351 960 188 335</a>
                <p className="text-xs text-slate-400 mt-2">Disponível das 09h às 20h (Seg-Sex)</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white p-8 rounded-2xl text-left">
            <h3 className="font-bold mb-3 flex items-center gap-2 text-lg"><Shield size={20} className="text-green-400"/> Garantia de Satisfação</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              O nosso compromisso é com a vossa emoção. Se, ao receberes a música, sentires que algum detalhe na letra não corresponde à vossa história ou houver algum erro de pronúncia, oferecemos <strong>revisões gratuitas</strong> até ficar perfeito. Basta responderes ao e-mail de entrega.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- PÁGINA DE TERMOS E CONDIÇÕES (RIGOROSA) ---
export const TermsPage: React.FC<PageProps> = ({ onBack }) => {
  useScrollTop();
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className="group flex items-center gap-2 text-slate-500 hover:text-rose-600 mb-8 transition-colors font-bold text-xs uppercase tracking-widest">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/> Voltar
        </button>
        
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">Termos e Condições de Serviço</h1>
        <p className="text-slate-400 text-sm mb-10">Última atualização: 30 de Janeiro de 2026</p>
        
        <div className="space-y-8 text-sm text-slate-600 leading-relaxed text-justify">
          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2"><FileText size={18}/> 1. Objeto e Âmbito</h3>
            <p>Os presentes Termos e Condições regulam o acesso e utilização do website <strong>Melodia do Amor</strong> e a compra de produtos digitais personalizados (músicas). Ao efetuar uma encomenda, o Cliente aceita, sem reservas, as presentes condições.</p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-3">2. Descrição do Serviço</h3>
            <p>A "Melodia do Amor" presta um serviço de criação artística personalizada. Com base nas informações fornecidas pelo Cliente (nomes, histórias, preferências), produzimos um ficheiro de áudio digital (formato MP3) com letra e melodia originais.</p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-3">3. Preços e Pagamento</h3>
            <p>Os preços apresentados incluem IVA à taxa legal em vigor. O pagamento é processado de forma segura através da plataforma <strong>Stripe</strong>, que aceita Cartão de Crédito, Apple Pay, Google Pay e, mediante disponibilidade, MB WAY. A produção inicia-se apenas após a confirmação do pagamento.</p>
          </section>

          <section className="bg-rose-50 p-6 rounded-xl border border-rose-100">
            <h3 className="text-lg font-bold text-rose-700 mb-3">4. Política de Cancelamento e Reembolso (Importante)</h3>
            <p className="mb-2"><strong>Exceção ao Direito de Livre Resolução:</strong></p>
            <p>De acordo com o Artigo 16.º, alínea c) da Diretiva 2011/83/UE e o Artigo 17.º do Decreto-Lei n.º 24/2014 em Portugal, o direito de arrependimento (devolução em 14 dias) <strong>não se aplica</strong> ao fornecimento de bens produzidos de acordo com especificações do consumidor ou manifestamente personalizados.</p>
            <p className="mt-2">Uma vez que cada música é criada exclusivamente para o Cliente com base na sua história pessoal, <strong>não efetuamos reembolsos monetários</strong> após o início do processo de produção. Contudo, garantimos a satisfação através da nossa política de revisões (ver ponto 5).</p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-3">5. Entregas e Revisões</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Prazo:</strong> A entrega é feita digitalmente (via E-mail e/ou WhatsApp) no prazo máximo de 72 horas para pedidos Standard, ou 24 horas para pedidos Prioritários.</li>
              <li><strong>Formato:</strong> Ficheiro digital MP3 de alta fidelidade. Não são enviados produtos físicos (CDs, Vinil).</li>
              <li><strong>Revisões:</strong> O Cliente tem direito a revisões gratuitas caso existam erros factuais na letra (ex: nomes errados, das incorretas) ou falhas técnicas no áudio. Alterações estéticas completas (ex: "não gosto do estilo que escolhi") podem estar sujeitas a uma taxa adicional.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-3">6. Propriedade Intelectual</h3>
            <p>A "Melodia do Amor" concede ao Cliente uma licença perpétua, não exclusiva e mundial para uso pessoal da música (partilhar em redes sociais, usar em vídeos privados, oferecer). A "Melodia do Amor" reserva-se o direito de usar excertos anonimizados para fins de portfólio, salvo indicação expressa em contrário pelo Cliente.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

// --- PÁGINA DE POLÍTICA DE PRIVACIDADE (RGPD) ---
export const PrivacyPage: React.FC<PageProps> = ({ onBack }) => {
  useScrollTop();
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className="group flex items-center gap-2 text-slate-500 hover:text-rose-600 mb-8 transition-colors font-bold text-xs uppercase tracking-widest">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/> Voltar
        </button>
        
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">Política de Privacidade</h1>
        <p className="text-slate-400 text-sm mb-10">Conformidade com o RGPD</p>
        
        <div className="space-y-8 text-sm text-slate-600 leading-relaxed text-justify">
          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2"><Lock size={18}/> 1. Recolha de Dados Pessoais</h3>
            <p>A Melodia do Amor respeita a sua privacidade. Recolhemos apenas os dados estritamente necessários para a execução do contrato de serviço:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Identificação:</strong> Nome do cliente e nome do destinatário.</li>
              <li><strong>Contacto:</strong> Endereço de e-mail e número de telemóvel (para envio do produto).</li>
              <li><strong>Conteúdo:</strong> Histórias, memórias e preferências partilhadas para a criação da letra.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-3">2. Finalidade do Tratamento</h3>
            <p>Os dados são utilizados exclusivamente para:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Processamento e produção da música personalizada.</li>
              <li>Envio do produto final e comunicação de apoio ao cliente.</li>
              <li>Processamento fiscal e faturação.</li>
            </ul>
            <p className="mt-2">Não vendemos, alugamos ou partilhamos os seus dados pessoais com terceiros para fins de marketing.</p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-3">3. Partilha com Terceiros</h3>
            <p>Para a prestação do serviço, partilhamos dados estritamente necessários com os seguintes parceiros:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Stripe:</strong> Para processamento seguro de pagamentos.</li>
              <li><strong>Parceiros de Produção:</strong> Sistemas de som utilizados na composição.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-3">4. Segurança e Conservação</h3>
            <p>Utilizamos protocolos de segurança SSL (Secure Socket Layer) em todas as páginas. Os dados relativos à história e produção são mantidos por um período de 6 meses para permitir revisões ou segundas vias, sendo posteriormente eliminados ou anonimizados.</p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-3">5. Os Seus Direitos</h3>
            <p>Nos termos do Regulamento Geral sobre a Proteção de Dados (RGPD), o titular tem o direito de aceder, retificar, limitar ou apagar os seus dados pessoais a qualquer momento. Para exercer estes direitos, contacte-nos através do e-mail: <strong>goalcouplesgift@gmail.com</strong>.</p>
          </section>
        </div>
      </div>
    </div>
  );
};
