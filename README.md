*Este projeto está em fase de desenvolvimento. 
Começamos fazendo o front-end e a estruturação do código

# Marketplace de Máquinas Pesadas

Uma plataforma digital inovadora que conecta clientes, donos de máquinas pesadas e operadores, facilitando a contratação de serviços de terraplanagem, obras civis e infraestrutura. O objetivo do projeto é facilitar a locação de máquinas pesadas.

## Tecnologias 

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones
- **React Icons** - Biblioteca de ícones adicional

### A Implementar (Backend)

- [ ] Autenticação e autorização
- [ ] Integração com gateway de pagamento
- [ ] Upload de imagens
- [ ] Sistema de mensagens
- [ ] Dashboard dos perfis

## Estrutura do Projeto

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

##  Perfis da Plataforma

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

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

###  Como Executar
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

## Funcionalidades Principais desejadas

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

