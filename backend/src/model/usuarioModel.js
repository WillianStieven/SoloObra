import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tipo: {
    type: DataTypes.ENUM('cliente', 'dono', 'operador'),
    allowNull: false,
  },
  nome: { // Alterado de name para nome
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  senha: { // Alterado de password para senha
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  telefone: { type: DataTypes.STRING(20) },
  cpf_cnpj: { type: DataTypes.STRING(20) },
  endereco: { type: DataTypes.STRING(255) },
  cidade: { type: DataTypes.STRING(100) },
  estado: { type: DataTypes.STRING(50) }
}, {
  tableName: 'usuarios', // Nome da tabela no banco
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

export default Usuario;
