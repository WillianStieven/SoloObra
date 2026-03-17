'use client'

import { useState, useRef } from 'react'
import { MapPin, Shield, Clock, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { TIPOS_MAQUINAS } from '@/lib/dados'
import { BarraBusca, Card } from '@/components/ComponentesUI'

const RECURSOS = [
  {
    icone: <MapPin className="w-8 h-8" />,
    titulo: 'Geolocalização',
    descricao: 'Encontre máquinas e operadores próximos à sua obra',
  },
  {
    icone: <Shield className="w-8 h-8" />,
    titulo: 'Segurança',
    descricao: 'Todos os usuários são verificados e avaliados',
  },
  {
    icone: <Clock className="w-8 h-8" />,
    titulo: 'Agilidade',
    descricao: 'Contratação rápida e descomplicada',
  },
  {
    icone: <Star className="w-8 h-8" />,
    titulo: 'Avaliações',
    descricao: 'Sistema de avaliação para garantir qualidade',
  },
] as const

export default function PaginaInicial() {
  const [textoBusca, setTextoBusca] = useState('')
  const [localizacao, setLocalizacao] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  const aoBuscar = () => {
    window.location.href = '/busca'
  }

  const scrollEsquerda = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -280, behavior: 'smooth' })
    }
  }

  const scrollDireita = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 280, behavior: 'smooth' })
    }
  }

  return (
    <div className="w-full">
      <section className="hero">
        <div className="conteudo text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Contrate Máquinas Pesadas
            <span className="block text-yellow-500 mt-2">de Forma Digital</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Conectamos clientes, donos de máquinas e operadores em uma única plataforma
          </p>
          <div className="max-w-3xl mx-auto">
            <BarraBusca
              textoBusca={textoBusca}
              localizacao={localizacao}
              aoMudarBusca={setTextoBusca}
              aoMudarLocalizacao={setLocalizacao}
              aoBuscar={aoBuscar}
              mostrarBotao
            />
          </div>
        </div>
      </section>

      <section className="secao-branco">
        <div className="conteudo">
          <h2 className="titulo text-center mb-12">Maquinas Para Obra / Terraplanagem</h2>
          <div className="relative">
            <button
              onClick={scrollEsquerda}
              aria-label="Rolar para esquerda"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-yellow-500 hover:border-yellow-500 hover:text-navy-900 transition-colors text-navy-500"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div
              ref={scrollRef}
              className="flex overflow-x-auto gap-6 pb-4 px-14 scroll-smooth scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {TIPOS_MAQUINAS.map((maquina) => (
                <Link
                  key={maquina.id}
                  href={`/busca?tipo=${maquina.nome}`}
                  className="card-tipo flex-shrink-0 w-40 min-[768px]:w-44 min-[1024px]:w-36"
                >
                  <div className="mb-3 flex-centro h-16">
                    <Image src={maquina.imagem} alt={maquina.nome} width={128} height={128} className="object-contain" />
                  </div>
                  <h3 className="font-semibold text-navy-900">{maquina.nome}</h3>
                </Link>
              ))}
            </div>
            <button
              onClick={scrollDireita}
              aria-label="Rolar para direita"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-yellow-500 hover:border-yellow-500 hover:text-navy-900 transition-colors text-navy-500"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          {/* <h2 className="titulo text-center mb-12">Maquinas agricolas</h2> */}
        </div>
      </section>

      <section className="secao-cinza">
        <div className="conteudo">
          <h2 className="titulo text-center mb-12">Por que escolher nossa plataforma?</h2>
          <div className="grid-cards-4">
            {RECURSOS.map((recurso, indice) => (
              <Card key={indice} className="p-6 text-center">
                <div className="icone-amarelo">{recurso.icone}</div>
                <h3 className="titulo-card mb-2">{recurso.titulo}</h3>
                <p className="texto">{recurso.descricao}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="secao-azul">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Pronto para começar?</h2>
          <p className="text-xl mb-8 text-gray-200">
            Cadastre-se gratuitamente e comece a usar hoje mesmo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cadastro?tipo=cliente" className="btn-amarelo">Sou Cliente</Link>
            <Link href="/cadastro?tipo=dono" className="btn-branco">Sou Dono de Máquina</Link>
            <Link href="/cadastro?tipo=operador" className="btn-branco">Sou Operador</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
