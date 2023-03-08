const { getById, create, asociate, updateLeido, deleteMes, deleteInbox, getByIdUsers, getMessageUser } = require('../../models/messages.model');

const router = require('express').Router();

//busca por id - devuelve objeto mensaje
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
})


// todas las relaciones de mensajes. (id mensaje)
router.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await getByIdUsers(id);
        if (result.length === 0) {
            return res.json(result);
        }
        res.json(result);
    } catch (error) {
        res.json({ fatal: error.message });
    }
})

//devuelve los mensajes de un usuario
router.get('/inbox/:idUser', async (req, res) => {
    try {
        const { idUser } = req.params;
        const [result] = await getMessageUser(idUser);
        if (result.length === 0) {
            return res.json(result);
        }
        res.json(result);
    } catch (error) {
        res.json({ fatal: error.message });
    }
})


//crea el mensaje - devuelve objeto mensaje
router.post('/create', async (req, res) => {
    try {
        const [result] = await create(req.body);
        const [mensaje] = await getById(result.insertId)
        res.json(mensaje[0])
    } catch (error) {
        res.json({ fatal: error.message });
    }
})

//crea relación enviado y receptor - devuelve res ok
router.post('/send/', async (req, res) => {
    try {
        const [result] = await asociate(req.body)
        res.json(result)
    } catch (error) {
        res.json({ fatal: error.message });
    }
})

//marca la hora de leido de un mensaje - devuelve res ok
router.put('/open', async (req, res) => {
    try {
        const [result] = await updateLeido(req.body)
        res.json(result)
    } catch (error) {
        res.json({ fatal: error.message });
    }
})

//elimina un mensaje del inbox 
router.get('/trash/:mensajeId/:userId', async (req, res) => {
    try {
        const { mensajeId, userId } = req.params
        const [result] = await deleteInbox(mensajeId, userId)
        res.json(result)
    } catch (error) {
        res.json({ fatal: error.message });
    }
})

//borra un mensaje por completo
router.delete('/delete/:mensajeId', async (req, res) => {
    try {
        const { mensajeId } = req.params
        const [result] = await deleteMes(mensajeId)
        res.json(result)
    } catch (error) {
        res.json({ fatal: error.message });
    }
})

//borra solo una relación de un mensaje (borrar solo para ti)


module.exports = router;