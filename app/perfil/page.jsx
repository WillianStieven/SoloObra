'use client'

import { useState, useEffect } from 'react' 
import { User, Settings, Truck, MapPin, Phone, Mail, Loader2 } from 'lucide-react'
import { USUARIO_EXEMPLO, AVALIACOES_EXEMPLO } from '../../lib/dados'
import { Card, Botao, Avaliacao } from '../../components/ComponentesUI'

export default function PaginaPerfil() {
  // Estados
  const [abaAtiva, setAbaAtiva] = useState('sobre')
  const [user, setUser] = useState(USUARIO_EXEMPLO)
  const [minhasMaquinas, setMinhasMaquinas] = useState([])
  const [carregando, setCarregando] = useState(true)

  // 1. Carregar usuário do localStorage
  useEffect(() => {
    const dadosSalvos = localStorage.getItem('user')
    if (dadosSalvos) {
      try {
        const usuarioParseado = JSON.parse(dadosSalvos)
        setUser(usuarioParseado)
      } catch (error) {
        console.error("Erro ao ler dados do usuário", error)
      }
    }
  }, [])

  // 2. Buscar máquinas da API e filtrar pelas do usuário logado
  useEffect(() => {
    const carregarMaquinasDoUsuario = async () => {
      if (!user?.id) return; // Espera ter o ID do usuário

      try {
        setCarregando(true)
        const resposta = await fetch('http://localhost:5000/api/maquinas')
        const dados = await resposta.json()
        
        // Filtra para mostrar apenas as máquinas onde o id_proprietario é igual ao id do user logado
        const listaFiltrada = Array.isArray(dados) 
          ? dados.filter(m => m.id_proprietario === user.id)
          : []
          
        setMinhasMaquinas(listaFiltrada)
      } catch (error) {
        console.error('Erro ao buscar máquinas do banco:', error)
      } finally {
        setCarregando(false)
      }
    }

    carregarMaquinasDoUsuario()
  }, [user.id]) // Reexecuta se o ID do usuário mudar

  const avaliacoes = AVALIACOES_EXEMPLO

  return (
    <div className="pagina">
      <div className="conteudo-6xl">
        {/* Header do Perfil */}
        <Card className="p-8 mb-6">
          <div className="layout-col">
            <div className="avatar">
              <User className="w-16 h-16 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="titulo mb-2">{user.nome}</h1>
              <p className="texto mb-4">{user.tipo || 'Usuário SoloObra'}</p>
              <div className="mb-4 flex justify-center md:justify-start">
                <Avaliacao nota={user.avaliacao || 5} totalAvaliacoes={user.totalAvaliacoes || 0} />
              </div>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm texto">
                <div className="flex-gap">
                  <MapPin className="w-4 h-4" />
                  <span>{user.cidade || 'Localização não informada'}</span>
                </div>
                <div className="flex-gap">
                  <Phone className="w-4 h-4" />
                  <span>{user.telefone}</span>
                </div>
                <div className="flex-gap">
                  <Mail className="w-4 h-4" />
                  <span>{user.email}</span>
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

        {/* Abas de Navegação */}
        <Card className="mb-6">
          <div className="flex border-b border-gray-200">
            {['sobre', 'maquinas', 'avaliacoes'].map((aba) => (
              <button
                key={aba}
                onClick={() => setAbaAtiva(aba)}
                className={`aba capitalize ${abaAtiva === aba ? 'aba-ativa' : 'aba-inativa'}`}
              >
                {aba === 'maquinas' ? 'Minhas Máquinas' : aba}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Conteúdo Aba: SOBRE */}
            {abaAtiva === 'sobre' && (
              <div className="animate-in fade-in">
                <h3 className="titulo-sec mb-4">Informações Profissionais</h3>
                <p className="texto mb-4">
                  Membro desde {new Date().getFullYear()}. Especialista em locação de equipamentos para construção civil e terraplanagem em {user.cidade}.
                </p>
                <div className="grid-2">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-navy-900 mb-2">Especialidades</h4>
                    <ul className="list-disc list-inside texto space-y-1">
                      <li>Terraplanagem</li>
                      <li>Escavação de fundações</li>
                      <li>Limpeza de terrenos</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-navy-900 mb-2">Verificações</h4>
                    <ul className="list-disc list-inside texto space-y-1 text-green-600">
                      <li>Documentação Validada</li>
                      <li>Telefone Verificado</li>
                      <li>Proprietário Prata</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Conteúdo Aba: MÁQUINAS (API REAL) */}
            {abaAtiva === 'maquinas' && (
              <div>
                <div className="flex-between mb-6">
                  <h3 className="titulo-sec">Gerenciar Equipamentos</h3>
                  <Botao>Adicionar Máquina</Botao>
                </div>

                {carregando ? (
                  <div className="flex justify-center p-12">
                    <Loader2 className="w-8 h-8 animate-spin text-navy-500" />
                  </div>
                ) : minhasMaquinas.length > 0 ? (
                  <div className="grid-2">
                    {minhasMaquinas.map((maquina) => (
                      <div key={maquina.id} className="card-item border hover:border-navy-200 transition-all">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-navy-50 rounded">
                            <Truck className="w-8 h-8 text-navy-500" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-navy-900">{maquina.nome}</h4>
                            <p className="texto-sm font-medium text-navy-600">
                              R$ {Number(maquina.preco_diaria).toFixed(2)}/dia
                            </p>
                          </div>
                          <span className={maquina.disponibilidade ? 'badge-ok' : 'badge-aviso'}>
                            {maquina.disponibilidade ? 'Ativa' : 'Pausada'}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Botao variante="primario" larguraCompleta>Editar</Botao>
                          <Botao variante="secundario" larguraCompleta>Relatórios</Botao>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 border-2 border-dashed rounded-xl">
                    <Truck className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="texto">Você ainda não cadastrou nenhuma máquina para locação.</p>
                  </div>
                )}
              </div>
            )}

            {/* Conteúdo Aba: AVALIAÇÕES */}
            {abaAtiva === 'avaliacoes' && (
              <div className="space-y-4">
                <h3 className="titulo-sec mb-6">Feedback dos Locatários</h3>
                {avaliacoes.map((avaliacao) => (
                  <div key={avaliacao.id} className="card-avaliacao">
                    <div className="flex-between mb-2">
                      <h4 className="font-semibold text-navy-900">{avaliacao.autor}</h4>
                      <Avaliacao nota={avaliacao.nota} tamanho="pequeno" />
                    </div>
                    <p className="texto mb-2 italic">"{avaliacao.comentario}"</p>
                    <p className="texto-claro text-xs">{avaliacao.data}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}