"use client"
import { useState, useEffect } from 'react';
import { MapPin, User, Star } from 'lucide-react'; // Certifique-se das importações
// Importe seus componentes de UI (Card, Botao, etc) aqui

export default function PaginaDetalhesMaquina({ params }) {
  const [maquina, setMaquina] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [dataSelecionada, setDataSelecionada] = useState('');
  const [horas, setHoras] = useState(1);

  // 1. Busca os dados reais da API
  useEffect(() => {
    const buscarMaquina = async () => {
      try {
        setCarregando(true);
        // Busca a máquina específica pelo ID que vem na URL
        const resposta = await fetch(`http://localhost:5000/api/maquinas/${params.id}`);
        const dados = await resposta.json();
        setMaquina(dados);
      } catch (error) {
        console.error('Erro ao buscar máquina:', error);
      } finally {
        setCarregando(false);
      }
    };

    buscarMaquina();
  }, [params.id]);

  // Enquanto carrega ou se não encontrar
  if (carregando) return <div className="p-20 text-center">Carregando detalhes da máquina...</div>;
  if (!maquina) return <div className="p-20 text-center">Máquina não encontrada.</div>;

  // 2. Cálculos baseados nos nomes das colunas do seu Banco (Postgres)
  const valorDiaria = Number(maquina.preco_diaria) || 0;
  const precoTotal = valorDiaria * horas;
  const taxaPlataforma = precoTotal * 0.1;
  const totalFinal = precoTotal + taxaPlataforma;

  return (
    <div className="pagina">
      <div className="conteudo-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              {/* Header com Imagem ou URL do Banco */}
              <div className="hero-sm p-12 text-center bg-navy-900">
                {maquina.img_url ? (
                  <img src={maquina.img_url} alt={maquina.nome} className="max-h-64 mx-auto mb-4 rounded-lg" />
                ) : (
                  <div className="text-8xl mb-4">🚜</div>
                )}
                <h1 className="text-3xl font-bold text-white mb-2">{maquina.nome}</h1>
                <p className="text-blue-200">{maquina.tipo_maquina}</p>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-bold text-navy-900 mb-4 border-b pb-2">Descrição</h2>
                <p className="text-gray-600 mb-6">{maquina.descricao}</p>

                {/* Especificações (Campo JSON do Banco) */}
                {maquina.especificacoes && (
                  <>
                    <h2 className="text-xl font-bold text-navy-900 mb-4 border-b pb-2">Especificações Técnicas</h2>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {Object.entries(maquina.especificacoes).map(([chave, valor]) => (
                        <div key={chave} className="flex flex-col p-3 bg-gray-50 rounded">
                          <span className="text-xs uppercase text-gray-500 font-bold">{chave}</span>
                          <span className="text-navy-900 font-medium">{valor}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Card do Proprietário (Usando a relação que criamos no Sequelize) */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h2 className="text-xl font-bold text-navy-900 mb-4">Sobre o Proprietário</h2>
              <div className="flex items-center gap-4">
                <div className="bg-orange-500 p-3 rounded-full">
                  <User className="text-white w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{maquina.proprietario?.nome || "Proprietário SoloObra"}</h3>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{maquina.localizacao}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna do Orçamento (Sticky) */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-24">
              <h2 className="text-2xl font-bold text-navy-900 mb-6">Orçamento</h2>
              
              <div className="space-y-4 mb-6">
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">Quantidade de Horas</span>
                  <input 
                    type="number" 
                    className="w-full mt-1 p-2 border rounded"
                    value={horas}
                    onChange={(e) => setHoras(Number(e.target.value))}
                  />
                </label>
              </div>

              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between">
                  <span>Valor das Horas</span>
                  <span className="font-bold">R$ {precoTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Taxa SoloObra (10%)</span>
                  <span>R$ {taxaPlataforma.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-navy-900 pt-4 border-t">
                  <span>Total</span>
                  <span>R$ {totalFinal.toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-navy-900 font-bold py-4 rounded-lg mt-6 transition-colors">
                Reservar Agora
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}