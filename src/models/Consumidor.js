module.exports = {
  insertOne: 'INSERT INTO brinquedaria.usuario(nome_usuario) VALUES(?)',
  selectAll: 'SELECT * FROM brinquedaria.usuario',
  selectOne: 'SELECT * FROM brinquedaria.usuario WHERE brinquedaria.usuario.id_usuario = ?',
  updateOne: 'UPDATE brinquedaria.usuario SET brinquedaria.usuario.nome_usuario = ? WHERE brinquedaria.usuario.id_usuario = ?',
  deleteOne: 'DELETE FROM brinquedaria.usuario WHERE brinquedaria.usuario.id_usuario = ?'
}