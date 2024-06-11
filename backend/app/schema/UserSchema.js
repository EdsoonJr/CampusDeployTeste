const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Garante unicidade
    },
    senha: {
        type: String,
        required: true,
    },
    telefone: {
        type: String,
        required: true,
    },
    tipoUsuario: {
        type: String,
        required: true,
        enum: ['estudante', 'responsavel', 'administrador'],
    },
    genero: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('senha')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.senha = await bcrypt.hash(this.senha, salt);
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('User', UserSchema);
