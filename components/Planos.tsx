import React from 'react';

const Planos = () => {
  // Links atualizados
  const linkMusica = "https://buy.stripe.com/test_5kQbIUgkWaiUh0n7Or8Zq00";
  const linkVideo = "https://buy.stripe.com/test_28E9AM5Gi1Mo6lJb0D8Zq01";

  return (
    <div className="py-12 bg-white" id="precos">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Escolhe o teu plano
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Oferece uma melodia única e inesquecível.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* --- OPÇÃO 1: MÚSICA (29.99€) --- */}
          <div className="border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-8 flex flex-col relative bg-white">
            <h3 className="text-xl font-semibold text-gray-900">Música Personalizada</h3>
            <p className="mt-4 text-gray-500">A tua história numa canção original.</p>
            <div className="mt-6 flex items-baseline">
              <span className="text-4xl font-extrabold text-gray-900">29.99€</span>
            </div>

            <ul className="mt-6 space-y-4 flex-1">
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span> Música Original e Única
              </li>
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span> Entrega em MP3 de alta qualidade
              </li>
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span> Direitos de uso pessoal
              </li>
            </ul>

            <a
              href={linkMusica}
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-8 block w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg text-center transition transform hover:scale-105"
            >
              Comprar Música
            </a>
          </div>

          {/* --- OPÇÃO 2: VÍDEO + LETRA (39.98€) --- */}
          <div className="border-2 border-blue-600 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-8 flex flex-col relative bg-blue-50">
            <div className="absolute top-0 right-0 -mt-4 mr-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              Recomendado
            </div>

            <h3 className="text-xl font-semibold text-gray-900">Vídeo com Letra</h3>
            <p className="mt-4 text-gray-500">A experiência completa com vídeo karaoke.</p>
            <div className="mt-6 flex items-baseline">
              <span className="text-4xl font-extrabold text-gray-900">39.98€</span>
            </div>

            <ul className="mt-6 space-y-4 flex-1">
              <li className="flex items-center text-gray-700">
                <span className="text-green-600 mr-2">✓</span> <strong>Inclui a Música Original</strong>
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-600 mr-2">✓</span> Vídeo MP4 com a letra a passar
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-600 mr-2">✓</span> Ideal para partilhar no Instagram/TikTok
              </li>
            </ul>

            <a
              href={linkVideo}
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-8 block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-center transition transform hover:scale-105 shadow-lg"
            >
              Comprar Pack Completo
            </a>
          </div>

        </div>
        
        <div className="text-center mt-8 text-sm text-gray-500">
           Pagamento 100% seguro. Aceitamos <strong>MB WAY</strong> e Cartão.
        </div>

      </div>
    </div>
  );
};

export default Planos;
