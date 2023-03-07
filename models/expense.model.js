const getById = (id) => {
    return db.query('SELECT *  FROM gastos WHERE gastos.id = ?', [id]);
}

const getByIdPay = (id) => {
    return db.query('SELECT gastos.id, gastos.nombre, gastos.fecha, gastos.cantidad, gastos.grupo_gasto_id, pagos.usuario_id as "pagador_id"  FROM gastos JOIN pagos on pagos.gasto_id = gastos.id WHERE gastos.id = ?', [id]);
}

const getByIdShare = (id) => {
    return db.query('SELECT u.id as "usuario_id", u.alias, gas.id as "gasto_id", rel_gas.participacion FROM relacion_gastos_usuarios as rel_gas JOIN gastos as gas on gas.id = rel_gas.gasto_id JOIN usuarios as u on u.id = rel_gas.usuario_id where gas.id = ?', [id]);
}
// optiene los usuarios asignados a un gasto
const getByIdUsers = (id) => {
    return db.query('SELECT u.id as userid, u.nombre, u.apellidos, u.alias, g.cantidad, relgu.participacion FROM relacion_gastos_usuarios as relgu JOIN usuarios as u on relgu.usuario_id = u.id JOIN gastos as g on relgu.gasto_id = g.id WHERE g.id = ?', [id]);
}

const getByGroup = (idGroup) => {
    return db.query('SELECT gastos.id, gastos.nombre, gastos.fecha, gastos.cantidad, gastos.grupo_gasto_id, pagos.usuario_id AS "pagador_id", usuarios.alias AS "pagador_alias" FROM gastos LEFT JOIN  pagos on gastos.id = pagos.gasto_id LEFT JOIN usuarios on pagos.usuario_id = usuarios.id WHERE gastos.grupo_gasto_id = ?', [idGroup]);
}

const getByGroupUser = (idGroup) => {
    return db.query('SELECT u.id as "usuario_id", u.nombre, u.apellidos, u.alias, g.id as "grurpo_id", g.nombre, gas.id as "gasto_id", gas.nombre as "gasto", gas.fecha, gas.cantidad, rel_gas.participacion FROM relacion_gastos_usuarios as rel_gas JOIN gastos as gas on gas.id = rel_gas.gasto_id JOIN usuarios as u on u.id = rel_gas.usuario_id JOIN grupos_gasto as g on g.id = gas.grupo_gasto_id WHERE g.id = ?', [idGroup]);
}

const getByGroupOneUser = (idGroup, idUser) => {
    return db.query('SELECT u.id, u.nombre, u.apellidos, u.alias, g.id as "groupId", g.nombre, gas.nombre as "gasto", gas.fecha, gas.cantidad, rel_gas.participacion FROM relacion_gastos_usuarios as rel_gas JOIN gastos as gas on gas.id = rel_gas.gasto_id JOIN usuarios as u on u.id = rel_gas.usuario_id JOIN grupos_gasto as g on g.id = gas.grupo_gasto_id WHERE g.id = ? AND u.id = ?', [idGroup, idUser]);
}

const create = ({ nombre, fecha, cantidad, grupo_gasto_id }) => {
    return db.query('INSERT INTO gastos (nombre, fecha, cantidad, grupo_gasto_id) values (?, ?, ?, ?)', [nombre, fecha, cantidad, grupo_gasto_id]);
}

const updateExpense = (id, { nombre, fecha, cantidad }) => {
    return db.query('UPDATE gastos SET nombre = ?, fecha = ?, cantidad = ? WHERE id = ?', [nombre, fecha, cantidad, id]);
}

const addUserExpense = ({ usuario_id, gasto_id, participacion }) => {
    return db.query('INSERT INTO relacion_gastos_usuarios (usuario_id, gasto_id, participacion) VALUES (?, ?, ?)', [usuario_id, gasto_id, participacion]);
}

const updateUserExpense = ({ usuario_id, gasto_id, participacion }) => {
    return db.query('UPDATE relacion_gastos_usuarios SET participacion = ? WHERE usuario_id = ? AND gasto_id = ?', [participacion, usuario_id, gasto_id]);
}

const deleteUserExpense = (usuario_id, gasto_id) => {
    return db.query('DELETE FROM relacion_gastos_usuarios WHERE usuario_id = ? AND gasto_id = ?', [usuario_id, gasto_id]);
}

const deleteExpense = (id) => {
    return db.query('DELETE FROM gastos WHERE id = ?', [id]);
}

module.exports = {
    getById,
    getByIdPay,
    getByIdShare,
    getByIdUsers,
    getByGroup,
    getByGroupUser,
    getByGroupOneUser,
    create,
    addUserExpense,
    updateUserExpense,
    deleteUserExpense,
    updateExpense,
    deleteExpense
}
