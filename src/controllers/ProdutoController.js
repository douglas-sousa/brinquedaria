const Produto = require('../models/Produto');
const db = require('../db');

db.connect((err) => {
  if(!err) return console.log('Connection succesful');
  console.log('Connection failed\n' + err);
});

class ProdutoController {
  buscaTodos(req, res) {
    db.query(Produto.selectAll, (err, rows, fields) => {
      if(!err) return res.status(200).json(rows);

      //Se houver erro
      res.status(500).send(err);
    })
  }

  buscaUm(req, res) {
    const { id } = req.params;

    db.query(Produto.selectOne, [id], (err, rows, fields) => {
      if(!err) {
        //Se rows retornar com dados de produto, o produto procurado foi achado
        if(rows.length) return res.status(200).json(rows);
        
        //Se rows estiver vazio, o produto pelo id procurado não existe
        return res.status(204)
      }

      //Se houver erro
      res.status(500).send(err);
    })
  }

  atualizaUm(req, res) {
    const { id } = req.params;
    const { nome, preco } = req.body;

    db.query(Produto.updateOne, [nome, preco, id], (err, rows, fields) => {
      if(!err) {
        //Se rows retornar com colunas afetadas, o produto foi atualizado
        if(!!rows.affectedRows) return res.status(200).json({
          message: 'Produto atualizado com sucesso',
          id,
          nome,
          preco
        });
        
        //Se rows estiver vazio, o produto pelo id procurado não existe
        return res.status(204)
      }

      //Se houver erro
      res.status(500).send(err);
    })
  }

  excluiUm(req, res) {
    const { id } = req.params;

    db.query(Produto.deleteOne, [id], (err, rows, fields) => {
      if(!err) {
        //Se rows retornar com colunas afetadas, o produto foi excluído
        if(!!rows.affectedRows) return res.status(200).json({
          message: 'Produto excluído com sucesso',
          id
        });
        
        //Se rows estiver vazio, o produto pelo id procurado não existe
        return res.status(204)
      }

      //Se houver erro
      res.status(500).send(err);
    })
  }

  criaUm(req, res) {
    const { nome, preco } = req.body;

    db.query(Produto.insertOne, [nome, preco], (err, rows, fields) => {
      if(!err) {
        //Se rows retornar com colunas afetadas, o produto foi criado
        if(!!rows.affectedRows) return res.status(200).json({
          message: 'Produto criado com sucesso',
          nome,
          id: rows.insertId
        });
      }

      //Se houver erro
      res.status(500).send(err);
    })
  }
    
}

module.exports = new ProdutoController();