const getById = (id) => {
    return db.query('SELECT * FROM mensajes WHERE id = ?', [id]);
}
const getByIdUsers = (id) => {
    return db.query('SELECT u.id as "user_id", u.alias, u.nombre, m.id as "mensaje_id", m.titulo, rel.tipo, rel.hora_envio, rel.hora_leido, rel.activo FROM relacion_usuarios_mensajes as rel JOIN usuarios as u ON u.id = rel.usuario_id JOIN mensajes as m ON m.id = rel.texto_mensaje_id WHERE rel.texto_mensaje_id = ?', [id])
}


const getMessageUser = (idUser) => {
    return db.query('SELECT u.id as "user_id", u.alias, u.nombre, m.id as "mensaje_id", m.titulo, rel.id, rel.tipo, rel.hora_envio, rel.hora_leido, rel.activo FROM relacion_usuarios_mensajes as rel JOIN usuarios as u ON u.id = rel.usuario_id JOIN mensajes as m ON m.id = rel.texto_mensaje_id WHERE rel.usuario_id = ?', [idUser])
}

const create = ({ titulo, texto }) => {
    return db.query('INSERT INTO mensajes (titulo, texto) values (?,?)', [titulo, texto]);
}

const asociate = ({ userId, mensajeId, tipo }) => {
    return db.query('INSERT INTO relacion_usuarios_mensajes (usuario_id, texto_mensaje_id, tipo) VALUES (?, ?, ?)', [userId, mensajeId, tipo]);
}

const updateLeido = ({ hora, userId, mensajeId }) => {
    return db.query('UPDATE relacion_usuarios_mensajes SET hora_leido = ? WHERE usuario_id = ? AND texto_mensaje_id = ?', [hora, userId, mensajeId])
}

const deleteMes = (mensajeId) => {
    return db.query('DELETE FROM mensajes WHERE id = ?', [mensajeId])
}

const deleteInbox = (mensajeId, userId) => {
    return db.query('UPDATE relacion_usuarios_mensajes SET activo = false WHERE texto_mensaje_id = ? AND usuario_id = ?', [mensajeId, userId])
}

module.exports = {
    getById,
    getByIdUsers,
    getMessageUser,
    create,
    asociate,
    updateLeido,
    deleteMes,
    deleteInbox
}