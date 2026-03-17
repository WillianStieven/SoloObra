'use client'

import { useState } from 'react'
import { MAQUINAS_EXEMPLO, NOMES_TIPOS_MAQUINAS } from '../../lib/dados'
import { BarraBusca, CardMaquina } from '../../components/ComponentesUI'

/**
 * Componente da página de busca de máquinas
 * Permite filtrar máquinas por texto, localização e tipo
 * Exibe os resultados em cards
 */
export default function PaginaBusca() {
  // Estado para armazenar o texto de busca
  const [textoBusca, setTextoBusca] = useState('')
  // Estado para armazenar a localização
  const [localizacao, setLocalizacao] = useState('')
  // Estado para armazenar o tipo de máquina selecionado no filtro
  const [tipoSelecionado, setTipoSelecionado] = useState('')

  /**
   * Função executada ao realizar uma busca
   * Em produção, aqui seria feita uma chamada à API com os filtros
   */
  const aoBuscar = () => {
    console.log('Buscar:', { textoBusca, localizacao, tipoSelecionado })
  }

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
          <div className="mt-4">
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

        <div className="grid-cards">
          {MAQUINAS_EXEMPLO.map((maquina) => (
            <CardMaquina key={maquina.id} maquina={maquina} />
          ))}
        </div>
      </div>
    </div>
  )
}
