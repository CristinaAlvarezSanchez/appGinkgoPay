const getById = (id) => {
    return db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
}

const getByEmailorAlias = (string) => {
    return db.query(`SELECT * FROM usuarios WHERE alias LIKE ? OR email LIKE ?`, [`%${string}%`, `%${string}%`]);
}

const getByEmail = (email) => {
    return db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
}

const getByGroup = (idGroup, autorizado = true) => {
    return db.query('SELECT usuarios.id, usuarios.nombre, usuarios.apellidos , usuarios.alias, usuarios.email, rel_gru.tipo_usuario, rel_gru.autorizado FROM relacion_grupos_usuarios as rel_gru JOIN usuarios on rel_gru.usuario_id = usuarios.id JOIN grupos_gasto on rel_gru.grupo_gasto_id = grupos_gasto.id WHERE grupos_gasto.id = ? and rel_gru.autorizado = ?', [idGroup, autorizado]);
}

const getAllByGroup = (idGroup) => {
    return db.query('SELECT usuarios.id, usuarios.nombre, usuarios.apellidos , usuarios.alias, usuarios.email, rel_gru.tipo_usuario, rel_gru.autorizado FROM relacion_grupos_usuarios as rel_gru JOIN usuarios on rel_gru.usuario_id = usuarios.id JOIN grupos_gasto on rel_gru.grupo_gasto_id = grupos_gasto.id WHERE grupos_gasto.id = ?', [idGroup]);
}
const create = ({ nombre, apellidos, alias, email, password }) => {
    return db.query('insert into usuarios (nombre, apellidos, alias, email, password) values (?,?,?,?,?)', [nombre, apellidos, alias, email, password]);
}

const update = (id, { nombre, apellidos, alias, email, password }) => {
    return db.query('UPDATE usuarios SET nombre = ?, apellidos = ?, alias = ?, email = ?, password = ? WHERE id = ? ', [nombre, apellidos, alias, email, password, id]);
}

const updateToken = (token, email) => {
    return db.query('UPDATE usuarios SET token = ? WHERE email = ?', [token, email])
}

const deleteUser = (id) => {
    return db.query('DELETE FROM usuarios WHERE id = ?', [id]);
}

module.exports = {
    create,
    getById,
    getByGroup,
    getAllByGroup,
    getByEmailorAlias,
    getByEmail,
    update,
    updateToken,
    deleteUser
}