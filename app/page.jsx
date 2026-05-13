'use client'

import { useState, useRef, useEffect } from 'react' // Adicionado useEffect aqui
import { MapPin, Shield, Clock, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { TIPOS_MAQUINAS } from '../lib/dados'
import { BarraBusca, Card } from '../components/ComponentesUI'

/**
 * Array com os recursos/diferenciais da plataforma
 */
const RECURSOS = [
  {
    icone: <MapPin className="w-8 h-8" />,
    titulo: 'Geolocalização',
    descricao: 'Encontre máquinas próximas à sua obra',
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
]

export default function PaginaInicial() {
  const [textoBusca, setTextoBusca] = useState('')
  const [localizacao, setLocalizacao] = useState('')
  const [estaLogado, setEstaLogado] = useState(false) // Estado para controle de login
  const scrollRef = useRef(null)

  // Verifica a sessão ao carregar a página
  useEffect(() => {
    const usuarioSessao = localStorage.getItem('user')
    if (usuarioSessao) {
      setEstaLogado(true)
    }
  }, [])

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
      {/* Seção Hero */}
      <section className="hero mt-12">
        <div className="conteudo text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Contrate Máquinas Pesadas
            <span className="block text-yellow-500 mt-2">de Forma Digital</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Conectamos clientes e donos de máquinas em uma única plataforma
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

      {/* Seção de tipos de máquinas */}
      <section className="secao-branco">
        <div className="conteudo">
          <h2 className="titulo text-center mb-16 mt-16">Maquinas Para Obra / Terraplanagem</h2>
          <div className="relative">
            <button
              onClick={scrollEsquerda}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-yellow-500 hover:text-navy-900 transition-colors"
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
                  className="card-tipo flex-shrink-0 w-40"
                >
                  <div className="mb-3 flex-centro h-16">
                    <Image src={maquina.imagem} alt={maquina.nome} width={128} height={128} className="object-contain" />
                  </div>
                  <h3 className="font-semibold text-navy-900 text-center mt-10">{maquina.nome}</h3>
                </Link>
              ))}
            </div>

            <button
              onClick={scrollDireita}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-yellow-500 hover:text-navy-900 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Seção de recursos */}
      <section className="secao-cinza mt-16">
        <div className="conteudo">
          <h2 className="titulo text-center mb-12">Por que escolher nossa plataforma?</h2>
          <div className="grid-cards-4 flex">
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

      {/* VERIFICAÇÃO: Se NÃO estiver logado, mostra o Call to Action de Cadastro */}
        {!estaLogado ? (
          <section className="bg-navy-500 rounded-sm p-12 text-center text-white mb-0 mt-20">
            <h2 className="titulo mb-4" style={{ color: 'white' }}>Pronto para começar?</h2>
            <p className="text-xl mb-8 text-gray-200">
              Cadastre-se gratuitamente e comece a usar hoje mesmo
            </p>
            <Link href="/cadastro" className="inline-block btn-amarelo">
              Criar Conta Grátis
            </Link>
          </section>
        ) : (
          /* Opcional: Mensagem para quem já está logado */
          <section className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center mb-20 mt-20">
            <h2 className="titulo-2xl mb-4 text-navy-900">Você já está conectado!</h2>
            <p className="texto mb-8">Aproveite todos os recursos da SoloObra no seu painel.</p>
            <Link href="/busca" className="inline-block btn-amarelo">
              Buscar Máquinas Agora
            </Link>
          </section>
        )}
    </div>
  )
}