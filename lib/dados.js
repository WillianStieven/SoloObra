// Versão em JavaScript dos dados e "tipos" usados na aplicação

export const TIPOS_MAQUINAS = [
  { id: 1, nome: 'Retroescavadeira', imagem: '/images/retroescavadeira.png' },
  { id: 2, nome: 'Escavadeira', imagem: '/images/trator.png' },
  { id: 3, nome: 'Rolo Compactador', imagem: '/images/rolo.png' },
  { id: 4, nome: 'Caminhão', imagem: '/images/caminhao.png' },
  { id: 5, nome: 'Guindaste', imagem: '/images/guindaste.png' },
  { id: 6, nome: 'Bitoneira', imagem: '/images/bitorneira.png' },
  { id: 7, nome: 'Bobcat', imagem: '/images/bobcat.png' },
] // sem `as const` porque não precisamos de tipos em JS

export const NOMES_TIPOS_MAQUINAS = TIPOS_MAQUINAS.map((tipo) => tipo.nome)

export const MAQUINAS_EXEMPLO = [
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
    descricao:
      'Retroescavadeira em excelente estado, com manutenção em dia. Ideal para terraplanagem, escavação e movimentação de terra.',
    especificacoes: [
      'Ano: 2020',
      'Potência: 74 HP',
      'Capacidade: 1.2 m³',
      'Combustível: Diesel',
      'Peso: 8.5 toneladas',
    ],
    recursos: ['Ar condicionado', 'GPS', 'Documentação em dia', 'Seguro atualizado'],
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
] // sem anotação de tipo

export const USUARIO_EXEMPLO = {
  nome: 'João Silva',
  tipo: 'Dono de Máquina',
  email: 'joao@example.com',
  telefone: '(11) 99999-9999',
  localizacao: 'São Paulo, SP',
  avaliacao: 4.8,
  totalAvaliacoes: 24,
}

export const AVALIACOES_EXEMPLO = [
  {
    id: 1,
    autor: 'Maria Santos',
    nota: 5,
    comentario:
      'Excelente serviço! Máquina em ótimo estado e operador muito profissional.',
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


