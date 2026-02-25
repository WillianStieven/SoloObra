'use client'

import { User, Truck, Wrench, Search, MessageCircle, CreditCard, Star } from 'lucide-react'
import Link from 'next/link'
import { Card } from '@/components/ComponentesUI'

export default function PaginaComoFunciona() {
  const passos = [
    {
      icone: <User className="w-8 h-8" />,
      titulo: '1. Cadastre-se',
      descricao: 'Crie sua conta como Cliente, Dono de Máquina ou Operador',
    },
    {
      icone: <Search className="w-8 h-8" />,
      titulo: '2. Busque',
      descricao: 'Encontre máquinas e operadores próximos à sua obra',
    },
    {
      icone: <MessageCircle className="w-8 h-8" />,
      titulo: '3. Converse',
      descricao: 'Entre em contato com o proprietário via chat',
    },
    {
      icone: <CreditCard className="w-8 h-8" />,
      titulo: '4. Contrate',
      descricao: 'Faça o pagamento de forma segura via Pix ou Cartão',
    },
    {
      icone: <Star className="w-8 h-8" />,
      titulo: '5. Avalie',
      descricao: 'Avalie o serviço prestado e ajude outros usuários',
    },
  ]

  const perfis = [
    {
      icone: <User className="w-12 h-12" />,
      titulo: 'Cliente',
      descricao: 'Solicite serviços, acompanhe a execução e avalie o trabalho realizado.',
      recursos: [
        'Busca rápida de máquinas',
        'Geolocalização em tempo real',
        'Chat direto com proprietários',
        'Pagamento seguro',
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
        'Recebimentos automáticos',
      ],
    },
    {
      icone: <Wrench className="w-12 h-12" />,
      titulo: 'Operador',
      descricao: 'Cadastre suas habilidades, documentos e valores por hora trabalhada.',
      recursos: [
        'Perfil profissional',
        'Histórico de trabalhos',
        'Avaliações e recomendações',
        'Recebimentos facilitados',
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
          <h2 className="titulo text-center mb-12">Processo em 5 Passos</h2>
          <div className="grid-cards-5">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
          <h2 className="titulo mb-4">Pronto para começar?</h2>
          <p className="text-xl mb-8 text-gray-200">
            Cadastre-se gratuitamente e comece a usar hoje mesmo
          </p>
          <Link href="/cadastro" className="inline-block btn-amarelo"
          >
            Criar Conta Grátis
          </Link>
        </section>
      </div>
    </div>
  )
}
