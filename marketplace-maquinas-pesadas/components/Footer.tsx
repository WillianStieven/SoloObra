import Link from 'next/link'
import { Truck, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex-gap mb-4" style={{ display: 'flex', justifyContent: 'center' }}>
              <img src="/images/logo1.png" alt="Logo" style={{ width: '200px'}}/>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-500">Contatos</h3>
            <ul className="space-y-2">
            <div className="flex-gap">
                  <Mail className="w-4 h-4" />
                  <span>contato@soloobra.com.br</span>
                </div>
                <div className="flex-gap">
                  <Phone className="w-4 h-4" />
                  <span>(55) 9999-9999</span>
                </div>
                <div className="flex-gap">
                  <MapPin className="w-4 h-4" />
                  <span>Chapecó, SC - Brasil</span>
                </div>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-500">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><Link href="/busca" className="text-gray-300 nav-link">Buscar Máquinas</Link></li>
              <li><Link href="/como-funciona" className="text-gray-300 nav-link">Como Funciona</Link></li>
              <li><Link href="/sobre" className="text-gray-300 nav-link">Sobre Nós</Link></li>
              <li><Link href="/cadastro" className="text-gray-300 nav-link">Cadastrar</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-500">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/termos" className="text-gray-300 nav-link">Termos de Uso</Link></li>
              <li><Link href="/privacidade" className="text-gray-300 nav-link">Política de Privacidade</Link></li>
              <li><Link href="/ajuda" className="text-gray-300 nav-link">Central de Ajuda</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} SoloObra. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}


