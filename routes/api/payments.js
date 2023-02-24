const { updateUserPayment, getByIdExpense } = require('../../models/payment.model');

const router = require('express').Router();

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