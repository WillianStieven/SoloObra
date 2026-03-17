'use client'

import { forwardRef } from 'react'
import { Search, MapPin, Star } from 'lucide-react'

export function Botao({
  variante = 'primario',
  filhos,
  children,
  larguraCompleta = false,
  className = '',
  ...props
}) {
  const base =
    'font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'

  const vars = {
    primario: 'bg-yellow-500 hover:bg-yellow-600 text-navy-900',
    secundario: 'bg-white hover:bg-gray-100 text-navy-900 border border-gray-300',
    contorno: 'bg-transparent hover:bg-gray-100 text-navy-900 border-2 border-navy-500',
  }

  const largura = larguraCompleta ? 'w-full' : ''
  const conteudo = filhos || children

  return (
    <button className={`${base} ${vars[variante]} ${largura} ${className}`} {...props}>
      {conteudo}
    </button>
  )
}

export const CampoEntrada = forwardRef(
  ({ rotulo, erro, className = '', ...props }, ref) => {
    return (
      <div>
        {rotulo && (
          <label className="block text-sm font-semibold text-navy-900 mb-2">
            {rotulo} {props.required && '*'}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
            erro ? 'border-red-500' : 'border-gray-300'
          } ${className}`}
          {...props}
        />
        {erro && <p className="mt-1 text-sm text-red-500">{erro}</p>}
      </div>
    )
  }
)

CampoEntrada.displayName = 'CampoEntrada'

export function Card({ filhos = null, children = null, className = '', hover = false }) {
  const hoverCls = hover ? 'hover:shadow-xl transition-shadow' : ''
  const conteudo = filhos || children

  return (
    <div className={`bg-white rounded-lg shadow-md ${hoverCls} ${className}`}>
      {conteudo}
    </div>
  )
}

export function Avaliacao({ nota, totalAvaliacoes, tamanho = 'medio' }) {
  const tamanhos = {
    pequeno: 'w-4 h-4',
    medio: 'w-5 h-5',
    grande: 'w-6 h-6',
  }

  return (
    <div className="flex items-center gap-1">
      <Star className={`${tamanhos[tamanho]} text-yellow-500 fill-yellow-500`} />
      <span className="font-semibold text-navy-900">{nota}</span>
      {totalAvaliacoes !== undefined && (
        <span className="text-gray-500 text-sm">({totalAvaliacoes})</span>
      )}
    </div>
  )
}

export function BarraBusca({
  textoBusca,
  localizacao,
  aoMudarBusca,
  aoMudarLocalizacao,
  aoBuscar,
  mostrarBotao = false,
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex-gap-4 bg-gray-50 rounded-lg px-4 py-3">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar máquina ou serviço..."
            value={textoBusca}
            onChange={(e) => aoMudarBusca(e.target.value)}
            className="input-campo"
          />
        </div>
        <div className="flex-gap-4 bg-gray-50 rounded-lg px-4 py-3">
          <MapPin className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Localização da obra..."
            value={localizacao}
            onChange={(e) => aoMudarLocalizacao(e.target.value)}
            className="input-campo"
          />
        </div>
        {mostrarBotao && (
          <Botao onClick={aoBuscar} larguraCompleta className="md:w-auto">
            Buscar
          </Botao>
        )}
      </div>
    </div>
  )
}

export function CardMaquina({ maquina }) {
  return (
    <Card hover>
      <div className="hero-sm p-8 text-center">
        <div className="text-6xl mb-4">{maquina.imagem}</div>
        <h3 className="text-xl font-bold text-white">{maquina.nome}</h3>
      </div>
      <div className="p-6">
        <div className="flex-between mb-4">
          <Avaliacao nota={maquina.avaliacao} totalAvaliacoes={maquina.totalAvaliacoes} />
          <span className="badge-disponivel">Disponível</span>
        </div>
        <div className="space-y-2 mb-4 texto">
          <div className="flex-gap">
            <span className="text-navy-900 font-semibold">Proprietário:</span>
            <span>{maquina.proprietario}</span>
          </div>
          <div className="flex-gap">
            <MapPin className="w-4 h-4" />
            <span>
              {maquina.localizacao} • {maquina.distancia}
            </span>
          </div>
        </div>
        <div className="flex-between mb-4">
          <span className="text-2xl font-bold text-navy-900">R$ {maquina.preco}/hora</span>
        </div>
        <a href={`/maquina/${maquina.id}`} className="block w-full btn-amarelo-sm text-center py-3">
          Ver Detalhes
        </a>
      </div>
    </Card>
  )
}


