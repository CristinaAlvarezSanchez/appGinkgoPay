const { updateUserPayment, getByIdExpense, getByUserGroup } = require('../../models/payment.model');

const router = require('express').Router();

// devuelve los pagos de un usuario para un grupo. 
router.get('/users/:idUser/group/:idGroup', async (req, res) => {
    try {
        const { idGroup, idUser } = req.params;
        const [pagos] = await getByUserGroup(idGroup, idUser)
        res.json(pagos)
    } catch (error) {
        res.json({ fatal: error.message });
    }

})
// actualiza el pagador devuelve el pago con los datos modificados
router.put('/updateUser/:idGasto', async (req, res) => {
    try {
        const { usuario_id } = req.body;
        const { idGasto } = req.params;
        await updateUserPayment(idGasto, usuario_id);
        const [pago] = await getByIdExpense(idGasto);
        res.json(pago[0]);

    } catch (error) {
        res.json({ fatal: error.message });
    }
});

module.exports = router;