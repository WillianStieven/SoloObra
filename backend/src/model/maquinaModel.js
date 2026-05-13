import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';
import Usuario from './usuarioModel.js'; 

const Maquina = sequelize.define('Maquina', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_proprietario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios', 
            key: 'id'
        }
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    tipo_maquina: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    preco_diaria: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    disponibilidade: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    localizacao: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    img_url: {
        type: DataTypes.STRING(255),
    },
    especificacoes: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    recursos: {
        type: DataTypes.JSON,
        allowNull: true,    
    }
}, {
    tableName: 'maquinas',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
});

// ➡️ RELAÇÃO MOVIDA PARA DEPOIS DA DEFINIÇÃO
//Maquina.belongsTo(Usuario, { foreignKey: 'id_proprietario', as: 'proprietario' });

export default Maquina;