// Tipos e dados consolidados em português

export type TipoUsuario = 'cliente' | 'dono' | 'operador'
export type MetodoPagamento = 'pix' | 'cartao'

export interface Maquina {
  id: number
  nome: string
  proprietario: string
  localizacao: string
  distancia: string
  preco: number
  avaliacao: number
  totalAvaliacoes: number
  imagem: string
  disponivel: boolean
  descricao?: string
  especificacoes?: string[]
  recursos?: string[]
}

export interface Usuario {
  nome: string
  tipo: string
  email: string
  telefone: string
  localizacao: string
  avaliacao: number
  totalAvaliacoes: number
}

export interface Avaliacao {
  id: number
  autor: string
  nota: number
  comentario: string
  data: string
}

export interface Mensagem {
  id: number
  texto: string
  remetente: 'eu' | 'outro'
  hora: string
}

export interface DadosFormulario {
  nome: string
  email: string
  telefone: string
  senha: string
  confirmarSenha: string
  cpf?: string
  cnpj?: string
  endereco: string
  cidade: string
  estado: string
}

export interface DadosCartao {
  numero: string
  nome: string
  validade: string
  cvv: string
}

// Tipos de máquinas
export const TIPOS_MAQUINAS = [
  { id: 1, nome: 'Retroescavadeira', imagem: '/images/retroescavadeira.png' },
  { id: 2, nome: 'Escavadeira',  imagem: '/images/trator.png'}, 
  { id: 3, nome: 'Rolo Compactador', imagem: '/images/rolo.png' },
  { id: 4, nome: 'Caminhão', imagem: '/images/caminhao.png' },
  { id: 5, nome: 'Guindaste', imagem: '/images/guindaste.png' },
  { id: 6, nome: 'Bitoneira', imagem: '/images/bitorneira.png' },
  { id: 7, nome: 'Bobcat', imagem: '/images/bobcat.png'},
] as const

export const NOMES_TIPOS_MAQUINAS = TIPOS_MAQUINAS.map((tipo) => tipo.nome)

// Dados de exemplo
export const MAQUINAS_EXEMPLO: Maquina[] = [
  {
    id: 1,
    nome: 'Retroescavadeira JCB 3CX',
    proprietario: 'João Silva',
    localizacao: 'São Paulo, SP',
    distancia: '2.5 km',
    preco: 350,
    avaliacao: 4.8,
    totalAvaliacoes: 24,
    imagem: '🚜',
    disponivel: true,
    descricao: 'Retroescavadeira em excelente estado, com manutenção em dia. Ideal para terraplanagem, escavação e movimentação de terra. Inclui operador qualificado.',
    especificacoes: [
      'Ano: 2020',
      'Potência: 74 HP',
      'Capacidade: 1.2 m³',
      'Combustível: Diesel',
      'Peso: 8.5 toneladas',
    ],
    recursos: [
      'Ar condicionado',
      'GPS',
      'Documentação em dia',
      'Seguro atualizado',
      'Operador incluído',
    ],
  },
  {
    id: 2,
    nome: 'Escavadeira Hidráulica CAT 320',
    proprietario: 'Maria Santos',
    localizacao: 'São Paulo, SP',
    distancia: '5.1 km',
    preco: 450,
    avaliacao: 4.9,
    totalAvaliacoes: 18,
    imagem: '⛏️',
    disponivel: true,
  },
  {
    id: 3,
    nome: 'Rolo Compactador Vibratório',
    proprietario: 'Pedro Costa',
    localizacao: 'São Paulo, SP',
    distancia: '8.3 km',
    preco: 280,
    avaliacao: 4.6,
    totalAvaliacoes: 12,
    imagem: '🛞',
    disponivel: true,
  },
]

export const USUARIO_EXEMPLO: Usuario = {
  nome: 'João Silva',
  tipo: 'Dono de Máquina',
  email: 'joao@example.com',
  telefone: '(11) 99999-9999',
  localizacao: 'São Paulo, SP',
  avaliacao: 4.8,
  totalAvaliacoes: 24,
}

export const AVALIACOES_EXEMPLO: Avaliacao[] = [
  {
    id: 1,
    autor: 'Maria Santos',
    nota: 5,
    comentario: 'Excelente serviço! Máquina em ótimo estado e operador muito profissional.',
    data: '15/01/2024',
  },
  {
    id: 2,
    autor: 'Pedro Costa',
    nota: 4,
    comentario: 'Bom atendimento e pontualidade. Recomendo!',
    data: '10/01/2024',
  },
]


