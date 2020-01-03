const Compra = require('../models/Compra');
const Consumidor = require('../models/Consumidor');
const Produto = require('../models/Produto');
const db = require('../db');

db.connect((err) => {
  if(!err) return console.log('Connection succesful');
  console.log('Connection failed\n' + err);
});

class CompraController {
  buscaTodos(req, res) {
    db.query(Compra.selectAll, (err, rows, fields) => {
      if(!err) return res.status(200).json(rows);

      //Se houver erro
      res.status(500).send(err);
    })
  }

  buscaUm(req, res) {
    const { id } = req.params;

    db.query(Compra.selectOne, [id], (err, rows, fields) => {
      if(!err) {
        //Se rows retornar com dados de compra, a compra procurado foi achado
        if(rows.length) return res.status(200).json(rows);
        
        //Se rows estiver vazio, a compra pelo id procurado não existe
        return res.status(204)
      }

      //Se houver erro
      res.status(500).send(err);
    })
  }

  excluiUm(req, res) {
    const { id } = req.params;

    db.query(Compra.deleteOne, [id], (err, rows, fields) => {
      if(!err) {
        //Se rows retornar com colunas afetadas, a compra foi excluído
        if(!!rows.affectedRows) return res.status(200).json({
          message: 'Compra excluído com sucesso',
          id
        });
        
        //Se rows estiver vazio, a compra pelo id procurado não existe
        return res.status(204)
      }

      //Se houver erro
      res.status(500).send(err);
    })
  }

  async criaUm(req, res) {
    const { id_consumidor, id_produto } = req.body;

    let seConsumidorExiste;
    let seProdutoExiste;

    //Checando se o produto existe antes de criar a relação
    db.query(Produto.selectOne, [id_produto], (err, rows, fields) => {
      if(!err) {
        //Se rows retornar com dados de produto, o produto procurado foi achado
        if(rows.length) {
          seProdutoExiste = true;
        } else {
          //Se rows estiver vazio, o produto pelo id procurado não existe
          seProdutoExiste = false;
        }
        

        //Checando se o consumidor existe antes de criar a relação
        db.query(Consumidor.selectOne, [id_consumidor], (err, rows, fields) => {
          if(!err) {
            //Se rows retornar com dados de produto, o consumidor procurado foi achado
            if(rows.length) {
              seConsumidorExiste = true;
            } else {
              //Se rows estiver vazio, o consumidor pelo id procurado não existe
              seConsumidorExiste = false;
            }
            
            if(!seProdutoExiste) return res.status(404).json({'erro': 'O produto especificado não existe'});
            if(!seConsumidorExiste) return res.status(404).json({'erro': 'O consumidor especificado não existe'});

            //Se tanto o consumidor e o produto existem, registrar o pedido de compra
            db.query(Compra.insertOne, [id_consumidor, id_produto], (err, rows, fields) => {
              if(!err) {
                //Se rows retornar com colunas afetadas, a compra foi criado
                if(!!rows.affectedRows) return res.status(200).json({
                  message: 'Compra efetuada com sucesso',
                  id: rows.insertId
                });
              }

              //Se houver erro
              res.status(500).send(err);
            })
          }
        })
      }
    })
  }
    
}

module.exports = new CompraController();