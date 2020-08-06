const express = require('express');
const router = express.Router();
const authMid = require('../middlewares/auth');
const User = require('../models/user');
const moment = require('moment');

router.use(authMid);

router.get('/', async (req, res) => {
    const user = await User.findById(req.id);
    const ultimoLogin = moment(user.ultimo_login);
    const horarioAtual = new Date(Date.now);

    if (!ultimoLogin.isBetween(horarioAtual.setMinutes(horarioAtual.getMinutes - 30), horarioAtual)) 
        return res.status(401).send({ mensagem: 'Sessão inválida' });

    return res.status(200).send({ user });
});

module.exports = app => app.use('/sky', router);