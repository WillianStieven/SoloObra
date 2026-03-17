'use client'

import { useState } from 'react'
import { MapPin, User, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { MAQUINAS_EXEMPLO } from '@/lib/dados'
import { CampoEntrada, Botao, Card, Avaliacao } from '@/components/ComponentesUI'

export default function PaginaDetalhesMaquina({ params }: { params: { id: string } }) {
  const idMaquina = parseInt(params.id)
  const [dataSelecionada, setDataSelecionada] = useState('')
  const [horas, setHoras] = useState(1)

  const maquina = MAQUINAS_EXEMPLO.find((m) => m.id === idMaquina) || MAQUINAS_EXEMPLO[0]

  const precoTotal = maquina.preco * horas
  const taxaPlataforma = precoTotal * 0.1
  const totalFinal = precoTotal + taxaPlataforma

  return (
    <div className="pagina">
      <div className="conteudo-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="overflow-hidden">
              <div className="hero-sm p-12 text-center">
                <div className="text-8xl mb-4">{maquina.imagem}</div>
                <h1 className="text-3xl font-bold text-white mb-2">{maquina.nome}</h1>
                <div className="flex items-center justify-center gap-2 text-white">
                  <Avaliacao nota={maquina.avaliacao} totalAvaliacoes={maquina.totalAvaliacoes} tamanho="medio" />
                </div>
              </div>
              <div className="p-6">
                {maquina.descricao && (
                  <>
                    <h2 className="titulo-sec mb-4">Descrição</h2>
                    <p className="texto mb-6">{maquina.descricao}</p>
                  </>
                )}

                {maquina.especificacoes && maquina.especificacoes.length > 0 && (
                  <>
                    <h2 className="titulo-sec mb-4">Especificações Técnicas</h2>
                    <ul className="grid grid-cols-2 gap-2 mb-6">
                      {maquina.especificacoes.map((especificacao, indice) => (
                        <li key={indice} className="flex-gap texto">
                          <span className="icone-ponto"></span>
                          {especificacao}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {maquina.recursos && maquina.recursos.length > 0 && (
                  <>
                    <h2 className="titulo-sec mb-4">Recursos Inclusos</h2>
                    <ul className="grid grid-cols-2 gap-2">
                      {maquina.recursos.map((recurso, indice) => (
                        <li key={indice} className="flex-gap texto">
                          <span className="icone-ponto"></span>
                          {recurso}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="titulo-sec mb-4">Sobre o Proprietário</h2>
              <div className="flex-gap-6">
                <div className="avatar-sm">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-navy-900 mb-1">{maquina.proprietario}</h3>
                  <div className="flex-gap texto mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{maquina.localizacao} • {maquina.distancia}</span>
                  </div>
                  <div className="mb-4">
                    <Avaliacao nota={maquina.avaliacao} totalAvaliacoes={maquina.totalAvaliacoes} tamanho="pequeno" />
                  </div>
                  <Link href="/chat" className="inline-flex items-center gap-2 btn-amarelo-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Enviar Mensagem
                  </Link>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="titulo-2xl mb-6">Contratar Serviço</h2>

              <div className="space-y-4 mb-6">
                <CampoEntrada
                  rotulo="Data do Serviço"
                  type="date"
                  value={dataSelecionada}
                  onChange={(e) => setDataSelecionada(e.target.value)}
                />

                <CampoEntrada
                  rotulo="Quantidade de Horas"
                  type="number"
                  min="1"
                  value={horas.toString()}
                  onChange={(e) => setHoras(Number(e.target.value))}
                />
              </div>

              <div className="divisor mb-6">
                <div className="linha mb-2">
                  <span className="texto">Preço por hora</span>
                  <span className="font-semibold text-navy-900">R$ {maquina.preco.toFixed(2)}</span>
                </div>
                <div className="linha mb-2">
                  <span className="texto">Quantidade de horas</span>
                  <span className="font-semibold text-navy-900">{horas}</span>
                </div>
                <div className="linha mb-2">
                  <span className="texto">Taxa da plataforma (10%)</span>
                  <span className="font-semibold text-navy-900">R$ {taxaPlataforma.toFixed(2)}</span>
                </div>
                <div className="divisor pt-2 linha-total">
                  <span className="text-lg font-bold text-navy-900">Total</span>
                  <span className="text-lg font-bold text-navy-900">R$ {totalFinal.toFixed(2)}</span>
                </div>
              </div>

              <Link
                href={`/pagamento?maquina=${maquina.id}&horas=${horas}&data=${dataSelecionada}`}
                className="block w-full"
              >
                <Botao larguraCompleta>Continuar para Pagamento</Botao>
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
