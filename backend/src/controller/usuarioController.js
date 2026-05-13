import Usuario from '../model/usuarioModel.js';
import { gerarToken } from '../middleware/authMiddleware.js';


// o 401 para erros de autenticação (Dados incorretos no login) 
// o 400 para erros de validação (Dados incorretos no cadastro ou atualização).
// o 404 para recursos não encontrados (Usuário ou máquina não encontrado).
// o 500 para erros internos do servidor (Problemas inesperados no backend).
// o 201 para validações corretas

export const loginUsuario = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const usuario = await Usuario.findOne({ where: { email } });

        //  ERRO 401 CASO SEJA INCORRETO -  Verificar se o usuário existe
        if (!usuario) {
            return res.status(401).json({ erro: 'E-mail ou senha incorretos.' });
        }
        //  ERRO 401 CASO SEJA INCORRETO -  Verificar a senha
        if (usuario.senha !== senha) {
            return res.status(401).json({ erro: 'E-mail ou senha incorretos.' });
        }

        const token = gerarToken(usuario);
        const { senha: _, ...dadosPublicos } = usuario.toJSON();

        res.json({
            mensagem: 'Login realizado com sucesso!',
            token: token,
            usuario: dadosPublicos
        });
    } catch (error) {
        res.status(500).json({ erro: 'Erro no Servidor ao processar login', detalhes: error.message });
    }
};

// Listar todos
export const obterTodosUsuarios = async (req, res) => {
    try {
        const lista = await Usuario.findAll();
        res.json(lista);
    } catch (error) {
        res.status(500).json({ erro: 'Erro no Servidor ao buscar usuários', detalhes: error.message });
    }
};

// Buscar por ID
export const obterUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByPk(id);
        if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ erro: 'Erro no Servidor ao buscar usuário', detalhes: error.message });
    }
};

// RETORNA ERRO 400 CASO SEJA INCORRETO - Criar (Cadastro)
export const criarUsuario = async (req, res) => {
    try {
        const { tipo, nome, email, telefone, cpf_cnpj, endereco, cidade, estado, senha } = req.body;
        if (!nome || !email || !senha || !tipo) {
            return res.status(400).json({ erro: 'Campos obrigatórios: tipo, nome, email e senha.' });
        }
        const novo = await Usuario.create({
            tipo, nome, email, senha, telefone, cpf_cnpj, endereco, cidade, estado
        });
        res.status(201).json({ usuario: novo, mensagem: 'Usuário criado com sucesso' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro no Servidor ao criar usuário', detalhes: error.message });
    }
};

// RETORNA ERRO 400 CASO SEJA INCORRETO - Atualizar
export const atualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByPk(id);
        if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });

        await usuario.update(req.body);
        res.json({ usuario, mensagem: 'Usuário atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro no Servidor ao atualizar usuário', detalhes: error.message });
    }
};

// RETORNA ERRO 400 CASO SEJA INCORRETO - Deletar
export const deletarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const deletado = await Usuario.destroy({ where: { id } });
        if (!deletado) return res.status(404).json({ erro: 'Usuário não encontrado' });
        res.json({ mensagem: 'Usuário deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro no Servidor ao deletar usuário', detalhes: error.message });
    }
};
