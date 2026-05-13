import express from 'express';
import cors from 'cors';
import sequelize from './database/db.js';
import { verificarToken } from './middleware/authMiddleware.js';


import Usuario from './model/usuarioModel.js';
import Maquina from './model/maquinaModel.js';


Usuario.hasMany(Maquina, { foreignKey: 'id_proprietario', as: 'maquinas' });
Maquina.belongsTo(Usuario, { foreignKey: 'id_proprietario', as: 'proprietario' });

import {
  obterTodosUsuarios,
  obterUsuarioPorId,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario,
  loginUsuario
} from './controller/usuarioController.js';

import {
  obterTodasMaquinas,
  obtermaquinaPorId,
  criarmaquina,
  atualizarMaquina,
  deletarMaquina
} from './controller/maquinaController.js';

const app = express();


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('SOLOOBRA API - STATUS: ONLINE');
});


app.post('/login', loginUsuario);
app.get('/api/usuarios', verificarToken, obterTodosUsuarios);
app.get('/api/usuarios/:id', verificarToken, obterUsuarioPorId);
app.post('/api/usuarios', criarUsuario);
app.put('/api/usuarios/:id', verificarToken, atualizarUsuario);
app.delete('/api/usuarios/:id', verificarToken, deletarUsuario);


app.get('/api/maquinas', verificarToken, obterTodasMaquinas);
app.get('/api/maquinas/:id', verificarToken, obtermaquinaPorId);
app.post('/api/maquinas', verificarToken, criarmaquina);
app.put('/api/maquinas/:id', verificarToken, atualizarMaquina);
app.delete('/api/maquinas/:id', verificarToken, deletarMaquina);


const iniciarServidor = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco estabelecida com sucesso.');

    await sequelize.sync({ alter: true });
    console.log('Tabelas e relações sincronizadas.');

    app.listen(5000, () => {
      console.log(`Servidor rodando em http://localhost:5000`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
  }
};

iniciarServidor();