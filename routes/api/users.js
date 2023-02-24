const { getByEmailorAlias, getById, getByGroup, create, getByEmail, update, deleteUser } = require('../../models/user.model');

const router = require('express').Router();

// devuelve usuario que coincide con el id enviado por parámetro - Devuelve objeto
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await getById(id);
        if (result.length === 0) {
            return res.json('no existe ningún usuario con estos datos');
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
            return res.json('no existe ningún usuario con estos datos');
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
        const [usuarios] = await getByGroup(groupId);
        if (usuarios.length === 0) {
            return res.json('no existe ningún usuario con estos datos');
        }
        res.json(usuarios);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

// crea un nuevo usuario 
router.post('/register', async (req, res) => {
    try {
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
            return res.json({ fatal: 'Error usuarios y/o contraseña' });
        }
        const user = users[0];
        if (req.body.password !== user.password) {
            return res.json({ fatal: 'Error usuarios y/o contraseña' });
        }
        res.json({ success: 'Login correcto' });
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



