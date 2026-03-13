'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CreditCard, DollarSign, Check, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { MetodoPagamento, DadosCartao } from '@/lib/dados'
import { Card, Botao, CampoEntrada } from '@/components/ComponentesUI'

function ConteudoPagamento() {
  const searchParams = useSearchParams()
  const router = useRouter() // <-- Hook de roteamento do Next.js adicionado
  const [metodoPagamento, setMetodoPagamento] = useState<MetodoPagamento | null>(null)
  const [dadosCartao, setDadosCartao] = useState<DadosCartao>({
    numero: '',
    nome: '',
    validade: '',
    cvv: '',
  })
  const [processando, setProcessando] = useState(false)

  const horasContratadas = parseInt(searchParams.get('horas') || '1')
  const precoBase = 350.00
  const taxaBase = 35.00
  
  const totalPagamento = (precoBase * horasContratadas) + (taxaBase * horasContratadas)

  const aoPagar = async () => {
    if (!metodoPagamento) {
      alert('Selecione um método de pagamento')
      return
    }

    setProcessando(true)
    
    // Simula o tempo de processamento do cartão/pix
    setTimeout(() => {
      setProcessando(false)
      alert('Pagamento processado com sucesso! Sua reserva está confirmada.')
      
      // REDIRECIONAMENTO INTELIGENTE APÓS O SUCESSO
      router.push('/perfil')
    }, 2000)
  }

  return (
    <div className="pagina">
      <div className="conteudo-6xl">
        <div className="mb-6">
          <Link href="javascript:history.back()" className="inline-flex items-center text-navy-500 hover:text-yellow-500 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar para detalhes da máquina
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulário de Pagamento */}
          <div>
            <h1 className="titulo mb-6">Finalizar Pagamento</h1>
            
            <Card className="p-6 mb-6">
              <h2 className="titulo-sec mb-4">Selecione o Método</h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setMetodoPagamento('cartao')}
                  className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-colors ${
                    metodoPagamento === 'cartao' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200 hover:border-yellow-300'
                  }`}
                >
                  <CreditCard className={`w-8 h-8 ${metodoPagamento === 'cartao' ? 'text-yellow-600' : 'text-gray-400'}`} />
                  <span className="font-semibold text-navy-900">Cartão de Crédito</span>
                </button>
                <button
                  onClick={() => setMetodoPagamento('pix')}
                  className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-colors ${
                    metodoPagamento === 'pix' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200 hover:border-yellow-300'
                  }`}
                >
                  <DollarSign className={`w-8 h-8 ${metodoPagamento === 'pix' ? 'text-yellow-600' : 'text-gray-400'}`} />
                  <span className="font-semibold text-navy-900">Pix</span>
                </button>
              </div>
            </Card>

            {metodoPagamento === 'cartao' && (
              <Card className="p-6">
                <h2 className="titulo-sec mb-4">Dados do Cartão</h2>
                <div className="space-y-4">
                  <CampoEntrada
                    rotulo="Número do Cartão"
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    value={dadosCartao.numero}
                    onChange={(e) => setDadosCartao({...dadosCartao, numero: e.target.value})}
                  />
                  <CampoEntrada
                    rotulo="Nome Impresso no Cartão"
                    type="text"
                    value={dadosCartao.nome}
                    onChange={(e) => setDadosCartao({...dadosCartao, nome: e.target.value})}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <CampoEntrada
                      rotulo="Validade (MM/AA)"
                      type="text"
                      placeholder="MM/AA"
                      value={dadosCartao.validade}
                      onChange={(e) => setDadosCartao({...dadosCartao, validade: e.target.value})}
                    />
                    <CampoEntrada
                      rotulo="CVV"
                      type="text"
                      placeholder="123"
                      value={dadosCartao.cvv}
                      onChange={(e) => setDadosCartao({...dadosCartao, cvv: e.target.value})}
                    />
                  </div>
                </div>
              </Card>
            )}

            {metodoPagamento === 'pix' && (
              <Card className="p-8 text-center">
                <div className="w-48 h-48 bg-gray-200 mx-auto mb-4 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">QR Code Pix</span>
                </div>
                <p className="texto mb-4">Escaneie o QR Code acima para pagar ou copie o código abaixo:</p>
                <div className="bg-gray-100 p-3 rounded-lg flex justify-between items-center break-all">
                  <span className="text-sm font-mono text-gray-600 truncate mr-2">00020126580014br.gov.bcb.pix...</span>
                  <Botao variante="contorno">Copiar</Botao>
                </div>
              </Card>
            )}
          </div>

          {/* Resumo da Compra */}
          <div>
            <Card className="p-6 sticky top-24">
              <h2 className="titulo-sec mb-6">Resumo da Reserva</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="texto">Máquina</span>
                  <span className="font-semibold text-navy-900 text-right">Retroescavadeira JCB 3CX</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="texto">{horasContratadas} hora(s)</span>
                  <span className="font-semibold text-navy-900">R$ {(precoBase * horasContratadas).toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="texto">Taxa da plataforma</span>
                  <span className="font-semibold text-navy-900">R$ {(taxaBase * horasContratadas).toFixed(2)}</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between pt-4 border-t-2 border-gray-200">
                  <span className="text-xl font-bold text-navy-900">Total</span>
                  <span className="text-xl font-bold text-navy-900">R$ {totalPagamento.toFixed(2)}</span>
                </div>
              </div>

              <Botao
                onClick={aoPagar}
                disabled={!metodoPagamento || processando}
                larguraCompleta
              >
                {processando ? 'Processando Pagamento...' : 'Confirmar Pagamento Seguro'}
              </Botao>

              <div className="mt-6 flex items-center justify-center text-sm text-gray-500 gap-2">
                <Check className="w-4 h-4 text-green-500" />
                Seus dados estão protegidos e criptografados
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PaginaPagamento() {
  return (
    <Suspense fallback={<div className="pagina-loading">Carregando detalhes do pagamento...</div>}>
      <ConteudoPagamento />
    </Suspense>
  )
}