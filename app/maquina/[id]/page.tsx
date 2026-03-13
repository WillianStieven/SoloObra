'use client'

import { useState } from 'react'
import { MapPin, User, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { MAQUINAS_EXEMPLO } from '@/lib/dados'
import { Botao, Card, Avaliacao } from '@/components/ComponentesUI'

export default function PaginaDetalhesMaquina({ params }: { params: { id: string } }) {
  const idMaquina = parseInt(params.id)
  const [dataSelecionada, setDataSelecionada] = useState('')
  const [horas, setHoras] = useState(1)

  // BLOQUEIO DE DATA: Pega a data de hoje no formato YYYY-MM-DD
  const dataMinima = new Date().toISOString().split('T')[0]

  const maquina = MAQUINAS_EXEMPLO.find((m) => m.id === idMaquina) || MAQUINAS_EXEMPLO[0]

  const precoTotal = maquina.preco * horas
  const taxaPlataforma = precoTotal * 0.1
  const totalFinal = precoTotal + taxaPlataforma

  return (
    <div className="pagina">
      <div className="conteudo-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LADO ESQUERDO: Detalhes da Máquina */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="overflow-hidden">
              <div className="hero-sm p-12 text-center bg-navy-900 text-white rounded-t-lg">
                <div className="text-8xl mb-4">{maquina.imagem}</div>
                <h1 className="text-3xl font-bold mb-2">{maquina.nome}</h1>
                <p className="text-lg opacity-80">{maquina.descricao || 'Excelente equipamento para sua obra.'}</p>
              </div>
              
              <div className="p-8">
                <div className="flex-between mb-6">
                  <Avaliacao nota={maquina.avaliacao} totalAvaliacoes={maquina.totalAvaliacoes} />
                  <span className={maquina.disponivel ? "badge-disponivel" : "badge-aviso"}>
                    {maquina.disponivel ? 'Disponível' : 'Indisponível'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center gap-3 texto">
                    <div className="bg-gray-100 p-3 rounded-full">
                      <User className="w-6 h-6 text-navy-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Proprietário</p>
                      <p className="font-semibold text-navy-900">{maquina.proprietario}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 texto">
                    <div className="bg-gray-100 p-3 rounded-full">
                      <MapPin className="w-6 h-6 text-navy-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Localização</p>
                      <p className="font-semibold text-navy-900">{maquina.localizacao}</p>
                    </div>
                  </div>
                </div>

                {maquina.especificacoes && (
                  <div className="mb-6">
                    <h3 className="titulo-sec mb-4">Especificações</h3>
                    <ul className="grid grid-cols-2 gap-2">
                      {maquina.especificacoes.map((esp, i) => (
                        <li key={i} className="flex items-center gap-2 texto-sm">
                          <span className="text-yellow-500">•</span> {esp}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* LADO DIREITO: Card de Reserva */}
          <div>
            <Card className="p-6 sticky top-24">
              <h2 className="titulo-sec mb-6">Fazer Reserva</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block texto-sm font-semibold mb-2">Data da Reserva</label>
                  <input
                    type="date"
                    min={dataMinima}
                    value={dataSelecionada}
                    onChange={(e) => setDataSelecionada(e.target.value)}
                    className="w-full select-campo"
                    required
                  />
                </div>
                <div>
                  <label className="block texto-sm font-semibold mb-2">Horas Necessárias</label>
                  <input
                    type="number"
                    min="1"
                    max="24"
                    value={horas}
                    onChange={(e) => setHoras(parseInt(e.target.value) || 1)}
                    className="w-full select-campo"
                    required
                  />
                </div>
              </div>

              <div className="bloco-cinza mb-6 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="texto">Preço por hora</span>
                  <span className="font-semibold text-navy-900">R$ {maquina.preco.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="texto">Quantidade de horas</span>
                  <span className="font-semibold text-navy-900">{horas}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="texto">Taxa da plataforma (10%)</span>
                  <span className="font-semibold text-navy-900">R$ {taxaPlataforma.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-300 mt-2">
                  <span className="text-lg font-bold text-navy-900">Total</span>
                  <span className="text-lg font-bold text-navy-900">R$ {totalFinal.toFixed(2)}</span>
                </div>
              </div>

              {/* LÓGICA DO BOTÃO DE PAGAMENTO BLOQUEADO */}
              {!dataSelecionada ? (
                <div className="text-center mb-4">
                  <Botao larguraCompleta disabled className="opacity-50 cursor-not-allowed">
                    Selecione uma data para continuar
                  </Botao>
                  <p className="text-xs text-red-500 mt-2">
                    * Escolha a data da reserva para verificar a disponibilidade
                  </p>
                </div>
              ) : (
                <Link
                  href={`/pagamento?maquina=${maquina.id}&horas=${horas}&data=${dataSelecionada}`}
                  className="block w-full mb-4"
                >
                  <Botao larguraCompleta>Continuar para Pagamento</Botao>
                </Link>
              )}

              {/* BOTÃO DO CHAT ADICIONADO AQUI */}
              <Link href="/chat" className="block w-full">
                <Botao variante="contorno" larguraCompleta className="flex justify-center items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Falar com o Proprietário
                </Botao>
              </Link>

              <p className="text-xs text-gray-500 text-center mt-4">
                Pagamento seguro via Pix ou Cartão
              </p>
            </Card>
          </div>
          
        </div>
      </div>
    </div>
  )
}