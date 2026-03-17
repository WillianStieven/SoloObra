'use client'

import { useState } from 'react'
import { Send, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Mensagem } from '@/lib/dados'
import { Botao } from '@/components/ComponentesUI'

const MENSAGENS_INICIAIS: Mensagem[] = [
  {
    id: 1,
    texto: 'Olá! Tenho interesse em contratar sua retroescavadeira.',
    remetente: 'eu',
    hora: '10:30',
  },
  {
    id: 2,
    texto: 'Olá! Fico feliz em ajudar. Qual é o tipo de serviço que você precisa?',
    remetente: 'outro',
    hora: '10:32',
  },
]

export default function PaginaChat() {
  const [mensagem, setMensagem] = useState('')
  const [mensagens, setMensagens] = useState<Mensagem[]>(MENSAGENS_INICIAIS)

  const aoEnviar = (e: React.FormEvent) => {
    e.preventDefault()
    if (mensagem.trim()) {
      const novaMensagem: Mensagem = {
        id: mensagens.length + 1,
        texto: mensagem,
        remetente: 'eu',
        hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      }
      setMensagens([...mensagens, novaMensagem])
      setMensagem('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white h-screen flex flex-col">
        <div className="bg-navy-500 text-white p-4 flex-gap-4">
          <Link href="/perfil" className="nav-link">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div className="flex-1">
            <h2 className="font-semibold">João Silva</h2>
            <p className="text-sm text-gray-200">Retroescavadeira JCB 3CX</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {mensagens.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.remetente === 'eu' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.remetente === 'eu'
                    ? 'bg-yellow-500 text-navy-900'
                    : 'bg-gray-200 text-navy-900'
                }`}
              >
                <p>{msg.texto}</p>
                <p className="text-xs mt-1 opacity-70">{msg.hora}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={aoEnviar} className="border-t border-gray-200 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="input-busca"
            />
            <Botao type="submit">
              <Send className="w-5 h-5" />
            </Botao>
          </div>
        </form>
      </div>
    </div>
  )
}
