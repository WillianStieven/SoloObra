'use client'

import { User, Truck, Search, Phone, Star } from 'lucide-react'
import Link from 'next/link'
import { Card } from '../../components/ComponentesUI'

/**
 * Componente da página "Como Funciona"
 * Explica o processo de uso da plataforma e os diferentes perfis de usuário
 */
export default function PaginaComoFunciona() {
  /**
   * Array com os passos do processo de uso da plataforma
   * Cada passo tem ícone, título e descrição
   */
  const passos = [
    {
      icone: <User className="w-8 h-8" />,
      titulo: '1. Cadastre-se',
      descricao: 'Crie sua conta como Cliente ou Dono de Máquina',
    },
    {
      icone: <Search className="w-8 h-8" />,
      titulo: '2. Busque',
      descricao: 'Encontre máquinas próximas à sua obra',
    },
    {
      icone: <Phone className="w-8 h-8" />,
      titulo: '3. Entre em Contato',
      descricao: 'Entre em contato com o proprietário através dos dados de contato',
    },
    {
      icone: <Star className="w-8 h-8" />,
      titulo: '4. Avalie',
      descricao: 'Avalie o serviço prestado e ajude outros usuários',
    },
  ]

  /**
   * Array com informações sobre os 3 perfis de usuário disponíveis
   * Cada perfil tem ícone, título, descrição e lista de recursos
   */
  const perfis = [
    {
      icone: <User className="w-12 h-12" />,
      titulo: 'Cliente',
      descricao: 'Solicite serviços, acompanhe a execução e avalie o trabalho realizado.',
      recursos: [
        'Busca rápida de máquinas',
        'Geolocalização em tempo real',
        'Visualização de orçamentos',
        'Sistema de avaliações',
      ],
    },
    {
      icone: <Truck className="w-12 h-12" />,
      titulo: 'Dono de Máquina',
      descricao: 'Cadastre seus equipamentos, defina preços e gerencie disponibilidade.',
      recursos: [
        'Cadastro de múltiplas máquinas',
        'Controle de disponibilidade',
        'Gestão de contratos',
        'Perfil com avaliações',
      ],
    },
  ]

  return (
    <div className="pagina-lg">
      <div className="conteudo-6xl">
        <div className="text-center mb-16">
          <h1 className="titulo-xl mb-4">Como Funciona</h1>
          <p className="text-xl texto max-w-2xl mx-auto">
            Uma plataforma simples e eficiente para conectar quem precisa com quem oferece serviços de máquinas pesadas
          </p>
        </div>

        <section className="mb-20">
          <h2 className="titulo text-center mb-12">Processo em 4 Passos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {passos.map((passo, indice) => (
              <Card key={indice} className="p-6 text-center">
                <div className="icone-amarelo">{passo.icone}</div>
                <h3 className="titulo-card mb-2">{passo.titulo}</h3>
                <p className="texto text-sm">{passo.descricao}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="titulo text-center mb-12">Perfis da Plataforma</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {perfis.map((perfil, indice) => (
              <Card key={indice} className="p-8" hover>
                <div className="icone-centro">{perfil.icone}</div>
                <h3 className="titulo-2xl mb-4 text-center">{perfil.titulo}</h3>
                <p className="texto mb-6 text-center">{perfil.descricao}</p>
                <ul className="space-y-2">
                  {perfil.recursos.map((recurso, idx) => (
                    <li key={idx} className="flex items-start gap-2 texto">
                      <span className="text-yellow-500 mt-1">✓</span>
                      <span>{recurso}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-navy-500 rounded-lg p-12 text-center text-white">
          <h2 className="titulo mb-4" style={{ color: 'white' }}>Pronto para começar?</h2>
          <p className="text-xl mb-8 text-gray-200">
            Cadastre-se gratuitamente e comece a usar hoje mesmo
          </p>
          <Link href="/cadastro" className="inline-block btn-amarelo">
            Criar Conta Grátis
          </Link>
        </section>
      </div>
    </div>
  )
}
