import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'FWE';

export const verificarToken = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ erro: 'Faltou Informar o Token.' });
        }
        const decoded = jwt.verify(token, SECRET);
        req.usuario = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ erro: 'Token inválido ou expirado.' });
    }
};
export const gerarToken = (usuario) => {
    return jwt.sign(
        { id: usuario.id, email: usuario.email, tipo: usuario.tipo },
        SECRET,
        { expiresIn: '24h' }
    );
};

export default SECRET;
