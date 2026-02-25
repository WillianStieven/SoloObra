# Marketplace de Máquinas Pesadas

Uma plataforma digital inovadora que conecta clientes, donos de máquinas pesadas e operadores, facilitando a contratação de serviços de terraplanagem, obras civis e infraestrutura.

## 🎨 Design

O aplicativo utiliza as cores:
- **Azul Marinho** (#001f5c) - Cor principal
- **Amarelo** (#ffe53d) - Cor de destaque e CTAs
- **Branco** - Cor de fundo e contraste

## 🚀 Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones
- **React Icons** - Biblioteca de ícones adicional

## 📋 Funcionalidades do MVP

### ✅ Implementadas

- [x] Página inicial com busca e apresentação
- [x] Sistema de cadastro com 3 perfis (Cliente, Dono, Operador)
- [x] Página de busca de máquinas
- [x] Página de detalhes da máquina
- [x] Sistema de chat entre usuários
- [x] Página de pagamento (Pix e Cartão)
- [x] Perfil do usuário com abas
- [x] Sistema de avaliações
- [x] Páginas informativas (Como Funciona, Sobre)

### 🔄 A Implementar (Backend)

- [ ] Autenticação e autorização
- [ ] Integração com API de geolocalização
- [ ] Sistema de notificações
- [ ] Integração com gateway de pagamento
- [ ] Upload de imagens
- [ ] Sistema de mensagens em tempo real
- [ ] Dashboard administrativo

## 🏗️ Estrutura do Projeto

```
marketplace-maquinas-pesadas/
├── app/
│   ├── busca/              # Página de busca
│   ├── cadastro/           # Cadastro de usuários
│   ├── chat/               # Sistema de chat
│   ├── como-funciona/      # Página informativa
│   ├── login/              # Página de login
│   ├── maquina/[id]/       # Detalhes da máquina
│   ├── pagamento/          # Processamento de pagamento
│   ├── perfil/             # Perfil do usuário
│   ├── sobre/              # Sobre a plataforma
│   ├── globals.css         # Estilos globais
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Página inicial
├── components/
│   ├── Footer.tsx          # Rodapé
│   └── Header.tsx          # Cabeçalho
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## 🎯 Perfis da Plataforma

### Cliente
- Solicita serviços de máquinas pesadas
- Busca por tipo de máquina e localização
- Acompanha execução e avalia serviços

### Dono de Máquina
- Cadastra equipamentos
- Define preços e disponibilidade
- Gerencia contratos e recebimentos

### Operador
- Cadastra habilidades e documentos
- Define valores por hora
- Gerencia histórico de trabalhos

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

### Instalação
npm install -g npm
```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar em produção
npm start
```

O aplicativo estará disponível em `http://localhost:3000`

## 📱 Funcionalidades Principais

### Busca Inteligente
- Busca por tipo de máquina
- Filtro por localização
- Ordenação por preço, avaliação e distância

### Sistema de Chat
- Comunicação direta entre usuários
- Interface intuitiva e responsiva

### Pagamento
- Suporte a Pix (aprovação imediata)
- Pagamento com cartão de crédito
- Cálculo automático de taxas

### Avaliações
- Sistema de estrelas (1-5)
- Comentários e recomendações
- Histórico de avaliações

## 🔒 Segurança

- Validação de formulários
- Proteção de rotas (a implementar)
- Dados sensíveis criptografados (a implementar)
- Verificação de documentos (a implementar)

## 📈 Próximos Passos

1. **Backend**
   - API REST com Node.js/Express ou Next.js API Routes
   - Banco de dados (PostgreSQL ou MongoDB)
   - Autenticação JWT
   - Upload de arquivos (Cloudinary ou AWS S3)

2. **Integrações**
   - Gateway de pagamento (Stripe, Mercado Pago)
   - API de geolocalização (Google Maps)
   - Serviço de notificações push
   - Sistema de mensagens em tempo real (Socket.io)

3. **Melhorias**
   - Dashboard administrativo
   - Relatórios e analytics
   - App mobile (React Native)
   - Sistema de notificações por email

## 📄 Licença

Este projeto é um MVP desenvolvido para demonstração das funcionalidades principais.

## 👥 Contribuição

Este é um projeto de demonstração. Para contribuições, entre em contato.

---

Desenvolvido com ❤️ para transformar o setor de máquinas pesadas


