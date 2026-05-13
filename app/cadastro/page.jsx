'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { User, Truck, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { CampoEntrada, Botao, Card } from '../../components/ComponentesUI'


const CONFIG_TIPO_USUARIO = {
  Cliente: { icone: User, titulo: 'Cliente', descricao: 'Preciso contratar máquinas para minhas obras' },
  Dono: { icone: Truck, titulo: 'Dono de Máquina', descricao: 'Tenho máquinas pesadas e quero disponibilizá-las na plataforma' },
}

/**
 * Componente interno que contém a lógica de cadastro
 * Envolvido em Suspense para lidar com useSearchParams de forma assíncrona
 */
function ConteudoCadastro() {
  const searchParams = useSearchParams()
  const router = useRouter()
 
  const [tipoUsuario, setTipoUsuario] = useState(null)

  const [dadosFormulario, setDadosFormulario] = useState({
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    confirmarSenha: '',
    cpf: '',
    cnpj: '',
    endereco: '',
    cidade: '',
    estado: '',
  })
  const [mensagemErro, setMensagemErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    const tipo = searchParams.get('tipo')
    if (tipo && ['Cliente', 'Dono'].includes(tipo)) {
      setTipoUsuario(tipo)
    }
  }, [searchParams])


  const aoEnviar = async (e) => {
    e.preventDefault()
    setMensagemErro('')

    if (dadosFormulario.senha !== dadosFormulario.confirmarSenha) {
      setMensagemErro('As senhas não correspondem.')
      return
    }

    const payload = {
      tipo: tipoUsuario,
      nome: dadosFormulario.nome,
      email: dadosFormulario.email,
      telefone: dadosFormulario.telefone,
      cpf_cnpj: tipoUsuario === 'Cliente' ? dadosFormulario.cpf : dadosFormulario.cnpj,
      endereco: dadosFormulario.endereco,
      cidade: dadosFormulario.cidade,
      estado: dadosFormulario.estado,
      senha: dadosFormulario.senha,
    }

    try {
      setCarregando(true)
      const response = await fetch('http://localhost:5000/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        setMensagemErro(data.erro || 'Não foi possível criar a conta.')
        return
      }

      router.push('/login')
    } catch (error) {
      setMensagemErro('Erro ao conectar com o servidor. Tente novamente mais tarde.')
    } finally {
      setCarregando(false)
    }
  }


  const aoMudar = (e) => {
    setDadosFormulario({
      ...dadosFormulario,
      [e.target.name]: e.target.value,
    })
  }


  if (!tipoUsuario) {
    return (
      <div className="pagina-lg">
        <div className="conteudo-md">
          <h1 className="titulo-xl text-center mb-4">Escolha seu perfil</h1>
          <p className="text-center texto mb-12">Selecione o tipo de cadastro que melhor descreve você</p>
          <div className="grid-2">
            {Object.entries(CONFIG_TIPO_USUARIO).map(([chave, config]) => {
              const Icone = config.icone
              return (
                <Link key={chave} href={`/cadastro?tipo=${chave}`} className="card-perfil">
                  <Icone className="w-16 h-16 mx-auto mb-4 text-navy-500" />
                  <h3 className="titulo-2xl mb-2">{config.titulo}</h3>
                  <p className="texto">{config.descricao}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  const config = CONFIG_TIPO_USUARIO[tipoUsuario]

  return (
    <div className="pagina-lg">
      <div className="conteudo-sm">
        <Card className="p-8">
          <h1 className="titulo mb-2">Cadastro - {config.titulo}</h1>
          <p className="texto mb-8">Preencha os dados abaixo para criar sua conta</p>

          <form onSubmit={aoEnviar} className="space-y-6">
            {mensagemErro && (
              <p className="texto text-red-500 text-center">{mensagemErro}</p>
            )}
            <CampoEntrada
              rotulo="Nome Completo"
              type="text"
              name="nome"
              value={dadosFormulario.nome}
              onChange={aoMudar}
              required
            />

            <CampoEntrada
              rotulo="E-mail"
              type="email"
              name="email"
              value={dadosFormulario.email}
              onChange={aoMudar}
              required
            />

            <CampoEntrada
              rotulo="Telefone"
              type="tel"
              name="telefone"
              value={dadosFormulario.telefone}
              onChange={aoMudar}
              required
            />

            {tipoUsuario === 'Cliente' && (
              <CampoEntrada
                rotulo="CPF"
                type="text"
                name="cpf"
                value={dadosFormulario.cpf || ''}
                onChange={aoMudar}
                required
              />
            )}

            {tipoUsuario === 'Dono' && (
              <CampoEntrada
                rotulo="CNPJ"
                type="text"
                name="cnpj"
                value={dadosFormulario.cnpj || ''}
                onChange={aoMudar}
                required
              />
            )}

            <CampoEntrada
              rotulo="Endereço"
              type="text"
              name="endereco"
              value={dadosFormulario.endereco}
              onChange={aoMudar}
              required
            />

            <div className="grid-2">
              <CampoEntrada
                rotulo="Cidade"
                type="text"
                name="cidade"
                value={dadosFormulario.cidade}
                onChange={aoMudar}
                required
              />
              <CampoEntrada
                rotulo="Estado"
                type="text"
                name="estado"
                value={dadosFormulario.estado}
                onChange={aoMudar}
                required
              />
            </div>

            <CampoEntrada
              rotulo="Senha"
              type="password"
              name="senha"
              value={dadosFormulario.senha}
              onChange={aoMudar}
              required
            />

            <CampoEntrada
              rotulo="Confirmar Senha"
              type="password"
              name="confirmarSenha"
              value={dadosFormulario.confirmarSenha}
              onChange={aoMudar}
              required
            />

            <Botao type="submit" larguraCompleta className="flex items-center justify-center gap-2" disabled={carregando}>
              {carregando ? 'Cadastrando...' : 'Criar Conta'}
              <ArrowRight className="w-5 h-5" />
            </Botao>
          </form>

          <p className="mt-6 text-center texto">
            Já tem uma conta?{' '}
            <Link href="/login" className="link-amarelo-bold">
              Fazer login
            </Link>
          </p>
        </Card>
      </div>
    </div>
  )
}

/**
 * Componente principal da página de cadastro
 * Usa Suspense para lidar com useSearchParams de forma assíncrona
 * Isso é necessário no Next.js 14 quando se usa useSearchParams em componentes client
 */
export default function PaginaCadastro() {
  return (
    <Suspense fallback={<div className="pagina-loading">Carregando...</div>}>
      <ConteudoCadastro />
    </Suspense>
  )
}
