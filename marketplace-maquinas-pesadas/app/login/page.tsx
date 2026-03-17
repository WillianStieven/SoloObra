'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CampoEntrada, Botao, Card } from '@/components/ComponentesUI'

export default function PaginaLogin() {
  const [dadosFormulario, setDadosFormulario] = useState({
    email: '',
    senha: '',
  })

  const aoEnviar = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login:', dadosFormulario)
    alert('Login realizado com sucesso!')
  }

  const aoMudar = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDadosFormulario({
      ...dadosFormulario,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="pagina-lg">
      <div className="conteudo-xs">
        <Card className="p-8">
          <h1 className="titulo mb-2">Entrar</h1>
          <p className="texto mb-8">Acesse sua conta para continuar</p>

          <form onSubmit={aoEnviar} className="space-y-6">
            <CampoEntrada
              rotulo="E-mail"
              type="email"
              name="email"
              value={dadosFormulario.email}
              onChange={aoMudar}
              required
            />

            <CampoEntrada
              rotulo="Senha"
              type="password"
              name="senha"
              value={dadosFormulario.senha}
              onChange={aoMudar}
              required
            />

            <div className="flex-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="texto-sm">Lembrar-me</span>
              </label>
              <Link href="/recuperar-senha" className="texto-sm link-amarelo">
                Esqueci minha senha
              </Link>
            </div>

            <Botao type="submit" larguraCompleta className="flex items-center justify-center gap-2">
              Entrar
              <ArrowRight className="w-5 h-5" />
            </Botao>
          </form>

          <div className="mt-6 text-center">
            <p className="texto">
              Não tem uma conta?{' '}
              <Link href="/cadastro" className="link-amarelo-bold">
                Cadastre-se
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
