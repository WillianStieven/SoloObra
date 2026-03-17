'use client'

import { useState } from 'react'
import { User, Settings, Truck, MapPin, Phone, Mail } from 'lucide-react'
import { USUARIO_EXEMPLO, AVALIACOES_EXEMPLO } from '../../lib/dados'
import { Card, Botao, Avaliacao } from '../../components/ComponentesUI'

/**
 * Componente da página de perfil do usuário
 * Exibe informações do usuário, suas máquinas e avaliações
 * Possui abas para organizar diferentes seções
 */
export default function PaginaPerfil() {
  // Estado para controlar qual aba está ativa (sobre, maquinas ou avaliacoes)
  const [abaAtiva, setAbaAtiva] = useState('sobre')

  const usuario = USUARIO_EXEMPLO

  const maquinas = [
    {
      id: 1,
      nome: 'Retroescavadeira JCB 3CX',
      status: 'Disponível',
      preco: 'R$ 350/hora',
    },
    {
      id: 2,
      nome: 'Escavadeira Hidráulica',
      status: 'Em uso',
      preco: 'R$ 450/hora',
    },
  ]

  const avaliacoes = AVALIACOES_EXEMPLO

  return (
    <div className="pagina">
      <div className="conteudo-6xl">
        <Card className="p-8 mb-6">
          <div className="layout-col">
            <div className="avatar">
              <User className="w-16 h-16 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="titulo mb-2">{usuario.nome}</h1>
              <p className="texto mb-4">{usuario.tipo}</p>
              <div className="mb-4 flex justify-center md:justify-start">
                <Avaliacao nota={usuario.avaliacao} totalAvaliacoes={usuario.totalAvaliacoes} />
              </div>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm texto">
                <div className="flex-gap">
                  <MapPin className="w-4 h-4" />
                  <span>{usuario.localizacao}</span>
                </div>
                <div className="flex-gap">
                  <Phone className="w-4 h-4" />
                  <span>{usuario.telefone}</span>
                </div>
                <div className="flex-gap">
                  <Mail className="w-4 h-4" />
                  <span>{usuario.email}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Botao variante="secundario" className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Configurações
              </Botao>
            </div>
          </div>
        </Card>

        <Card className="mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setAbaAtiva('sobre')}
              className={`aba ${abaAtiva === 'sobre' ? 'aba-ativa' : 'aba-inativa'}`}
            >
              Sobre
            </button>
            <button
              onClick={() => setAbaAtiva('maquinas')}
              className={`aba ${abaAtiva === 'maquinas' ? 'aba-ativa' : 'aba-inativa'}`}
            >
              Máquinas
            </button>
            <button
              onClick={() => setAbaAtiva('avaliacoes')}
              className={`aba ${abaAtiva === 'avaliacoes' ? 'aba-ativa' : 'aba-inativa'}`}
            >
              Avaliações
            </button>
          </div>

          <div className="p-6">
            {abaAtiva === 'sobre' && (
              <div>
                <h3 className="titulo-sec mb-4">Informações</h3>
                <p className="texto mb-4">
                  Profissional com mais de 10 anos de experiência no setor de máquinas pesadas.
                  Ofereço serviços de qualidade com equipamentos modernos e bem mantidos.
                </p>
                <div className="grid-2">
                  <div>
                    <h4 className="font-semibold text-navy-900 mb-2">Especialidades</h4>
                    <ul className="list-disc list-inside texto space-y-1">
                      <li>Terraplanagem</li>
                      <li>Escavação</li>
                      <li>Compactação</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-900 mb-2">Documentos</h4>
                    <ul className="list-disc list-inside texto space-y-1">
                      <li>CNH Categoria D</li>
                      <li>Certificado de Operador</li>
                      <li>Seguro Atualizado</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {abaAtiva === 'maquinas' && (
              <div>
                <div className="flex-between mb-6">
                  <h3 className="titulo-sec">Minhas Máquinas</h3>
                  <Botao>Adicionar Máquina</Botao>
                </div>
                <div className="grid-2">
                  {maquinas.map((maquina) => (
                    <div key={maquina.id} className="card-item">
                      <div className="flex items-center gap-3 mb-3">
                        <Truck className="w-8 h-8 text-navy-500" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-navy-900">{maquina.nome}</h4>
                          <p className="texto-sm">{maquina.preco}</p>
                        </div>
                        <span className={maquina.status === 'Disponível' ? 'badge-ok' : 'badge-aviso'}>
                          {maquina.status}
                        </span>
                      </div>
                      <Botao variante="contorno" larguraCompleta>
                        Gerenciar
                      </Botao>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {abaAtiva === 'avaliacoes' && (
              <div>
                <h3 className="titulo-sec mb-6">Avaliações</h3>
                <div className="space-y-4">
                  {avaliacoes.map((avaliacao) => (
                    <div key={avaliacao.id} className="card-avaliacao">
                      <div className="flex-between mb-2">
                        <h4 className="font-semibold text-navy-900">{avaliacao.autor}</h4>
                        <Avaliacao nota={avaliacao.nota} tamanho="pequeno" />
                      </div>
                      <p className="texto mb-2">{avaliacao.comentario}</p>
                      <p className="texto-claro text-sm">{avaliacao.data}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
