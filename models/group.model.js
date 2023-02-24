const getById = (id) => {
    return db.query('SELECT * FROM grupos_gasto WHERE id = ?', [id]);
}

const getByUserId = (userId) => {
    return db.query('SELECT g.id, g.nombre as "nombre_grupo", rel_gru.tipo_usuario, rel_gru.autorizado FROM relacion_grupos_usuarios as rel_gru JOIN usuarios as u on u.id = rel_gru.usuario_id JOIN grupos_gasto as g on g.id = rel_gru.grupo_gasto_id WHERE u.id = ?', [userId]);
}

const create = (nombre) => {
    return db.query('INSERT INTO grupos_gasto (nombre) values (?)', [nombre]);
}

const adUserGroup = (adminId, groupId, tipo, autorizado) => {
    return db.query('INSERT INTO relacion_grupos_usuarios (usuario_id, grupo_gasto_id, tipo_usuario, autorizado) values (?, ?, ?, ?)', [adminId, groupId, tipo, autorizado]);
}

const updateUserAut = (groupId, userId) => {
    return db.query('UPDATE relacion_grupos_usuarios SET autorizado = true WHERE grupo_gasto_id = ? AND usuario_id = ?', [groupId, userId]);
}

const updateName = (id, nombre) => {
    return db.query('UPDATE grupos_gasto SET nombre = ? WHERE id = ?', [nombre, id]);
}

const updateState = (id, estado) => {
    return db.query('UPDATE grupos_gasto SET estado = ? WHERE id = ?', [estado, id]);
}

const deleteGroup = (id) => {
    return db.query('DELETE FROM grupos_gasto WHERE id = ?', id);
}

const deleteUserGroup = (userId, groupId) => {
    return db.query('DELETE FROM relacion_grupos_usuarios where usuario_id = ? AND grupo_gasto_id = ?', [userId, groupId]);
}

module.exports = {
    getById,
    getByUserId,
    create,
    adUserGroup,
    updateName,
    updateState,
    deleteGroup,
    deleteUserGroup,
    updateUserAut
}