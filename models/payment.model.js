const getById = (id) => {
    return db.query('SELECT * FROM pagos WHERE id = ?', [id])
}

const getByIdGroup = (idGroup) => {
    return db.query('SELECT p.id, p.nombre, p.fecha, p.cantidad, p.usuario_id as "pagadorId", p.gasto_id FROM pagos as p JOIN gastos on gastos.id = p.gasto_id WHERE gastos.grupo_gasto_id = ?', [idGroup]);
}

const getByUserGroup = (idGroup, idUser) => {
    return db.query('SELECT p.id, p.nombre, p.fecha, p.cantidad, p.usuario_id as "pagadorId", p.gasto_id FROM pagos as p JOIN gastos on gastos.id = p.gasto_id WHERE gastos.grupo_gasto_id = ? AND p.usuario_id = ? ', [idGroup, idUser]);
}

const getByIdExpense = (idGasto) => {
    return db.query('SELECT * FROM pagos WHERE gasto_id = ?', [idGasto]);
}

const createPayment = (gasto_id, { nombre, fecha, cantidad, usuario_id }) => {
    return db.query('INSERT INTO pagos (nombre, fecha, cantidad, usuario_id, gasto_id) values (?, ?, ?, ?, ?)', [nombre, fecha, cantidad, usuario_id, gasto_id]);
}

const updatePayment = (idGasto, { nombre, fecha, cantidad }) => {
    return db.query('UPDATE pagos SET nombre = ?, fecha = ?, cantidad = ? WHERE gasto_id = ?', [nombre, fecha, cantidad, idGasto]);
}

const updateUserPayment = (idGasto, usuario_id) => {
    return db.query('UPDATE pagos SET usuario_id = ? WHERE gasto_id = ?', [usuario_id, idGasto]);
}

const deletePayment = (idGasto) => {
    return db.query('DELETE FROM pagos WHERE gasto_id = ?', [idGasto]);
}

module.exports = {
    getById,
    getByIdGroup,
    getByUserGroup,
    getByIdExpense,
    createPayment,
    updatePayment,
    updateUserPayment,
    deletePayment
}