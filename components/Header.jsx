'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, User, LogIn, LogOut } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [usuario, setUsuario] = useState(null)

  // Verifica se existe um usuário no localStorage ao carregar a página
  useEffect(() => {
    const dadosSalvos = localStorage.getItem('user')
    if (dadosSalvos) {
      try {
        setUsuario(JSON.parse(dadosSalvos))
      } catch (error) {
        console.error("Erro ao ler dados do usuário", error)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUsuario(null)
    window.location.href = '/' // Redireciona para home após sair
  }

  return (
    <header className="bg-navy-500 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/images/logo1.png" alt="Logo" style={{ width: '110px' }} />
          </Link>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/busca" className="nav-link">Buscar Máquinas</Link>
            <Link href="/como-funciona" className="nav-link">Como Funciona</Link>
            <Link href="/sobre" className="nav-link">Sobre</Link>

            {/* CONDICIONAL: Usuário Logado vs Visitante */}
            {usuario ? (
              <div className="flex items-center space-x-4 border-l pl-6 border-gray-600">
                <a href="/perfil"><div className="flex flex-col items-end">
                  <span className="text-sm font-bold text-yellow-500 leading-none">
                    {usuario.nome}
                  </span>
                  <span className="text-[10px] text-gray-300">{usuario.email}</span>
                </div>
                </a>
                <button 
                  onClick={handleLogout}
                  className="p-2 hover:bg-red-500/20 rounded-full transition-colors text-red-400"
                  title="Sair"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <>
                <Link href="/login" className="flex items-center space-x-2 nav-link">
                  <LogIn className="w-4 h-4" />
                  <span>Entrar</span>
                </Link>
                <Link href="/cadastro" className="flex items-center space-x-2 nav-link">
                  <User className="w-4 h-4" />
                  <span>Cadastrar</span>
                </Link>
              </>
            )}
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menu Mobile Dinâmico */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2 border-t border-gray-700 mt-2">
            <Link href="/busca" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>
              Buscar Máquinas
            </Link>
            
            {usuario ? (
              <div className="bg-navy-600 p-4 rounded-lg mt-2 space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="bg-yellow-500 p-2 rounded-full text-black font-bold">
                    {usuario.nome.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-yellow-500">{usuario.nome}</p>
                    <p className="text-xs text-gray-400">{usuario.email}</p>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 bg-red-600 text-white p-2 rounded-lg"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sair da conta</span>
                </button>
              </div>
            ) : (
              <>
                <Link href="/login" className="nav-link-mobile flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
                  <LogIn className="w-4 h-4" />
                  <span>Entrar</span>
                </Link>
                <Link href="/cadastro" className="nav-btn-mobile text-center block" onClick={() => setIsMenuOpen(false)}>
                  Cadastrar
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}