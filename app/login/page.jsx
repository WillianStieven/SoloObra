'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CampoEntrada, Botao, Card } from '../../components/ComponentesUI'

export default function LoginForm() {
    // Padronizei para 'formData' para combinar com o seu handleSubmit
    const [formData, setFormData] = useState({ email: '', senha: '' });
    const [erro, setErro] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.erro || 'Falha no login');
            }

            console.log('Sucesso:', data.usuario);
            localStorage.setItem('user', JSON.stringify(data.usuario));
            window.location.href = '/';

        } catch (err) {
            setErro(err.message);
        }
    };
  
    // Função corrigida para usar 'setFormData' e 'formData'
    const aoMudar = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="pagina-lg">
            <div className="conteudo-xs">
                <Card className="p-8">
                    <h1 className="titulo mb-2">Entrar</h1>
                    <p className="texto mb-8">Acesse sua conta para continuar</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Exibir mensagem de erro se existir */}
                        {erro && <p className="text-red-500 text-sm text-center">{erro}</p>}

                        <CampoEntrada
                            rotulo="E-mail"
                            type="email"
                            name="email"
                            value={formData.email} // Corrigido aqui
                            onChange={aoMudar}
                            required
                        />

                        <CampoEntrada
                            rotulo="Senha"
                            type="password"
                            name="senha"
                            value={formData.senha} // Corrigido aqui
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
    );
}