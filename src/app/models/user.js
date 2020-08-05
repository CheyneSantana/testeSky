const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
   senha: {
       type: String,
       required: true,
       select: false,
   },
   data_criacao: {
       type: Date,
       default: Date.now,
   },
   ultimo_login: {
       type: Date,
       default: Date.now,
   },
   token: {
       type: String,
       select: false
   }
});

UserSchema.pre('save', function(next) {
    const hash = bcrypt.hashSync(this.senha, 10);
    this.senha = hash;

    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;