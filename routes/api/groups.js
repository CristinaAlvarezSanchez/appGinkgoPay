const { getById, create, adUserGroup, updateName, updateState, deleteGroup, deleteUserGroup, getByUserId, updateUserAut } = require('../../models/group.model');

const router = require('express').Router();

// busqueda por id, devuelve objeto con los datos del grupo
router.get('/:groupId', async (req, res) => {
    try {
        const { groupId } = req.params;
        const [groups] = await getById(groupId);
        res.json(groups[0]);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

// devuelve todos los grupos de un usuario - array
router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const [groups] = await getByUserId(userId);
        res.json(groups);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

// crea un nuevo grupo asignando al primer participante como administrador  - devuelve objeto con grupo creado
router.post('/new/:adminId', async (req, res) => {
    try {
        const { adminId } = req.params;
        const { nombre } = req.body;
        const [result] = await create(nombre);
        await adUserGroup(adminId, result.insertId, 'administrador', true);
        const [newGroups] = await getById(result.insertId);
        res.json(newGroups[0]);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

// asigna participantes a un grupo como miembros NO AUTORIZADOS POR DEFECTO - res ok
router.get('/:groupId/adduser/:userId', async (req, res) => {
    try {
        const { groupId, userId } = req.params;
        const [result] = await adUserGroup(userId, groupId, 'miembro', false);
        res.json(result);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

// modifica el estado de un usuario en un grupo a autorizado - res ok
router.get('/:groupId/authorization/:userId', async (req, res) => {
    try {
        const { groupId, userId } = req.params;
        const [result] = await updateUserAut(groupId, userId);
        res.json(result);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

// para modificar el nombre del grupo - devuelve objeto con el grupo modificado
router.put('/update/:groupId', async (req, res) => {
    try {
        const { groupId } = req.params;
        const { nombre } = req.body;
        await updateName(groupId, nombre);
        const [updateGroup] = await getById(groupId);
        res.json(updateGroup[0]);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

// para modificar el estado a activo o archivado - devuelve objeto con los datos del grupo modificado
router.put('/updatestate/:groupId', async (req, res) => {
    try {
        const { groupId } = req.params;
        const { estado } = req.body;
        await updateState(groupId, estado);
        const [updateGroup] = await getById(groupId);
        res.json(updateGroup[0]);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

// borrado del grupo - res ok
router.delete('/delete/:groupId', async (req, res) => {
    try {
        const { groupId } = req.params;
        const [result] = await deleteGroup(groupId);
        if (result.affectedRows === 0) {
            return res.json({ fatal: 'No hay datos afectados' });
        }
        res.json(result);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

// borrado de un usuario participante del grupo - res ok
router.delete('/:groupId/userdelete/:userId', async (req, res) => {
    try {
        const { groupId, userId } = req.params;
        const [result] = await deleteUserGroup(userId, groupId);
        if (result.affectedRows === 0) {
            return res.json({ fatal: 'No hay datos afectados' });
        }
        res.json(result);
    } catch (error) {
        res.json({ fatal: error.message });
    }

});

module.exports = router;