const UserRepository = require('../repository/UserRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (userData) => {
    return await UserRepository.createUser(userData);
};

const loginUser = async (email, senha) => {
    const user = await UserRepository.findUserByEmail(email);
    if (!user) {
        throw new Error('Usuário não encontrado');
    }

    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
        throw new Error('Senha incorreta');
    }

    const token = jwt.sign({ id: user._id, email: user.email, tipoUsuario: user.tipoUsuario }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return { user, token };
};

module.exports = {
    createUser,
    loginUser,
};
