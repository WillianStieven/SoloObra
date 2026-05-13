'use client'

import { useState, useEffect } from 'react'
import { NOMES_TIPOS_MAQUINAS } from '../../lib/dados'
import { BarraBusca, CardMaquina } from '../../components/ComponentesUI'

export default function PaginaBusca() {
  const [textoBusca, setTextoBusca] = useState('')
  const [localizacao, setLocalizacao] = useState('')
  const [tipoSelecionado, setTipoSelecionado] = useState('')
  
  // 1. Novo estado para armazenar as máquinas vindas do banco
  const [maquinas, setMaquinas] = useState([])
  const [carregando, setCarregando] = useState(true)

  // 2. Função para buscar os dados da sua API
  const carregarMaquinas = async () => {
    try {
      setCarregando(true)
      // Ajuste a URL se necessário (localhost:5000 é onde seu Express está rodando)
      const resposta = await fetch('http://localhost:5000/api/maquinas')
      const dados = await resposta.json()
      
      // Se a sua API retorna { maquinas: [...] }, use dados.maquinas
      // Se retorna direto o array, use dados
      setMaquinas(Array.isArray(dados) ? dados : (dados.maquinas || []))
    } catch (error) {
      console.error('Erro ao buscar máquinas do banco:', error)
    } finally {
      setCarregando(false)
    }
  }

  // 3. Executa a busca ao carregar a página
  useEffect(() => {
    carregarMaquinas()
  }, [])

  const aoBuscar = () => {
    // Filtro simples no front-end para teste rápido
    console.log('Filtrando por:', { textoBusca, localizacao, tipoSelecionado })
  }

  // 4. Lógica de filtro (opcional, enquanto você não faz o filtro no banco)
  const maquinasFiltradas = maquinas.filter(m => {
    return m.nome.toLowerCase().includes(textoBusca.toLowerCase()) &&
           (tipoSelecionado === "" || m.tipo_maquina === tipoSelecionado) &&
           m.localizacao?.toLowerCase().includes(localizacao.toLowerCase())
  })

  return (
    <div className="pagina">
      <div className="conteudo">
        <h1 className="titulo mb-8">Buscar Máquinas</h1>

        <div className="mb-8">
          <BarraBusca
            textoBusca={textoBusca}
            localizacao={localizacao}
            aoMudarBusca={setTextoBusca}
            aoMudarLocalizacao={setLocalizacao}
            aoBuscar={aoBuscar}
          />
          <div className="mt-5">
            <select
              value={tipoSelecionado}
              onChange={(e) => setTipoSelecionado(e.target.value)}
              className="select-campo"
            >
              <option value="">Todos os tipos</option>
              {NOMES_TIPOS_MAQUINAS.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
          </div>
        </div>

        {carregando ? (
          <p className="text-center">Carregando máquinas do SoloObra...</p>
        ) : (
          <div className="grid-cards">
            {/* 5. Mapeia as máquinas filtradas vindas do banco */}
            {maquinasFiltradas.length > 0 ? (
              maquinasFiltradas.map((maquina) => (
                <CardMaquina key={maquina.id} maquina={maquina} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">Nenhuma máquina encontrada no banco.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}