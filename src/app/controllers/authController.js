const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

function gerarToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 1800,
    });
}

router.post('/registrar', async (req, res) => {
    const { email } = req.body;

    try {
        if (await User.findOne({ email }))
            return res.status(400).send({
                mensagem: 'Email já existente'
            });

        const user = await User.create(req.body);

        user.senha = undefined;

        return res.status(200).send({
            user,
            token: gerarToken({ id: user.id })
        });
    } catch (err) {
        return res.status(400).send({
            mensagem: 'Erro ao registrar usuário'
        });
    }
});

router.post('/autenticar', async (req, res) => {
    const { email, senha } = req.body;

    try {

        const user = await User.findOne({ email }).select('+senha');

        if (!user)
            return res.status(401).send({
                mensagem: 'Usuário e/ou senha inválidos'
            });

        if (!bcrypt.compareSync(senha, user.senha))
            return res.status(401).send({
                mensagem: 'Usuário e/ou senha inválidos'
            });
        
        await User.findOneAndUpdate(user.id, {
            '$set': {
                ultimo_login: new Date().toISOString()
            }
        });

        user.senha = undefined;

        return res.status(200).send({
            user,
            token: gerarToken({ id: user.id })
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send({
            mensagem: 'Autenticação falhou'
        });
    }
});

module.exports = app => app.use('/auth', router);