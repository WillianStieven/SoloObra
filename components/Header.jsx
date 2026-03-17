'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, User, LogIn } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-navy-500 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/images/logo1.png" alt="Logo" style={{ width: '110px' }} />
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/busca" className="nav-link">
              Buscar Máquinas
            </Link>
            <Link href="/como-funciona" className="nav-link">
              Como Funciona
            </Link>
            <Link href="/sobre" className="nav-link">
              Sobre
            </Link>
            <Link href="/login" className="flex items-center space-x-2 nav-link">
              <LogIn className="w-4 h-4" />
              <span>Entrar</span>
            </Link>
            <Link href="/cadastro" className="nav-btn">
              <User className="w-4 h-4" />
              <span>Cadastrar</span>
            </Link>
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <Link
              href="/busca"
              className="nav-link-mobile"
              onClick={() => setIsMenuOpen(false)}
            >
              Buscar Máquinas
            </Link>
            <Link
              href="/como-funciona"
              className="nav-link-mobile"
              onClick={() => setIsMenuOpen(false)}
            >
              Como Funciona
            </Link>
            <Link
              href="/sobre"
              className="nav-link-mobile"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre
            </Link>
            <Link
              href="/login"
              className="nav-link-mobile flex items-center space-x-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <LogIn className="w-4 h-4" />
              <span>Entrar</span>
            </Link>
            <Link
              href="/cadastro"
              className="nav-btn-mobile"
              onClick={() => setIsMenuOpen(false)}
            >
              Cadastrar
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}


