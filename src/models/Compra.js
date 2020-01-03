module.exports = {
  insertOne: 'INSERT INTO brinquedaria.compra(id_usuario_pk, id_produto_pk) VALUES(?, ?)',
  selectAll: `SELECT c.*, p.nome_produto, u.nome_usuario FROM brinquedaria.compra c 
  JOIN brinquedaria.produto p ON c.id_produto_pk = p.id_produto 
  JOIN brinquedaria.usuario u ON c.id_usuario_pk = u.id_usuario;
  `,
  selectOne: `SELECT c.*, p.nome_produto, u.nome_usuario FROM brinquedaria.compra c 
  JOIN brinquedaria.produto p ON c.id_produto_pk = p.id_produto 
  JOIN brinquedaria.usuario u ON c.id_usuario_pk = u.id_usuario WHERE c.id_compra = ?;
  `,
  deleteOne: 'DELETE FROM brinquedaria.compra WHERE brinquedaria.compra.id_compra = ?'
}