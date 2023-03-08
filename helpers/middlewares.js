 const jwt = require('jsonwebtoken');
const { getById } = require('../models/user.model');

const checkToken = async (req, res, next) => {
    if (!req.headers['authorization']) {
        return res.json({ fatal: 'tienes que incluir la cabecera Authorization' });
    }
    const token = req.headers['authorization'];
    let obj
    try {
        obj = jwt.verify(token, 'clave secreta supersecreta');
    }
    catch (error) {
        console.log(error.message);
        return res.json({ fatal: 'el token es incorrecto' });
    }
    const [result] = await getById(obj.user_id)
    req.user = result[0]

    next();
}

module.exports = {
    checkToken
} 