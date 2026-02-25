'use client'

import { useState } from 'react'
import { MAQUINAS_EXEMPLO, NOMES_TIPOS_MAQUINAS } from '@/lib/dados'
import { BarraBusca, CardMaquina } from '@/components/ComponentesUI'

export default function PaginaBusca() {
  const [textoBusca, setTextoBusca] = useState('')
  const [localizacao, setLocalizacao] = useState('')
  const [tipoSelecionado, setTipoSelecionado] = useState('')

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
