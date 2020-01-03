module.exports = {
  insertOne: 'INSERT INTO brinquedaria.produto(nome_produto, preco_unit) VALUES(?, ?)',
  selectAll: 'SELECT * FROM brinquedaria.produto',
  selectOne: 'SELECT * FROM brinquedaria.produto WHERE brinquedaria.produto.id_produto = ?',
  updateOne: `UPDATE brinquedaria.produto SET brinquedaria.produto.nome_produto = ?, 
  brinquedaria.produto.preco_unit = ? WHERE brinquedaria.produto.id_produto = ?`,
  deleteOne: 'DELETE FROM brinquedaria.produto WHERE brinquedaria.produto.id_produto = ?'
}