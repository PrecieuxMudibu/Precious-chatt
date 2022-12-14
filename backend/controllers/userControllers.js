const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = (request, response, next) => {
    bcrypt
        .hash(request.body.user_password, 10)
        .then((hash) => {
            const user = new User({
                user_name: request.body.user_name,
                user_email: request.body.user_email,
                user_password: hash,
            });
            user.save()
                .then(() =>
                    response.status(201).json({ message: 'Utilisateur créé !' })
                )
                .catch((error) => {
                    response.status(400).json({ error });
                });
        })
        .catch((error) => {
            response.status(500).json({ error });
        });
};

exports.login = (request, response) => {
    User.findOne({
        user_email: request.body.user_email,
    }).then((user) => {
        if (!user) {
            return response
                .status(401)
                .json({ message: '1 Paire login/mot de passe incorrecte' });
        }

        if (
            !bcrypt.compareSync(request.body.user_password, user.user_password)
        ) {
            return response
                .status(401)
                .json({ message: 'Mot de passe incorrect' });
        }

        const payload = {
            user_name: user.user_name,
            id: user._id,
        };

        const token = jwt.sign(payload, 'NEVER GIVE UP', { expiresIn: '1d' });

        return response.status(200).json({
            message: 'Vous êtes connecté !',
            token: 'Bearer ' + token,
            id: payload.id,
        });
        // var token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256'});
        // var token = jwt.sign(payload, secretOrPrivateKey, [options, callback]);
    });
};

exports.getAllUsers = (request, response) => {
    User.find()
        .then((users) =>
            response.status(200).json({
                users,
            })
        )
        .catch((error) => {
            response.status(400).json({ error });
        });
};

exports.getUser = (request, response) => {
    User.findOne({ _id: request.params.id })
        .then((users) =>
            response.status(200).json({
                users,
            })
        )
        .catch((error) => {
            response.status(400).json({ error });
        });
};
