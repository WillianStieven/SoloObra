// No seu maquinaController.js
import Maquina from '../model/maquinaModel.js';
import Usuario from '../model/usuarioModel.js';

export const obterTodasMaquinas = async (req, res) => {
    try {
        const maquinas = await Maquina.findAll({
            include: [{
                model: Usuario,
                as: 'proprietario', // Certifique-se que este 'as' é IGUAL ao do index.js
                attributes: ['nome']
            }]
        });
        console.log(JSON.stringify(maquinas, null, 2)); // ⬅️ ADICIONE ISSO PARA VER NO TERMINAL
        res.json(maquinas);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
}
// Buscar máquina por ID
export const obtermaquinaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const maquina = await Maquina.findByPk(id);

        if (!maquina) {
            return res.status(404).json({ erro: 'Máquina não encontrada' });
        }
        res.json(maquina);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar máquina', detalhes: error.message });
    }
}

// Criar nova máquina
export const criarmaquina = async (req, res) => {
    try {
        // Use os nomes EXATOS que você definiu no Model
        const {
            id_proprietario,
            nome,
            tipo_maquina,
            descricao,
            preco_diaria,
            localizacao,
            img_url,
            especificacoes,
            recursos
        } = req.body;

        const novaMaquina = await Maquina.create({
            id_proprietario,
            nome,
            tipo_maquina,
            descricao,
            preco_diaria,
            localizacao,
            img_url,
            especificacoes,
            recursos
        });

        res.status(201).json({ maquina: novaMaquina, mensagem: 'Máquina criada com sucesso' });
    } catch (error) {
        res.status(400).json({ erro: 'Erro ao criar máquina', detalhes: error.message });
    }
}

// Atualizar máquina
export const atualizarMaquina = async (req, res) => {
    try {
        const { id } = req.params;
        const dadosAtualizados = req.body;

        const maquina = await Maquina.findByPk(id);

        if (!maquina) {
            return res.status(404).json({ erro: 'Máquina não encontrada' });
        }

        await maquina.update(dadosAtualizados);
        res.json({ maquina, mensagem: 'Máquina atualizada com sucesso' });
    } catch (error) {
        res.status(400).json({ erro: 'Erro ao atualizar máquina', detalhes: error.message });
    }
}

// Deletar máquina
export const deletarMaquina = async (req, res) => {
    try {
        const { id } = req.params;
        const deletado = await Maquina.destroy({ where: { id } });

        if (!deletado) {
            return res.status(404).json({ erro: 'Máquina não encontrada' });
        }

        res.json({ mensagem: 'Máquina deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao deletar máquina', detalhes: error.message });
    }
};