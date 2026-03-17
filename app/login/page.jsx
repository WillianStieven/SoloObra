'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CampoEntrada, Botao, Card } from '../../components/ComponentesUI'

/**
 * Componente da página de login
 * Permite que usuários façam login na plataforma com email e senha
 */
export default function PaginaLogin() {
  // Estado para armazenar os dados do formulário (email e senha)
  const [dadosFormulario, setDadosFormulario] = useState({
    email: '',
    senha: '',
  })

  /**
   * Função executada quando o formulário é enviado
   * Previne o comportamento padrão do formulário e processa o login
   * @param e - Evento do formulário
   */
  const handleSubmit = (e) => {
    e.preventDefault() // Impede o recarregamento da página
    console.log('Login:', dadosFormulario) // Log dos dados (em produção, enviaria para API)
    alert('Login realizado com sucesso!') // Feedback temporário ao usuário
  }

  /**
   * Função executada quando qualquer campo do formulário é alterado
   * Atualiza o estado com o novo valor do campo modificado
   * @param e - Evento de mudança do input
   */
  const aoMudar = (e) => {
    setDadosFormulario({
      ...dadosFormulario, // Mantém os valores existentes
      [e.target.name]: e.target.value, // Atualiza apenas o campo que mudou usando o nome como chave
    })
  }

  return (
    <div className="pagina-lg">
      <div className="conteudo-xs">
        <Card className="p-8">
          <h1 className="titulo mb-2">Entrar</h1>
          <p className="texto mb-8">Acesse sua conta para continuar</p>

          {/* Formulário de login que chama handleSubmit ao ser enviado */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo de entrada para email */}
            <CampoEntrada
              rotulo="E-mail"
              type="email"
              name="email"
              value={dadosFormulario.email}
              onChange={aoMudar}
              required
            />

            {/* Campo de entrada para senha (tipo password oculta o texto) */}
            <CampoEntrada
              rotulo="Senha"
              type="password"
              name="senha"
              value={dadosFormulario.senha}
              onChange={aoMudar}
              required
            />

            {/* Opções adicionais: lembrar-me e recuperação de senha */}
            <div className="flex-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="texto-sm">Lembrar-me</span>
              </label>
              <Link href="/recuperar-senha" className="texto-sm link-amarelo">
                Esqueci minha senha
              </Link>
            </div>

            {/* Botão de submit do formulário */}
            <Botao type="submit" larguraCompleta className="flex items-center justify-center gap-2">
              Entrar
              <ArrowRight className="w-5 h-5" />
            </Botao>
          </form>

          {/* Link para página de cadastro caso o usuário não tenha conta */}
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
