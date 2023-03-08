const dayjs = require('dayjs');
const { json } = require('express');
const jwt = require('jsonwebtoken');

const createToken = (user) => {
    const obj = {
        user_id: user.id,
        user_alias: user.alias,
        user_nombre: user.nombre,
        exp: dayjs().add(30, 'days').unix()
    }
    return jwt.sign(obj, process.env.SECRET_KEY);
}

module.exports = {
    createToken
}