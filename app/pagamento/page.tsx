'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { CreditCard, DollarSign, Check, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { MetodoPagamento, DadosCartao } from '@/lib/dados'
import { Card, Botao, CampoEntrada } from '@/components/ComponentesUI'

function ConteudoPagamento() {
  const searchParams = useSearchParams()
  const [metodoPagamento, setMetodoPagamento] = useState<MetodoPagamento | null>(null)
  const [dadosCartao, setDadosCartao] = useState<DadosCartao>({
    numero: '',
    nome: '',
    validade: '',
    cvv: '',
  })
  const [processando, setProcessando] = useState(false)

  const total = 385.00

  useEffect(() => {
    // Em produção, buscar dados do serviço pelos parâmetros
  }, [searchParams])

  const aoPagar = async () => {
    if (!metodoPagamento) {
      alert('Selecione um método de pagamento')
      return
    }

    setProcessando(true)
    setTimeout(() => {
      setProcessando(false)
      alert('Pagamento processado com sucesso!')
    }, 2000)
  }

  return (
    <div className="pagina">
      <div className="conteudo-md">
        <Link href="/busca" className="inline-flex items-center gap-2 text-navy-900 link-amarelo mb-6">
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </Link>

        <h1 className="titulo mb-8">Pagamento</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="titulo-sec mb-6">Método de Pagamento</h2>

              <button
                onClick={() => setMetodoPagamento('pix')}
                className={`opcao ${metodoPagamento === 'pix' ? 'opcao-selecionada' : 'opcao-normal'}`}
              >
                <div className="flex-between">
                  <div className="flex-gap-4">
                    <DollarSign className="w-6 h-6 text-navy-500" />
                    <div>
                      <h3 className="font-semibold text-navy-900">PIX</h3>
                      <p className="texto-sm">Aprovação imediata</p>
                    </div>
                  </div>
                  {metodoPagamento === 'pix' && (
                    <Check className="w-6 h-6 text-yellow-500" />
                  )}
                </div>
              </button>

              <button
                onClick={() => setMetodoPagamento('cartao')}
                className={`opcao ${metodoPagamento === 'cartao' ? 'opcao-selecionada' : 'opcao-normal'}`}
              >
                <div className="flex-between">
                  <div className="flex-gap-4">
                    <CreditCard className="w-6 h-6 text-navy-500" />
                    <div>
                      <h3 className="font-semibold text-navy-900">Cartão de Crédito</h3>
                      <p className="texto-sm">Visa, Mastercard, Elo</p>
                    </div>
                  </div>
                  {metodoPagamento === 'cartao' && (
                    <Check className="w-6 h-6 text-yellow-500" />
                  )}
                </div>
              </button>

              {metodoPagamento === 'cartao' && (
                <div className="mt-6 space-y-4 bloco-cinza-sm">
                  <CampoEntrada
                    rotulo="Número do Cartão"
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    value={dadosCartao.numero}
                    onChange={(e) => setDadosCartao({ ...dadosCartao, numero: e.target.value })}
                  />
                  <CampoEntrada
                    rotulo="Nome no Cartão"
                    type="text"
                    placeholder="Nome completo"
                    value={dadosCartao.nome}
                    onChange={(e) => setDadosCartao({ ...dadosCartao, nome: e.target.value })}
                  />
                  <div className="grid-2">
                    <CampoEntrada
                      rotulo="Validade"
                      type="text"
                      placeholder="MM/AA"
                      value={dadosCartao.validade}
                      onChange={(e) => setDadosCartao({ ...dadosCartao, validade: e.target.value })}
                    />
                    <CampoEntrada
                      rotulo="CVV"
                      type="text"
                      placeholder="123"
                      value={dadosCartao.cvv}
                      onChange={(e) => setDadosCartao({ ...dadosCartao, cvv: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {metodoPagamento === 'pix' && (
                <div className="mt-6 bloco-cinza text-center">
                  <p className="texto mb-4">Escaneie o QR Code ou copie o código PIX</p>
                  <div className="bg-white p-4 rounded-lg inline-block mb-4">
                    <div className="w-48 h-48 bg-gray-200 rounded flex-centro">
                      <span className="texto-claro">QR Code</span>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-xs text-gray-500 mb-2">Código PIX (Copiar e Colar)</p>
                    <p className="font-mono text-sm break-all">
                      00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-4266141740005204000053039865405385.005802BR5925MARKETPLACE MAQUINAS6009SAO PAULO62070503***6304ABCD
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="titulo-sec mb-6">Resumo do Pedido</h2>

              <div className="space-y-4 mb-6">
                <div className="linha">
                  <span className="texto">Retroescavadeira JCB 3CX</span>
                </div>
                <div className="linha">
                  <span className="texto">1 hora</span>
                  <span className="font-semibold text-navy-900">R$ 350,00</span>
                </div>
                <div className="linha">
                  <span className="texto">Taxa da plataforma</span>
                  <span className="font-semibold text-navy-900">R$ 35,00</span>
                </div>
              </div>

              <div className="divisor mb-6">
                <div className="linha-total">
                  <span className="text-lg font-bold text-navy-900">Total</span>
                  <span className="text-lg font-bold text-navy-900">R$ {total.toFixed(2)}</span>
                </div>
              </div>

              <Botao
                onClick={aoPagar}
                disabled={!metodoPagamento || processando}
                larguraCompleta
              >
                {processando ? 'Processando...' : 'Confirmar Pagamento'}
              </Botao>

              <p className="text-xs text-gray-500 text-center mt-4">
                Seus dados estão protegidos e seguros
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PaginaPagamento() {
  return (
    <Suspense fallback={<div className="pagina-loading">Carregando...</div>}>
      <ConteudoPagamento />
    </Suspense>
  )
}
