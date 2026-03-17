'use client'

import { Target, TrendingUp, Shield, Users } from 'lucide-react'
import Link from 'next/link'
import { Card } from '../../components/ComponentesUI'

/**
 * Componente da página "Sobre"
 * Apresenta a empresa, valores, missão, visão e modelo de negócio
 */
export default function PaginaSobre() {
  /**
   * Array com os valores da empresa
   * Cada valor tem ícone, título e descrição
   */
  const valores = [
    {
      icone: <Target className="w-8 h-8" />,
      titulo: 'Missão',
      descricao: 'Democratizar o acesso a máquinas pesadas, conectando quem precisa com quem oferece de forma rápida, segura e transparente.',
    },
    {
      icone: <TrendingUp className="w-8 h-8" />,
      titulo: 'Visão',
      descricao: 'Ser a principal plataforma digital de contratação de máquinas pesadas no Brasil, transformando o setor de construção.',
    },
    {
      icone: <Shield className="w-8 h-8" />,
      titulo: 'Segurança',
      descricao: 'Garantimos transparência, verificação de usuários e contratos claros em todas as transações.',
    },
    {
      icone: <Users className="w-8 h-8" />,
      titulo: 'Comunidade',
      descricao: 'Construímos uma comunidade confiável de profissionais e clientes, com avaliações e recomendações.',
    },
  ]

  /**
   * Array com os benefícios/diferenciais da plataforma
   * Lista simples de strings
   */
  const beneficios = [
    'Redução de máquinas paradas',
    'Profissionalização do setor',
    'Facilidade e rapidez na contratação',
    'Preços transparentes e competitivos',
    'Sistema de avaliação confiável',
    'Suporte e garantia de qualidade',
  ]

  return (
    <div className="pagina-lg">
      <div className="conteudo-6xl">
        <div className="text-center mb-16">
          <h1 className="titulo-xl mb-6">Sobre a Solo Obra</h1>
          <p className="text-xl texto max-w-3xl mx-auto">
            Somos uma plataforma inovadora que conecta clientes e donos de máquinas pesadas,
            transformando a forma como serviços de terraplanagem e obras civis são contratados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="p-8">
            <h2 className="titulo-2xl mb-4">O Problema</h2>
            <p className="texto mb-4">
              O setor de máquinas pesadas é altamente informal, com dificuldade para encontrar equipamentos
              disponíveis e preços justos. A contratação geralmente ocorre via indicações,
              sem garantia, contratos claros ou controle de qualidade.
            </p>
          </Card>
          <Card className="p-8">
            <h2 className="titulo-2xl mb-4">Nossa Solução</h2>
            <p className="texto mb-4">
              Um marketplace inteligente que permite encontrar rapidamente máquinas disponíveis
              próximas à obra, com orçamento automático e sistema de avaliação para garantir
              qualidade e confiança.
            </p>
          </Card>
        </div>

        <section className="mb-16">
          <h2 className="titulo text-center mb-12">Nossos Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valores.map((valor, indice) => (
              <Card key={indice} className="p-6 text-center">
                <div className="icone-amarelo">{valor.icone}</div>
                <h3 className="titulo-card mb-2">{valor.titulo}</h3>
                <p className="texto text-sm">{valor.descricao}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-navy-500 rounded-lg p-12 text-white mb-16">
          <h2 className="titulo text-center mb-8" style={{ color: 'white' }}>Diferenciais da Plataforma</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {beneficios.map((beneficio, indice) => (
              <div key={indice} className="flex items-start gap-3">
                <span className="text-yellow-500 mt-1">✓</span>
                <span>{beneficio}</span>
              </div>
            ))}
          </div>
        </section>

        <Card className="p-8 mb-16">
          <h2 className="titulo mb-6">Modelo de Negócio</h2>
          <p className="texto mb-4">
            A plataforma é monetizada através de comissão por serviço realizado, garantindo que só ganhamos
            quando você ganha. Também oferecemos planos mensais para donos de máquinas e anúncios de destaque
            para maior visibilidade.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bloco-cinza">
              <h3 className="font-semibold text-navy-900 mb-2">Comissão por Serviço</h3>
              <p className="texto text-sm">10% sobre cada contratação realizada</p>
            </div>
            <div className="bloco-cinza">
              <h3 className="font-semibold text-navy-900 mb-2">Planos Mensais</h3>
              <p className="texto text-sm">Para donos de múltiplas máquinas</p>
            </div>
            <div className="bloco-cinza">
              <h3 className="font-semibold text-navy-900 mb-2">Anúncios Destaque</h3>
              <p className="texto text-sm">Maior visibilidade na busca</p>
            </div>
          </div>
        </Card>

        <section className="text-center">
          <h2 className="titulo mb-4">Faça parte dessa transformação</h2>
          <p className="text-xl texto mb-8">
            Junte-se a milhares de profissionais e clientes que já confiam na nossa plataforma
          </p>
          <Link href="/cadastro" className="inline-block btn-amarelo">
            Começar Agora
          </Link>
        </section>
      </div>
    </div>
  )
}
