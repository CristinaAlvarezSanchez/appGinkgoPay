const { getByGroup, getByGroupUser, create, getById, addUserExpense, getByIdUsers, updateUserExpense, deleteUserExpense, updateExpense, deleteExpense } = require('../../models/expense.model');
const { createPayment, updatePayment, deletePayment } = require('../../models/payment.model');

const router = require('express').Router();

// devuelve todos los gastos asociados a un id de un grupo
router.get('/group/:idGroup', async (req, res) => {
    try {
        const { idGroup } = req.params;
        const [gastos] = await getByGroup(idGroup);
        res.json(gastos);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

//devuelve usuarios y sus gastos (porcentaje de participación) asociados a un grupo
router.get('/users/:idGroup', async (req, res) => {
    try {
        const { idGroup } = req.params;
        const [gastosUsuarios] = await getByGroupUser(idGroup);
        res.json(gastosUsuarios);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

// crea un gasto y un pago. El pago lo asocia al pagador el gasto está sin repartir - devuelve gasto
router.post('/new', async (req, res) => {
    try {
        const [result] = await create(req.body);
        const [gasto] = await getById(result.insertId);
        await createPayment(result.insertId, req.body);
        res.json(gasto[0]);

    } catch (error) {
        res.json({ fatal: error.message });
    }
});

// modifica un gasto y su pago asociado 
router.put('/update/:idGasto', async (req, res) => {
    try {
        const { idGasto } = req.params;
        await updateExpense(idGasto, req.body);
        await updatePayment(idGasto, req.body);
        const [gasto] = await getById(idGasto);
        res.json(gasto[0]);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

// añade 1 participante al gasto con su porcentaje de participación en el gasto - devuelve array con los participantes de este gasto
router.post('/share', async (req, res) => {
    try {
        const { gasto_id } = req.body;
        await addUserExpense(req.body);
        const [compartido] = await getByIdUsers(gasto_id);
        res.json(compartido);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

// modifica participación en un gasto - devuelve array con los participantes de este gasto
router.put('/updateshare', async (req, res) => {
    try {
        const { gasto_id } = req.body;
        await updateUserExpense(req.body);
        const [compartido] = await getByIdUsers(gasto_id);
        res.json(compartido);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

// borra un participante en un gasto devuelve array con los participantes de este gasto
router.delete('/:idGasto/deleteuser/:idUser', async (req, res) => {
    try {
        const { idUser, idGasto } = req.params;
        const [usuarioBorrado] = await deleteUserExpense(idUser, idGasto);
        if (usuarioBorrado.affectedRows === 0) {
            return res.json({ fatal: 'Este usuario no está asociado al gasto' });
        }
        const [compartido] = await getByIdUsers(idGasto);
        res.json(compartido);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

// borra un gasto y su pago asociado - res ok
router.delete('/delete/:idGasto', async (req, res) => {
    try {
        const { idGasto } = req.params;
        const [pagoBorrado] = await deletePayment(idGasto);
        const [result] = await deleteExpense(idGasto);
        res.json(result);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});


module.exports = router;