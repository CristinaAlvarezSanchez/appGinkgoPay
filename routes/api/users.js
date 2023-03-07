const { getByEmailorAlias, getById, getByGroup, create, getByEmail, update, deleteUser, updateToken, getAllByGroup } = require('../../models/user.model');
const { createToken } = require('../../helpers/utils');

const router = require('express').Router();
const bcrypt = require('bcryptjs');

// devuelve usuario que coincide con el id enviado por parámetro - Devuelve objeto
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await getById(id);
        if (result.length === 0) {
            return res.json(result);
        }
        res.json(result[0]);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

// extraer usuarios filtrados por e-mail o por alias que contienen una cadena de caracteres enviada por parámetro. Devuelve array
router.get('/search/:string', async (req, res) => {
    try {
        const { string } = req.params;
        const [result] = await getByEmailorAlias(string);
        if (result.length === 0) {
            return res.json(result);
        }
        res.json(result);
    }
    catch (error) {
        res.json({ fatal: error.message });
    }
});

// extrae a los usuarios de un grupo. Devuelve array (usuarios autorizados y no autorizados)
router.get('/group/:groupId', async (req, res) => {
    try {
        const { groupId } = req.params;
        const [usuarios] = await getAllByGroup(groupId);
        if (usuarios.length === 0) {
            return res.json(usuarios);
        }
        res.json(usuarios);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

// crea un nuevo usuario 
router.post('/register', async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 8)
        const [result] = await create(req.body);
        const [usuario] = await getById(result.insertId);
        res.json(usuario[0]);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

// login de usuario 
router.post('/login', async (req, res) => {
    try {
        const [users] = await getByEmail(req.body.email);
        if (users.length === 0) {
            return res.json({ fatal: 'Error usuario y/o contraseña' });
        }
        const user = users[0];
        const iguales = bcrypt.compareSync(req.body.password, user.password)
        if (!iguales) {
            return res.json({ fatal: 'Error usuario y/o contraseña' });
        }
        const token = createToken(user)
        await updateToken(token, user.email)
        res.json({
            success: 'Login correcto',
            token: token
        });
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

// actualizacion de datos de usuario
router.put('/update/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        await update(userId, req.body);
        const [user] = await getById(userId);
        res.json(user[0]);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

// borrado de usuario 
router.delete('/delete/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const [result] = await deleteUser(userId);
        res.json(result);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

module.exports = router;



